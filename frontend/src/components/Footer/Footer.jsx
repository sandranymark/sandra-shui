import footerImage from '../../assets/footer.png';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <img className='footer_wave' src={footerImage} alt="footer" />
        </footer>
    );
}

export default Footer;