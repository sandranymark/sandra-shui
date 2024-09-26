import { useState } from 'react';
import { BsFilterCircleFill } from "react-icons/bs";
import './FIlterMessages.css';

function FilterMessages({ messages, setMessages }) {
    const [isActive, setIsActive] = useState(false);

    //Sorterar meddelanden efter senaste skapade datumet när man klickar på iconen.
    //Klickar man en gång till så sorteras datumen i omvänd ordning med tidigaste datum.
    const handleFilter = () => {
        let sortedMessages;
        if (isActive) {
            sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
            sortedMessages = [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        setMessages(sortedMessages);
        setIsActive(!isActive);
    }

    return (
        <div className={`Filter-icon ${isActive ? 'active' : ''}`}>
            <BsFilterCircleFill onClick={handleFilter} />
        </div>
    )
}

export default FilterMessages;