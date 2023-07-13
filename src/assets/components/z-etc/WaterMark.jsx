import React from 'react'
import andreCausingLogo from '../images/logo/andre-causing-logo-text-grey.png';

const WaterMark = () => {
  return (
    <>
        <div className='yot-footer  yot-z-index-4'>
            <div className="yot-pa-16 yot-flex yot-flex-fd-c-ai-c">
              <a href="https://andrecausing.com/" target="_blank" rel="noopener noreferrer" className="yot-text-center yot-cursor-pointer">
                <img src={andreCausingLogo} alt="" width="36"/>
                <h5>Andre D. Causing</h5>
                <h6>Full Stack Web Developer</h6>
                <span className='yot-text-fs-t'>Web Designer, Computer Technician, Graphic Artist and Video Editor.</span>
              </a>
            </div>
        </div>
    </>
  )
}

export default WaterMark