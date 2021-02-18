import AbstractLanguage from './AbstractLanguage';

export default class Common extends AbstractLanguage {
  get lan() {
    return this.getText({
      EN: 'EN',
      SG: 'SG',
      ID: 'ID',
      TH: 'TH',
      ZH: 'ZH-CN',
    });
  }

  get lan_order() {
    return this.getText({
      EN: 'EN',
      SG: 'SG',
      ID: 'ID',
      TH: 'TH',
      ZH: 'ZH',
    });
  }

  get country() {
    return this.getText({
      EN: 'Country',
      SG: 'Country',
      ID: 'Negara',
      TH: 'ประเทศ',
      ZH: '國家',
    });
  }

  get btn_ok() {
    return this.getText({
      EN: 'OK',
      SG: 'OK',
      ID: 'OK',
      TH: 'ตกลง',
      ZH: 'OK',
    });
  }

  get btn_continue() {
    return this.getText({
      EN: 'Continue',
      SG: 'Continue',
      ID: 'Lanjutkan',
      TH: 'ดำเนินการต่อ',
      ZH: '繼續',
    });
  }

  get monday() {
    return this.getText({
      EN: 'Mon',
      SG: 'Mon',
      ID: 'Sen',
      TH: 'จ.',
      ZH: '一',
    });
  }

  get tuesday() {
    return this.getText({
      EN: 'Tue',
      SG: 'Tue',
      ID: 'Sel',
      TH: 'อ.',
      ZH: '二',
    });
  }

  get wednesday() {
    return this.getText({
      EN: 'Wed',
      SG: 'Wed',
      ID: 'Rab',
      TH: 'พ.',
      ZH: '三',
    });
  }

  get thursday() {
    return this.getText({
      EN: 'Thu',
      SG: 'Thu',
      ID: 'Kam',
      TH: 'พฤ.',
      ZH: '四',
    });
  }

  get friday() {
    return this.getText({
      EN: 'Fri',
      SG: 'Fri',
      ID: 'Jum',
      TH: 'ศ.',
      ZH: '五',
    });
  }

  get saturday() {
    return this.getText({
      EN: 'Sat',
      SG: 'Sat',
      ID: 'Sab',
      TH: 'ส.',
      ZH: '六',
    });
  }

  get sunday() {
    return this.getText({
      EN: 'Sun',
      SG: 'Sun',
      ID: 'Min',
      TH: 'อา.',
      ZH: '日',
    });
  }

  get kg() {
    return this.getText({
      EN: 'Kg',
      SG: 'Kg',
      ID: 'Kg',
      TH: 'กิโลกรัม',
      ZH: 'Kg',
    });
  }

  get carton() {
    return this.getText({
      EN: 'Carton',
      SG: 'Carton',
      ID: 'Kardus',
      TH: 'กล่อง',
      ZH: '箱',
    });
  }

  get packet() {
    return this.getText({
      EN: 'Packet',
      SG: 'Packet',
      ID: 'Pak',
      TH: 'ห่อ',
      ZH: '包',
    });
  }

  get piece() {
    return this.getText({
      EN: 'Piece',
      SG: 'Piece',
      ID: 'Buah',
      TH: 'ชิ้น',
      ZH: '件',
    });
  }

  get bottle() {
    return this.getText({
      EN: 'Bottle',
      SG: 'Bottle',
      ID: 'Botol',
      TH: 'ขวด',
      ZH: '樽',
    });
  }

  get custom() {
    return this.getText({
      EN: 'Custom',
      SG: 'Custom',
      ID: 'Sesuaikan',
      TH: 'กำหนดเอง',
      ZH: '自訂',
    });
  }

  get link() {
    return this.getText({
      EN: 'This link is not valid',
      SG: 'This link is not valid',
      ID: 'Link ini tidak valid',
      TH: 'ลิ้งค์ไม่สามารถใช้งานได้',
      ZH: '該鏈結無效',
    });
  }

  get lock() {
    return this.getText({
      EN: "You don't have access to this link",
      SG: "You don't have access to this link",
      ID: 'Kamu tidak memiliki akses ke link',
      TH: 'คุณไม่มีสิทธิ์เข้าถึงลิงก์นี้',
      ZH: '您沒有訪問此鏈結的權限',
    });
  }

  get contact_support() {
    return this.getText({
      EN: 'Hi! I need some help with the SELL app.',
      SG: 'Hi! I need some help with the SELL app.',
      ID: 'Hai! Saya butuh bantuan terkait aplikasi SELL.',
      TH: 'สวัสดีฉันต้องการความช่วยเหลือเกี่ยวกับแอป SELL.',
      ZH: '哈囉！我有關SELL應用程序需要幫助。',
    });
  }

  get support() {
    return this.getText({
      EN: 'Contact Support',
      SG: 'Contact Support',
      ID: 'Kontak Support',
      TH: 'ติดต่อฝ่ายสนับสนุนลูกค้า',
      ZH: '聯繫Tinvio團隊',
    });
  }

  get items_copied() {
    return this.getText({
      EN: 'Items copied',
      SG: 'Items copied',
      ID: 'Items copied',
      TH: 'คัดลอกรายการเรียบร้อย',
      ZH: 'Items copied',
    });
  }
}
