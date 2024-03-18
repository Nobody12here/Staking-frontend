import './Footer.style.css'
import Logo from '../../assets/logo.png';
import Youtube from '../../assets/SocialIcons/youtube.png';
import Whatsapp from '../../assets/SocialIcons/whatsapp.png';
import Discord from '../../assets/SocialIcons/discord.png';
import Telegram from '../../assets/SocialIcons/telegram.png';
import Twitter from '../../assets/SocialIcons/twitter.png';
function Footer() {
    return ( 
        <>
            <div className="header-container">
                <img src={Logo} alt="Logo" className='Logo' width={"228px"} />
                <div>

                <div className='social-icons'>
                    <img src={Discord} alt="discord" width={'32px'} height={'32px'} />
                    <img src={Twitter} alt="twiter" width={'32px'} height={'32px'} />
                    <img src={Telegram} alt="telegram" width={'32px'} height={'32px'} />
                    <img src={Whatsapp} alt="whatsapp" width={'32px'} height={'32px'} />
                    <img src={Youtube} alt="youtube" width={'32px'} height={'32px'} />
                </div>
                
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