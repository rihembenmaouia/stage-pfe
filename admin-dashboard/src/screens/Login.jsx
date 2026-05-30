import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🔥 load saved email
  useEffect(() => {

    try {

      const saved = localStorage.getItem('email')

      if (saved) {
        setEmail(saved)
      }

    } catch (e) {
      console.log(e)
    }

  }, [])

  // 🔐 LOGIN
  const login = async () => {

    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    // 🔥 save email
    localStorage.setItem('email', email)

    navigate('/home')
  }

  // 🔥 GOOGLE LOGIN
  const googleLogin = async () => {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/home'
      }
    })

    if (error) {
      alert(error.message)
    }
  }

  // 🔥 FACEBOOK LOGIN
  const facebookLogin = async () => {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: 'http://localhost:5173/home'
      }
    })

    if (error) {
      alert(error.message)
    }
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
        <h1 style={styles.title}>Log in</h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {/* PASSWORD */}
        <div style={styles.passwordContainer}>

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            style={styles.passwordInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>

        </div>

        {/* FORGOT PASSWORD */}
        <p
          style={styles.forgot}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </p>

        {/* LOGIN BUTTON */}
        <button
          style={styles.button}
          onClick={login}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* SOCIAL */}
        <div style={styles.socialContainer}>

          <button
            style={styles.socialBtn}
            onClick={googleLogin}
          >
            <img
              src="/google.png"
              alt="google"
              style={styles.socialIcon}
            />
            Google
          </button>

          <button
            style={styles.socialBtn}
            onClick={facebookLogin}
          >
            <img
              src="/facebook.png"
              alt="facebook"
              style={styles.socialIcon}
            />
            Facebook
          </button>

        </div>

        {/* REGISTER */}
        <p
          style={styles.link}
          onClick={() => navigate('/register')}
        >
          Don't have an account ? Sign up
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
    alignItems: 'center'
  },

  container: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
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
    marginBottom: 20
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
    marginBottom: 5
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

  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: '#3b82f6',
    cursor: 'pointer'
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

  socialContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
    width: '100%'
  },

  socialBtn: {
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

  socialIcon: {
    width: 20,
    height: 20
  },

  link: {
    marginTop: 20,
    color: '#3b82f6',
    cursor: 'pointer'
  }

}