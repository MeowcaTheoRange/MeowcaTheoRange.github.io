import { useEffect } from 'react';
import './ClockWidget.css';

function ClockWidget() {
  useEffect(() => {
    var canvas = document.getElementById("canvas");
    var time = document.getElementById("time");
    // @ts-ignore
    var ctx = canvas.getContext("2d");
    // @ts-ignore
    var radius = (canvas.height / 2);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ffddbb";
    ctx.resetTransform();
    ctx.translate(radius, radius);
    setInterval(drawTime, 1000);
    drawTime();

    function drawTime(){
      var now = new Date();
      var hour = now.getHours()%12;
      var minute = now.getMinutes();
      // @ts-ignore
      ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
        
      ctx.beginPath();
      ctx.arc(0, 0, radius - ctx.lineWidth, 0, 2 * Math.PI);
      ctx.stroke();
        
      drawHand((hour*Math.PI/6)+
      (minute*Math.PI/(6*60)), (radius*0.6) - ctx.lineWidth);
      drawHand((minute*Math.PI/30), (radius*0.8) - ctx.lineWidth);
      // @ts-ignore
      time.innerHTML = new Date(Date.now()).toLocaleTimeString(undefined, {
        timeStyle:'short'
      })
    }

    function drawHand(pos:number, length:number) {
      ctx.beginPath();
      ctx.moveTo(0,0);
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
        <span id="time">3:00 PM</span>
        <span id="timezone">Central Standard Time (GMT-6)</span>
      </div>
    </div>
  );
}

export default ClockWidget;