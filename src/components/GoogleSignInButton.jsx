import { useEffect, useRef } from 'react'
import api from '../api/api'
import toast from 'react-hot-toast'

// Real "Sign in with Google" integration using Google Identity Services.
// Renders Google's own button (styled as close to the app's pill/outline
// look as GIS's config options allow) and, on success, sends the signed
// ID token to the backend for verification (see authController.googleAuth).
const GoogleSignInButton = ({ onAuth }) => {
  const buttonRef = useRef(null)

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    if (!clientId) {
      console.warn('VITE_GOOGLE_CLIENT_ID is not set — Google Sign-In is disabled.')
      return
    }

    const handleCredentialResponse = async (response) => {
      try {
        const res = await api.post('/auth/google', { credential: response.credential })
        onAuth(res.data.data)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Google sign-in failed. Please try again.')
      }
    }

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      })

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
        width: 360,
      })
    }

    // The GIS script loads async — if it's not ready yet, poll briefly.
    if (window.google?.accounts?.id) {
      initializeGoogle()
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval)
          initializeGoogle()
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [onAuth])

  return <div ref={buttonRef} style={{ display: 'flex', justifyContent: 'center' }} />
}

export default GoogleSignInButton
