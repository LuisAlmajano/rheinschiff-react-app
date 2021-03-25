import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="main-footer">
      <ul className="social">
        <li>
          <a href="https://twitter.com/luisalma">
            <TwitterIcon className="social-icon" />
          </a>
        </li>
        <li>
          <a href="https://github.com/LuisAlmajano">
            <GitHubIcon className="social-icon" />
          </a>
        </li>
        <li>
          <a href="mailto:luis.almajano@gmail.com">
            <EmailIcon className="social-icon" />
          </a>
        </li>
      </ul>
      <p className="copyright">Copyright &copy; 2021 RheinSchiff</p>
    </footer>
  );
};

export default Footer;
