import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectLn } from '@/store/selectors/language';
import Catalog from '@/utils/language/Catalog';
import Common from '@/utils/language/Common';
import Home from '@/utils/language/Home';
import Order from '@/utils/language/Order';
import Quote from '@/utils/language/Quote';

export default () => {
  const ln = useSelector(selectLn);
  const catalog = useMemo(() => new Catalog(ln), [ln]);
  const common = useMemo(() => new Common(ln), [ln]);
  const home = useMemo(() => new Home(ln), [ln]);
  const order = useMemo(() => new Order(ln), [ln]);
  const quote = useMemo(() => new Quote(ln), [ln]);

  return [{
    catalog,
    common,
    home,
    order,
    quote,
  }];
};
