import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function NotificationsScreen({ navigation }: any) {

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Notifications</Text>
      </View>

      {/* CARDS (example notifications types) */}
      <View style={styles.grid}>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.text}>System</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.text}>Updates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.text}>Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.text}>Messages</Text>
        </TouchableOpacity>

      </View>

      {/* BACK */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 150,
    marginBottom: 40
  },

  logo: {
    width: 200,
    height: 120
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d1d5db',
    elevation: 3
  },

  text: {
    fontSize: 16,
    fontWeight: '600'
  },

  backBtn: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center'
  },

  backText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: 'bold'
  }
})