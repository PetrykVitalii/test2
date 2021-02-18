import AbstractLanguage from './AbstractLanguage';

export default class Home extends AbstractLanguage {
  get notification_text() {
    return this.getText({
      EN: 'If you\’re looking for a seller’s catalog, please ask them for the link',
      SG: 'If you\’re looking for a seller’s catalog, please ask them for the link',
      ID: 'Jika kamu mencari link katalog, mohon minta penjual untuk link',
      TH: 'หากคุณกำลังมองหาแคตตาล็อกของผู้ขาย คุณสามารถขอลิงก์จากผู้ขายได้โดยตรง',
      ZH: '如果您正在尋找賣家的商品目錄，請詢問他們的鏈結',
    });
  }

  get home_message_start() {
    return this.getText({
      EN: 'Want to create your own catalogs and',
      SG: 'Want to create your own catalogs and',
      ID: 'Ingin membuat katalog dan',
      TH: 'คุณต้องการรับแคตตาล็อกของคุณเองและเริ่',
      ZH: '想獲得自己的商品目錄並開始',
    });
  }

  get home_message_highlight() {
    return this.getText({
      EN: 'start selling',
      SG: 'start selling',
      ID: 'mulai berjualan',
      TH: 'เริ่มขาย',
      ZH: '開始銷售',
    });
  }

  get home_message_end() {
    return this.getText({
      EN: '?',
      SG: '?',
      ID: '?',
      TH: '?',
      ZH: '?',
    });
  }

  get btn_continue() {
    return this.getText({
      EN: 'Get Started',
      SG: 'Get Started',
      ID: 'Mulai',
      TH: 'เริ่ม',
      ZH: '開始使用',
    });
  }
}
