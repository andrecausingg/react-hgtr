import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Images Icon
import envelopeIcon from '../images/icons/envelope-solid.svg';
import eyeSlashIcon from '../images/icons/eye-slash-solid.svg';
import eyeIcon from '../images/icons/eye-solid.svg';
import lockIcon from '../images/icons/lock-solid.svg';
import closeIcon from '../images/icons/circle-xmark-solid.svg';

// Component
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";


const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [isSignUpOpen, setSignUpOpen] = useState(false)
  const [isForgotPasswordOpen, setForgotPassword] = useState(false)

  const [isHideSelf, setHideSelf] = useState(true);

  // Hide Log In Form
  const handleClickCloseIcon = () => {
    onClose();
  };

  // Show Sign Up Form | Hide Self Log In Container
  const handleClickSignUpOpen = () => {
    setSignUpOpen(!isSignUpOpen)
    setHideSelf(!isHideSelf)
  };

  // Show Forgot Password Form | Hide Self Log In Container
  const handleClickForgotPasswordOpen = () => {
    setForgotPassword(!isForgotPasswordOpen)
    setHideSelf(!isHideSelf)
  };

  // Handle Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  // Handle Password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  // Display Password Icon
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  // Form Handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const generatedToken = uuidv4();

    if(email !== '' && password !== ''){
      // console.log(email);
      // console.log(password);
      // console.log(generatedToken);
      axios
      .put('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password
      })
      .then(response => {
        const { data } = response;
        data.message === 'Login successful' ? console.log(data.message) : console.log(data.message);
        console.log(data.token); 
      })
      .catch(error => {
        const { response } = error;
        const { data } = response;
        console.log(data);
        // data.message === 'Invalid credentials' ?  console.log(data.message) : '';
      });
    }
  }

  return (
    <>
        <div className="yot-overlay-bg-trans yot-z-index-3 yot-fade-in"></div>
        {/* Log In */}
        {isHideSelf && (
          <div className="yot-overlay-mid-container yot-z-index-4 yot-fade-in">
            <div className="yot-overlay-mid-child yot-bg-white yot-pa-16 form-width-m-400" style={{borderRadius: '8px'}}>
              <div className="yot-mb-8 yot-text-center">
                <div className="yot-flex yot-flex-ai-c-jc-sb">
                  <h3>Log In</h3>
                  <img src={closeIcon} alt="Close Icon" className="yot-cursor-pointer" style={{ width: "24px" }} onClick={handleClickCloseIcon} />
                </div>
                <div className="error yot-mtb-8">
                  {error && <div className="error-message">{error}</div>}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email"><b>Email</b></label>
                </div>
                <div className="yot-form-group yot-form-group-container">
                  <input
                    className="yot-form-input"
                    type="email"
                    style={{ paddingLeft: '38px', borderRadius:'8px' }}
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <img className="yot-form-group-icon-left" src={envelopeIcon} alt="" width="36px" />
                </div>

                <div>
                  <label htmlFor="password"><b>Password</b></label>
                </div>
                <div className="yot-form-group yot-form-group-container">
                  <input
                    className="yot-form-input"
                    type={showPassword ? 'text' : 'password'}
                    style={{ padding: '14px 38px', borderRadius:'8px'}}
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                  <img className="yot-form-group-icon-left" src={lockIcon} alt="" width="36px" />
                  <img className="yot-form-group-icon-right yot-cursor-pointer" src={showPassword ? eyeIcon : eyeSlashIcon} alt="" width="36px" onClick={togglePasswordVisibility} />
                </div>

                <div className="yot-mb-4 yot-flex yot-flex-ai-c-jc-sb">
                  <span className="yot-cursor-pointer yot-active-hb-black2" onClick={handleClickForgotPasswordOpen}>
                    Forgot Password
                  </span>
                  <span className="yot-cursor-pointer yot-active-hb-black2" onClick={handleClickSignUpOpen}>
                    Sign Up
                  </span>
                </div>

                <div className="yot-text-center">
                  <button className="yot-btn-black2" style={{border: "1px solid black"}}>Log In</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Show Sign Up Form */}
        {isSignUpOpen && (
          <>
            <Signup onClose={() => {
              handleClickCloseIcon();
              handleClickSignUpOpen();
            }} />
          </>
        )}

        {/* Show Forgot Password Form */}
        {isForgotPasswordOpen && (
          <>
            <ForgotPassword onClose={() => {
              handleClickCloseIcon();
              handleClickForgotPasswordOpen();
            }} />
          </>
        )}
    </>
  )
}

export default Login