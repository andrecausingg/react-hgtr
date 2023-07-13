import React from 'react'

// Images Icon
import envelopeIcon from '../../images/icons/envelope-solid.svg';

const Section1 = () => {
  return (
    <>
        <div className='yot-content-space-mt-120 yot-container'>
            {/* Title */}
            <div className='yot-text-center yot-mb-48'>
              <h1 className='yot-mb-8'>Contact Us</h1>
              <p>Please feel free to contact us for any inquiries or assistance you may require.</p>
            </div>

            <div className='yot-row yot-bg-white yot-pa-16 form-width-m-700' style={{margin:"auto"}}>
              <div className='yot-row-m yot-mb-8'>
                  {/* <!-- First Name --> */}
                  <div className="yot-form-group yot-col-50">
                      <input
                        className="yot-form-input"
                        type="email"
                        required
                        placeholder='First Name'
                      />
                  </div>

                    {/* <!-- Last Name --> */}
                    <div className="yot-form-group yot-col-50">
                      <input
                        className="yot-form-input"
                        type="email"
                        required
                        placeholder='Last Name'
                      />
                  </div>
              </div>

              <div className='yot-row-m yot-mb-8'>
                  {/* <!-- Email --> */}
                  <div className="yot-form-group yot-form-group-container yot-col-100">
                      <input
                        className="yot-form-input"
                        type="email"
                        style={{paddingLeft: '38px'}}
                        required
                        placeholder='Email'
                      />
                      <img className="yot-form-group-icon-left" src={envelopeIcon} alt="" width="36px" />
                  </div>
              </div>

              {/* Message */}
              <div className='yot-row-m'>
                <div className='yot-col-100'>
                  <textarea 
                    className='yot-form-input'
                    style={{resize: "none"}} 
                    cols="30" 
                    rows="10" 
                    required 
                    placeholder='Message'
                  />
                </div>
              </div>
              
              {/* <!-- Submit --> */}
              <div className="yot-text-center">
                <button className="yot-btn-black2" style={{border: "1px solid black"}}>Sign Up</button>
              </div>
          </div>
        </div>
    </>
  )
}

export default Section1