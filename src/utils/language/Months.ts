import AbstractLanguage from './AbstractLanguage';

export default class Months extends AbstractLanguage {
  public getMonth = (monthOrder: number) => {
    const months: Array<keyof Months> = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    const method = months[monthOrder];

    return this[method];
  };

  get jan() {
    return this.getText({
      EN: 'Jan',
      SG: 'Jan',
      ID: 'Jan',
      TH: 'ม.ค.',
      ZH: '一月',
    });
  }

  get feb() {
    return this.getText({
      EN: 'Feb',
      SG: 'Feb',
      ID: 'Feb',
      TH: 'ก.พ.',
      ZH: '二月',
    });
  }

  get mar() {
    return this.getText({
      EN: 'Mar',
      SG: 'Mar',
      ID: 'Mar',
      TH: 'มี.ค.',
      ZH: '三月',
    });
  }

  get apr() {
    return this.getText({
      EN: 'Apr',
      SG: 'Apr',
      ID: 'Apr',
      TH: 'เม.ย.',
      ZH: '四月',
    });
  }

  get may() {
    return this.getText({
      EN: 'May',
      SG: 'May',
      ID: 'May',
      TH: 'พ.ค.',
      ZH: '五月',
    });
  }

  get jun() {
    return this.getText({
      EN: 'Jun',
      SG: 'Jun',
      ID: 'Jun',
      TH: 'มิ.ย.',
      ZH: '六月',
    });
  }

  get jul() {
    return this.getText({
      EN: 'Jul',
      SG: 'Jul',
      ID: 'Jul',
      TH: 'ก.ค.',
      ZH: '七月',
    });
  }

  get aug() {
    return this.getText({
      EN: 'Aug',
      SG: 'Aug',
      ID: 'Aug',
      TH: 'ส.ค.',
      ZH: '八月',
    });
  }

  get sep() {
    return this.getText({
      EN: 'Sep',
      SG: 'Sep',
      ID: 'Sep',
      TH: 'ก.ย.',
      ZH: '九月',
    });
  }

  get oct() {
    return this.getText({
      EN: 'Oct',
      SG: 'Oct',
      ID: 'Oct',
      TH: 'ต.ค.',
      ZH: '十月',
    });
  }

  get nov() {
    return this.getText({
      EN: 'Nov',
      SG: 'Nov',
      ID: 'Nov',
      TH: 'พ.ย.',
      ZH: '十一月',
    });
  }

  get dec() {
    return this.getText({
      EN: 'Dec',
      SG: 'Dec',
      ID: 'Dec',
      TH: 'ธ.ค.',
      ZH: '十二月',
    });
  }
}
