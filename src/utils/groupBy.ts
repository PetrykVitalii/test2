export const groupBy = (data: Array<any>, by: any) => {
  const result: any = {};

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    const field = by(item);
    const newItems = result[field] || [];
    newItems.push(item);

    result[field] = newItems;
  }

  return result;
};

export const mapValues = (object: any, mapper: any) => {
  const result: any = {};
  Object.keys(object).forEach((key) => {
    result[key] = mapper(object[key]);
  });
  return result;
};

export const mapValuesToArray = (object: any, mapper: any) => {
  const result: any = [];
  Object.keys(object).forEach((key) => {
    result.push(mapper(object[key]));
  });
  return result;
};
