import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function ReclamationScreen({ navigation }: any) {

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Reclamation</Text>
      </View>

      {/* CARDS */}
      <View style={styles.grid}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReclamationForm', { type: 'Delay' })}
        >
          <Text style={styles.text}>Delay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReclamationForm', { type: 'Advance' })}
        >
          <Text style={styles.text}>Advance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ReclamationForm', { type: 'Absence' })}
        >
          <Text style={styles.text}>Absence</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('OtherForm')}
        >
          <Text style={styles.text}>Other</Text>
        </TouchableOpacity>

      </View>

      {/* 🔵 BACK (BOTTOM CENTER) */}
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

  /* 🔵 BACK BUTTON BOTTOM */
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