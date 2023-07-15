import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Images Icon
import envelopeIcon from '../images/icons/envelope-solid.svg';
import eyeSlashIcon from '../images/icons/eye-slash-solid.svg';
import eyeIcon from '../images/icons/eye-solid.svg';
import lockIcon from '../images/icons/lock-solid.svg';
import closeIcon from '../images/icons/circle-xmark-solid.svg';

const Signup = ({ onClose }) => {
  // Value 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Error Display EMAIL
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailExist, setEmailExist] = useState(false);
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  
  // Password Err
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [isPasswordLess, setPasswordLess] = useState(false);

  // Confirm Password Err
  const [isConfirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [isConfirmPassworLess, setConfirmPassworLess] = useState(false);

  // Show Hide Icon
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Btn Sign Up Click
  const [isBtnFormClick, setBtnFormClick] = useState(false);

  // Btn Active Btn
  const [isBtnFormClickActive, setBtnFormClickActive] = useState(false);

  // Disable Password And Confirm Password if Sending Verificatioon Code
  const [isSendingCode, setSendingCode] = useState(false);

  // Hide All Form Authenticate
  const handleClickCloseIcon = () => {
    onClose();
  };

  // Handle Email
  const handleEmailChange = (e) => {
    const email = e.clipboardData?.getData('text') || e.target.value;
    setEmail(email);
    setIsValidEmail(validateEmail(email));

    if (email !== "") setEmailEmpty(false);

    if (validateEmail && email !== "") {
      const generatedToken = uuidv4();
      setEmailExist(false);
      setEmailEmpty(false);

      // Disabled input passwowrd and confirm password
      axios
      .get('http://127.0.0.1:8000/api/email-exist-send-message', {
        params: {
          email: email // Replace with the desired email
        }
      })
      .then(response => {
        const { data } = response;
        if (data.message === 'disabledPass') {
          setSendingCode(true);
          setBtnFormClickActive(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.error('An error occurred during the request.');
        }
      });

      // Send Verification Code
      axios
      .put('http://127.0.0.1:8000/api/email-exist', {
        email: email,
        sessionVerifyEmail: generatedToken
      })
      .then((response) => {
        console.log(response.data.message);
        // Handle the response from the API
        // For example, update the UI or perform any other desired action
        if (response.data.message === "sent") {
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('emailVerifyToken', generatedToken);
          window.location.href = '/email-verification';
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle any error that occurs during the request
        if (error.response && error.response.data) {
          console.log(error.response.data.email);
        } else {
          console.error('An error occurred during the request.');
        }
      });
    }
  };

  const validateEmail = (email) => {
    // regular expression to check if the email is valid
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  // Handle Password
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword.trim() !== "") {
      setPasswordEmpty(false);
      
      if (newPassword.length > 7) {
        setPasswordLess(false);
      }
    }
  }
  
  // Handle Confirm Password
  const handlePasswordConfirmChange = (e) => {
    const newConfirmPassword = e.target.value;
    setPasswordConfirm(newConfirmPassword);
    
    if (newConfirmPassword.trim() !== "") {
      setConfirmPasswordEmpty(false);
      
      if (newConfirmPassword.length > 7) {
        setConfirmPassworLess(false);
      }
    }
  }
  
  // Display Password Icon
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  // Display Confirm Password Icon
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  // Form Handle
  const handleSubmit = (e) => {
    e.preventDefault();
    // Email Err
    if (email === "") setEmailEmpty(true);
    if (!isValidEmail) setIsValidEmail(true);
  
    // Password Err
    if (password === "") setPasswordEmpty(true);
    if (password !== "" && password.length <= 7){
      if(isPasswordLess == false) setPasswordLess(true);
    }

    // Confirm Pass Err
    if (passwordConfirm === "") setConfirmPasswordEmpty(true);
    if (passwordConfirm !== "" && passwordConfirm.length <= 7){
      if(isConfirmPassworLess == false) setConfirmPassworLess(true);
    } 
  
    // Goods
    if (
      isValidEmail &&
      email !== "" &&
      password.length >= 8 &&
      password !== "" &&
      passwordConfirm.length >= 8 &&
      passwordConfirm !== "" &&
      password === passwordConfirm
    ) {
      const generatedToken = uuidv4();
      setBtnFormClick(true);
      setBtnFormClickActive(true);

      axios
      .post('http://127.0.0.1:8000/api/signup', {
        email: email,
        password: password,
        sessionVerifyEmail: generatedToken
      })
      .then(response => {
        const { data } = response;
        console.log(data);
        if(data.message === 'created'){
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('emailVerifyToken', generatedToken);
          window.location.href = '/email-verification';
        }
      })
      .catch(error => {
        setBtnFormClick(false);
        setBtnFormClickActive(false);
        const { response } = error;
        const { data } = response;
        if (data.errors && data.errors.email && data.errors.email[0] === 'The email field is required.') setEmailEmpty(true);
        if (data.errors && data.errors.email && data.errors.email[0] === 'Please enter a valid email address.') setIsValidEmail(false);
        if (data.errors && data.errors.email && data.errors.email[0] === 'The email address already exists.') setEmailExist(true);
        if (data.errors && data.errors.password && data.errors.password[0] === 'The password field is required.') setPasswordEmpty(true);
        if (data.errors && data.errors.password && data.errors.password[0] === 'The password must be at least 8 characters long.') setPasswordLess(true);
      });
      return;
    }
  }

  return (
    <>
        {/* <!-- Sign Up --> */}
        <div className="yot-overlay-mid-container yot-z-index-4">
          <div className="yot-overlay-mid-child yot-bg-white yot-pa-16 form-width-m-400" style={{borderRadius: '8px'}}>
              {/* <!-- Title --> */}
              <div className="yot-mb-8 yot-text-center">
                <div className='yot-flex yot-flex-ai-c-jc-sb'>
                  <h3>Sign Up</h3>
                  <img src={closeIcon} alt="Close Icon" className='yot-cursor-pointer' style={{width:"24px"}} onClick={handleClickCloseIcon}/>
                </div>
                {password !== "" &&  passwordConfirm !== "" && password != passwordConfirm && (
                  <span className="yot-tc-red yot-mtb-8 yot-text-fs-xsm" >Password and Confirm Password not Match.</span>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                {/* <!-- Email error --> */}
                <div className="yot-flex yot-flex-ai-c-jc-sb">
                    <label htmlFor="email"><b>Email</b></label>
                    {/* <!-- Error Email--> */}
                    <div className="yot-text-end">
                      {email !== ""  &&  !isValidEmail && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>Please enter a valid <b>EMAIL</b> address.</span>
                      )}
                      {isEmailEmpty && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The <b>EMAIL</b> field is required.</span>
                      )}
                      {isEmailExist && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The <b>EMAIL</b> address already exists.</span>
                      )}
                    </div>
                </div>
                {/* <!-- Email --> */}
                <div className="yot-form-group yot-form-group-container">
                    <input
                      className={`yot-form-input 
                          ${email !== "" && isValidEmail === true ? 'yot-form-input-good' : ''}  
                          ${email !== "" && isValidEmail === false ? 'yot-form-input-bad' : ''}
                          ${isEmailEmpty === true ? 'yot-form-input-bad' : ''}
                          ${isEmailExist === true ? 'yot-form-input-bad' : ''}
                          ${isPasswordLess === true ? 'yot-form-input-bad' : ''}`
                      }
                      type="email"
                      style={{paddingLeft: '38px', borderRadius:'8px'}}
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <img className="yot-form-group-icon-left" src={envelopeIcon} alt="" width="36px" />
                </div>

                {/* <!-- Password Label --> */}
                <div className="yot-flex yot-flex-ai-c-jc-sb">
                    <label htmlFor="password"><b>Password</b></label>
                    <div className="yot-flex yot-flex-fd-c yot-text-end">
                      {password !== "" && password.length < 8 && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>
                          The <b>PASSWORD</b> must be at least 8 characters long.
                        </span>
                      )}
                      {isPasswordEmpty && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The <b>PASSWORD</b> field is required.</span>
                      )}
                      {isPasswordLess && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The <b>PASSWORD</b> must be at least 8 characters long.</span>
                      )}
                    </div>
                </div>
                {/* <!-- Password --> */}
                <div className="yot-form-group yot-form-group-container">
                  <input
                    className={`yot-form-input 
                      ${password !== "" && password.length >= 8 ? 'yot-form-input-good' : ''} 
                      ${password !== "" && password.length < 8 ? 'yot-form-input-bad' : ''} 
                      ${password !== "" && passwordConfirm !== "" && password !== passwordConfirm ? 'yot-form-input-bad' : ''}
                      ${isPasswordEmpty === true ? 'yot-form-input-bad' : ''}
                      ${isSendingCode === true ? 'yot-form-input-disabled' : ''} `
                    }
                    type={showPassword ? 'text' : 'password'}
                    style={{ padding: '14px 38px' , borderRadius:'8px'}}
                    value={password}
                    disabled={isSendingCode ? "disabled" : ""}
                    onChange={handlePasswordChange}
                  />
  
                  <img className="yot-form-group-icon-left" src={lockIcon} alt="" width="36px" />

                  <img className="yot-form-group-icon-right yot-cursor-pointer" src={showPassword ? eyeIcon : eyeSlashIcon} alt="" width="36px" onClick={togglePasswordVisibility} />
                </div>

                {/* <!-- Confirm Password Label --> */}
                <div className="yot-flex yot-flex-ai-c-jc-sb">
                    <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                    <div className="yot-flex yot-flex-fd-c yot-text-end">
                      {passwordConfirm !== "" && passwordConfirm.length < 8 && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>
                          The <b>CONFIRM PASSWORD</b> must be at least 8 characters long.
                        </span>
                      )}
                      {isConfirmPasswordEmpty && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The <b>CONFIRM PASSWORD</b> field is required.</span>
                      )}
                      {isConfirmPassworLess && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The <b>CONFIRM PASSWORD</b> must be at least 8 characters long.</span>
                      )}
                    </div>
                </div>
                {/* <!-- Confirm Password --> */}
                <div className="yot-form-group yot-form-group-container">
                  <input
                    className={`yot-form-input 
                      ${passwordConfirm !== "" && passwordConfirm.length >= 8 ? 'yot-form-input-good' : ''} 
                      ${passwordConfirm !== "" && passwordConfirm.length < 8 ? 'yot-form-input-bad' : ''} 
                      ${password !== "" && passwordConfirm !== "" && password !== passwordConfirm ? 'yot-form-input-bad' : ''}
                      ${isConfirmPasswordEmpty === true ? 'yot-form-input-bad' : ''}
                      ${isSendingCode === true ? 'yot-form-input-disabled' : ''} `
                    }
                    type={showPasswordConfirm ? 'text' : 'password'}
                    style={{ padding: '14px 38px' , borderRadius:'8px'}}
                    value={passwordConfirm}
                    disabled={isSendingCode ? "disabled" : ""}
                    onChange={handlePasswordConfirmChange}
                  />
                  <img className="yot-form-group-icon-left" src={lockIcon} alt="" width="36px" />

                  <img className="yot-form-group-icon-right yot-cursor-pointer" src={showPasswordConfirm ? eyeIcon : eyeSlashIcon} alt="" width="36px" onClick={togglePasswordConfirmVisibility} />
                </div>

                {/* Terms and Condition */}
                <div className="yot-mb-8 yot-flex yot-flex-fd-c">
                    <span className="yot-text-fs-t yot-text-center">By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.</span>
                </div>

                {/* <!-- Submit --> */}
                <div className="yot-text-center">
                  <button 
                    className={`yot-btn-black2 ${isBtnFormClickActive === true ? 'yot-btn-black2-active' : ''}`}
                    style={{ border: "1px solid black", cursor: isSendingCode ? "not-allowed" : "pointer" }}
                    disabled={isSendingCode === true ? "disabled" : ""}
                  >
                      {isBtnFormClick || isSendingCode ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </div>
              </form>
          </div>
        </div>
    </>
  )
}

export default Signup