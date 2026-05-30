import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'
import { supabase } from '../supabase'

export default function Home({ navigation }: any) {

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [cin, setCin] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [qrData, setQrData] = useState<string | null>(null)

  const [showLogout, setShowLogout] = useState(false)

  const [myQRs, setMyQRs] = useState<any[]>([])

  useEffect(() => {
    getUser()
    fetchQRs()
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    setUserEmail(user.email || '')
    setAvatar(user.user_metadata?.avatar_url)

    // 👇 اسم المستخدم
    setUserName(user.user_metadata?.full_name || 'User')
  }

  const fetchQRs = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from('qr_code')
      .select('*')
      .eq('user_id', user.id)

    if (data) setMyQRs(data)
  }

  const logout = async () => {
  await supabase.auth.signOut()
  navigation.replace('Login')
}

  const generateQR = async () => {

    const cinRegex = /^[0-9]{8}$/

    if (!cin || !nom || !prenom) {
      Alert.alert('Error', 'Fill all fields')
      return
    }

    if (!cinRegex.test(cin)) {
      Alert.alert('Invalid CIN', 'CIN must be exactly 8 digits')
      return
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const expires_at = new Date()
    expires_at.setDate(expires_at.getDate() + 7)

    const dataQR = { cin, nom, prenom }

    setQrData(JSON.stringify(dataQR))

    const { error } = await supabase.from('qr_code').insert([
      {
        cin,
        nom,
        prenom,
        autorise: true,
        created_at: new Date().toISOString(),
        expires_at: expires_at.toISOString(),
        user_id: user.id
      }
    ])

    if (error) {
      Alert.alert('DB Error', error.message)
      return
    }

    fetchQRs()

    setCin('')
    setNom('')
    setPrenom('')

    Alert.alert('Success', 'QR Created 🎉')
  }

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Image
          source={require('../assets/logo.png')}
          style={styles.headerLogo}
        />

        <TouchableOpacity
  onPress={() => setShowLogout(true)}
  style={styles.logoutBtn}
>
          <Ionicons
            name="log-out-outline"
            size={28}
            color="red"
          />
        </TouchableOpacity>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* USER */}
        <Text style={styles.greeting}>
          Hi {userName} 👋
        </Text>

        <Text style={styles.sub}>
  Good Morning
</Text>


{avatar && (
  <Image source={{ uri: avatar }} style={styles.avatar} />
)}

        {avatar && (
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
        )}

        <Text style={styles.email}>
          {userEmail}
        </Text>

       

        {/* CARD */}
        <View style={styles.bigCard}>
          <Text style={styles.bigTitle}>
             Welcome to Aca ROBOTICS!
          </Text>

          <Text style={styles.bigSub}>
            Let's start 🚀
          </Text>
        </View>

        {/* SERVICES */}
        <Text style={styles.section}>
          Service Categories
        </Text>

        <View style={styles.grid}>

          {/* QR */}
          <TouchableOpacity
            style={[styles.card, styles.blueCard]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="qr-code-outline"
              size={38}
              color="white"
            />

            <Text style={styles.whiteText}>
              Generate QR
            </Text>
          </TouchableOpacity>

          {/* EMPLOYEE */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('EmployeeDetails')
            }
          >
            <Ionicons
              name="people-outline"
              size={38}
              color="#3b82f6"
            />

            <Text style={styles.text}>
              Employee Details
            </Text>
          </TouchableOpacity>

          {/* RECLAMATION */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              Alert.alert(
                'Choose',
                'Reclamation or Notifications?',
                [
                  {
                    text: 'Reclamation',
                    onPress: () =>
                      navigation.navigate('Reclamation')
                  },
                  {
                    text: 'Notifications',
                    onPress: () =>
                      navigation.navigate('Notifications')
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  }
                ]
              )
            }
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={38}
              color="#3b82f6"
            />

            <Text style={styles.text}>
              Reclamation
            </Text>

            <Text style={styles.text}>
              Notifications
            </Text>
          </TouchableOpacity>

          {/* REPORTS */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Reports')
            }
          >
            <Ionicons
              name="bar-chart-outline"
              size={38}
              color="#3b82f6"
            />

            <Text style={styles.text}>
              Reports
            </Text>
          </TouchableOpacity>

        </View>

        {/* QR LIST */}
        {myQRs.map((item, index) => (

          <View key={index} style={styles.qrItem}>

            <Text style={styles.qrName}>
              {item.nom} {item.prenom}
            </Text>

            <QRCode
              value={JSON.stringify({
                cin: item.cin,
                nom: item.nom,
                prenom: item.prenom
              })}
              size={140}
            />

            <Text style={styles.qrCin}>
              CIN: {item.cin}
            </Text>

          </View>

        ))}

      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
              Platform.OS === 'ios'
                ? 'padding'
                : undefined
            }
          >

            <ScrollView
              contentContainerStyle={styles.modalContainer}
            >

              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
              />

              <Text style={styles.modalTitle}>
                Generate QR
              </Text>

              {/* CIN */}
              <Text style={styles.label}>
                CIN
              </Text>

              <TextInput
                placeholder="CIN"
                style={styles.input}
                value={cin}
                onChangeText={setCin}
              />

              {/* LAST NAME */}
              <Text style={styles.label}>
                Last Name
              </Text>

              <TextInput
                placeholder="Last Name"
                style={styles.input}
                value={nom}
                onChangeText={setNom}
              />

              {/* FIRST NAME */}
              <Text style={styles.label}>
                First Name
              </Text>

              <TextInput
                placeholder="First Name"
                style={styles.input}
                value={prenom}
                onChangeText={setPrenom}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={generateQR}
              >
                <Text style={styles.buttonText}>
                  Generate
                </Text>
              </TouchableOpacity>

              {qrData && (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 20
                  }}
                >
                  <QRCode
                    value={qrData}
                    size={180}
                  />
                </View>
              )}

              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <Text style={styles.close}>
                  Close
                </Text>
              </TouchableOpacity>

            </ScrollView>

          </KeyboardAvoidingView>

        </TouchableWithoutFeedback>

      </Modal>

      <Modal
  visible={showLogout}
  transparent
  animationType="fade"
