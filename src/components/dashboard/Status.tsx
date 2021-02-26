import React from 'react';

import IndicatorConfirmed from '@/components/common/icons/dashboard/IndicatorConfirmed';
import IndicatorPending from '@/components/common/icons/dashboard/IndicatorPending';
import IndicatorCompleted from '@/components/common/icons/dashboard/IndicatorCompleted';
import IndicatorProcessed from '@/components/common/icons/dashboard/IndicatorProcessed';
import IndicatorCancelled from '@/components/common/icons/dashboard/IndicatorCancelled';

interface Props {
  status: string;
  width?: number;
  height?: number;
}

const Status: React.FC<Props> = ({ status, width = '100%', height = '100%' }) => {
  switch (status) {
    case 'Pending':
      return <IndicatorPending color="#3897ff" width={width} height={height} />;
    case 'Cancelled':
      return <IndicatorCancelled width={width} height={height} />;
    case 'Confirmed':
      return <IndicatorConfirmed width={width} height={height} />;
    case 'Shipped':
      return <IndicatorProcessed width={width} height={height} />;
    case 'Delivered':
      return <IndicatorCompleted width={width} height={height} />;
    default: return null;
  }
};

export default Status;
