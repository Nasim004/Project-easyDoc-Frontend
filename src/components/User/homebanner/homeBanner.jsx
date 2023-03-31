import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function HomeBanner() {
  return (
<MDBCarousel showControls dealy={3000}>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='../../../Images/banner.png'
        alt='...'
        style={{height:"400px"}}
      />
    </MDBCarousel>
  );
}

export default HomeBanner;
