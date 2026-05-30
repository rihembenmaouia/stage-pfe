import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  Image
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { supabase } from '../supabase'
import { Ionicons } from '@expo/vector-icons'

export default function Register({ navigation }: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [phone, setPhone] = useState('')
  const [poste, setPoste] = useState('')
  const [cin, setCin] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const register = async () => {
    if (!birthDate) {
      Alert.alert("Error", "Please select your birth date")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    const formattedDate = birthDate.toISOString().split('T')[0]

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      Alert.alert("Error", error.message)
      return
    }

    const user = data.user

    const { error: dbError } = await supabase
      .from('employers')
      .insert([
        {
          id: user?.id,
          email,
          nom,
          prenom,
          phone,
          poste,
          cin,
          birthdate: formattedDate
        }
      ])

    if (dbError) {
      Alert.alert("DB Error", dbError.message)
      return
    }

    Alert.alert("Success", "Account created 🎉")

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        {/* LOGO */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

        {/* TITLE */}
        <Text style={styles.title}>Sign Up</Text>

        <TextInput placeholder="First Name" style={styles.input} onChangeText={setNom} />
        <TextInput placeholder="Last Name" style={styles.input} onChangeText={setPrenom} />
        <TextInput placeholder="Phone Number" style={styles.input} onChangeText={setPhone} />
        <TextInput placeholder="Position" style={styles.input} onChangeText={setPoste} />

        {/* CIN */}
        <TextInput
          placeholder="Identity Card Number"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setCin}
        />

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: birthDate ? '#000' : '#888' }}>
            {birthDate ? birthDate.toDateString() : "Select Birth Date"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false)
              if (selectedDate) setBirthDate(selectedDate)
            }}
          />
        )}

        <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            style={styles.passwordInput}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/facebook.png')} style={styles.socialImg} />
            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/google.png')} style={styles.socialImg} />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? Login
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 10,
    marginTop: 0 // 🔥 important fix
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },

  dateInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },

  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 12
  },

  passwordInput: {
    flex: 1,
    padding: 14
  },

  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },

  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20
  },

  socialButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12
  },

  socialImg: {
    width: 20,
    height: 20,
    marginRight: 8
  },

  link: {
    marginTop: 20,
    color: '#3b82f6'
  }
})