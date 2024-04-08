import "./Featured.css";
import Spinner from "../Spinner";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Featured = ({ type, featuredBoat, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    let data;

    switch (type) {
      case "mostSeen":
        data = {
          title: "BOAT MOST FREQUENTLY SEEN",
          boat: featuredBoat.name,
          image: featuredBoat.image,
          countseen: featuredBoat.countseen,
          lastseen: new Date(featuredBoat.lastseen),
          link: "See boat",
        };

        break;
      case "lastSeen":
        data = {
          title: "BOAT LAST SEEN",
          boat: featuredBoat.name,
          image: featuredBoat.image,
          countseen: featuredBoat.countseen,
          lastseen: new Date(featuredBoat.lastseen),
          link: "See boat",
        };

        break;
      case "firstSeen":
        data = {
          title: "BOAT FIRST SEEN",
          boat: featuredBoat.name,
          image: featuredBoat.image,
          countseen: featuredBoat.countseen,
          firstseen: new Date(featuredBoat.firstseen),
          lastseen: new Date(featuredBoat.lastseen),
          link: "See boat",
        };

        break;

      default:
        break;
    }

    return (
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.6 },
        }}
        viewport={{ once: true }}
        className="featured"
      >
        <div className="title">{data.title}</div>
        <div className="content">
          <div className="avatar">
            <Avatar image={data.image} alt={data.boat} width="80px" />
          </div>
          <div className="info">
            <span className="name">{data.boat}</span>
            <span className="countseen">
              Seen: {data.countseen} {data.countseen === 1 ? "Time" : "Times"}
            </span>
            {type === "firstSeen" ? (
              <span className="firstseen">
                First seen on: {data.firstseen.toDateString()}
              </span>
            ) : (
              <span className="lastseen">
                Last seen on: {data.lastseen.toDateString()}
              </span>
            )}
          </div>
          <div className="link">
            <Link to={`/boats/${featuredBoat._id}`}>{data.link}</Link>
          </div>
        </div>
      </motion.div>
    );
  }
};

Featured.propTypes = {
  type: PropTypes.string,
  featuredBoat: PropTypes.object,
};

export default Featured;