>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }}>

    <View style={{
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      width: '80%',
      alignItems: 'center'
    }}>

      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Do you want to logout?
      </Text>

      <View style={{ flexDirection: 'row', gap: 15 }}>

        <TouchableOpacity
          onPress={logout}
          style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 10,
            width: 80,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white' }}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowLogout(false)}
          style={{
            backgroundColor: 'gray',
            padding: 10,
            borderRadius: 10,
            width: 80,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white' }}>No</Text>
        </TouchableOpacity>

      </View>

    </View>

  </View>
</Modal>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative'
  },

  headerLogo: {
    width: 260,
    height: 120,
    resizeMode: 'contain'
  },

  logoutBtn: {
    position: 'absolute',
    right: 0
  },

  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10
  },

  sub: {
    color: '#888',
    marginBottom: 15
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10
  },

  email: {
    color: '#555',
    marginBottom: 15
  },

  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20
  },

  bigCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25
  },

  bigTitle: {
    fontWeight: 'bold',
    fontSize: 22
  },

  bigSub: {
    color: '#666',
    marginTop: 5
  },

  section: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  card: {
    width: '48%',
    height: 150,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },

  blueCard: {
    backgroundColor: '#3b82f6'
  },

  whiteText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10
  },

  text: {
    marginTop: 8,
    textAlign: 'center'
  },

  qrItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2
  },

  qrName: {
    fontWeight: 'bold',
    marginBottom: 10
  },

  qrCin: {
    marginTop: 10
  },

  modalContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center'
  },

  logo: {
    width: 260,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25
  },

  label: {
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '600',
    color: '#374151'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10
  },

  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },

  close: {
    textAlign: 'center',
    marginTop: 25,
    fontWeight: '600'
  }

})