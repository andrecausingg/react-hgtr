import React from 'react'

import bgPage from '../images/bg-images/mockup/update-password.jpg';
import UpdatePassword from '../components/UpdatePassword';

const UpdatePasswordPage = () => {
  return (
    <>
        <div className='yot-bg'>
            <img src={bgPage} alt="" />
        </div>

        <UpdatePassword />
    </>
  )
}

export default UpdatePasswordPage