export const statusLn = (name: string, common: any) => {
  switch (name) {
    case 'Action Needed':
      return common.status_action_needed;
    case 'Pending':
      return common.status_pending;
    case 'Completed':
      return common.status_completed;
    case 'Sent':
      return common.status_sent;
    case 'Confirmed':
    case 'Processed':
      return common.status_processed;
    case 'Amended':
      return common.status_amended;
    case 'Cancelled':
      return common.status_cancelled;
    case 'Delivered':
      return common.status_delivered;
    case 'Shipped':
      return common.status_shipped;
    default:
      return '';
  }
};

export const countItemLn = (number: number, common: any) => {
  if (number > 1) return common.word_items;

  return common.word_item;
};

export const dayWeekLn = (name: string, common: any) => {
  switch (name) {
    case 'Monday':
      return common.monday_full;
    case 'Tuesday':
      return common.tuesday_full;
    case 'Wednesday':
      return common.wednesday_full;
    case 'Thursday':
      return common.thursday_full;
    case 'Friday':
      return common.friday_full;
    case 'Saturday':
      return common.saturday_full;
    case 'Sunday':
      return common.sunday_full;
    default:
      return '';
  }
};

export const dayWeekShortLn = (name: string, common: any) => {
  switch (name) {
    case 'Mon':
      return common.monday;
    case 'Tue':
      return common.tuesday;
    case 'Wed':
      return common.wednesday;
    case 'Thu':
      return common.thursday;
    case 'Fri':
      return common.saturday;
    case 'Sat':
      return common.saturday;
    case 'Sun':
      return common.sunday;
    default:
      return '';
  }
};

export const monthLn = (name: string, common: any) => {
  switch (name) {
    case 'January':
      return common.january;
    case 'February':
      return common.february;
    case 'March':
      return common.march;
    case 'April':
      return common.april;
    case 'May':
      return common.may;
    case 'June':
      return common.june;
    case 'July':
      return common.july;
    case 'August':
      return common.august;
    case 'September':
      return common.september;
    case 'October':
      return common.october;
    case 'November':
      return common.november;
    case 'December':
      return common.december;
    default:
      return '';
  }
};

export const monthShortLn = (name: string, common: any) => {
  switch (name) {
    case 'Jan':
      return common.january_short;
    case 'Feb':
      return common.february_short;
    case 'Mar':
      return common.march_short;
    case 'Apr':
      return common.april_short;
    case 'May':
      return common.may_short;
    case 'Jun':
      return common.june_short;
    case 'Jul':
      return common.july_short;
    case 'Aug':
      return common.august_short;
    case 'Sep':
      return common.september_short;
    case 'Oct':
      return common.october_short;
    case 'Nov':
      return common.november_short;
    case 'Dec':
      return common.december_short;
    default:
      return '';
  }
};

export const selectLn = (name: string, common: any) => {
  switch (name) {
    case 'All Orders':
      return common.range_all_orders;
    case 'All Upcoming':
      return common.range_option_upcoming;
    case 'Today':
      return common.range_option_today;
    case 'Yesterday':
      return common.range_option_yesterday;
    case 'Tomorrow':
      return common.range_option_tomorrow;
    case 'Last 7 days':
      return common.range_option_seven;
    case 'Last 30 days':
      return common.range_option_thirty;
    case 'Next 7 days':
      return common.range_option_next_seven;
    case 'Next 30 days':
      return common.range_option_next_thirty;
    case 'Custom':
      return common.range_option_custom;
    default:
      return '';
  }
};
