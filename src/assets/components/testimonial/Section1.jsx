import React from 'react'

import Carousel from '../Carousel'

// Images
import model1 from "../../images/model/girl-img1.jpg";
import model2 from "../../images/model/girl-img2.jpg";
import model3 from "../../images/model/girl-img3.jpg";
import model4 from "../../images/model/girl-img4.jpg";
import model5 from "../../images/model/girl-img5.jpg";
import model6 from "../../images/model/girl-img6.jpg";
import model7 from "../../images/model/girl-img7.jpg";
import model8 from "../../images/model/girl-img8.jpg";
import model9 from "../../images/model/girl-img9.jpg";
import model13 from "../../images/model/boy-img13.jpg";
import model16 from "../../images/model/girl-img16.jpg";
import model19 from "../../images/model/girl-img19.jpg";
import model22 from "../../images/model/girl-img22.jpg";


const Section1 = () => {
  // Array of image sources
  const images = [model1, model2, model3, model4, model5, model6, model7, model8, model9, model13, model16, model19, model22];

  return (
    <>
      <div className='yot-content-space-mt-120 yot-container'>
          {/* Title */}
          <div className='yot-text-center yot-mb-48'>
            <h1 className='yot-mb-8'>Testimonial</h1>
            <p>Embrace Fashion with Hugotero: Where Style Meets Heartfelt Expression.</p>
          </div>
      </div>

      <div>
        <Carousel images={images} />
      </div>
    </>
  )
}

export default Section1