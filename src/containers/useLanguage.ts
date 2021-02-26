import { useMemo } from 'react';

import Authorization from '@/utils/language/Authorization';
import Items from '@/utils/language/Items';
import Catalogs from '@/utils/language/Catalogs';
import Settings from '@/utils/language/Settings';
import Common from '@/utils/language/Common';
import Dashboard from '@/utils/language/Dashboard';
import Months from '@/utils/language/Months';
import HowItWorks from '@/utils/language/HowItWorks';

export default () => {
  const ln = 'TH';

  const authorization = useMemo(() => new Authorization(ln), [ln]);
  const items = useMemo(() => new Items(ln), [ln]);
  const catalogs = useMemo(() => new Catalogs(ln), [ln]);
  const settings = useMemo(() => new Settings(ln), [ln]);
  const common = useMemo(() => new Common(ln), [ln]);
  const dashboard = useMemo(() => new Dashboard(ln), [ln]);
  const months = useMemo(() => new Months(ln), [ln]);
  const howItWorks = useMemo(() => new HowItWorks(ln), [ln]);

  return [{
    authorization,
    items,
    catalogs,
    settings,
    common,
    dashboard,
    months,
    howItWorks,
  }];
};
