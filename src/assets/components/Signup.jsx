import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // 
  const [csrfToken, setCsrfToken] = useState('');

  // CSRF token setup
  // useEffect(() => {
  //   // Fetch the CSRF token from the Laravel backend
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/csrf-token', { withCredentials: true });
  //       setCsrfToken(response.data.csrf_token);
  //     } catch (error) {
  //       console.error('Failed to fetch CSRF token:', error);
  //     }
  //   };

  //   fetchCsrfToken();
  // }, []);
  
  // Hide All Form Authenticate
  const handleClickCloseIcon = () => {
    onClose();
  };

  // Handle Email
  const handleEmailChange = (e) => {
    const pastedText = e.clipboardData?.getData('text');
    const value = pastedText || e.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
    console.log(email);

    if(email !== "") setEmailEmpty(false);

    if(isValidEmail && email !== ""){
        setEmailExist(false);
        setEmailEmpty(false);

        axios.put('http://127.0.0.1:8000/api/email-exist',{        
          email: email
        })
        .then((response) => {
          console.log(response.data.message);
          // Handle the response from the API
          // For example, update the UI or perform any other desired action
          if(response.data.message === "sent"){
            window.location.href = '/email-verification';
          }
        })
        .catch((error) => {
            // Handle any error that occurs during the request
            if (error.response && error.response.data) {
              console.log(error.response.data.email);
            } else {
              console.error('An error occurred during the request.');
            }
        });
    }
  }
  const validateEmail = (email) => {
    // regular expression to check if the email is valid
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  // Handle Password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if(password !== "") setPasswordEmpty(false);
    if(password.length > 7) setPasswordLess(false);
  }
  // Handle Confirm Password
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    if(passwordConfirm !== "") setConfirmPasswordEmpty(false);
    if(passwordConfirm.length > 7) setConfirmPassworLess(false);
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
    if(email === ""){
      setEmailEmpty(true);
    }
    if(!isValidEmail){
      setIsValidEmail(true);
    }

    // Password Err
    if(password !== "" && password.length <= 7){
      setPasswordLess(true);
    }
    if(password === ""){
      setPasswordEmpty(true);
    }

    // Confirm Pass Err
    if(passwordConfirm === ""){
      setConfirmPasswordEmpty(true);
    }
    if(passwordConfirm !== "" && passwordConfirm.length <= 7){
      setConfirmPassworLess(true);
    }

    // Goods
    if(isValidEmail && email !== "" && password.length >= 8 && password !== "" && passwordConfirm.length >= 8 && passwordConfirm !== "" && password == passwordConfirm){
      setBtnFormClick(true);
      axios.get('http://127.0.0.1:8000/csrf-token')
      .then(response => {
        const csrfToken = response.data.csrf_token;
    
        axios.post(
          'http://127.0.0.1:8000/api/signup',
          { email, password },
          {
            headers: {
              'X-CSRF-TOKEN': csrfToken,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(response => {
          // Handle the response from the API
          // For example, update the UI or perform any other desired action
          console.log(response);
          if (response.status === 201) {
            window.location.href = '/email-verification';
          }
        })
        .catch(error => {
          setBtnFormClick(false);
    
          // Handle any error that occurs during the request
          if (error.response && error.response.status) {
            if (error.response.status === 400) {
              const { email, password } = error.response.data.errors;
              // Handle the error messages
              // ...
            }
          } else {
            console.error('An error occurred during the request.');
          }
        });
      })
      .catch(error => {
        console.error('An error occurred while retrieving the CSRF token.');
      });
    

      return;
    }

    setBtnFormClick(false);
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
                      ${isPasswordEmpty === true ? 'yot-form-input-bad' : ''}`
                    }
                    type={showPassword ? 'text' : 'password'}
                    style={{ padding: '14px 38px' , borderRadius:'8px'}}
                    value={password}
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
                      ${isConfirmPasswordEmpty === true ? 'yot-form-input-bad' : ''}`
                    }
                    type={showPasswordConfirm ? 'text' : 'password'}
                    style={{ padding: '14px 38px' , borderRadius:'8px'}}
                    value={passwordConfirm}
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
                    className="yot-btn-black2" 
                    style={{border: "1px solid black"}}
                  >
                      {isBtnFormClick ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </div>
              </form>
          </div>
        </div>
    </>
  )
}

export default Signup