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

export default function ReclamationForm({ route, navigation }: any) {

  const { type } = route.params

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getUserEmail()
  }, [])

  const getUserEmail = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) setEmail(user.email)
  }

  const handleSend = () => {
    Alert.alert("Success", `${type} sent`)
    setMessage('')
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 🔵 BACK BUTTON */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>{type}</Text>
        </View>

        {/* EMAIL */}
        <TextInput
          value={email}
          editable={false}
          style={[styles.input, { backgroundColor: '#f3f4f6' }]}
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

  /* 🔵 BACK BUTTON (TOP LEFT) */
  backBtn: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },

  backText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: 'bold'
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: -150,
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
  }
})