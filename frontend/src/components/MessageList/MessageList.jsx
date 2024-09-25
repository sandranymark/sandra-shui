import Logotype from '../Logotype/Logotype.jsx';
import { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '../../services/services';
import './MessageList.css';
import WriteIcon from '../../assets/writeIcon.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditMessage from '../EditMessages/EditMessages.jsx';  // Importera EditMessage-komponenten

function MessageList() {
    const [messages, setMessages] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);  // Hantera redigeringsläge
    const navigate = useNavigate();  // Skapa navigate-funktionen

    // Funktion för att hämta alla meddelanden
    const fetchMessages = async () => {
        try {
            const response = await getMessages();
            setMessages(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Funktion för att radera meddelanden
    const handleDeleteMessage = async (id) => {
        try {
            await deleteMessage(id);
            setMessages(messages.filter((message) => message.id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };


    const handleEditMessage = (id) => {
        setEditingMessageId(id);
    };

    // Uppdatera meddelandet när redigeringen sparas
    const handleUpdateMessage = (id, newText) => {
        setMessages(messages.map((message) =>
            message.id === id ? { ...message, text: newText } : message
        ));
        setEditingMessageId(null);
    };

    // Avbryter redigeringsläget
    const handleCancelEdit = () => {
        setEditingMessageId(null);
    };

    useEffect(() => {
        fetchMessages();  // Hämtar alla meddelanden när komponenten laddas om.
    }, []);

    return (
        <>
            <main>
                <Logotype />
                <section className='Message-Form'>
                    {messages.map((message) => (
                        <div className='Message-List' key={message.id}>
                            {editingMessageId === message.id ? (
                                // Om redigeringsläget är klickat på, visas min EditMessage-komponent
                                <EditMessage
                                    message={message}
                                    onCancel={handleCancelEdit}
                                    onUpdate={handleUpdateMessage}
                                />
                            ) : (
                                <>
                                    <div className='flex-icons'>
                                        <small className='Message-Date'>{new Date(message.createdAt).toLocaleString()}</small>
                                        <div className='icon-party'>
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className='icon-trash'
                                                onClick={() => handleDeleteMessage(message.id)}
                                            />
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                className='icon-edit'
                                                onClick={() => handleEditMessage(message.id)}
                                            />
                                        </div>
                                    </div>
                                    <p className='Message-Text'>{message.text}</p>
                                    <div className='Black-line--flex'>
                                        <div className='Black-Line'></div>
                                        <h3 className='Message-Username'>{message.username}</h3>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {messages.length === 0 && <p>No messages available.</p>}
                </section>

                <button
                    className='write-icon-btn'
                    onClick={() => navigate('/add-message')}
                >
                    <img className='write-icon' src={WriteIcon} alt="icon" />
                </button>
            </main >
        </>
    );
}

export default MessageList;