import { useEffect, useRef, useState } from "react";
import "./Gallery.css";

type GalleryIndex = {
  url: string;
  characters?: [string, string?][];
  title: string;
  description: string;
  date: string;
  content_warning?: string;
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
  return (
    <div className="imageThingy" onDoubleClick={() => screenControls(image)}>
      <img
        src={image_url + image.url}
        title={image.title + "\nDouble-click to open fullscreen"}
        alt={image.title}
        draggable="false"
        className={
          image.content_warning != null && image.content_warning !== ""
            ? "cw"
            : ""
        }
      />
      {image.content_warning != null && image.content_warning !== "" ? (
        <span className="cw">
          <b>Content Warning:</b>
          <br />
          {image.content_warning}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

function Gallery({ url, image_url }: { url: string; image_url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerButtonRef = useRef<HTMLButtonElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [image, setImage] = useState({} as GalleryIndex);
  const [images, setImages] = useState([] as GalleryIndex[]);
  const [loading, setLoading] = useState(false);
  const page = useRef(0);
  const stopUpdating = useRef(false);
  let x = 0;
  async function getImages() {
    const getImages = await (await fetch(url + page.current)).json();
    if (getImages.length < 5) stopUpdating.current = true;
    setImages(images.concat(getImages));
  }
  useEffect(() => {
    getImages().then(() => setLoading(false));
  }, [page.current]);
  useEffect(() => {
    const container = containerRef.current;
    if (container == null) return;
    const containerButton = containerButtonRef.current;
    if (containerButton == null) return;
    var prevMousePosX = 0;
    var prevScrollLeft = 0;
    // @ts-ignore
    container.onmousemove = function (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
      if (event.buttons === 1) {
        container.scrollLeft += prevMousePosX - event.clientX;
      }
      prevMousePosX = event.clientX;
    };
    function doLoading() {
      if (container == null) return;
      console.log("ok loading");
      page.current += 1;
      setLoading(true);
    }
    // @ts-ignore
    container.onscrollend = function () {
      if (
        container.offsetWidth + container.scrollLeft >= container.scrollWidth &&
        !loading &&
        !stopUpdating.current
      ) {
        doLoading();
      }
    };
    containerButton.onclick = doLoading;
  }, []);
  function openFullscreen(image: GalleryIndex) {
    setFullscreen(true);
    setImage(image);
  }

  return (
    <>
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
            {stopUpdating.current ? (
              <></>
            ) : (
              <button
                ref={containerButtonRef}
                className="material-symbols-outlined"
              >
                chevron_right
              </button>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <GalleryPreview
        image={image}
        image_url={image_url}
        fullscreen={[fullscreen, setFullscreen]}
      />
    </>
  );
}

export default Gallery;
