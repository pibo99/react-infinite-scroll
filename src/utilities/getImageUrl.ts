import { Image } from "../components/ImagesList/ImagesList";

const getImageUrl = (image: Image) => {
  return `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`;
}
export default getImageUrl