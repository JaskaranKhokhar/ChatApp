import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn, User } from 'react-feather'

const Header = () => {
    const {user, handleLogout} = useAuth()
  return (
    <div id="header--wrapper">
        {user ? (
            <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        background: 'var(--gradient-primary)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>
                        <User size={16} color="white" />
                    </div>
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        Welcome, {user.name}
                    </span>
                </div>
                <LogOut 
                    className="header--link" 
                    onClick={handleLogout}
                    style={{ cursor: 'pointer' }}
                />
            </>
        ): (
            <>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                    Chat App
                </span>
                <Link to="/login">
                    <LogIn className="header--link"/>
                </Link>
            </>
        )}
    </div>
  )
}

export default Header
