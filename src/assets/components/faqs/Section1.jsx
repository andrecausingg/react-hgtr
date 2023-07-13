import React, { useState } from 'react';

// Images
import angleRightIcon from '../../images/icons/angle-down-solid.svg';

const FAQItem = ({ question, answer }) => {
  const [isShow, setShow] = useState(false);

  const handleClickAngleDown = () => {
    setShow(!isShow);
  };

  return (
    <div className='yot-bg-white yot-pa-16 yot-mb-8'>
      <div className='yot-flex yot-flex-ai-c-jc-sb'>
        <h4>{question}</h4>
        <img
          src={angleRightIcon}
          alt=""
          style={{ width: "16px" }}
          onClick={() => handleClickAngleDown()}
          className={`yot-ml-4 yot-flex yot-flex-ai-c yot-icon-angle yot-cursor-pointer ${isShow ? 'yot-icon-angle-rotate-90-deg' : ''}`}
        />
      </div>
      <div className={`yot-mt-8 ${isShow ? 'yot-hidden' : ''}`}>
        <span>{answer}</span>
      </div>
    </div>
  );
};

const Section1 = () => {
  return (
    <>
      <div className='yot-content-space-mt-120 yot-container'>
        {/* Title */}
        <div className='yot-text-center yot-mb-48'>
          <h4>FAQs</h4>
          <h1 className='yot-mb-8'>Frequently asked question</h1>
          <p>Have questions? We're here to help.</p>
        </div>

        <FAQItem
          question="Is there free T-shirt available?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, esse beatae. Earum, saepe iure excepturi ipsa dolorem velit consequatur error odio animi a, unde voluptates facere accusamus quasi, quisquam et?"
        />

        <FAQItem
          question="Is there free T-shirt available?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, esse beatae. Earum, saepe iure excepturi ipsa dolorem velit consequatur error odio animi a, unde voluptates facere accusamus quasi, quisquam et?"
        />

        <FAQItem
          question="Is there free T-shirt available?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, esse beatae. Earum, saepe iure excepturi ipsa dolorem velit consequatur error odio animi a, unde voluptates facere accusamus quasi, quisquam et?"
        />
      </div>
    </>
  );
};

export default Section1;
