const reviewPage = (catalogId: string, query: string, quoteId: string = ''): string => {
  if (query) {
    if (query === '?quote') {
      return `/quotes/${quoteId}`;
    } if (query === '?order') {
      return `/${catalogId}/delivery-address`;
    }
  }
  return `/catalogs/${catalogId}`;
};

export default reviewPage;
