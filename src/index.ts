
export const register = (dom: Document | Element | ShadowRoot = document) => {
  let startX = 0,
    startY = 0,
    ct;

  const pointerdownHandle = (e: PointerEvent) => {
    startX = e.clientX;
    startY = e.clientY;

    const target = e.target as HTMLElement;
    const delay = target.dataset.delay ? +target.dataset.delay : 300;
    ct = setTimeout(() => {
      target.dispatchEvent(new Event("long-press", { ...e }));
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

  dom.addEventListener("pointerdown", pointerdownHandle, true);

  dom.addEventListener("pointermove", pointermoveHandle, true);

  dom.addEventListener("pointerup", clear, true);

  dom.addEventListener("pointercancel", clear, true);

  return () => {
    dom.removeEventListener("pointerdown", pointerdownHandle, true);
    dom.removeEventListener("pointermove", pointermoveHandle, true);
    dom.removeEventListener("pointerup", clear, true);
    dom.removeEventListener("pointercancel", clear, true);
  };
};
