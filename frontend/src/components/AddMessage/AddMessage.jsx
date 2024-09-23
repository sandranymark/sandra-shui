import { useState } from "react";

function MessageItem() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
            setMessages([...messages, message])
            setMessage('');
        }
    }
    console.log(messages)

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Enter message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type='submit'>Add Message</button>

                </form>
            </div>
        </>
    )
}