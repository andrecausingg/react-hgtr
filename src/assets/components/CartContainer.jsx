
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

// Images Icon
import cartIcon from "../images/icons/cart-shopping-solid-white.svg";
import boxIcon from "../images/icons/box-solid-white.svg";
import checkCircleIcon from "../images/icons/circle-check-solid-white.svg";
import tructIcon from "../images/icons/truck-ramp-box-solid-white.svg";
import banIcon from "../images/icons/ban-solid-white.svg";
import closeIcon from "../images/icons/circle-xmark-solid-white.svg";
import deleteIcon from "../images/icons/trash-solid-white.svg";

// Images
import product1 from "../images/products/babaero.jpg";
import product2 from "../images/products/buwisit.jpg";
import product3 from "../images/products/filipino.jpg";

// Components
import Login from "../components/Login"

const CartContainer = ({ onClose }) => {
  const [isHideSelf, setHideSelf] = useState(false);

  const handleClickCloseIcon = () => {
    onClose();
  };

  const handleClickLogin = () =>{
    setHideSelf(!isHideSelf)
  };

  return (
    <>
      <div className="yot-overlay-bg-trans yot-animate-slide-left yot-z-index-2" onClick={handleClickCloseIcon}></div>
      <div className="yot-overlay-right yot-bg-black2 yot-pa-16 yot-tc-white yot-vh-100 yot-scrollbar-white yot-animate-slide-left form-width-m-500 yot-z-index-3">
        {/* Log In user */}
        <div style={{display:'none'}}>
          {/* Title Close Icon */}
          <div className="yot-flex yot-flex-ai-c-jc-sb yot-text-fs-xxl yot-nav-active-mobile">
            <h3>Cart</h3>
            <img src={closeIcon} alt="Close Icon" className="yot-cursor-pointer" style={{width:"24px"}} onClick={handleClickCloseIcon}/>
          </div>

          {/* Icon Nav */}
          <header className="yot-flex yot-flex-ai-c-jc-sb yot-mt-16 yot-nav-active">
            {/* To Pay */}
            <Link to="#" className="yot-flex yot-flex-fd-c-ai-c yot-active-bb-white">
              <div className="yot-flex yot-flex-ai-c">
                <img src={cartIcon} alt="Cart Icon" style={{width:"16px"}}/>
                <span className="yot-ml-4">0</span>
              </div>
              <span className='yot-text-fs-xsm'>To Pay</span>
            </Link>

            {/* To Ship */}
            <Link to="#" className="yot-flex yot-flex-fd-c-ai-c">
              <div className="yot-flex yot-flex-ai-c">
                <img src={tructIcon} alt="Cart Icon" style={{width:"16px"}}/>
                <span className="yot-ml-4">0</span>
              </div>
              <span className='yot-text-fs-xsm'>To Ship</span>
            </Link>

            {/* To Received */}
            <Link to="#" className="yot-flex yot-flex-fd-c-ai-c">
              <div className="yot-flex yot-flex-ai-c">
                <img src={boxIcon} alt="Cart Icon" style={{width:"16px"}}/>
                <span className="yot-ml-4">0</span>
              </div>
              <span className='yot-text-fs-xsm'>To Received</span>
            </Link>

            {/* Completed */}
            <Link to="#" className="yot-flex yot-flex-fd-c-ai-c">
              <div className="yot-flex yot-flex-ai-c">
                <img src={checkCircleIcon} alt="Cart Icon" style={{width:"16px"}}/>
                <span className="yot-ml-4">0</span>
              </div>
              <span className='yot-text-fs-xsm'>Completed</span>
            </Link>

            {/* Cancelled */}
            <Link to="#" className="yot-flex yot-flex-fd-c-ai-c">
              <div className="yot-flex yot-flex-ai-c">
                <img src={banIcon} alt="Cart Icon" style={{width:"16px"}}/>
                <span className="yot-ml-4">0</span>
              </div>
              <span className='yot-text-fs-xsm'>Cancelled</span>
            </Link>
          </header>

          {/* Item Container */}
          <div className='yot-mt-8'>
              {/* Title Container */}
              <div className='yot-flex yot-flex-ai-c-jc-sb' style={{borderBottom:'3px solid white'}}>
                <h4>Product Details</h4>
                <h4>Sub Total</h4>
              </div>

              <div className='yot-mt-16 yot-flex yot-flex-ai-c-jc-sb'>
                  {/* Image */}
                  <div>
                    <img 
                      src={product1} 
                      alt="" 
                      style={{maxWidth: '120px'}}
                    />
                  </div>

                  {/* Product Description */}
                  <div>
                  <div className='yot-flex'>
                    {/* First Column */}
                    <div>
                      <div>
                        <h5>Name</h5>
                        <span>Babero</span>
                      </div>

                      <div>
                        <h5>Color</h5>
                        <span>White</span>
                      </div>

                      <div>
                        <h5>Size</h5>
                        <span>Xs</span>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className='yot-mlr-4'></div>

                    {/* Second Column */}
                    <div>
                      <div>
                        <h5>Qty</h5>
                        <span>1</span>
                      </div>

                      <div>
                        <h5>Price</h5>
                        <span>250.00</span>
                      </div>


                    </div>

                    {/* Separator */}
                    <div className='yot-mlr-4'></div>

                    {/* Third Column */}
                    <div className='yot-text-center'>
                      <div>
                        <h5>Total  Price</h5>
                        <span>250.00</span>
                      </div>

                      <div>
                        <img 
                          className='yot-cursor-pointer'
                          src={deleteIcon} 
                          alt="" 
                          style={{width: '24px'}}
                        />
                      </div>
                    </div>
                  </div>
                  </div>


                  <div>

                  </div>
              </div>
          </div>

          {/* Footer */}
          <footer className='yot-fixed yot-ptb-16 yot-mr-16 yot-w-100' style={{bottom:0}}>
            <div className='yot-flex yot-flex-ai-c-jc-c'>
              <h3>Total Price:</h3> 
              <div className='yot-mlr-4'></div>
              <h3>0.00</h3>
            </div>
          </footer>
        </div>

        {/* Not Login  User */}
        <div className='yot-flex yot-flex-fd-c-ai-c-jc-c yot-vh-100 yot-text-center'>
          <img src={closeIcon} alt="Close Icon" className="yot-cursor-pointer yot-mb-4" style={{width:"24px"}} onClick={handleClickCloseIcon}/>
          <h3>YOUR CART IS EMPTY</h3>
          <p>Have an Account? <br />  
            <button 
              className='yot-btn-black2 yot-btn-shape-round yot-text-fs-xsm yot-mtb-8'
              onClick={handleClickLogin}
            >
              Log In
            </button> 
            <br /> 
            to Check out faster
          </p>
        </div>
      </div>

      {/* Log In */}
      {isHideSelf && (
          <>
            <Login onClose={() => {
              handleClickCloseIcon();
            }} />
          </>
        )}
    </>
  )
}

export default CartContainer