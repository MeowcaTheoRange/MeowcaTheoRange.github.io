import { useEffect, useRef, useState } from "react";
import DescriptionArea from "./DescriptionArea";
import "./Gallery.css";

type GalleryIndex = {
  url: string;
  characters?: [string, string?][];
  title: string;
  description: string;
};

type GalleryFile = { base_uri: string; images: GalleryIndex[] };

const examplegalleryFile: GalleryFile = {
  base_uri: "",
  images: [
    {
      url: "/assets/pfp.png",
      title: "Loading...",
      description: "Loading gallery...",
    },
  ],
};

function GalleryPreview({
  image,
  images,
  fullscreen,
  setFullscreen,
  setImage,
}: {
  image: number;
  images: GalleryFile;
  fullscreen: boolean;
  setFullscreen: (x: boolean) => void;
  setImage: (x: number) => void;
}) {
  let currentImage = images?.images[image] ?? "";
  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") setImage(image - 1);
    if (event.key === "ArrowRight") setImage(image + 1);
    if (event.key === "Escape") setFullscreen(false);
  };
  return fullscreen ? (
    <div className="GalleryPreview" onClick={() => setFullscreen(false)}>
      <img
        src={images.base_uri + currentImage.url}
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
        <button onClick={() => setFullscreen(false)}>close</button>
        <button onClick={() => setImage(image - 1)}>chevron_left</button>
        <button onClick={() => setImage(image + 1)}>chevron_right</button>
        <span className="fw hideUsual">{currentImage.title}</span>
        <div className="pages">
          {image + 1}/{images.images.length}
        </div>
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

function Gallery({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [image, setImage] = useState(0);
  const [images, setImages] = useState(examplegalleryFile as GalleryFile);
  async function getImages() {
    setImages(await (await fetch(url)).json());
  }
  function setImgFunc(number: number) {
    if (number < 0) number = images.images.length - 1;
    else if (number > images.images.length - 1) number = 0;
    setImage(number);
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
  function openFullscreen(i: number) {
    setFullscreen(true);
    setImgFunc(i);
  }

  return (
    <>
      <div className="Gallery" ref={containerRef}>
        {images.images ? (
          images.images.map((x, i) => (
            <img
              key={i}
              src={images.base_uri + x.url}
              title={x.title + "\nDouble-click to open fullscreen"}
              alt={x.title}
              onDoubleClick={() => openFullscreen(i)}
              draggable="false"
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <GalleryPreview
        image={image}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        images={images}
        setImage={setImgFunc}
      />
    </>
  );
}

export default Gallery;
