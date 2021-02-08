import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ align: "flex" }}>
      <p>Copyright &copy; 2021</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
