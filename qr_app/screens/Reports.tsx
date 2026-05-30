import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { supabase } from '../supabase'

export default function Reports() {

  const [usersCount, setUsersCount] = useState(0)
  const [qrCount, setQrCount] = useState(0)
  const [activeQr, setActiveQr] = useState(0)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {

    // USERS
    const { count: users } = await supabase
      .from('employers')
      .select('*', { count: 'exact', head: true })

    // QR CODES
    const { data: qrData, count: qr } = await supabase
      .from('qr_code')
      .select('*', { count: 'exact' })

    const active = qrData?.filter(q => q.autorise === true).length || 0

    setUsersCount(users || 0)
    setQrCount(qr || 0)
    setActiveQr(active)
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>📊 Reports Dashboard</Text>

      <View style={styles.card}>
        <Text>👤 Users</Text>
        <Text style={styles.number}>{usersCount}</Text>
      </View>

      <View style={styles.card}>
        <Text>📦 Total QR Codes</Text>
        <Text style={styles.number}>{qrCount}</Text>
      </View>

      <View style={styles.card}>
        <Text>🟢 Active QR</Text>
        <Text style={styles.number}>{activeQr}</Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5
  }
})