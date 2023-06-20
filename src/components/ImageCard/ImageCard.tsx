import { styled } from "styled-components";
import getImageUrl from "../../utilities/getImageUrl";
import { Image } from "../ImagesList/ImagesList";
import { useState } from "react";

interface Props {
  image: Image;
}

const Wrapper = styled.div`
  box-shadow: 2px 2px #d1d3d2;
  position: relative;
`;

const CardContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  width: 50px;
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

function ImageCard({ image }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Wrapper
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && <CardContent>{image.title}</CardContent>}
      <CardImage src={getImageUrl(image)} alt={image.title} />
    </Wrapper>
  );
}

export default ImageCard;
