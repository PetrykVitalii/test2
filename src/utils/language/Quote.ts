import AbstractLanguage from './AbstractLanguage';

export default class Quote extends AbstractLanguage {
  get quote_details() {
    return this.getText({
      EN: 'Quote Details',
      SG: 'Quote Details',
      ID: 'Detail Permintaan Harga',
      TH: 'รายละเอียดใบเสนอราคา',
      ZH: '報價詳情',
    });
  }

  get submit_quote_request() {
    return this.getText({
      EN: 'Submit Quote Request',
      SG: 'Submit Quote Request',
      ID: 'Kirim Permintaan Harga',
      TH: 'ส่งคำขอใบเสนอราคา',
      ZH: '提交報價請求',
    });
  }

  get quote_request_sent() {
    return this.getText({
      EN: 'Quote Request Sent',
      SG: 'Quote Request Sent',
      ID: 'Permintaan Harga Terkirim',
      TH: 'ส่งคำขอใบเสนอราคาเรียบร้อย',
      ZH: '報價請求已發送',
    });
  }

  get back_to_you_soon() {
    return this.getText({
      EN: '{supplierName} will get back to you soon',
      SG: '{supplierName} will get back to you soon',
      ID: '{supplierName} akan segera menghubungi kamu',
      TH: '{supplierName} จะติดต่อกลับคุณในเร็ว ๆ นี้',
      ZH: '{supplierName} 將盡快與您聯繫',
    });
  }

  get notes() {
    return this.getText({
      EN: 'Notes',
      SG: 'Notes',
      ID: 'Catatan',
      TH: 'หมายเหตุ',
      ZH: '須知',
    });
  }

  get done() {
    return this.getText({
      EN: 'Done',
      SG: 'Done',
      ID: 'Selesai',
      TH: 'เสร็จสิ้น',
      ZH: '完成',
    });
  }
}
