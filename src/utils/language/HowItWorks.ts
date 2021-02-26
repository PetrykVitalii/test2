import AbstractLanguage from './AbstractLanguage';

export default class Dashboard extends AbstractLanguage {
  get header_title() {
    return this.getText({
      EN: 'How It Works',
      SG: 'How It Works',
      ID: 'Cara Kerja',
      TH: 'ทำงานอย่างไร',
      ZH: '運作方法',
    });
  }

  get step_one_title() {
    return this.getText({
      EN: 'Create Catalogs in Seconds',
      SG: 'Create Catalogs in Seconds',
      ID: 'Buat katalog dalam beberapa detik',
      TH: 'สร้างแคตตาล็อกในเวลาไม่กี่วินาที',
      ZH: '在幾秒鐘內建立目錄',
    });
  }

  get step_one_desc() {
    return this.getText({
      EN: 'Add items easily and create your own digital catalogs',
      SG: 'Add items easily and create your own digital catalogs',
      ID: 'Tambah barang dengan mudah dan buat katalogmu',
      TH: 'เพิ่มรายการสินค้าได้อย่างง่ายดาย และสร้างแคตตาล็อกออนไลน์ของคุณ',
      ZH: '輕鬆添加商品並建立自己的數碼目錄',
    });
  }

  get step_two_title() {
    return this.getText({
      EN: 'Share on WhatsApp & Social Media',
      SG: 'Share on WhatsApp & Social Media',
      ID: 'Bagikan melalui WhatsApp & Social media lainnya',
      TH: 'แบ่งปันบน LINE และโซเชียลมีเดีย',
      ZH: '在WhatsApp和社交媒體上分享',
    });
  }

  get step_two_desc() {
    return this.getText({
      EN: 'Share a link of your catalog with customers on any platform',
      SG: 'Share a link of your catalog with customers on any platform',
      ID: 'Bagikan link katalog ke pelanggan Anda',
      TH: 'แชร์ลิงค์ของแคตตาล็อกของคุณกับลูกค้าบนแพลตฟอร์มใดก็ได้',
      ZH: '在任何平台上與客戶分享目錄鏈結',
    });
  }

  get step_three_title() {
    return this.getText({
      EN: 'Start Receiving Orders & Quote Requests!',
      SG: 'Start Receiving Orders & Quote Requests!',
      ID: 'Mulai Terima Pesanan & Permintaan Harga!',
      TH: 'เริ่มรับคำสั่งซื้อและการขอใบเสนอราคา!',
      ZH: '開始接收訂單和報價請求！',
    });
  }

  get step_three_desc() {
    return this.getText({
      EN: 'Your customers can request a quote or place an order 24/7',
      SG: 'Your customers can request a quote or place an order 24/7',
      ID: 'Pelangganmu dapat menanyakan harga atau melakukan pemesanan 24/7',
      TH: 'ลูกค้าของคุณสามารถขอใบเสนอราคาหรือสั่งซื้อสินค้าในร้านของคุณได้ตลอด 24 ชั่วโมงทุกวัน',
      ZH: '您的客戶可以要求報價或24/7在您的商店下訂單',
    });
  }

  get step_four_title() {
    return this.getText({
      EN: 'Track & Grow Your Business',
      SG: 'Track & Grow Your Business',
      ID: 'Kembangkan bisnis Anda',
      TH: 'ติดตามและขยายธุรกิจของคุณ',
      ZH: '追踪和發展您的業務',
    });
  }

  get step_four_desc() {
    return this.getText({
      EN: 'Manage all your orders in one place and get insights on the performance of your business',
      SG: 'Manage all your orders in one place and get insights on the performance of your business',
      ID: 'Atur seluruh pesanan dalam satu tempat dan terima laporan performa usaha Anda',
      TH: 'จัดการคำสั่งซื้อทั้งหมดของคุณได้ในที่เดียว และรับข้อมูลเชิงลึกเกี่ยวกับธุรกิจของคุณ',
      ZH: '統一管理所有訂單，並獲得有關業務績效的見解',
    });
  }

  get step_one_video_url() {
    return this.getText({
      EN: 'https://static.tinvio.com/agora/hiw-step-1.mp4',
      SG: 'https://static.tinvio.com/agora/hiw-step-1.mp4',
      ID: 'https://static.tinvio.com/agora/hiw-step-1-id.mp4',
      TH: 'https://static.tinvio.com/agora/hiw-step-1-th.mp4',
      ZH: 'https://static.tinvio.com/agora/hiw-step-1.mp4',
    });
  }

  get step_two_video_url() {
    return this.getText({
      EN: 'https://static.tinvio.com/agora/hiw-step-2.mp4',
      SG: 'https://static.tinvio.com/agora/hiw-step-2.mp4',
      ID: 'https://static.tinvio.com/agora/hiw-step-2-id.mp4',
      TH: 'https://static.tinvio.com/agora/hiw-step-2-th.mp4',
      ZH: 'https://static.tinvio.com/agora/hiw-step-2.mp4',
    });
  }

  get step_three_video_url() {
    return this.getText({
      EN: 'https://static.tinvio.com/agora/hiw-step-3.mp4',
      SG: 'https://static.tinvio.com/agora/hiw-step-3.mp4',
      ID: 'https://static.tinvio.com/agora/hiw-step-3-id.mp4',
      TH: 'https://static.tinvio.com/agora/hiw-step-3-th.mp4',
      ZH: 'https://static.tinvio.com/agora/hiw-step-3.mp4',
    });
  }

  get step_four_video_url() {
    return this.getText({
      EN: 'https://static.tinvio.com/agora/hiw-step-4.mp4',
      SG: 'https://static.tinvio.com/agora/hiw-step-4.mp4',
      ID: 'https://static.tinvio.com/agora/hiw-step-4-id.mp4',
      TH: 'https://static.tinvio.com/agora/hiw-step-4-th.mp4',
      ZH: 'https://static.tinvio.com/agora/hiw-step-4.mp4',
    });
  }
}
