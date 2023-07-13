import React, { useState } from 'react';

// Images Icon
import angleLeft from '../images/icons/angle-left-solid.svg';
import angleRight from '../images/icons/angle-right-solid.svg';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="yot-container">
      <div className="yot-flex yot-flex-ai-c-jc-c yot-pa-16" style={{ overflow: 'hidden' }}>
        <div className="yot-mr-16">
          <img
            className="yot-cursor-pointer"
            onClick={handlePrevious}
            src={angleLeft}
            alt=""
            style={{ width: '24px' }}
          />
        </div>

        <div
          className="form-width-m-700 yot-relative"
          style={{ maxHeight: '500px', width: '300px', overflow: 'hidden', borderRadius: '8px' }}
        >
          <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />

          {/* Text overlay */}
          <div className="yot-absolute yot-bg-black2 yot-pa-16" style={{ bottom: 0, right: 0, left: 0 }}>
            <p className="yot-text-center yot-tc-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur sunt quidem sit, </p>
          </div>
        </div>

        <div className="yot-ml-16">
          <img
            className="yot-cursor-pointer"
            onClick={handleNext}
            src={angleRight}
            alt=""
            style={{ width: '24px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;