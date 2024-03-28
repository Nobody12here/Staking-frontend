import './Header.style.css'
import Logo from '../../assets/logo.png';
import Youtube from '../../assets/SocialIcons/youtube.png';
import Whatsapp from '../../assets/SocialIcons/whatsapp.png';
import Discord from '../../assets/SocialIcons/discord.png';
import Telegram from '../../assets/SocialIcons/telegram.png';
import Twitter from '../../assets/SocialIcons/twitter.png';
function Header() {
    return ( 
        <>
            <div className="header-container">
                <img src={Logo} alt="Logo" className='Logo' width={"228px"} />
                <div className='social-icons'>
                    <a href='https://discord.gg/BenefitMine'>
                    <img src={Discord} alt="discord" width={'32px'} height={'32px'} />
                    </a>
                    <a href='https://twitter.com/benefitmine'>
                    <img src={Twitter} alt="twiter" width={'32px'} height={'32px'} />
                    </a>
                    <a href='https://t.me/BenefitMine'>

                    <img src={Telegram} alt="telegram" width={'32px'} height={'32px'} />
                    </a>
                    <a href="https://www.instagram.com/benefitmine_official">

                    <img src={Whatsapp} alt="whatsapp" width={'32px'} height={'32px'} />
                    </a>
                    <a href="https://www.youtube.com/@benefitmine_official?sub_confirmation=1">

                    <img src={Youtube} alt="youtube" width={'32px'} height={'32px'} />
                    </a>
                </div>
                <button className='offical-btn' onClick={()=>{window.location.href = ("https://benefitmine.io/")}}>Visit Official Website</button>
            </div>
        </>
     );
}

export default Header;