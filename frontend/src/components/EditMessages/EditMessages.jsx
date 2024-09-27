// components/EditMessage/EditMessage.jsx
import { useState } from 'react';
import { updateMessage } from '../../services/services';
import './EditMessages.css';


function EditMessage({ message, onCancel, onUpdate }) {
    const [updatedText, setUpdatedText] = useState(message.text);

    // Funktion för att spara det uppdaterade meddelandet
    const handleSaveMessage = async () => {
        try {
            await updateMessage(message.id, { text: updatedText });

            onUpdate(message.id, updatedText);
        } catch (error) {
            console.error('Error updating message:', error);
        }
    };

    return (
        <div className="edit-message-container">
            <textarea
                className='edit-textarea'
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
            />
            <div className="edit-message-buttons">
                <button
                    className='save-btn'
                    onClick={handleSaveMessage}
                >
                    Spara
                </button>
                <button
                    className='cancel-btn'
                    onClick={onCancel}
                >
                    Avbryt
                </button>
            </div>
        </div>
    );
}

export default EditMessage;