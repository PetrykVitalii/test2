const formatStr = (str: string) => (
  str
    .trim()
    .replace(/\s\s+/g, ' ') // remove multiple space with single one
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (firstLetter) => firstLetter.toUpperCase()) // capitalize each word
);

export default formatStr;
