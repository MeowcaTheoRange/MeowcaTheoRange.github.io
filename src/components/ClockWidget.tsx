import { useEffect, useState } from "react";
import "./ClockWidget.css";

const statusHour = [
  { name: "Offline", icon: "account_circle_off" }, // 00:00 - 12 AM
  { name: "Offline", icon: "account_circle_off" }, // 01:00 - 01 AM
  { name: "Offline", icon: "account_circle_off" }, // 02:00 - 02 AM
  { name: "Offline", icon: "account_circle_off" }, // 03:00 - 03 AM
  { name: "Offline", icon: "account_circle_off" }, // 04:00 - 04 AM
  { name: "Offline", icon: "account_circle_off" }, // 05:00 - 05 AM
  { name: "Probably Online", icon: "clear_night" }, // 06:00 - 06 AM
  { name: "Probably Online", icon: "clear_night" }, // 07:00 - 07 AM
  { name: "Online", icon: "account_circle" }, // 08:00 - 08 AM
  { name: "Online", icon: "account_circle" }, // 09:00 - 09 AM
  { name: "Online", icon: "account_circle" }, // 10:00 - 10 AM
  { name: "Online", icon: "account_circle" }, // 11:00 - 11 AM
  { name: "Online", icon: "account_circle" }, // 12:00 - 12 PM
  { name: "Online", icon: "account_circle" }, // 13:00 - 01 PM
  { name: "Online", icon: "account_circle" }, // 14:00 - 02 PM
  { name: "Online", icon: "account_circle" }, // 15:00 - 03 PM
  { name: "Online", icon: "account_circle" }, // 16:00 - 04 PM
  { name: "Online", icon: "account_circle" }, // 17:00 - 05 PM
  { name: "Online", icon: "account_circle" }, // 18:00 - 06 PM
  { name: "Online", icon: "account_circle" }, // 19:00 - 07 PM
  { name: "Online", icon: "account_circle" }, // 20:00 - 08 PM
  { name: "Online", icon: "account_circle" }, // 21:00 - 09 PM
  { name: "Offline", icon: "account_circle_off" }, // 22:00 - 10 PM
  { name: "Offline", icon: "account_circle_off" }, // 23:00 - 11 AM
];

function ClockWidget() {
  var [date, setDate] = useState(new Date());
  const [status, setStatus] = useState(0);
  var mainColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--fg-color"
  );

  useEffect(() => {
    var timer = setTimeout(() => setDate(new Date()), 1000);
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var time = document.getElementById("time");
    // @ts-ignore
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    // @ts-ignore
    var radius = canvas.height / 2;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = mainColor;
    ctx.resetTransform();
    ctx.translate(radius, radius);
    var prevTime = 0;
    function drawTime() {
      setStatus(date.getHours());
      var nowFormatted = date
        .toLocaleString(undefined, {
          timeStyle: "medium",
          hour12: false,
          timeZone: "America/Chicago",
        })
        .split(":");
      var hour = +nowFormatted[0];
      var minute = +nowFormatted[1];
      var second = +nowFormatted[2];
      ctx.clearRect(-radius, -radius, canvas?.width, canvas?.height);

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
    }

    drawTime();

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
    <div className="ClockWidget">
      <canvas id="canvas" width="64" height="64"></canvas>
      <div className="vertical">
        <span id="time" contentEditable>
          {date.toLocaleString(undefined, {
            timeStyle: "short",
            dateStyle: "short",
            timeZone: "America/Chicago",
          })}
        </span>
        <span id="timezone">Central Time (CT)</span>
        <span className="nameandicon">
          <span className="material-symbols-outlined">
            {statusHour[status].icon}
          </span>{" "}
          {statusHour[status].name}
        </span>
      </div>
    </div>
  );
}

export default ClockWidget;
