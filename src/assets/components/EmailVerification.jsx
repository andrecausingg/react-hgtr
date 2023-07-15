import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerificationForm = () => {
  const [code, setCode] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isShowBtn, setIsShowBtn] = useState(true);
  const [isCodeEmpty, setCodeEmpty]  = useState(false);
  const [isCodeSent, setCodeSent]  = useState(false);
  const [isCodeWrong, setCodeWrong]  = useState(false);


  // Check token to verify Email
  useEffect(() => {
    // Retrieve data from sessionStorage
    const email = sessionStorage.getItem('email');
    const emailVerifyToken = sessionStorage.getItem('emailVerifyToken');

    if (email !== null && emailVerifyToken !== null) {
      axios
        .get('http://127.0.0.1:8000/api/email-verify-token-is-exist', {
          params: {
            email: email,
            emailVerifyToken: emailVerifyToken
          }
        })
        .then(response => {
          const { data } = response;
          if (data === 'badToken') {
            window.location.href = '/react-hgtr/';
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
            const errorMessages = error.response.data.errors;
            console.log(errorMessages.email);
            // Handle other error messages if needed
          } else {
            console.error('An error occurred during the request.');
          }
        });
    }
    else {
      window.location.href = '/react-hgtr/';
    }
  }, []); // Empty dependency array to run the effect only once

  const handleResendClick = () => {
    let maxResendCount = parseInt(localStorage.getItem('resendCount')) || 0;
    let defaultTime = 25;
  
    if (maxResendCount <= 1) {
      maxResendCount++;
      localStorage.setItem('resendCount', maxResendCount.toString());
    } else {
      let storedResendIncSec = parseInt(localStorage.getItem('resendIncSec')) || 0;
      if (!isNaN(storedResendIncSec)) {
        let plusFiveSec = storedResendIncSec + 5;
        let countNowStoreSec = defaultTime + plusFiveSec;
        if (plusFiveSec >= 180) {
          localStorage.setItem('resendIncSec', 'stop');
          setResendTimer(countNowStoreSec);
        } else {
          localStorage.setItem('resendIncSec', plusFiveSec.toString());
          setResendTimer(countNowStoreSec);
        }
        setIsShowBtn(false);
      } else {
        let plusFiveSec = 5;
        localStorage.setItem('resendIncSec', plusFiveSec.toString());
        setResendTimer(defaultTime);
        setIsShowBtn(false);
      }
    }
  };
  
  useEffect(() => {
    let timer = null;
    let storedResendTimer = parseInt(localStorage.getItem('resendTimer'));
  
    const startCountdown = () => {
      formatTime(storedResendTimer);
      timer = setInterval(() => {
        setResendTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(timer);
            setIsShowBtn(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    };
  
    // Display the time if refresh the page
    if (!isNaN(storedResendTimer)) {
      setResendTimer(storedResendTimer);
      setIsShowBtn(false);
      startCountdown();
    }
  
    if (!isNaN(storedResendTimer) && storedResendTimer === 1) {
      setIsShowBtn(true);
      setResendTimer();
    }
  
    return () => {
      clearInterval(timer);
    };
  }, [resendTimer]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    localStorage.setItem('resendTimer', secs);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle Code
  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    const numbersOnly = inputValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    setCode(numbersOnly);

    if(numbersOnly !== ''){
      setCodeEmpty(false);
      setCodeWrong(false);
    } 
  };

  // Form Verification Code
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem('email');
    const emailVerifyToken = sessionStorage.getItem('emailVerifyToken');

    if(code === '') setCodeEmpty(true)

    if(email !== null  && emailVerifyToken !== null && code !== ''){
        const email = sessionStorage.getItem('email');
        const emailVerifyToken = sessionStorage.getItem('emailVerifyToken');

        console.log(email);
        console.log(emailVerifyToken);


        // Send Verification Code
        axios
        .put('http://127.0.0.1:8000/api/verify-email', {
          email: email,
          emailVerifyToken: emailVerifyToken,
          code: code
        })
        .then((response) => {
          console.log(response.data.message);
          // Handle the response from the API
          // For example, update the UI or perform any other desired action
          if (response.data.message === "verified") {
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('emailVerifyToken');
            window.location.href = '/react-hgtr/';
          }else{
            setCodeWrong(true);
          }
        })
        .catch(error => {
          const { response } = error;
          const { data } = response;
          console.log(data);
        });

        setCodeEmpty(false)
    }
  };

  return (
    <>
      <div className="yot-overlay-mid-container yot-z-index-4 yot-fade-in">
        <div
          className="yot-overlay-mid-child yot-bg-white yot-pa-16 form-width-m-400"
          style={{ borderRadius: '8px' }}
        >
          <div className="yot-mb-8 yot-text-center">
            <h3>Email Verification</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="yot-flex yot-flex-ai-c-jc-sb yot-mb-8">
              <label htmlFor="verificationCode">
                <b>Verification Code</b>
              </label>
              {isShowBtn && (
                <button
                  className="yot-btn-black2 yot-text-fs-t"
                  style={{ border: '1px solid black' }}
                  onClick={handleResendClick}
                >
                  Resend
                </button>
              )}
              {resendTimer > 0 ? (
                <span className="yot-text-fs-xsm">Resend After {formatTime(resendTimer)}</span>
              ) : null}
            </div>
            <div className="yot-flex yot-flex-fd-c-ai-c-jc-c">
              {isCodeSent && (
                <span className="yot-tc-green"> Verification code has been sent. </span>
              )}
              {isCodeWrong && (
                <span className="yot-tc-red"> Invalid verification code.</span>
              )}
              {isCodeEmpty && (
                <span className="yot-tc-red">The Verification Code field is required.</span>
              )}
            </div>
            <div className="yot-form-group">
              <input
                className={`yot-form-input yot-text-center
                      ${isCodeEmpty === true ? 'yot-form-input-bad' : ''} 
                      ${isCodeWrong === true ? 'yot-form-input-bad' : ''} 
                      ${code !== '' ? 'yot-form-input-good' : ''} 
                  `}
                type="text"
                style={{borderRadius:'8px'}}
                maxLength={6}
                value={code}
                onChange={handleCodeChange}
              />
            </div>
            <div className="yot-text-center">
              <button className="yot-btn-black2" style={{ border: '1px solid black' }} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerificationForm;
