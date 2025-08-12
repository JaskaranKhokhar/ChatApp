import React, { useState, useEffect, useRef } from 'react'
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig'
import { ID, Query, Permission, Role} from 'appwrite';
import Header from '../components/Header';
import { useAuth } from '../utils/AuthContext';
import { Trash2, Send, Smile, Moon, Sun } from 'react-feather'

const Room = () => {
    const [messageBody, setMessageBody] = useState('')
    const [messages, setMessages] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const { user } = useAuth()
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const emojiPickerRef = useRef(null)

    // Emoji list
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '👺', '👹', '👿', '😈', '🤡', '👹', '👺', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💬', '🗨️', '🗯️', '💭', '💤']

    useEffect(() => {
        getMessages();
        getOnlineUsers();
      
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
    }, []);

    useEffect(() => {
        // Set theme based on user preference
        const savedTheme = localStorage.getItem('theme') || 'light'
        setIsDarkMode(savedTheme === 'dark')
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        // Handle click outside emoji picker
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) && 
                !event.target.closest('.emoji-trigger')) {
                setShowEmojiPicker(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100),
            ]
        )
        console.log(response.documents)
        setMessages(response.documents)
    }

    const getOnlineUsers = async () => {
        // Mock online users for demo - in real app, you'd get this from your backend
        const mockUsers = [
            { id: '1', name: 'Alice Johnson', status: 'online', lastSeen: '2 min ago' },
            { id: '2', name: 'Bob Smith', status: 'online', lastSeen: '5 min ago' },
            { id: '3', name: 'Carol Davis', status: 'online', lastSeen: '1 min ago' },
            { id: '4', name: 'David Wilson', status: 'away', lastSeen: '10 min ago' },
            { id: '5', name: 'Eva Brown', status: 'online', lastSeen: '3 min ago' },
        ]
        setOnlineUsers(mockUsers)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!messageBody.trim()) return

        console.log('MESSAGE:', messageBody)

        const permissions = [
            Permission.write(Role.user(user.$id)),
        ]

        const payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        }

        try {
            const response = await databases.createDocument(
                DATABASE_ID, 
                COLLECTION_ID_MESSAGES, 
                ID.unique(), 
                payload,
                permissions
            )

            console.log('RESPONSE:', response)
            setMessageBody('')
            setShowEmojiPicker(false)
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const deleteMessage = async (id) => {
        try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
        } catch (error) {
            console.error('Error deleting message:', error)
        }
    }

    const addEmoji = (emoji) => {
        setMessageBody(prev => prev + emoji)
        inputRef.current?.focus()
    }

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark'
        setIsDarkMode(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = (now - date) / (1000 * 60 * 60)
        
        if (diffInHours < 1) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
        }
    }

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <main className="container">
            <Header />
            <div className="room--container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h3 className="sidebar-title">Online Users</h3>
                        <p className="online-count">{onlineUsers.filter(u => u.status === 'online').length} online</p>
                    </div>
                    
                    <div className="online-users">
                        {onlineUsers.map(user => (
                            <div key={user.id} className="user-item">
                                <div className="user-avatar">
                                    {getInitials(user.name)}
                                </div>
                                <div className="user-status" style={{ 
                                    background: user.status === 'online' ? 'var(--accent-success)' : 'var(--accent-warning)' 
                                }}></div>
                                <div className="user-info">
                                    <div className="user-name">{user.name}</div>
                                    <div className="user-activity">{user.lastSeen}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Area */}
                <div className="chat-area">
                    <div className="messages-container">
                        {messages.map(message => (
                            <div 
                                key={message.$id} 
                                className={`message--wrapper ${message.user_id === user.$id ? 'own-message' : 'other-message'}`}
                            >
                                <div className="message--header">
                                    <span className="message-username">
                                        {message?.username || 'Anonymous user'}
                                    </span>
                                    <span className="message-timestamp">
                                        {formatTimestamp(message.$createdAt)}
                                    </span>
                                    {message.$permissions.includes(`delete("user:${user.$id}")`) && (
                                        <Trash2 
                                            className="delete--btn" 
                                            onClick={() => deleteMessage(message.$id)}
                                        />
                                    )}
                                </div>

                                <div className={`message--body ${message.user_id === user.$id ? 'message--body--owner' : ''}`}>
                                    <span>{message.body}</span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="input-area">
                        <div className="input-wrapper">
                            <textarea
                                ref={inputRef}
                                className="message-input"
                                required
                                maxLength="500"
                                placeholder="Type your message..."
                                onChange={(e) => setMessageBody(e.target.value)}
                                value={messageBody}
                                rows="1"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSubmit(e)
                                    }
                                }}
                            />
                        </div>
                        
                        <button
                            type="button"
                            className="emoji-trigger"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <Smile size={18} />
                        </button>

                        <button
                            type="button"
                            className="theme-toggle"
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button 
                            className="send-button" 
                            onClick={handleSubmit}
                            disabled={!messageBody.trim()}
                        >
                            <Send size={18} />
                        </button>

                        {/* Emoji Picker */}
                        <div 
                            ref={emojiPickerRef}
                            className={`emoji-picker ${showEmojiPicker ? 'show' : ''}`}
                        >
                            <div className="emoji-grid">
                                {emojis.map((emoji, index) => (
                                    <span
                                        key={index}
                                        className="emoji-item"
                                        onClick={() => addEmoji(emoji)}
                                    >
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Room
