import React, { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [phone, setPhone] = useState('')
  const [poste, setPoste] = useState('')
  const [cin, setCin] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 🔐 REGISTER
  const register = async () => {

    if (!birthDate) {
      alert("Please select your birth date")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
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
          birthdate: birthDate
        }
      ])

    if (dbError) {
      alert(dbError.message)
      return
    }

    alert("Account created 🎉")

    navigate('/')
  }

  return (

    <div style={styles.wrapper}>

      <div style={styles.container}>

        {/* LOGO */}
        <img
          src="/logo.png"
          alt="logo"
          style={styles.logo}
        />

        {/* TITLE */}
        <h1 style={styles.title}>Sign Up</h1>

        {/* INPUTS */}
        <input
          placeholder="First Name"
          style={styles.input}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          placeholder="Last Name"
          style={styles.input}
          onChange={(e) => setPrenom(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          style={styles.input}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Position"
          style={styles.input}
          onChange={(e) => setPoste(e.target.value)}
        />

        {/* CIN */}
        <input
          placeholder="Identity Card Number"
          style={styles.input}
          onChange={(e) => setCin(e.target.value)}
        />

        {/* DATE */}
        <input
          type="date"
          style={styles.input}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          type="email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div style={styles.passwordContainer}>

          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            style={styles.passwordInput}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>

        </div>

        {/* CONFIRM PASSWORD */}
        <div style={styles.passwordContainer}>

          <input
            placeholder="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            style={styles.passwordInput}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeButton}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>

        </div>

        {/* BUTTON */}
        <button
          style={styles.button}
          onClick={register}
        >
          Create Account
        </button>

        {/* SOCIAL */}
        <div style={styles.socialRow}>

          <button style={styles.socialButton}>
            <img
              src="/facebook.png"
              alt="facebook"
              style={styles.socialImg}
            />
            Facebook
          </button>

          <button style={styles.socialButton}>
            <img
              src="/google.png"
              alt="google"
              style={styles.socialImg}
            />
            Google
          </button>

        </div>

        {/* LOGIN */}
        <p
          style={styles.link}
          onClick={() => navigate('/')}
        >
          Already have an account? Login
        </p>

      </div>

    </div>
  )
}

// 🎨 STYLES
const styles = {

  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  container: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  logo: {
    width: 180,
    height: 180,
    objectFit: 'contain'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 10
  },

  input: {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    outline: 'none'
  },

  passwordContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: 12,
    paddingLeft: 10,
    marginBottom: 12
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    border: 'none',
    outline: 'none',
    fontSize: 16
  },

  eyeButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 18,
    paddingRight: 10
  },

  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 12,
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 10,
    fontSize: 16
  },

  socialRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    width: '100%'
  },

  socialButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    border: '1px solid #ddd',
    borderRadius: 12,
    backgroundColor: 'white',
    cursor: 'pointer',
    gap: 8
  },

  socialImg: {
    width: 20,
    height: 20
  },

  link: {
    marginTop: 20,
    color: '#3b82f6',
    cursor: 'pointer'
  }

}