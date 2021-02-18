const formatTextArea = (str: string) => str
  .replace(str[0], (s) => s.toUpperCase())
  .replace(
    /(\.|\?|!) [^A-Z0-9]{1}/g,
    (key) => `${key[0]}${key[1]}${key[2].toUpperCase()}`,
  );

export default formatTextArea;
