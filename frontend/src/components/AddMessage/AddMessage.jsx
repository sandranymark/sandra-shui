import './AddMessage.css';
import Logotype from '../Logotype/Logotype.jsx';
import { useState, useEffect } from 'react';
import { postMessage, getMessages } from '../../services/services.jsx';
import { useNavigate } from 'react-router-dom';
import vector from '../../assets/Vector.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


function AddMessage() {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();  // skapar upp navigationen för att kunna navigera tillbaka till startsidan.

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await getMessages();
            console.log('Fetched messages:', response.data.data);
            setMessages(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]); // Om det inte går att hämta meddelanden, sätts messages till en tom array.
        }
    };

    const handlePostMessage = async (e) => {
        e.preventDefault();
        if (!username || !text) return;

        const newMessage = {
            username,
            text,
            createdAt: new Date().toISOString(),
        };

        try {
            await postMessage(newMessage);
            setUsername('');
            setText('');
            fetchMessages();  // Hämtar alla meddelanden igen så den blir uppdaterad med det senaste.

            navigate('/');  //Navigerar tillbaka till startsidan (MessageList som ligger i app)
        } catch (error) {
            console.error('Error posting message:', error);
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <>
            <Logotype />
            <section className="Post-Message">



                <form onSubmit={handlePostMessage} className="Post-Message-form">
                    <section className='test-wrapper'>
                        <div className='Close-btn' onClick={handleClose}>
                            <FontAwesomeIcon className='Close-icon' icon={faCircleXmark} />
                        </div>
                        <textarea
                            className="Post-Message-textarea"
                            placeholder="Djurgården vinner HockeyAllsvenskan i år..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <div className='kant-vector'>
                            <img className='vector' src={vector} alt="kant till bild" />
                        </div>
                    </section>



                    <div className='inputAndBtn'>
                        <input className="Post-Message-input"
                            type="text"
                            placeholder="Användarnamn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type='submit' className="Post-Message-Btn"><span>Publicera</span></button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddMessage;