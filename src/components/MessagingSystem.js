import React, { useState, useEffect, useRef } from 'react';
import './MessagingSystem.css';

const MESSAGES_STORAGE_KEY = 'fundiConnectMessages';

const parseStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Failed to parse storage for ${key}:`, error);
    return fallback;
  }
};

const initialMessages = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Fix Leaky Roof',
    participants: ['Client User', 'Jane Fundi'],
    messages: [
      {
        id: 1,
        sender: 'Client User',
        content: 'Hi Jane, I need my roof fixed. Can you come check it out?',
        timestamp: '2026-04-15T10:30:00Z',
        read: true,
      },
      {
        id: 2,
        sender: 'Jane Fundi',
        content: 'Hello! I can come tomorrow morning. What time works for you?',
        timestamp: '2026-04-15T11:15:00Z',
        read: true,
      },
      {
        id: 3,
        sender: 'Client User',
        content: '9 AM would be perfect. Please bring your tools.',
        timestamp: '2026-04-15T14:20:00Z',
        read: false,
      },
    ],
    lastMessage: '2026-04-15T14:20:00Z',
    unreadCount: 1,
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Install New Light Fixtures',
    participants: ['Client User', 'David Fundi'],
    messages: [
      {
        id: 1,
        sender: 'Client User',
        content: 'Hi David, I saw your application for the light fixtures job.',
        timestamp: '2026-04-16T09:00:00Z',
        read: true,
      },
      {
        id: 2,
        sender: 'David Fundi',
        content: 'Great! I can start this weekend. Do you have the fixtures ready?',
        timestamp: '2026-04-16T09:30:00Z',
        read: true,
      },
    ],
    lastMessage: '2026-04-16T09:30:00Z',
    unreadCount: 0,
  },
];

function MessagingSystem({ userType = 'client', userName = 'Client User' }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setConversations(parseStorage(MESSAGES_STORAGE_KEY, initialMessages));
  }, []);

  useEffect(() => {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const userConversations = conversations.filter(conv =>
    conv.participants.includes(userName)
  );

  const filteredConversations = userConversations.filter(conv =>
    conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participants.find(p => p.toLowerCase().includes(searchTerm.toLowerCase()) && p !== userName)
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const message = {
      id: Date.now(),
      sender: userName,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, message],
            lastMessage: message.timestamp,
            unreadCount: conv.participants.filter(p => p !== userName).length, // Mark as unread for other participants
          };
        }
        return conv;
      })
    );

    setNewMessage('');
  };

  const markConversationAsRead = (conversationId) => {
    setConversations(prevConversations =>
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: conv.messages.map(msg => ({
              ...msg,
              read: msg.sender !== userName ? true : msg.read,
            })),
            unreadCount: 0,
          };
        }
        return conv;
      })
    );
  };


  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const totalUnreadCount = userConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="messaging-system-container">
      <div className="messaging-header">
        <h1>Messages</h1>
        <p>Communicate with clients and fundis about your jobs</p>
        {totalUnreadCount > 0 && (
          <span className="unread-badge">{totalUnreadCount} unread</span>
        )}
      </div>

      <div className="messaging-grid">
        <div className="conversations-panel">
          <div className="conversations-header">
            <h3>Conversations</h3>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="conversations-list">
            {filteredConversations.length === 0 ? (
              <div className="empty-state">
                <p>No conversations found.</p>
                <p>Start a conversation by applying to jobs or hiring fundis.</p>
              </div>
            ) : (
              filteredConversations.map(conversation => {
                const otherParticipant = conversation.participants.find(p => p !== userName);
                const lastMessage = conversation.messages[conversation.messages.length - 1];

                return (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''} ${conversation.unreadCount > 0 ? 'unread' : ''}`}
                    onClick={() => {
                      setActiveConversation(conversation);
                      markConversationAsRead(conversation.id);
                    }}
                  >
                    <div className="conversation-avatar">
                      {otherParticipant.charAt(0).toUpperCase()}
                    </div>
                    <div className="conversation-info">
                      <div className="conversation-header">
                        <h4>{otherParticipant}</h4>
                        <span className="conversation-time">
                          {lastMessage ? formatTime(lastMessage.timestamp) : ''}
                        </span>
                      </div>
                      <p className="job-title">{conversation.jobTitle}</p>
                      <p className="last-message">
                        {lastMessage ? (
                          <>
                            <strong>{lastMessage.sender === userName ? 'You' : lastMessage.sender.split(' ')[0]}:</strong> {lastMessage.content}
                          </>
                        ) : (
                          'No messages yet'
                        )}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="unread-indicator">{conversation.unreadCount}</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="chat-panel">
          {activeConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-participant">
                  <div className="participant-avatar">
                    {activeConversation.participants.find(p => p !== userName).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3>{activeConversation.participants.find(p => p !== userName)}</h3>
                    <p>{activeConversation.jobTitle}</p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-button">📞 Call</button>
                  <button className="action-button">📹 Video</button>
                </div>
              </div>

              <div className="messages-container">
                {activeConversation.messages.length === 0 ? (
                  <div className="empty-chat">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  activeConversation.messages.map(message => (
                    <div
                      key={message.id}
                      className={`message ${message.sender === userName ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <p>{message.content}</p>
                        <span className="message-time">{formatTime(message.timestamp)}</span>
                      </div>
                      {!message.read && message.sender !== userName && (
                        <span className="unread-dot"></span>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="message-form" onSubmit={handleSendMessage}>
                <div className="message-input-container">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                  />
                  <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                    Send
                  </button>
                </div>
                <div className="message-actions">
                  <button type="button" className="attach-button">📎</button>
                  <button type="button" className="emoji-button">😊</button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="empty-chat-icon">💬</div>
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the list to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagingSystem;