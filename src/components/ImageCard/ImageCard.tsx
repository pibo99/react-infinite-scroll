import { styled } from "styled-components";
import getImageUrl from "../../utilities/getImageUrl";
import { Image } from "../ImagesList/ImagesList";
import { useEffect, useState } from "react";

interface Props {
  image: Image;
}

const Wrapper = styled.div`
  box-shadow: 3px 3px #d1d3d2;
  position: relative;
  border-radius: 6px;
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

const ImageDescription = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }
`;

const ImageTitle = styled.span`
  font-size: 2rem;
  text-decoration: underline;
`;

const ImageAuthor = styled.span`
  font-size: 1.25rem;
`;

const FavouriteButton = styled.button`
  border: 1px solid white;
  padding: 14px 28px;
  font-size: 16px;
  background: none;
  color: white;
  cursor: pointer;
  border-radius: 23px;
  font-weight: bold;
  margin-top: 16px;
`;

function formatImageTitle(title: Image["title"]): string {
  return title.length > 20 ? title.substring(0, 20) + "..." : title;
}

function ImageCard({ image }: Props) {
  const [isFavourite, setIsFavourite] = useState<boolean>();
  useEffect(() => {
    const item = localStorage.getItem("image" + image.id);
    if (item) {
      setIsFavourite(true);
    }
  });

  return (
    <Wrapper>
      <CardImage src={getImageUrl(image)} alt={image.title} />
      <ImageDescription>
        <ImageTitle>{formatImageTitle(image.title) || "No title"}</ImageTitle>
        <ImageAuthor>nick debris</ImageAuthor>
        <FavouriteButton
          onClick={() => {
            localStorage.setItem("image" + image.id, "true");
            setIsFavourite(true);
          }}
        >
          {isFavourite ? <span>Saved!</span> : <span>Favourite</span>}
        </FavouriteButton>
      </ImageDescription>
    </Wrapper>
  );
}

export default ImageCard;
