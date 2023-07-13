import emptyImage from '../images/404.svg';

const NotFound = () => {
  return (
    <>
      <div className="yot-overlay-mid-container">
          <div className="yot-overlay-mid-child yot-flex yot-flex-fd-c-ai-c form-width-m-700">
              <img src={emptyImage} alt="" width="500" />
              <h3 className="yot-text-center">Sorry, the page you are looking for cannot be found. Please check the URL and try again.</h3>
          </div>
      </div>
    </>
  )
}

export default NotFound