/* eslint-disable */
import { useCallback, useRef } from "react";

const isTouchEvent = (event) => {
  return !!event["touches"];
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;
  if (event.touches.length < 2 && event.preventDefault) {
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
          passive: true,
        });
        // originalEvent.target.addEventListener("mouseup", preventDefault, {
        //   passive: true,
        // });
        target.current = originalEvent.target;
      }
      timeout.current = setTimeout(() => {
        if (map.isMoving() || map.isRotating() || map.isZooming()) return;
        callback(map, event);
      }, delay);
    },
    [callback, delay]
  );

  const clear = useCallback(() => {
    // clearTimeout and removeEventListener
    timeout.current && clearTimeout(timeout.current);

    if (isPreventDefault && target.current) {
      target.current.removeEventListener("touchend", preventDefault);
    }
  }, []);

  return {
    onMouseDown: (m, e) => start(m, e),
    onTouchStart: (m, e) => start(m, e),
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  };
};
