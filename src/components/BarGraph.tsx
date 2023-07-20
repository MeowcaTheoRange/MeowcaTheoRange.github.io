import "./BarGraph.css";

function BarGraph({ data }: { data: [string, string, number][] }) {
  var maxValue = Math.max(...data.map((x) => x[2]));
  return (
    <div className="BarGraph">
      {data.map((tuple, i) => (
        <div className="barHolder" key={i}>
          <div
            className="bar"
            style={{
              height: (tuple[2] / maxValue) * 100 + "%",
            }}
            title={tuple[1] + " - " + tuple[2]}
          >
            <span className="inBox">
              {tuple[0]}
              <br />
              {tuple[2]}
            </span>
          </div>
          <span className="outBox">
            {tuple[0]}
            <br />
            {tuple[2]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BarGraph;
