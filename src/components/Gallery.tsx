import { useEffect, useRef, useState } from "react";
import DescriptionArea from "./DescriptionArea";
import "./Gallery.css";

type GalleryIndex = {
  url: string;
  characters?: [string, string?][];
  title: string;
  description: string;
};

type GalleryFile = { base_uri: string; image_uri: string; images: string[] };

function GalleryPreview({
  image,
  base_uri,
  base_image_uri,
  fullscreen,
}: {
  image: GalleryIndex;
  base_uri: string;
  base_image_uri: string;
  fullscreen: [boolean, (x: boolean) => void];
}) {
  const [fs, setFs] = fullscreen;
  let currentImage = image;
  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") setFs(false);
  };
  return fs ? (
    <div className="GalleryPreview" onClick={() => setFs(false)}>
      <img
        src={base_image_uri + currentImage.url}
        title={currentImage.title}
        alt={currentImage.title}
        onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) =>
          e.stopPropagation()
        }
        draggable="false"
      />
      <div
        className="topBar"
        onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <button onClick={() => setFs(false)}>close</button>
        <span className="fw hideUsual">{currentImage.title}</span>
      </div>
      <div
        className="bottomSheetHolder"
        onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <div className="bottomSheet">
          <DescriptionArea>{`# ${currentImage.title}
${
  currentImage.characters
    ? `Character${
        currentImage.characters.length > 1 ? "s" : ""
      }: ${currentImage.characters
        .map((v) => `${v[1] ? "*" + v[1] + "'s* " : ""}${v[0]}`)
        .join(", ")}`
    : ""
}

${currentImage.description}`}</DescriptionArea>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function Image({
  imagename,
  base_uri,
  base_image_uri,
  screenControls,
}: {
  imagename: string;
  base_uri: string;
  base_image_uri: string;
  screenControls: (x: GalleryIndex) => void;
}) {
  const [image, setImage] = useState({} as GalleryIndex);
  async function getImage() {
    setImage(await (await fetch(base_uri + imagename + ".json")).json());
  }
  useEffect(() => {
    getImage();
  }, [imagename]);
  return image.title ? (
    <img
      src={base_image_uri + image.url}
      title={image.title + "\nDouble-click to open fullscreen"}
      alt={image.title}
      onDoubleClick={() => screenControls(image)}
      draggable="false"
    />
  ) : (
    <></>
  );
}

function Gallery({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [image, setImage] = useState({} as GalleryIndex);
  const [images, setImages] = useState({} as GalleryFile);
  const minOpenness = 5;
  const [openness, setOpenness] = useState(0);
  async function getImages() {
    setImages(await (await fetch(url)).json());
  }
  useEffect(() => {
    getImages();
    const container = containerRef.current;
    if (container == null) return;
    var prevMousePosX = 0;
    // @ts-ignore
    container.onmousemove = function (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
      if (event.buttons === 1) {
        container.scrollLeft += prevMousePosX - event.clientX;
      }
      prevMousePosX = event.clientX;
    };
  }, []);
  function openFullscreen(image: GalleryIndex) {
    setFullscreen(true);
    setImage(image);
  }

  return (
    <>
      <div className="GalleryButtons">
        <button
          className="special_disabled"
          onClick={() => setOpenness(openness - minOpenness)}
          disabled={openness <= 0}
        >
          {openness <= minOpenness ? "Close" : "See Less"}
        </button>
        <button
          className="special_disabled"
          onClick={() => setOpenness(openness + minOpenness)}
          disabled={openness >= (images.images?.length ?? 0)}
        >
          {openness <= 0 ? "Open" : "See More"}
        </button>
      </div>
      <div
        className={`Gallery ${openness <= 0 ? "closed" : ""}`}
        ref={containerRef}
      >
        {images.images ? (
          <>
            {images.images
              .slice(openness - minOpenness, openness)
              .map((x, i) => (
                <Image
                  key={i}
                  imagename={x}
                  base_uri={images.base_uri}
                  base_image_uri={images.image_uri}
                  screenControls={openFullscreen}
                />
              ))}
            <GalleryPreview
              base_uri={images.base_uri}
              base_image_uri={images.image_uri}
              image={image}
              fullscreen={[fullscreen, setFullscreen]}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Gallery;
