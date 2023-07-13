import React from 'react'

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
      {/* Container */}
      <div className="yot-container yot-content-space-mt-120">
        {/* Title */}
        <div className="yot-mb-16 yot-text-center">
          <h1>Look Book</h1>
          <p>
            Hugotero, the fashionable clothing line, seamlessly blends style and emotion, allowing you to express your deepest sentiments through trendy apparel.
          </p>
        </div>
        {/* Grid Container */}
        <div className="grid-container-1csm-2cm-4cl">
          {images.map((image, index) => (
            <div key={index} style={{ height: "300px", overflow: "hidden", borderRadius: "16px" }}>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Section1