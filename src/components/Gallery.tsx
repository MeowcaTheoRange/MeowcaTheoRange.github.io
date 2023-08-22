import { useEffect, useRef, useState } from "react";
import "./Gallery.css";

type GalleryIndex = {
  url: string;
  characters?: [string, string?][];
  title: string;
  description: string;
  date: string;
};

function GalleryPreview({
  image,
  image_url,
  fullscreen,
}: {
  image: GalleryIndex;
  image_url: string;
  fullscreen: [boolean, (x: boolean) => void];
}) {
  const [fs, setFs] = fullscreen;
  window.onkeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") setFs(false);
  };
  return fs ? (
    <div className="GalleryPreview" onClick={() => setFs(false)}>
      <img
        src={image_url + image.url}
        title={image.title}
        alt={image.title}
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
        <span className="fw hideUsual">{image.title}</span>
      </div>
      <div
        className="bottomSheetHolder"
        onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <div className="bottomSheet">
          <h1>{image.title}</h1>
          <p>
            {image.characters ? (
              <span>
                Character{image.characters.length > 1 ? "s" : ""}:{" "}
                {image.characters
                  .map((v) => `${v[1] ? `${v[1]}'s ` : ""}${v[0]}`)
                  .join(", ")}
              </span>
            ) : (
              <></>
            )}
            <span> • </span>
            <span>Created {new Date(image.date).toLocaleDateString()}</span>
          </p>
          <p>{image.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function Image({
  image,
  image_url,
  screenControls,
}: {
  image: GalleryIndex;
  image_url: string;
  screenControls: (x: GalleryIndex) => void;
}) {
  return image.title ? (
    <img
      src={image_url + image.url}
      title={image.title + "\nDouble-click to open fullscreen"}
      alt={image.title}
      onDoubleClick={() => screenControls(image)}
      draggable="false"
    />
  ) : (
    <></>
  );
}

function Gallery({ url, image_url }: { url: string; image_url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [image, setImage] = useState({} as GalleryIndex);
  const [images, setImages] = useState([] as GalleryIndex[]);
  const [page, setPage] = useState(0);
  async function getImages() {
    setImages(await (await fetch(url + page)).json());
    console.log(images);
  }
  useEffect(() => {
    getImages();
  }, [page]);
  useEffect(() => {
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
          onClick={() => setPage(page - 1)}
          disabled={page <= 0}
        >
          See Less
        </button>
        <button disabled>Page {page}</button>
        <button
          className="special_disabled"
          onClick={() => setPage(page + 1)}
          disabled={images.length < 5}
        >
          See More
        </button>
      </div>
      <div className={`Gallery`} ref={containerRef}>
        {images ? (
          <>
            {images.map((x, i) => (
              <Image
                key={i}
                image={x}
                image_url={image_url}
                screenControls={openFullscreen}
              />
            ))}
            <GalleryPreview
              image={image}
              image_url={image_url}
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
