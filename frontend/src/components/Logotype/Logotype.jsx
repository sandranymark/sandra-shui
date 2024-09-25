import logo from '../../assets/logo.png';
import './Logotype.css';
import { useNavigate } from 'react-router-dom';

function Logotype() {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/')}>
            <img className='logo' src={logo} alt="Logga" />
        </div>
    )
}

export default Logotype
