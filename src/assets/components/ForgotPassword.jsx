import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Images
import envelopeIcon from '../images/icons/envelope-solid.svg';
import closeIcon from '../images/icons/circle-xmark-solid.svg';


const forgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Hide Log In Form
  const handleClickCloseIcon = () => {
    onClose();
  };

  // Handle Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  // Form Handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgotPassword', {email});
      const { token } = response.data;

      // Handle successful forgotPassword
      console.log('forgotPassword successful! Token:', token);
    } catch (error) {
      // Handle forgotPassword error
      setError('Invalid email or password');
      console.log('forgotPassword error:', error);
    }
  }

  return (
    <>
        {/* <!-- Log In --> */}
        <div className="yot-overlay-mid-container yot-z-index-4">
          <div className="yot-overlay-mid-child yot-bg-white yot-pa-16 form-width-m-400" style={{borderRadius: '8px'}}>
              {/* <!-- Title --> */}
              <div className="yot-mb-8 yot-text-center">
                <div className='yot-flex yot-flex-ai-c-jc-sb'>
                  <h3>Forgot Password</h3>
                  <img src={closeIcon} alt="Close Icon" className='yot-cursor-pointer' style={{width:"24px"}} onClick={handleClickCloseIcon}/>
                </div>
                {/* <!-- Error Email--> */}
                <div className="error yot-mtb-8">
                  {error && <div className="error-message">{error}</div>}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* <!-- Email error --> */}
                <div>
                    <label htmlFor="email"><b>Email</b></label>
                </div>
                {/* <!-- Email --> */}
                <div className="yot-form-group yot-form-group-container">
                    <input
                      className={`yot-form-input`}
                      type="email"
                      style={{paddingLeft: '38px', borderRadius:'8px'}}
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    <img className="yot-form-group-icon-left" src={envelopeIcon} alt="" width="36px" />
                </div>

                {/* <!-- Submit --> */}
                <div className="yot-text-center">
                    <button className="yot-btn-black2"  style={{border:"1px solid black"}}>Submit</button>
                </div>
              </form>
          </div>
        </div>
    </>
  )
}

export default forgotPassword