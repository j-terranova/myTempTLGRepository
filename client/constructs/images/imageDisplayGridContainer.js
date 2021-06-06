import React from 'react'

import ImageDisplayHeader from './imageDisplayHeader'
import ImageDisplayGridList from './imageDisplayGridList'

const ImageDisplayGridContainer = (props) => {
    const {setOpenImageDisplayGridPopup} = props;
    const {imageDetailListing} = props;
    const {handleRequestSelectImage}=props;
    console.log ("ImageDisplayGridContainer - Start");
    console.log ("ImageDisplayGridContainer - imageDetailListing = ", imageDetailListing);
    return (
      <div>
        <ImageDisplayHeader />
        <ImageDisplayGridList 
         imageDetailListing = {imageDetailListing} 
         setOpenImageDisplayGridPopup={setOpenImageDisplayGridPopup}
         handleRequestSelectImage={handleRequestSelectImage}
          />
      </div>
    );
}

export default ImageDisplayGridContainer;