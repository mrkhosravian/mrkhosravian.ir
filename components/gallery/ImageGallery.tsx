import { FC, PropsWithChildren } from "react";
import ZoomableImg from "../partials/ZoomableImg";

interface Props {
  images: {
    src: string;
    alt: string;
  }[];
}

export const ImageGallery: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <div className={"grid grid-cols-4 gap-5"}
         style={{ gridTemplateRows: "masonry" }}>
      {
        props.images.map((image, i) => {
          return <ZoomableImg key={i} src={image.src} alt={image.alt} />;
        })
      }
    </div>
  );
};

export default ImageGallery;