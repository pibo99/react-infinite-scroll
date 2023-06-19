import { styled } from "styled-components";
import getImageUrl from "../../utilities/getImageUrl";
import { Image } from "../ImagesList/ImagesList";

interface Props {
  image: Image;
}

const Wrapper = styled.div`
  box-shadow: 2px 2px #d1d3d2;
`;

const CardContent = styled.div``;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

function ImageCard({ image }: Props) {
  return (
    <Wrapper>
      <CardImage src={getImageUrl(image)} alt={image.title} />
      <CardContent />
    </Wrapper>
  );
}

export default ImageCard;
