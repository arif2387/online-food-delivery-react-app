import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledCarouselContainer = styled.div`
 box-sizing: border-box;
  width: 100%;
  margin:0 auto;
  padding: 0 6rem 0 6rem;
`;

const StyledHeader = styled.div`
  h1 {
    margin: 2rem 0;
    padding: 0;
  }
`;

const StyledCarouselWrapper = styled.div`
  .offer-card-container {
    height: 20rem;
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    position: relative;
    margin: 0 auto;

    &::-webkit-scrollbar {
      display: none;
    }

    img {
      height: 100%;
    }
  }
`;

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/731031544495581f1d6884624aa3ecf5",
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/d59fb2bd4af3a0850d426a658172f899",
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/071d07e5d5deb5e3da47feef18fb14fc",
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/4bb5e5e0ff6ee6d8465bb57a439085c1",
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/3057f3335c3ed7c84370f98fa3c34220",
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/7b9223e91eecfba8be24c32b692170af",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [carouselImages.length]);

  const rotatedImages = [
    ...carouselImages.slice(currentImageIndex),
    ...carouselImages.slice(0, currentImageIndex)
  ];

  return (
    <StyledCarouselContainer className="carousel-container">
      <StyledHeader className="header">
        <h1>Best offers for you</h1>
      </StyledHeader>
      <StyledCarouselWrapper className="carousel-wrapper">
        <div className="offer-card-container">
          {rotatedImages.map((image, index) => (
            <img key={index} src={image} alt="" />
          ))}
        </div>
      </StyledCarouselWrapper>
    </StyledCarouselContainer>
  );
};

export default Carousel;
