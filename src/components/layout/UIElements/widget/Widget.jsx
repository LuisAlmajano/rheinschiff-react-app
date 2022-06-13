import "./Widget.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "boats":
      data = {
        title: "BOATS",
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };

      break;
    case "boats2021":
      data = {
        title: "BOATS IN 2021",
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };

      break;
    case "boats2022":
      data = {
        title: "BOATS IN 2022",
        link: "See all boats",
        icon: (
          <DirectionsBoatIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128, 0.2)" }}
          />
        ),
      };

      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">289</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
