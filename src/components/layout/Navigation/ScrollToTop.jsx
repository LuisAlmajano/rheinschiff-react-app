// Inspiration by https://www.youtube.com/watch?v=0jgl5L8yeTw

import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

import "./ScrollToTop.css";

const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    pageYOffset > 600 ? setVisible(true) : setVisible(false);
  }, [pageYOffset]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return false;

  return (
    <div
      className="scroll-to-top cursor-pointer text-center"
      onClick={scrollToTop}
    >
      <i className="icon fas fa-chevron-up"></i>
    </div>
  );
};

export default ScrollToTop;
