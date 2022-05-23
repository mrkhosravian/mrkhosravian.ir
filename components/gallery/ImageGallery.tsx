import { FC, PropsWithChildren } from "react";
import Zoom from "next-image-zoom";
import { useTheme } from "next-themes";

interface Props {
  images: {
    src: string;
    alt: string;
  }[];
}

export const ImageGallery: FC<PropsWithChildren<Props>> = (props) => {

  const theme = useTheme();

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"}
         style={{ gridTemplateRows: "masonry" }}>
      {
        props.images.map((image, i) => {
          return (
            <div className={"w-full"} style={{ aspectRatio: "1 / 1" }} key={i}>
              <Zoom src={image.src} alt={image.alt} layout={"fill"}
                    objectFit={"contain"} zoomPercentage={100}
                    backgroundColor={theme.theme === "light" ? "white" : "black"}
                    backgroundOpacity={1} />
            </div>
          );
        })
      }
    </div>
  );
};

export default ImageGallery;