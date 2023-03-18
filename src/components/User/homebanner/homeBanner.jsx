import Carousel from 'react-bootstrap/Carousel';
import "./homeBanner.css"

function HomeBanner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="Banner w-100" src="../../../Images/Banner.webp" alt="First slide"/>
            <div className="carousel-caption d-none d-md-block">
                <h5 className='slideHeading'>We Care For You Most&#10084;</h5>
            </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanner;




