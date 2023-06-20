import { useEffect, useState } from "react";
import ImageCard from "../ImageCard/ImageCard";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import { styled } from "styled-components";

export interface Image {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
  padding: 1rem;
`;

function ImagesList() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cacb30411807c228022540ec18bb323e&tags=cats&page=${currentPage}&format=json&nojsoncallback=1`
    )
      .then((res) =>
        res.json().then((data) => {
          setImages(data.photos.photo);
        })
      )
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const loadMoreImages = () => {
    setCurrentPage((page) => page + 1);
    setIsLoading(true);
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cacb30411807c228022540ec18bb323e&tags=cats&page=${currentPage}&format=json&nojsoncallback=1`
    )
      .then((res) =>
        res.json().then((data) => {
          setIsLoading(false);
          setImages((prevImages) => [...prevImages, ...data.photos.photo]);
        })
      )
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <InfiniteScroll
      isLoading={isLoading}
      onBottomHit={loadMoreImages}
      loadOnMount
    >
      <Wrapper>
        {images.map((image) => (
          <ImageCard image={image} />
        ))}
      </Wrapper>
    </InfiniteScroll>
  );
}

export default ImagesList;
