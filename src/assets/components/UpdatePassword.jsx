import React, { useState } from 'react';
import axios from 'axios';

// Images Icon
import envelopeIcon from '../images/icons/envelope-solid.svg';
import eyeSlashIcon from '../images/icons/eye-slash-solid.svg';
import eyeIcon from '../images/icons/eye-solid.svg';
import lockIcon from '../images/icons/lock-solid.svg';
import closeIcon from '../images/icons/circle-xmark-solid.svg';

const UpdatePassword = () => {
  // Value 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Error Display EMAIL | PASSWORD
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailExist, setEmailExist] = useState(false);
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [isPassworLess, setPassworLess] = useState(false);

  // Show Hide Icon
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Handle Email
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));

    if(isValidEmail){
        axios.put('http://127.0.0.1:8000/api/email-exist',{        
          email: email
        })
        .then((response) => {
          // Handle the response from the API
          // For example, update the UI or perform any other desired action
          if(response.data.message === "sent"){
            window.location.href = '/email-verification';
          }
      })
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
  }
  // Handle Confirm Password
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
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

    // Goods
    if(password.length >= 8 && password !== "" && passwordConfirm.length >= 8 && passwordConfirm !== "" && password == passwordConfirm && isValidEmail){

      axios.post('http://127.0.0.1:8000/api/signup',{
        email: email,
        password: password
      })
      .then((response) => {
        // Handle the response from the API
        // For example, update the UI or perform any other desired action
        if(response.data.message === "created"){
          
        }
      })
      .catch((error) => {
          // Handle any error that occurs during the request
          if (error.response && error.response.data) {
            // Email Validation Back End
            if(error.response.data.errors.email === "The email field is required."){
              setEmailEmpty(true);
            }else if(error.response.data.errors.email === "The email address already exists."){
              setEmailExist(true);
            }else if(error.response.data.errors.email === "Please enter a valid email address."){
              setIsValidEmail(true);
            }else if(error.response.data.errors.password === "The password field is required."){
              setPasswordEmpty(true);
            }else if(error.response.data.errors.password === "The password must be at least 8 characters long."){
              setPassworLess(true);
            }
          } else {
            console.error('An error occurred during the request.');
          }
      });

      return;
    }
  }

  return (
    <>
        {/* <!-- Update Password --> */}
        <div className="yot-overlay-mid-container yot-z-index-4">
          <div className="yot-overlay-mid-child yot-bg-white yot-pa-16 form-width-m-400" style={{borderRadius: '8px'}}>
              {/* <!-- Title --> */}
              <div className="yot-mb-8 yot-text-center">
                <div className='yot-text-center'>
                  <h3>Update Password</h3>
                </div>
                {password !== "" &&  passwordConfirm !== "" && password != passwordConfirm && (
                  <span className="yot-tc-red yot-mtb-8">Password and Confirm Password not Match.</span>
                )}
              </div>

              <form onSubmit={handleSubmit}>
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
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The password field is required.</span>
                      )}
                      {isPassworLess && (
                        <span className="yot-tc-red" style={{fontSize: '14px' }}>The password must be at least 8 characters long.</span>
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
                    </div>
                </div>
                {/* <!-- Confirm Password --> */}
                <div className="yot-form-group yot-form-group-container">
                  <input
                    className={`yot-form-input 
                      ${passwordConfirm !== "" && passwordConfirm.length >= 8 ? 'yot-form-input-good' : ''} 
                      ${passwordConfirm !== "" && passwordConfirm.length < 8 ? 'yot-form-input-bad' : ''} 
                      ${password !== "" && passwordConfirm !== "" && password !== passwordConfirm ? 'yot-form-input-bad' : ''}`
                    }
                    type={showPasswordConfirm ? 'text' : 'password'}
                    style={{ padding: '14px 38px' , borderRadius:'8px'}}
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                  />
                  <img className="yot-form-group-icon-left" src={lockIcon} alt="" width="36px" />

                  <img className="yot-form-group-icon-right yot-cursor-pointer" src={showPasswordConfirm ? eyeIcon : eyeSlashIcon} alt="" width="36px" onClick={togglePasswordConfirmVisibility} />
                </div>

                {/* <!-- Submit --> */}
                <div className="yot-text-center">
                  <button className="yot-btn-black2" style={{border: "1px solid black"}}>Submit</button>
                </div>
              </form>
          </div>
        </div>
    </>
  )
}

export default UpdatePassword