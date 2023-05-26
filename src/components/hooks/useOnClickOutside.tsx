// LIBRARIES
import { useCallback, useEffect, type RefObject } from "react";

// HOOK
const useOnClickOutside = (
  elementRef: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  const callback = useCallback(handler, [elementRef, handler]);
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking elementRef's element or descendent elements
        if (!elementRef.current || elementRef.current.contains(event.target as Node)) {
          return;
        }
        callback(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add elementRef and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [elementRef, callback]
  );
};

export default useOnClickOutside;
