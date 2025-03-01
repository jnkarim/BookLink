import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  MoreVertical, 
  Search, 
  Phone, 
  Video, 
  ArrowLeft, 
  Check, 
  CheckCheck, 
  Image, 
  File, 
  Camera, 
  Smile 
} from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there!', sender: 'other', time: '09:30', status: 'read' },
    { id: 2, text: 'How are you doing?', sender: 'me', time: '09:31', status: 'read' },
    { id: 3, text: 'I\'m good, thanks for asking!', sender: 'other', time: '09:32', status: 'read' },
    { id: 4, text: 'What about you?', sender: 'other', time: '09:32', status: 'read' },
    { id: 5, text: 'I\'m doing great! Just working on this new project.', sender: 'me', time: '09:33', status: 'read' },
    { id: 6, text: 'That sounds interesting. What kind of project is it?', sender: 'other', time: '09:35', status: 'read' },
    { id: 7, text: 'It\'s a chat application, similar to WhatsApp!', sender: 'me', time: '09:36', status: 'delivered' },
  ]);
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', lastMessage: 'Hey there!', time: '09:32', unread: 0, isActive: true },
    { id: 2, name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', lastMessage: 'See you tomorrow!', time: '08:45', unread: 2, isActive: false },
    { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 0, isActive: false },
    { id: 4, name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', lastMessage: 'Let\'s meet at 5', time: 'Yesterday', unread: 0, isActive: false },
    { id: 5, name: 'David Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', lastMessage: 'Call me when you\'re free', time: 'Tuesday', unread: 0, isActive: false },
  ]);
  
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showContacts, setShowContacts] = useState(true); // New State for Toggling Contacts

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageStatus = ({ status }) => {
    if (status === 'sent') return <Check className="h-3 w-3 text-gray-400" />;
    if (status === 'delivered') return <CheckCheck className="h-3 w-3 text-gray-400" />;
    if (status === 'read') return <CheckCheck className="h-3 w-3 text-blue-500" />;
    return null;
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Contacts */}
      <div
        className={`w-full sm:w-1/3 border-r border-gray-300 bg-white flex flex-col transition-transform transform ${
          showContacts ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-3 bg-gray-100 flex justify-between items-center -mx-5">
          <div className="flex items-center">
            <img
              src="https://i.pinimg.com/736x/8c/9b/07/8c9b07e5f25b7776190bf9de4da60c47.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-gray-800">
              <MoreVertical className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowContacts(false)}
              className="text-gray-600 hover:text-gray-800 sm:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 bg-white">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search or start new chat"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setActiveContact(contact);
                setShowContacts(false);
              }}
              className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                activeContact.id === contact.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="h-12 w-12 rounded-full" />
                {contact.isActive && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-gray-900 ring-2 ring-white"></span>
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-xs text-gray-500">{contact.time}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-900 text-xs font-medium text-white">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat */}
      <div className="w-full sm:w-2/3 flex flex-col">
        {/* Chat Header */}
        <div className="p-3 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setShowContacts(true)}
              className="md:hidden mr-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <img
              src={activeContact.avatar}
              alt={activeContact.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">{activeContact.name}</h3>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-gray-800">
              <Phone className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <Video className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow ${
                  msg.sender === 'me'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <div className="flex justify-between items-center mt-1 text-xs">
                  <span>{msg.time}</span>
                  {msg.sender === 'me' && <MessageStatus status={msg.status} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-300 bg-gray-100 flex items-center space-x-3">
          {showAttachmentOptions && (
            <div className="flex space-x-2">
              <button className="text-gray-600 hover:text-gray-800">
                <Image className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <File className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <Camera className="h-5 w-5" />
              </button>
            </div>
          )}
          <button
            onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
          <button
            onClick={handleSendMessage}
            className="text-white bg-sky-500 hover:bg-green-600 p-2 rounded-full"
          >
            <Send className="h-5 w-5" />
          </button>
          <button className="text-gray-900 hover:text-green-500">
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;