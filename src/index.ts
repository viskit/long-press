const rootSet = new Set();

export const register = (
  dom: Document | Element | ShadowRoot = document
): (() => void) | void => {
  const root = dom.getRootNode();
  if (!rootSet.has(root)) {
    rootSet.add(root);
    let startX = 0,
      startY = 0,
      ct;

    const pointerdownHandle = (e: PointerEvent) => {
      const {
        clientX,
        clientY,
        pointerType,
        width,
        height,
        pressure,
        tangentialPressure,
        tiltX,
        tiltY,
        twist,
        isPrimary,
      } = e;

      const target = e.target as HTMLElement;
      let delay = 300;
      const els = e.composedPath() as HTMLElement[];
      for(let el of els){
        if(!(el instanceof Element)) break;
        const longpressDelay = el.dataset.longpressDelay;
        if(longpressDelay){
          delay = +longpressDelay;
          break;
        }
      }

      ct = setTimeout(() => {
        target.dispatchEvent(
          new PointerEvent("long-press", {
            clientX,
            clientY,
            pointerType,
            width,
            height,
            pressure,
            tangentialPressure,
            tiltX,
            tiltY,
            twist,
            isPrimary,
          })
        );
      }, delay);
    };

    const pointermoveHandle = (e: PointerEvent) => {
      var ox = Math.abs(startX - e.clientX);
      var oy = Math.abs(startY - e.clientY);

      if (ox >= 10 || oy >= 10) {
        clearTimeout(ct);
      }
    };

    const clear = () => {
      clearTimeout(ct);
    };

    root.addEventListener("pointerdown", pointerdownHandle, true);

    root.addEventListener("pointermove", pointermoveHandle, true);

    root.addEventListener("pointerup", clear, true);
    root.addEventListener("wheel", clear, true);
    root.addEventListener("scroll", clear, true);
    root.addEventListener("pointercancel", clear, true);

    return () => {
      root.removeEventListener("pointerdown", pointerdownHandle, true);
      root.removeEventListener("pointermove", pointermoveHandle, true);
      root.removeEventListener("pointerup", clear, true);
      root.removeEventListener("pointercancel", clear, true);
    };
  }
};
