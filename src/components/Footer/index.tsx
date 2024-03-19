import './Footer.style.css'
import Logo from '../../assets/logo.png';

function Footer() {
    return ( 
        <>
            <div className="header-container">
                <img src={Logo} alt="Logo" className='Logo' width={"228px"} />
                <div>

                
                
                </div>
                <div className='footer-links'>
                    <a href='#'>Terms of Service</a>
                    <a href='#'>Privacy Policy</a>
                    <a href='#'>Cookie Policy</a>
                </div>
            </div>
        </>
     );
}

export default Footer;