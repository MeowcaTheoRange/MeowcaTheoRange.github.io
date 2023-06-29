import { useEffect, useState } from "react";
import "./ClockWidget.css";

function ClockWidget() {
  var [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    var canvas = document.getElementById("canvas");
    var time = document.getElementById("time");
    // @ts-ignore
    var ctx = canvas.getContext("2d");
    // @ts-ignore
    var radius = canvas.height / 2;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FFDDBB";
    ctx.resetTransform();
    ctx.translate(radius, radius);
    requestAnimationFrame(drawTime);

    function drawTime() {
      var now = new Date(Date.now());
      var nowFormatted = now
        .toLocaleString(undefined, {
          timeStyle: "medium",
          hour12: false,
          timeZone: "America/Chicago",
        })
        .split(":");
      var hour = +nowFormatted[0];
      var minute = +nowFormatted[1];
      var second = +nowFormatted[2];
      // @ts-ignore
      ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(0, 0, radius - ctx.lineWidth, 0, 2 * Math.PI);
      ctx.stroke();

      drawHand(
        (hour * Math.PI) / 6 +
          (minute * Math.PI) / (6 * 60) +
          (second * Math.PI) / (6 * 60 * 60),
        radius * 0.6 - ctx.lineWidth
      );
      drawHand(
        (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60),
        radius * 0.8 - ctx.lineWidth
      );
      if (isHovering)
        drawHand((second * Math.PI) / 30, radius * 0.7 - ctx.lineWidth);
      // @ts-ignore
      time.innerHTML = now.toLocaleString(undefined, {
        timeStyle: isHovering ? "medium" : "short",
        dateStyle: isHovering ? "medium" : "short",
        timeZone: "America/Chicago",
      });
      requestAnimationFrame(drawTime);
    }

    function drawHand(pos: number, length: number) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
      ctx.closePath();
    }
  });
  return (
    <div
      className="ClockWidget"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <canvas id="canvas" width="64" height="64"></canvas>
      <div className="vertical">
        <span id="time">3:00 PM</span>
        <span id="timezone">Central Time (CT)</span>
      </div>
    </div>
  );
}

export default ClockWidget;
