import React, { useState, useEffect } from 'react';

const VerificationForm = () => {
  const [code, setCode] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isShowBtn, setIsShowBtn] = useState(true);

  const handleResendClick = () => {
    let maxResendCount = parseInt(localStorage.getItem('resendCount')) || 0;
    let defaultTime = 30;
  
    if (maxResendCount <= 1) {
      maxResendCount++;
      localStorage.setItem('resendCount', maxResendCount.toString());
    } else {
      let storedResendIncSec = parseInt(localStorage.getItem('resendIncSec')) || 0;
      if (!isNaN(storedResendIncSec)) {
        let plusFiveSec = storedResendIncSec + 5;
        let countNowStoreSec = defaultTime + plusFiveSec;
        localStorage.setItem('resendIncSec', plusFiveSec.toString());
        setResendTimer(countNowStoreSec);
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
    if (!isNaN(storedResendTimer)){
      setResendTimer(storedResendTimer);
      setIsShowBtn(false);
      startCountdown();
    }
    
    if(!isNaN(storedResendTimer) && storedResendTimer == 1){
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

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
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
              <span className="yot-tc-green" style={{ display: 'none' }}>
                Verification code has been sent.
              </span>
              <span className="yot-tc-red" style={{ display: 'none' }}>
                Invalid verification code.
              </span>
            </div>
            <div className="yot-form-group">
              <input
                className="yot-form-input"
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
