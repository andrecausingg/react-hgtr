// Images
import product1 from "../../images/products/babaero.jpg";
import product2 from "../../images/products/buwisit.jpg";
import product3 from "../../images/products/filipino.jpg";
import product4 from "../../images/products/filipino.jpg";


const HomeSection3 = () => {
  return (
    <>
    <div className="yot-pa-16 yot-content-space-mt-120 yot-container">
        {/* Title */}
        <div className="yot-mb-16">
            <h1>LATEST PRODUCTS</h1>
            <p>The latest product to hit the market is a cutting-edge smartwatch that combines sleek design with advanced health tracking features.</p>
          </div>
        {/* Grid Container */}
        <div className='grid-container-1csm-2cm-4cl' style={{overflow:"hidden"}}>

          {/* Item */}
          <div 
            style={{height:"300px", overflow:"hidden"}}
            className="yot-bg-white1"  
          >
            <img src={product1} alt="" />
            <div></div>
          </div>

          <div style={{height:"300px", overflow:"hidden"}}>
            <img src={product2} alt="" />
          </div>

          <div style={{height:"300px", overflow:"hidden"}}>
            <img src={product3} alt="" />
          </div>

          <div style={{height:"300px", overflow:"hidden"}}>
            <img src={product4} alt="" />
          </div>


          <div 
            style={{height:"300px", overflow:"hidden"}}
            className="yot-bg-white1"  
          >
            <img src={product1} alt="" />
            <div></div>
          </div>

          <div style={{height:"300px", overflow:"hidden"}}>
            <img src={product2} alt="" />
          </div>

          <div style={{height:"300px", overflow:"hidden"}}>
            <img src={product3} alt="" />
          </div>

          <div style={{height:"300px", overflow:"hidden"}}>
            <img src={product4} alt="" />
          </div>
        </div>
    </div>
    </>
  );
}

export default HomeSection3