import React,{useState} from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import "./avatarslider.css"

const _logger = debug.extend("avaSlides")

const AvatarCarousel = (props) => {
    const image = props.images
    const [currentIndex,setCurrentIndex]= useState(0);
    const onClickPrev =()=>{
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? image.length - 1 : currentIndex -1
        setCurrentIndex(newIndex);
    }
    const onClickNext=()=>{
        const isLastImage = currentIndex === image.length -1;
        const newIndex = isLastImage ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }
    const onClickSubmit =()=>{
      _logger("submitted url",image[currentIndex].url )
      return (image[currentIndex].url)
    }
  return (
    <React.Fragment>
      <div className="avatar_container">
        <div className="leftArrow_style" onClick={onClickPrev}>
          &#10094;
        </div>
        <div className="rightArrow_style" onClick={onClickNext}>
          &#10095;
        </div>
        <img
          className="avatar_slide"
          src={image[currentIndex].url}
          key={image[currentIndex].id}
          alt=""
        />
      </div>
      <button type="btn" className="avatar_button_submit mt-5" onClick={onClickSubmit}>
        Submit
      </button>
    </React.Fragment>
  );
}
AvatarCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

export default AvatarCarousel;