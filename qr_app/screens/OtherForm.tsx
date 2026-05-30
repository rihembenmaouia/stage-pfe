import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native'

import { supabase } from '../supabase'

export default function OtherForm({ navigation }: any) {

  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getUserEmail()
  }, [])

  const getUserEmail = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) setEmail(user.email)
  }

  const handleSend = () => {
    if (!subject || !message) {
      Alert.alert("Error", "Fill all fields")
      return
    }

    Alert.alert("Success", "Message sent")
    setSubject('')
    setMessage('')
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Other</Text>
        </View>

        {/* EMAIL (AUTO) */}
        <TextInput
          value={email}
          editable={false}
          style={[styles.input, { backgroundColor: '#f3f4f6' }]}
        />

        {/* SUBJECT (OBJET) */}
        <TextInput
          placeholder="Subject"
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
        />

        {/* MESSAGE */}
        <TextInput
          placeholder="Write your message..."
          style={[styles.input, { height: 120 }]}
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

        {/* BACK */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center'
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20
  },

  logo: {
    width: 200,
    height: 150
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },

  backBtn: {
    marginTop: 20,
    alignSelf: 'center'
  },

  backText: {
    color: '#3b82f6',
    fontWeight: 'bold'
  }
})