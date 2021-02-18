import { useLayoutEffect } from 'react';

export default () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalStyleRoot = window.getComputedStyle(
      document.body.children[0] as HTMLElement,
    ).overflow;

    document.body.style.overflow = 'hidden';
    (document.body.children[0] as HTMLElement).style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
      (document.body.children[0] as HTMLElement).style.overflow = originalStyleRoot;
    };
  }, []);
};
