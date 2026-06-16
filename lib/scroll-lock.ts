/** Reference-counted scroll lock — safe for menu + modals */
let lockCount = 0;

export function lockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    document.body.style.position = "";
  }
}

/** Force reset — e.g. on route change or hydration guard */
export function resetBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = 0;
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
  document.body.style.position = "";
}
