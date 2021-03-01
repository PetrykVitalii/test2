export default (top: number) => {
  try {
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  } catch (e) {
    window.scrollTo(0, 0);
  }
};
