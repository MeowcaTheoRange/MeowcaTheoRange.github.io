import { useEffect, useRef, useState } from "react";
import DescriptionArea from "./DescriptionArea";
import "./ParallaxElements.css";

type Project = {
  dir: string;
  fg_max: number;
  repeatRules: [string, number?][];
  link?: string;
  about?: string;
  primaryColor?: string;
};

var projectArray: Project[] = [
  {
    dir: "/assets/projects/trollcall/",
    fg_max: 1,
    repeatRules: [["no-repeat", -0.8]],
    link: "https://trollcall.xyz/",
    about: `# TrollCall
It's TrollCall, again this time! I keep redesigning this project and I think this could be the final one. It has a proper database, is hosted on Vercel, and can host a maximum of approximately 20,000 trolls. So, get to trolling!

I have to thank [Redact](https://karkatdyinginagluetrap.com/@redact) for buying and holding the trollcall.xyz domain for me, it's a huge help.`,
    primaryColor: "#ccc",
  },
  {
    dir: "/assets/projects/jellybean/",
    fg_max: 6,
    repeatRules: [
      ["repeat"],
      ["no-repeat", -0.5],
      ["no-repeat", -0.5],
      ["no-repeat", -0.5],
      ["no-repeat"],
      ["no-repeat"],
      ["no-repeat"],
    ],
    link: "https://meowcatheorange.itch.io/mid-simulator",
    about: `# JellyBean's Mid-Sim
Remember those [goddamn skeletons](https://www.youtube.com/watch?v=LWAoYKIu7tg)? Remember how people used to [fucking decimate JellyBean on the internet](https://www.youtube.com/watch?v=-JfXUjFDHIY)? I made a rhythm game about it. Then it quickly veered off into Sonic territory. 

I really didn't know what I was doing with this game, but it was my first succesful rhythm game! I learned a lot from developing JellyBean's Mid-Sim, and I want to do something with it again. Maybe soon.`,
    primaryColor: "#e9b8fe",
  },
  {
    dir: "/assets/projects/fc2/",
    fg_max: 3,
    repeatRules: [["repeat"], ["no-repeat"], ["no-repeat"]],
    link: "https://meowcatheorange.github.io/Clock/",
    about: `# FunnyClock²
A sequel to something that never needed a sequel - some damn clock application made for schools!

That's all this really is, plus a timer and a checklist. It's not remarkable by any means, but it's also pretty cool for what it's made in!

I wish I could have learned React before making it, though, as it uses and duplicates raw HTML, which is super cringe. It comes with a poplight, though!`,
    primaryColor: "#888",
  },
  // {
  //   dir: "/assets/projects/test/",
  //   fg_max: 5,
  //   repeatRules: [
  //     ["repeat-x"],
  //     ["no-repeat"],
  //     ["repeat"],
  //     ["repeat"],
  //     ["repeat"],
  //   ],
  //   link: "https://meowcatheorange.github.io/Clock/",
  //   about: `Test`,
  //   primaryColor: "#ffdf82",
  // },
];

function clamp(input: number, min: number, max: number): number {
  return input < min ? min : input > max ? max : input;
}

