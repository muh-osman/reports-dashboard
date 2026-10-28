import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// The base snippet in public/index.html already sends the first page view.
// This records a new one on each client-side navigation.
export default function TikTokPixel() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (window.ttq) {
      window.ttq.page();
    }
  }, [location.pathname, location.search]);

  return null;
}
