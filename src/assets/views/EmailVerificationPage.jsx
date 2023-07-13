import React from 'react'

import bgPage from '../images/bg-images/mockup/email-verification.jpg';
import EmailVerification from '../components/EmailVerification';

const VerificationEmail = () => {
  return (
    <>
        <div className='yot-bg'>
            <img src={bgPage} alt="" />
        </div>

        <EmailVerification />
    </>
  )
}

export default VerificationEmail