function map(
  current: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number {
  const mapped: number =
    ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}

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
  let eleWidth = Math.min(window.innerWidth, 960);
  const [scrollAmount, setScrollAmount] = useState(
    Math.ceil(window.innerWidth / eleWidth) + 1
  );

  function onResize(e?: UIEvent) {
    eleWidth = Math.min(window.innerWidth, 960);
    setScrollAmount(Math.ceil(window.innerWidth / eleWidth) + 1);
  }

  window.addEventListener("resize", onResize);
  // onResize();

  useEffect(() => {
    const container = containerRef.current;
    if (container == null) return;

    // AUTOSCROLL

    var prevGapTime: number = 0;
    var interval: number;
    var loops = 0;
    const scrollContainer = (gapTime: number) => {
      loops++;
      var dt = gapTime - prevGapTime;
      prevGapTime = gapTime;
      if (loops >= 6) {
        container.scrollLeft += Math.max(
          (0.1 * dt) / window.devicePixelRatio,
          1
        );
        loops = 0;
      }
      interval = requestAnimationFrame(scrollContainer);
    };

    interval = requestAnimationFrame(scrollContainer);

    // PARALLAX

    var childrenMush = Array.from(container.children) as HTMLElement[];
    var rects: number[][] = [];
    childrenMush.forEach((scrollBox) => {
      rects.push(
        Array.from(scrollBox.children as HTMLCollectionOf<HTMLElement>).map(
          (child) => +(child.dataset?.depth || 0)
        )
      );
    });
    const parallaxContainer = () => {
      childrenMush.forEach((scrollBox, i) => {
        var getRekt = scrollBox.getBoundingClientRect();
        var progressLeft = getRekt.left / window.innerWidth;
        if (progressLeft < -1 || progressLeft > 2) return;
        var progressWidth = scrollBox.clientWidth / window.innerWidth;
        // var ufprogressCenter =
        //   (getRekt.left + window.innerWidth / 2 + scrollBox.clientWidth / 2) /
        //     window.innerWidth -
        //   1;
        // var progressCenter =
        //   ufprogressCenter < 0 ? ufprogressCenter * 1.5 : ufprogressCenter;
        var progressTop = getRekt.top / window.innerHeight;
        var progressHeight = scrollBox.clientHeight / window.innerHeight;
        var progressX = progressLeft - 0.5 + progressWidth / 2;
        var progressY = progressTop - 0.5 + progressHeight / 2;
        // var scaleTransform = Math.abs(progressCenter);
        // scrollBox.style.transform = `translateZ(${scaleTransform * -50}px)`;
        Array.from(scrollBox.children as HTMLCollectionOf<HTMLElement>).forEach(
          (parallaxElement, ii) => {
            var myDepth = rects[i][ii];
            parallaxElement.style.transform = `translate(${Math.floor(
              progressX *
                scrollBox.clientWidth *
                (myDepth * (window.innerWidth / scrollBox.clientWidth))
            )}px, ${Math.floor(
              progressY *
                scrollBox.clientHeight *
                (myDepth * (window.innerWidth / scrollBox.clientWidth))
            )}px)`;
          }
        );
      });
    };

    container.addEventListener("scroll", onScroll);

    function onScroll(ev: Event) {
      if (container === null) return;
      if (container.scrollLeft < eleWidth) {
        container.scrollLeft =
          container.scrollWidth - eleWidth * scrollAmount - 1;
      }
      if (
        container.scrollLeft >
        container.scrollWidth - eleWidth * scrollAmount - 1
      ) {
        container.scrollLeft = eleWidth;
      }
      parallaxContainer();
    }

    return () => {
      cancelAnimationFrame(interval);
      container.removeEventListener("scroll", onScroll);
    };
  }, [scrollAmount, eleWidth]);
  var elements = projectArray.map((v, i) => (
    <button
      key={i}
      className="coverImage"
      style={{
        backgroundColor: v.primaryColor,
        color: v.primaryColor,
      }}
      //@ts-ignore
      onDoubleClick={() => window.open(v.link, "_blank").focus()}
    >
      <div
        className="prlx effectImage heroImage"
        data-depth="-0.9"
        style={{
          backgroundImage: `url("${v.dir}bg.png")`,
        }}
      ></div>
      {v.repeatRules.map((canRepeat, i) => (
        <div
          className="prlx effectImage"
          data-depth={
            canRepeat[1] ?? (map(i / v.fg_max, 0, 1, -0.8, -0.1) || 0)
          }
          key={i}
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
      <div className="description">
        <DescriptionArea>{v.about ?? ""}</DescriptionArea>
      </div>
    </button>
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
