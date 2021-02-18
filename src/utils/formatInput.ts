const formatInput = (str: string) => (str.split(' ')
  .map((item) => (item.length ? `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}` : item))
  .join(' ')
);

export default formatInput;
