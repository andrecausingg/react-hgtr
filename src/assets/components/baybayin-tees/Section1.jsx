
// Images
import product1 from "../../images/products/babaero.jpg";
import product2 from "../../images/products/buwisit.jpg";
import product3 from "../../images/products/filipino.jpg";
import product4 from "../../images/products/filipino.jpg";

const Section1 = () => {
  return (
    <>
        {/* Title */}
        <div className="yot-text-center">
            <h1 className="yot-content-space-mt-120"><b>#HugotMoSuotMo</b></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis aperiam provident labore atque, <br /> fuga adipisci qui officia recusandae est.</p>

            <h1 className="yot-mt-48"><b>Baybayin Tees</b></h1>
        </div>

        <div className="yot-pa-16 yot-content-space-mt-80 yot-container">
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
  )
}

export default Section1