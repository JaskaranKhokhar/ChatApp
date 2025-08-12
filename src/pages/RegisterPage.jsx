import React from 'react'
import {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { UserPlus, User, Mail, Lock, MessageCircle } from 'react-feather'
import '../index.css'

const RegisterPage = () => {
    const [credentials, setCredentials] = useState({name:'',email:'', password1:'', password2:''})
    const [isLoading, setIsLoading] = useState(false)
    const {handleRegister} = useAuth()

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value 
    
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await handleRegister(e, credentials)
        } catch (error) {
            console.error('Registration error:', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--gradient-secondary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1rem auto',
                boxShadow: 'var(--shadow-heavy)'
            }}>
                <UserPlus size={40} color="white" />
            </div>
            <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: 'var(--text-primary)',
                marginBottom: '0.5rem'
            }}>
                Create Account
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
                Join the conversation today
            </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field--wrapper">
                <label style={{ 
                    fontWeight: '500', 
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                }}>
                    Full Name
                </label>
                <div style={{ position: 'relative' }}>
                    <User size={18} style={{ 
                        position: 'absolute', 
                        left: '1rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }} />
                    <input 
                        required
                        type="text" 
                        name="name"
                        value={credentials.name}
                        placeholder="Enter your full name..."
                        onChange={(e) => {handleInputChange(e)}}
                        style={{ paddingLeft: '3rem' }}
                    />
                </div>
            </div>

            <div className="field--wrapper">
                <label style={{ 
                    fontWeight: '500', 
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                }}>
                    Email
                </label>
                <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ 
                        position: 'absolute', 
                        left: '1rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }} />
                    <input 
                        required
                        type="email" 
                        name="email"
                        placeholder="Enter your email..."
                        value={credentials.email}
                        onChange={(e) => {handleInputChange(e)}}
                        style={{ paddingLeft: '3rem' }}
                    />
                </div>
            </div>

            <div className="field--wrapper">
                <label style={{ 
                    fontWeight: '500', 
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                }}>
                    Password
                </label>
                <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ 
                        position: 'absolute', 
                        left: '1rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }} />
                    <input 
                        required
                        type="password" 
                        name="password1"
                        placeholder="Enter a password..."
                        value={credentials.password1}
                        onChange={(e) => {handleInputChange(e)}}
                        style={{ paddingLeft: '3rem' }}
                    />
                </div>
            </div>

            <div className="field--wrapper">
                <label style={{ 
                    fontWeight: '500', 
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                }}>
                    Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ 
                        position: 'absolute', 
                        left: '1rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }} />
                    <input 
                        required
                        type="password" 
                        name="password2"
                        placeholder="Confirm your password..."
                        value={credentials.password2}
                        onChange={(e) => {handleInputChange(e)}}
                        style={{ paddingLeft: '3rem' }}
                    />
                </div>
            </div>

            <div className="field--wrapper">
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="btn btn--lg btn--main"
                    style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.5rem',
                        background: 'var(--gradient-secondary)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isLoading ? (
                        <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            border: '2px solid rgba(255,255,255,0.3)', 
                            borderTop: '2px solid white', 
                            borderRadius: '50%', 
                            animation: 'spin 1s linear infinite' 
                        }} />
                    ) : (
                        <>
                            <UserPlus size={20} />
                            Create Account
                        </>
                    )}
                </button>
            </div>
        </form>

        <p style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem', 
            color: 'var(--text-secondary)' 
        }}>
            Already have an account?{' '}
            <Link to="/login" style={{ 
                color: 'var(--accent-primary)', 
                textDecoration: 'none', 
                fontWeight: '600' 
            }}>
                Login here
            </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
