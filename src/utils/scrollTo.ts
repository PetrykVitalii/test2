export default (top: number, behavior: 'smooth' | 'auto' = 'smooth') => {
  try {
    window.scrollTo({
      top,
      behavior,
    });
  } catch (e) {
    window.scrollTo(top, 0);
  }
};
