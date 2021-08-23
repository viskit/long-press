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
      startX = e.clientX;
      startY = e.clientY;

      const target = e.target as HTMLElement;
      const delay = target.dataset.delay ? +target.dataset.delay : 300;
      const path = e.composedPath();
      ct = setTimeout(() => {
        target.dispatchEvent(
          new PointerEvent("long-press", { clientX: startX, clientY: startY })
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

    dom.addEventListener("pointerdown", pointerdownHandle, false);

    dom.addEventListener("pointermove", pointermoveHandle, false);

    dom.addEventListener("pointerup", clear, false);

    dom.addEventListener("pointercancel", clear, false);

    return () => {
      dom.removeEventListener("pointerdown", pointerdownHandle, false);
      dom.removeEventListener("pointermove", pointermoveHandle, false);
      dom.removeEventListener("pointerup", clear, false);
      dom.removeEventListener("pointercancel", clear, false);
    };
  }
};
