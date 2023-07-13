import React from 'react';

// Images
import model1 from "../../images/model/girl-img1.jpg";
import model4 from "../../images/model/girl-img4.jpg";
import model7 from "../../images/model/girl-img7.jpg";
import model13 from "../../images/model/boy-img13.jpg";
import model16 from "../../images/model/girl-img16.jpg";
import model19 from "../../images/model/girl-img19.jpg";
import model22 from "../../images/model/girl-img22.jpg";


const HomeSection2 = () => {
  // Array of image sources
  const images = [model1, model4, model7, model13, model16, model19, model22];

  return (
    <>
      {/* Container */}
      <div className="yot-container yot-content-space-mt-120">
        {/* Title */}
        <div className="yot-mb-16">
          <h1>MODELS</h1>
          <p>
              Hugotero, the captivating clothing line, embraces the power of words and fashion, intertwining heartfelt expressions with stylish designs to create a truly impactful and unique apparel experience.
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
  );
};

export default HomeSection2;
