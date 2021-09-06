//This function controls the page scroll to ensure that each link visited in React Router will render at the top of the page.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }