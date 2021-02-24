import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="main-footer">
      <a href="https://twitter.com/luisalma">
        <TwitterIcon className="social-icon" />
      </a>
      <a href="https://github.com/LuisAlmajano">
        <GitHubIcon className="social-icon" />
      </a>
      <a href="mailto:luis.almajano@gmail.com">
        <EmailIcon className="social-icon" />
      </a>
      <p className="copyright">Copyright &copy; 2021 RheinSchiff</p>
    </footer>
  );
};

export default Footer;
