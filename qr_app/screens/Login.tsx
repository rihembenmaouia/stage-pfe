import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../supabase'
import { Ionicons } from '@expo/vector-icons'

export default function Login({ navigation }: any) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🔥 load saved email
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('email')
        if (saved) {
          setEmail(saved)
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  // 🔐 LOGIN
  const login = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      Alert.alert("Error", error.message)
      return
    }

    // 🔥 save email
    await AsyncStorage.setItem('email', email)

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'myapp://' }
    })

    if (error) Alert.alert("Error", error.message)
  }

  const facebookLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { redirectTo: 'myapp://' }
    })

    if (error) Alert.alert("Error", error.message)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>

        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <Text style={styles.title}>Log in</Text>

        {/* 🔥 AUTO-FILL EMAIL */}
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"              // ✅ ADD THIS
          textContentType="emailAddress"    // ✅ ADD THIS
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            autoComplete="password"         // ✅ ADD THIS
            textContentType="password"      // ✅ ADD THIS
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* SOCIAL */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn} onPress={googleLogin}>
            <Image source={require('../assets/google.png')} style={styles.socialIcon} />
            <Text>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} onPress={facebookLogin}>
            <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
            <Text>Facebook</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
        >
          Don't have an account ? Sign up
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

// ✅ STYLES (IMPORTANT - FIX ERROR)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
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
    marginBottom: 20
  },
  input: {
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
    marginBottom: 5
  },
  passwordInput: {
    flex: 1,
    padding: 14
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: '#3b82f6'
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
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8
  },
  link: {
    marginTop: 20,
    color: '#3b82f6'
  }
})