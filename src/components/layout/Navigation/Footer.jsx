import TwitterIcon from "@material-ui/icons/Twitter";
import { BsTwitterX } from "react-icons/bs"; // X is the new Twitter
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="main-footer">
      <ul className="social">
        <li>
          <a aria-label="X profile" href="https://twitter.com/luisalma">
            <BsTwitterX className="social-icon" />
          </a>
        </li>
        <li>
          <a aria-label="GitHub profile" href="https://github.com/LuisAlmajano">
            <GitHubIcon className="social-icon" />
          </a>
        </li>
        <li>
          <a aria-label="Mailto" href="mailto:luis.almajano@gmail.com">
            <EmailIcon className="social-icon" />
          </a>
        </li>
      </ul>
      <p className="copyright">Copyright &copy; 2025 RheinSchiff</p>
    </footer>
  );
};

export default Footer;
