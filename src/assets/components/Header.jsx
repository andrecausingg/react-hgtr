import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Images Logo
import hgtrLogo from '../images/logo/hgtr-logo-black.png';

// Icon
import cartIcon from '../images/icons/cart-shopping-solid-white.svg';
import angleRight from "../images/icons/angle-right-solid-white.svg";

// Mock Up
import shop from "../images/bg-images/mockup/shop.jpg";

// Components
import NavMobileOverlay from '../components/NavMobileOverLay';
import Login from '../components/Login';
import CartContainer from '../components/CartContainer';

const Header = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpens] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  // Body OverFlow Hidden
  useEffect(() => {
    if (loginOpen || cartOpen || hamburgerOpen) {
      document.body.style.overflow = 'hidden'; // Apply the 'overflow: hidden' style to the body
    } else {
      document.body.style.overflow = ''; // Reset the style when the login is closed
    }

    return () => {
      document.body.style.overflow = ''; // Reset the style when the component unmounts
    };
  }, [loginOpen, cartOpen, hamburgerOpen]);

  // Hamburger Open
  const handleClickHamburgerOpen = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  // Log In Open
  const handleClickLogInOpen = () => {
    setLoginOpen(!loginOpen);
  };

  // Cart Open
  const handleClickCartOpen = () => {
    setCartOpens(!cartOpen);
  };

  // Display Shop Container
  const handleMouseEnterShop = () => {
    setIsHovered(true);
  };

  // Hide Shop Container
  const handleMouseLeaveShop = () => {
    setIsHovered(false);
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
      {/* <!-- Header --> */}
      <header className="yot-header yot-bg-black2 yot-z-index-1">
        {/* <!-- Nav --> */}
        <nav className="yot-container yot-pa-16 yot-flex yot-flex-ai-c-jc-sb">
          {/* <!-- Logo --> */}
          <Link to="/" className="yot-flex yot-flex-ai-c-jc-c">
            <img src={hgtrLogo} alt="Hugutero Logo Black" style={{ width: "150px" }} />
          </Link>

          {/* <!-- Nav Links --> */}
          <div className="yot-flex yot-nav-active yot-hide-for-large-laptop-down">
            {/* Home */}
            <Link
              to="/react-hgtr/"
              className={activeLink === 'home' ? 'yot-active-bb-white' : ''}
              onClick={() => setActiveLink('home')}
            >
              Home
            </Link>

            {/* Shop */}
            <Link to="#" 
              className={`yot-flex yot-flex-ai-c ${activeLink === 'baybayin-tees' ? 'yot-active-bb-white' : ''}`}
              onMouseEnter={handleMouseEnterShop}
              onClick={() => setActiveLink('baybayin-tees')}
            >
                Shop
                <img
                  src={angleRight}
                  alt="Angle Icon"
                  className={`yot-ml-4 yot-flex yot-flex-ai-c yot-icon-angle ${isHovered ? 'yot-icon-angle-rotate-90-deg' : ''}`}
                  style={{width:"12px"}}
                />            
            </Link>
            
            {/* Shop Container*/}
            {isHovered && (
              <div 
                className='yot-bg-black2 yot-fixed yot-flex yot-tc-white yot-pa-16 yot-fade-in' 
                style={{width:"1000px", top:"80px", right:"0px", left:"0px", margin:"auto"}}
                onMouseLeave={handleMouseLeaveShop}
              >
                  <div>
                      <img src={shop} alt="shop hugotero" style={{width:"400px",  height:"100%"}}/>
                  </div>

                  <div>
                    <div className='yot-flex yot-flex-jc-sb yot-w-100 yot-pa-16'>
                      <div className='yot-flex yot-flex-fd-c yot-pa-8'>
                        <h3 className='yot-tc-red'><b>REGULAR</b></h3>

                        {regularLinksItem.map((item) => (
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

                      <div className='yot-bg-white' style={{padding:"1px",height:"200px", margin:"auto"}}></div>

                      <div className='yot-flex yot-flex-fd-c yot-pa-8'>
                        <h3 className='yot-tc-red'><b>STREETWEAR</b></h3>

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

                      <div className='yot-bg-white' style={{padding:"1px",height:"200px", margin:"auto"}}></div>

                      <div className='yot-flex yot-flex-fd-c yot-pa-8'>
                        <h3 className='yot-tc-red'><b>ACCESSORIES</b></h3>

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
                    </div>

                    <div className='yot-text-center yot-bg-black2 yot-pa-16 yot-w-50' style={{margin:"auto"}}>
                      <Link to="#" style={{marginTop:"8px"}}>View All Product</Link>
                    </div>
                  </div>
              </div>
            )}

            {/* Testimonial */}
            <Link
              to="/testimonial"
              className={activeLink === 'testimonial' ? 'yot-active-bb-white' : ''}
              onClick={() => setActiveLink('testimonial')}
            >
              Testimonial
            </Link>

            {/* Look Book */}
            <Link
              to="/look-book"
              className={activeLink === 'look-book' ? 'yot-active-bb-white' : ''}
              onClick={() => setActiveLink('look-book')}
            >
              Look Book
            </Link>


            {/* Contact Us */}
            <Link
              to="/contact-us"
              className={activeLink === 'contact-us' ? 'yot-active-bb-white' : ''}
              onClick={() => setActiveLink('contact-us')}
            >
              Contact Us
            </Link>


            {/* Faqs */}
            <Link
              to="/faqs"
              className={activeLink === 'faqs' ? 'yot-active-bb-white' : ''}
              onClick={() => setActiveLink('faqs')}
            >
              Faqs
            </Link>
          </div>

          {/* <!-- Log In --> */}
          <div className="yot-flex yot-flex-ai-c-jc-sb">
            {/* <!-- Hamburger --> */}
            <div 
              className={`yot-hamburger yot-hide-for-large-laptop-up ${hamburgerOpen ? "yot-hamburger-open" : ""}`}
              onClick={handleClickHamburgerOpen}
            >
              <span></span><span></span><span></span>
            </div>

            {/* Log In */}
            <button 
              className="yot-btn-black2 yot-mlr-8 yot-btn-shape-round yot-text-fs-t" 
              onClick={handleClickLogInOpen}
            >Log In</button>

            {/* Cart */}
            <img src={cartIcon} className="yot-cursor-pointer" style={{ width: "30px" }} alt="Cart Icon" onClick={handleClickCartOpen}/>
          </div>
        </nav>
      </header>

      {/* <!-- Mobile Overlay --> */}
      {hamburgerOpen && (
        <>
          <NavMobileOverlay onClose={handleClickHamburgerOpen} />
        </>
      )}

      {/* <!-- Login --> */}
      {loginOpen && (
        <>
          <Login onClose={handleClickLogInOpen}/>
        </>
      )}

      {/* Cart */}
      {cartOpen && (
        <>
          <CartContainer onClose={handleClickCartOpen}/>
        </>
      )}
    </>
  );
};

export default Header;
