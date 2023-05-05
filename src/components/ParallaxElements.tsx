import { useRef, useEffect } from 'react';
import './ParallaxElements.css';

function selectRandom(max: number, base: number) {
  return Math.floor(Math.random() * max).toString(base);
}

function generateRandomColor() {
  return "#" + selectRandom(255, 16) + selectRandom(255, 16) + selectRandom(255, 16)
}

function ParallaxElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container == null) return;

    // AUTOSCROLL

    var prevGapTime: number = 0;
    var interval: number;
    var loops = 0;
    const scrollContainer = (gapTime: number) => {
      loops++;
      if (loops >= 3) { // 0.333x the FPS (60fps => 20fps)
        var dt = gapTime - prevGapTime;
        prevGapTime = gapTime;
        container.scrollLeft += Math.max((0.05 * dt) / window.devicePixelRatio, 1);
        loops = 0;
      }
      interval = requestAnimationFrame(scrollContainer);
    };

    // interval = requestAnimationFrame(scrollContainer);

    container.addEventListener("scroll", (ev) => {
      var eleWidth = Math.max(
        (container.firstElementChild?.clientWidth ?? 0),
        480
      );
      if (container.scrollLeft < eleWidth) {
        container.scrollLeft = (container.scrollWidth - (eleWidth * 3));
      } if (container.scrollLeft > container.scrollWidth - (eleWidth * 3)) {
        container.scrollLeft = eleWidth;
      }
    })

    // PARALLAX
    
    var parallax: number;
    const parallaxContainer = () => {
      Array.from(container.children).forEach((scrollBox) => {
        var getRekt = scrollBox.getBoundingClientRect();
        var progress = ((getRekt.left / window.innerWidth) * 2) - 0.5;
        Array.from(scrollBox.children as HTMLCollectionOf<HTMLElement>).forEach((parallaxElement) => {
          var myDepth = +(parallaxElement.dataset?.depth ?? 0);
          parallaxElement.style.transform = `translate(${(progress * scrollBox.clientWidth) * myDepth}px, ${100 * myDepth}px)`;
        });
      });
      parallax = requestAnimationFrame(parallaxContainer);
    }

    parallax = requestAnimationFrame(parallaxContainer);

    return () => {cancelAnimationFrame(interval);cancelAnimationFrame(parallax)};
  }, []);

  var elements = Array(3).fill("").map((v, i) => <div key={i} className="coverImage"
  style={{
    backgroundColor: generateRandomColor()
  }}>
    <div className="prlx heroImage prlx-example" data-depth="0">Hello</div>
    <div className="prlx effectImage prlx-example" data-depth="-0.4">Hello</div>
    <div className="prlx effectImage prlx-example" data-depth="-0.3">Hello</div>
    <div className="prlx effectImage prlx-example" data-depth="-0.2">Hello</div>
    <div className="prlx effectImage prlx-example" data-depth="-0.1">Hello</div>
    <div className="prlx titleImage prlx-example" data-depth="-0.05">Hello</div>
  </div>)

  return (
    <div className="ParallaxElements" ref={containerRef}>
      {elements.slice(-1)}{elements}{elements.slice(0, 3)}
    </div>
  );
}

export default ParallaxElements;