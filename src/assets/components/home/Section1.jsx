import imgSlider5 from '../../images/bg-images/carousel/img-slider-5.jpg'

const HomeSection1 = () => {
  return (
    <>
      <div className='yot-text-center'>
        <div className='yot-mt-48'>
          <img src={imgSlider5} alt="Image 1" style={{width:"100%", height:"100%",objectFit:"cover"}}/>
        </div>
      </div>
    </>
  );
}

export default HomeSection1