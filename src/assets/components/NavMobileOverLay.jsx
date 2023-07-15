import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Images
import hgtrLogo from '../images/logo/hgtr-logo-black.png';
import angleRight from "../images/icons/angle-right-solid-white.svg";

const NavMobileOverlay = ({ onClose }) => {
  const [isShopOpen, setShopOpen] = useState(false);
  const [isRegularOpen, setRegularOpen] = useState(false);
  const [isStreetWearOpen, setStreetWearOpen] = useState(false);
  const [isAccessoriesOpen, setAccessoriesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  // Close the Nav Bar
  const handleOverlayClick = () => {
    onClose();
  };

  const handleClickShop = () => {
    setShopOpen(!isShopOpen);
  };

  const handleClickRegular = () => {
    setRegularOpen(!isRegularOpen);
  };

  const handleClickStreetWear = () => {
    setStreetWearOpen(!isStreetWearOpen);
  };

  const handleClickAccessories = () => {
    setAccessoriesOpen(!isAccessoriesOpen);
  };

  // Display Link Regular Link Item
  const regularLinksItem = [
    {
      to: "/baybayin-tees",
      text: "Baybayin Tees",
      key: "baybayin-tees"
    },
    {
      to: "/regular-tees",
      text: "Regular Tees",
      key: "regular-tees"
    },
    {
      to: "/minimalis-tees",
      text: "Minimalis Tees",
      key: "minimalis-tees"
    },
    {
      to: "/muscle-tees",
      text: "Muscle Tees",
      key: "muscle-tees"
    },
    {
      to: "/graphic-tees",
      text: "Graphic Tees",
      key: "graphic-tees"
    },
    {
      to: "/regular-tie-dye-tees",
      text: "Regular Tie-Dye Tees",
      key: "regular-tie-dye-tees"
    },
    {
      to: "/regular-hodies",
      text: "Regular Hodies",
      key: "regular-hodies"
    },
    {
      to: "/regular-shorts",
      text: "Regular Shorts",
      key: "regular-shorts"
    }
  ];

  // Display Link Street Wear Link Item
  const streetWearLinksItem = [
    {
      to: "/street-wear-tees",
      text: "Street Wear Tees",
      key: "street-wear-tees"
    },
    {
      to: "/street-wear-tie-dye-tees",
      text: "Street Wear Tie-Dye Tees",
      key: "street-wear-tie-dye-tees"
    },
    {
      to: "/street-wear-acid-wash-tees",
      text: "Street Wear Acid Wash Tees",
      key: "street-wear-acid-wash-tees"
    },
    {
      to: "/street-wear-hoodies",
      text: "Street Wear Hoodies",
      key: "street-wear-hoodies"
    },
  ];

  // Display Link Street Wear Link Item
  const accessoriesLinksItem = [
    {
      to: "/bags",
      text: "Bags",
      key: "bags"
    },
    {
      to: "/key-chain",
      text: "Key Chain",
      key: "key-chain"
    },
    {
      to: "/belt",
      text: "Belt",
      key: "belt"
    },
    {
      to: "/hats",
      text: "Hats",
      key: "hats"
    },
  ];

  // Update active link based on current URL
  useEffect(() => {
    const path = location.pathname;
    setActiveLink(path === '/' ? 'home' : path.slice(1));
  }, [location]);
  

  return (
    <>
      <div className="yot-overlay-bg-trans yot-animate-slide-right yot-hide-for-x-large-laptop-up yot-z-index-1" onClick={handleOverlayClick}></div>
      <div className="yot-overlay-left yot-bg-black2 yot-pa-16 yot-hide-for-x-large-laptop-up yot-tc-white yot-vh-100 yot-scrollbar-white yot-animate-slide-right yot-z-index-2" style={{overflowY:"auto"}}>
        <div className="yot-flex yot-flex-fd-c yot-text-fs-xxl yot-nav-active-mobile">
          {/* <!-- Logo --> */}
          <Link to="#">
            <img 
              src={hgtrLogo} 
              alt="Hugutero Logo Black" 
              style={{ width: "150px" }} />
          </Link>

          {/* Home */}
          <Link
            to="/react-hgtr/"
            style={{ overFlow: "hidden" }}
            onClick={() => setActiveLink('home')}
          >
            Home
          </Link>

          {/* Shop */}
          <Link to="#" 
            className="yot-flex yot-flex-ai-c"
            onClick={handleClickShop}
            >
            Shop 
            <img
                src={angleRight}
                alt="Angle Icon"
                className={`yot-ml-4 yot-flex yot-flex-ai-c yot-icon-angle ${isShopOpen ? 'yot-icon-angle-rotate-90-deg' : ''}`}
                style={{width:'12px'}}
                />   
          </Link>
          
          {/* Display Shop Container */}
          {isShopOpen && (
            <div className='yot-flex yot-flex-fd-c yot-w-100 yot-p=-16'>
              
              <div className='yot-flex yot-flex-fd-c yot-pa-8'>
                {/* Regular */}
                <h4 
                  className='yot-tc-red'
                  onClick={handleClickRegular}
                >
                  <b className='yot-flex yot-flex-ai-c'>
                    REGULAR 
                    <img
                        src={angleRight}
                        alt="Angle Icon"
                        className={`yot-ml-4 yot-flex yot-flex-ai-c yot-icon-angle ${isRegularOpen ? 'yot-icon-angle-rotate-90-deg' : ''}`}
                        style={{ width:'12px'}}
                    />   
                  </b>
                </h4>
                  {isRegularOpen && (
                    <div className='yot-text-fs-sm yot-flex yot-flex-fd-c yot-ml-48'>
                      {regularLinksItem.map((item) => (
                          <Link
                            to={item.to}
                            key={item.key}
                            style={{ marginTop: "8px" }}
                            className={`yot-text-fs-sm ${activeLink === item.key ? 'yot-active-bb-white' : ''}` }
                            onClick={() => {
                              setActiveLink(item.key);
                            }}
                          >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>

              <div className='yot-flex yot-flex-fd-c yot-pa-8'>
                {/* Street Wear */}
                <h4 
                  className='yot-tc-red'
                  onClick={handleClickStreetWear}
                  >
                  <b className='yot-flex yot-flex-ai-c'>
                    STREETWEAR 
                    <img
                        src={angleRight}
                        alt="Angle Icon"
                        className={`yot-ml-4 yot-flex yot-flex-ai-c yot-icon-angle ${isStreetWearOpen ? 'yot-icon-angle-rotate-90-deg' : ''}`}
                        style={{ width:'12px'}}
                    />   
                  </b>
                </h4>

                {isStreetWearOpen && (
                    <div className='yot-text-fs-sm yot-flex yot-flex-fd-c yot-ml-48'>
                      {streetWearLinksItem.map((item) => (
                        <Link
                          to={item.to}
                          key={item.key}
                          style={{ marginTop: "8px" }}
                          className={activeLink === item.key ? 'yot-active-bb-white' : ''}
                          onClick={() => setActiveLink(item.key)}
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                )}
              </div>

              <div className='yot-flex yot-flex-fd-c yot-pa-8'>
                {/* Accessories */}
                <h4 
                  className='yot-tc-red'
                  onClick={handleClickAccessories}
                >
                  <b className='yot-flex yot-flex-ai-c'>
                    ACCESSORIES 
                    <img
                        src={angleRight}
                        alt="Angle Icon"
                        className={`yot-ml-4 yot-flex yot-flex-ai-c yot-icon-angle ${isAccessoriesOpen ? 'yot-icon-angle-rotate-90-deg' : ''}`}
                        style={{ width:'12px'}}
                    />      
                  </b>
                </h4>

                {isAccessoriesOpen && (
                  <div className='yot-text-fs-sm yot-flex yot-flex-fd-c yot-ml-48'>
                    {accessoriesLinksItem.map((item) => (
                        <Link
                          to={item.to}
                          key={item.key}
                          style={{ marginTop: "8px" }}
                          className={activeLink === item.key ? 'yot-active-bb-white' : ''}
                          onClick={() => setActiveLink(item.key)}
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                )}
              </div>
              <div className='yot-flex yot-flex-fd-c yot-pa-8'>
                {/* Accessories */}
                <Link className="yot-tc-red" to="#" style={{marginTop:"8px"}}><b>View All Product</b></Link>
              </div>
          </div>
          )}


          <Link to="/testimonial">Testimonial</Link>
          <Link to="/look-book">Look Book</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/faqs">Faqs</Link>
        </div>
      </div>
    </>
  );
};

export default NavMobileOverlay;
