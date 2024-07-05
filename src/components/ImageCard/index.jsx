import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Skeleton from "../Skeleton";

const Card = styled.div`
  background-color: #000;
  background: center / cover no-repeat url(${(props) => props.photo});
  border-radius: 6px;
  height: 90px;
  padding: 0.25rem;
  letter-spacing: 0.15rem;
  width: 90px;
`;
const CardTitle = styled.span`
  color: #ffc;
  font-size: 1.05rem;
`;

const ImageCard = ({ photo, cardTitle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = photo;
  }, [photo]);
  return (
    <Fragment>
      {imageLoaded ? (
        <Card photo={photo}>
          <CardTitle>{cardTitle}</CardTitle>
        </Card>
      ) : (
        <Skeleton width={"90px"} height={"90px"} />
      )}
    </Fragment>
  );
};

export default ImageCard;
