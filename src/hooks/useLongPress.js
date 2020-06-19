/* eslint-disable */
import { useCallback, useRef } from "react";

const isTouchEvent = (event) => {
  return !!event["touches"];
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;
  if (event.touches.length > 1 && event.preventDefault) {
    event.preventDefault && event.preventDefault();
  }
};

export const useLongPress = (
  callback,
  { isPreventDefault = true, delay = 500 } = {}
) => {
  const timeout = useRef();
  const target = useRef();

  const start = useCallback(
    (map, event) => {
      const { originalEvent } = event;
      // prevent ghost click on mobile devices
      if (isPreventDefault && originalEvent.target) {
        originalEvent.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = originalEvent.target;
      }
      if (originalEvent.touches.length < 2) {
        timeout.current = setTimeout(() => {
          callback(map, event);
        }, delay);
      }
    },
    [callback, delay]
  );

  const clear = useCallback((map, event) => {
    // clearTimeout and removeEventListener
    timeout.current && clearTimeout(timeout.current);
    if (isPreventDefault && target.current) {
      target.current.removeEventListener("touchend", preventDefault);
    }
  }, []);

  return {
    // onMouseDown: start,
    onTouchStart: start,
    // onMouseUp: clear,
    // onMouseLeave: clear,
    onTouchEnd: clear,
  };
};
