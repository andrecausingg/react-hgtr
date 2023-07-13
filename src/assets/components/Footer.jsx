import React from 'react'

// Images
import hgtrLogo from '../images/logo/hgtr-logo-black.png';
import facebookIcon from '../images/icons/square-facebook-white.svg';
import instagramIcon from '../images/icons/square-instagram-white.svg';
import twitterIcon from '../images/icons/square-twitter-white.svg';
import tiktokIcon from '../images/icons/tiktok-white.svg';
import emailIcon from '../images/icons/envelope-solid-white.svg';
import mobileIcon from '../images/icons/mobile-solid-white.svg';
import locationIcon from '../images/icons/location-dot-solid-white.svg';

const icons = [
    { name: 'Facebook', path: facebookIcon },
    { name: 'Instagram', path: instagramIcon },
    { name: 'Twitter', path: twitterIcon },
    { name: 'TikTok', path: tiktokIcon },
];

const Footer = () => {
  return (
    <>
        {/* <!-- Footer --> */}
        <footer className="yot-bg-black2 yot-content-space-mt-80 yot-tc-white">
            <nav className="yot-container grid-container-1csm-2cm-4cl yot-pa-16">
                {/* <!-- Nav Links --> */}
                <div className="yot-flex yot-flex-fd-c-ai-c">
                    <img className="yot-mb-8" src={hgtrLogo} alt="" width="150" />
                </div>

                {/* <!-- Social Media --> */}
                <div className="yot-flex yot-flex-fd-c-ai-c">
                    <h4 className="yot-mb-8">Social Media</h4>
                    {icons.map((icon, index) => (
                        <img className='yot-mb-4 yot-cursor-pointer' key={index} src={icon.path} alt={icon.name} style={{width:"36px"}}/>
                    ))}
                </div>

                {/* <!-- Contact --> */}
                <div className="yot-flex yot-flex-fd-c-ai-c">
                    <h4 className="">Contact</h4>
                    <div className='yot-flex yot-flex-fd-c-ai-c yot-mb-8'>
                        <img className='yot-mb-4 yot-cursor-pointer' src={emailIcon}  style={{width:"30px"}}/>
                        <span>hugutero@gmail.com</span>
                    </div>
                    <div className='yot-flex yot-flex-fd-c-ai-c'>
                        <img className='yot-mb-4 yot-cursor-pointer' src={mobileIcon}  style={{width:"30px"}}/>
                        <span>09123456789</span>
                    </div>
                </div>

                {/* <!-- Location --> */}
                <div className="yot-flex yot-flex-fd-c-ai-c">
                    <h4 className="">Location</h4>
                    <div className='yot-flex yot-flex-fd-c-ai-c yot-text-center'>
                        <img className='yot-mb-4 yot-cursor-pointer' src={locationIcon}  style={{width:"30px"}}/>
                        <span>blk 1 lot 1 ph 1 sarmiento, <br></br> Baliuag Bulacan</span>
                    </div>
                </div>
            </nav>
        </footer>
    </>
  )
}

export default Footer