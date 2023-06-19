import { useEffect, useState } from "react";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import getImageUrl from "../../utilities/getImageUrl";

export interface Image {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
}

function ImagesList() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cacb30411807c228022540ec18bb323e&page=1&format=json&nojsoncallback=2`
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
      "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cacb30411807c228022540ec18bb323e&page=2&format=json&nojsoncallback=2"
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
      <ul>
        {images.map((image) => (
          <img src={getImageUrl(image)} alt={image.title} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}

export default ImagesList;
