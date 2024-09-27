import Logotype from '../Logotype/Logotype.jsx';
import { useEffect, useState } from 'react';
import { getMessages, deleteMessage, getMessagesByUser } from '../../services/services';
import './MessageList.css';
import WriteIcon from '../../assets/writeIcon.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditMessage from '../EditMessages/EditMessages.jsx';
import FilterMessages from '../FilterMessages/FIlterMessages.jsx';
import SearchByUser from '../SearchByUser/SearchByUser.jsx';
import Footer from '../Footer/Footer.jsx';

// TIDSKONVERTERINGEN TAGEN FRÅN CHATGPT!
function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    return new Intl.DateTimeFormat('sv-SE', {
        weekday: 'long',   // måndag, tisdag, etc.
        day: 'numeric',    // 3, 21, etc.
        month: 'short',    // jan, feb, etc.
        hour: '2-digit',   // 08, 13, etc.
        minute: '2-digit'  // 05, 45, etc.
    }).format(date);
}

function MessageList() {
    const [messages, setMessages] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await getMessages();
            setMessages(Array.isArray(response.data.data) ? response.data.data : []);
            setSearchActive(false);
            setLoadingError(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setLoadingError(true);
        }
    };

    const handleSearchByUsername = async (username) => {
        if (!username) {
            setErrorMessage('Du måste skriva in ett användarnamn att söka på!');
            return;
        }

        try {
            const response = await getMessagesByUser(username);
            if (response.data.data.length === 0) {
                setErrorMessage('din sökning gav inga träffar, försök igen med ett annat användarnamn!');
                setSearchActive(false);
            } else {
                setMessages(response.data.data);
                setErrorMessage('');
                setSearchActive(true);
            }
        } catch (error) {
            console.error('Error fetching messages by user:', error);
            setErrorMessage('din sökning gav inga träffar, försök igen med ett annat användarnamn!');
            setSearchActive(false);
        }
    };

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

    const handleUpdateMessage = (id, newText) => {
        setMessages(messages.map((message) =>
            message.id === id ? { ...message, text: newText } : message
        ));
        setEditingMessageId(null);
    };

    const handleCancelEdit = () => {
        setEditingMessageId(null);
    };

    const handleBackToAllMessages = () => {
        fetchMessages();
        setSearchActive(false);
    };

    return (
        <>
            <main>
                <div className='search-section'>
                    <SearchByUser onSearch={handleSearchByUsername} />
                    <FilterMessages messages={messages} setMessages={setMessages} />
                </div>
                <Logotype />
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <section className='Message-Form'>
                    {loadingError ? (
                        <div className="No-messages">Ett fel uppstod vid inläsningen av meddelanden. Försök igen senare!</div>
                    ) : messages.length === 0 ? (
                        <div>
                            <p className='No-messages'>Du har inga meddelanden att visa!</p>
                            <Footer />
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div className='Message-List' key={message.id}>
                                {editingMessageId === message.id ? (
                                    <EditMessage
                                        message={message}
                                        onCancel={handleCancelEdit}
                                        onUpdate={handleUpdateMessage}
                                    />
                                ) : (
                                    <>
                                        <div className='flex-icons'>
                                            <small className='Message-Date'>{formatDate(message.createdAt)}</small>
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
                        ))
                    )}

                    {searchActive && (
                        <button className="back-button" onClick={handleBackToAllMessages}>
                            Tillbaka till alla meddelanden
                        </button>
                    )}
                </section>

                <button
                    className='write-icon-btn'
                    onClick={() => navigate('/add-message')}
                >
                    <img className='write-icon' src={WriteIcon} alt="icon" />
                </button>
            </main>
        </>
    );
}

export default MessageList;
