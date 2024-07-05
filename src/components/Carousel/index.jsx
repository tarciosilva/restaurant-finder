import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageCard from "../ImageCard";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  max-width: 400px;
`;

const Carousel = ({ restaurants, defaultImage }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
  };
  return (
    <Container className="slider-container">
      <Slider {...settings}>
        {restaurants.map((restaurant) => {
          return (
            <ImageCard
              key={restaurant.plus_code.global_code}
              photo={
                restaurant.photos ? restaurant?.photos[0].getUrl() : defaultImage
              }
              cardTitle={restaurant.name}
            />
          );
        })}
      </Slider>
    </Container>
  );
};

export default Carousel;
