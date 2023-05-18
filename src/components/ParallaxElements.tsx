import { useRef, useEffect, useState } from "react";
import "./ParallaxElements.css";

type Project = {
  dir: string;
  fg_max: number;
  repeatRules: [string, number?][];
};

var projectArray: Project[] = [
  {
    dir: "/assets/projects/trollcall/",
    fg_max: 1,
    repeatRules: [["no-repeat", -0.55]],
  },
  {
    dir: "/assets/projects/trollcall_next/",
    fg_max: 0,
    repeatRules: [["no-repeat"]],
  },
  {
    dir: "/assets/projects/test/",
    fg_max: 4,
    repeatRules: [
      ["repeat"],
      ["no-repeat"],
      ["repeat-x"],
      ["repeat-x"],
      ["repeat-x"],
    ],
  },
  {
    dir: "/assets/projects/test/",
    fg_max: 4,
    repeatRules: [
      ["repeat"],
      ["no-repeat"],
      ["repeat-x"],
      ["repeat-x"],
      ["repeat-x"],
    ],
  },
  {
    dir: "/assets/projects/test/",
    fg_max: 4,
    repeatRules: [
      ["repeat"],
      ["no-repeat"],
      ["repeat-x"],
      ["repeat-x"],
      ["repeat-x"],
    ],
  },
  {
    dir: "/assets/projects/test/",
    fg_max: 4,
    repeatRules: [
      ["repeat"],
      ["no-repeat"],
      ["repeat-x"],
      ["repeat-x"],
      ["repeat-x"],
    ],
  },
];

function selectRandom(max: number, base: number) {
  return Math.floor(Math.random() * max).toString(base);
}

function generateRandomColor() {
  return (
    "#" + selectRandom(255, 16) + selectRandom(255, 16) + selectRandom(255, 16)
  );
}

function ParallaxElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (container == null) return;

    // MOUSEPOS

    var mouseX = 0;
    var mouseY = 0;

    document.addEventListener("mousemove", onMouseUpdate, false);
    document.addEventListener("mouseenter", onMouseUpdate, false);

    function onMouseUpdate(e: MouseEvent) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    }

    // AUTOSCROLL

    var prevGapTime: number = 0;
    var interval: number;
    var loops = 0;
    var isStable = true;
    const scrollContainer = (gapTime: number) => {
      var eleWidth = Math.max(
        container.firstElementChild?.clientWidth ?? 0,
        480
      );
      setScrollAmount(Math.ceil(window.innerWidth / eleWidth) + 1);
      loops++;
      var dt = gapTime - prevGapTime;
      prevGapTime = gapTime;
      // if (dt >= 0.5) isStable = false; // Takes longer than half a second to render a new animation frame
      if (loops >= 3) {
        // 0.333x the FPS (60fps => 20fps)
        container.scrollLeft += Math.max(
          (0.1 * dt) / window.devicePixelRatio,
          1
        );
        loops = 0;
      }
      interval = requestAnimationFrame(scrollContainer);
    };

    interval = requestAnimationFrame(scrollContainer);

    container.addEventListener("scroll", (ev) => {
      var eleWidth = Math.max(
        container.firstElementChild?.clientWidth ?? 0,
        480
      );
      var myScrollAmount = Math.ceil(window.innerWidth / eleWidth) + 1;
      if (container.scrollLeft < eleWidth) {
        container.scrollLeft =
          container.scrollWidth - eleWidth * myScrollAmount - 1;
      }
      if (
        container.scrollLeft >
        container.scrollWidth - eleWidth * myScrollAmount - 1
      ) {
        container.scrollLeft = eleWidth;
      }
    });

    // PARALLAX

    var parallax: number;
    var mousePower = 10;
    var childrenMush = Array.from(container.children);
    var rects: number[][] = [];
    childrenMush.forEach((scrollBox) => {
      rects.push(
        Array.from(scrollBox.children as HTMLCollectionOf<HTMLElement>).map(
          (child) => +(child.dataset?.depth ?? 0)
        )
      );
    });
    const parallaxContainer = () => {
      childrenMush.forEach((scrollBox, i) => {
        var getRekt = scrollBox.getBoundingClientRect();
        var progressLeft = getRekt.left / window.innerWidth;
        var progressWidth = scrollBox.clientWidth / window.innerWidth;
        var progressTop = getRekt.top / window.innerHeight;
        var progressHeight = scrollBox.clientHeight / window.innerHeight;
        var progressX = progressLeft - 0.5 + progressWidth / 2;
        var progressY = progressTop - 0.5 + progressHeight / 2;
        if (progressLeft < -1 || progressLeft > 1) return;
        var relativeMouseX =
          mouseX / scrollBox.clientWidth - getRekt.left / scrollBox.clientWidth;
        var relativeMouseY =
          mouseY / scrollBox.clientHeight -
          getRekt.top / scrollBox.clientHeight;
        Array.from(scrollBox.children as HTMLCollectionOf<HTMLElement>).forEach(
          (parallaxElement, ii) => {
            var myDepth = rects[i][ii];
            var centerMouseX = (relativeMouseX - 0.5) / 2;
            var centerMouseY = (relativeMouseY - 0.5) / 2;
            var mouseEffectY = (centerMouseY * mousePower) / myDepth;
            var mouseEffectX = (centerMouseX * mousePower) / myDepth;
            parallaxElement.style.transform = `translate(${Math.floor(
              progressX * scrollBox.clientWidth * (myDepth * 1.5) + mouseEffectX
            )}px, ${Math.floor(
              progressY * scrollBox.clientHeight * (myDepth * 1.5) +
                mouseEffectY
            )}px)`;
          }
        );
      });
      if (isStable) parallax = requestAnimationFrame(parallaxContainer);
    };

    if (isStable) parallax = requestAnimationFrame(parallaxContainer);

    return () => {
      cancelAnimationFrame(interval);
      cancelAnimationFrame(parallax);
    };
  }, [scrollAmount]);
  var elements = projectArray.map((v, i) => (
    <div
      key={i}
      className="coverImage"
      style={{
        backgroundColor: generateRandomColor(),
      }}
    >
      <div
        className="prlx effectImage heroImage"
        data-depth="-0.6"
        style={{
          backgroundImage: `url("${v.dir}bg.png")`,
        }}
      ></div>
      {v.repeatRules.map((canRepeat, i) => (
        <div
          className="prlx effectImage"
          data-depth={canRepeat[1] ?? (0 - v.fg_max + (i - 1)) / 10}
          style={{
            backgroundImage: `url("${v.dir}fg_${i}.png")`,
            backgroundRepeat: canRepeat[0],
          }}
        ></div>
      ))}
      <div
        className="prlx titleImage"
        data-depth="-0.1"
        style={{
          backgroundImage: `url("${v.dir}logo.png")`,
        }}
      ></div>
    </div>
  ));

  return (
    <div className="ParallaxElements" ref={containerRef}>
      {elements.slice(-1)}
      {elements}
      {elements.slice(0, scrollAmount)}
    </div>
  );
}

export default ParallaxElements;
