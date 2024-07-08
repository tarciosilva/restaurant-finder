import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Skeleton from "../Skeleton";

const Container = styled.div`
  align-items: center;
  background-color: #fff;
  border-left: 5px solid transparent;
  display: flex;
  justify-content: space-around;
  opacity: ${(props) => (props.restaurant.opening_hours?.isOpen ? 1 : 0.2)};
  padding: 0.5rem;
  margin: 0.25rem 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    border-left: 5px solid ${(props) => props.theme.colors.primary};
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, border-left 1s linear;
  }
`;
const TextContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const TextTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TextContent = styled.p``;
const CardImage = styled.img`
  border-radius: 5px;
  display: ${(props) => (props.imageLoaded ? "block" : "none")});
  height: 120px;
  object-fit: cover;
  width: 120px;
`;

const Card = ({ restaurant, defaultImage, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Container onClick={onClick} restaurant={restaurant}>
      <TextContainer>
        <TextTitle>{restaurant.name}</TextTitle>
        <ReactStars
          count={5}
          size={24}
          activeColor="#ffd700"
          classNames="StarRating"
          isHalf
          value={restaurant.rating}
        />
        <TextContent>
          {restaurant.vicinity || restaurant.formatted_address}
        </TextContent>
      </TextContainer>
      <CardImage
        src={restaurant.photos ? restaurant?.photos[0].getUrl() : defaultImage}
        alt="restaurant photo"
        onLoad={() => setImageLoaded(true)}
        imageLoaded={imageLoaded}
      />
      {!imageLoaded && <Skeleton width={"120px"} height={"120px"} />}
    </Container>
  );
};

export default Card;
