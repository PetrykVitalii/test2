const reviewCode = (code: string) => {
  if (code && code.length > 0) {
    return (code.startsWith('#') ? code.toUpperCase() : `#${code.toUpperCase()}`);
  }
  return code;
};

export default reviewCode;
