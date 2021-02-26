import AbstractLanguage from './AbstractLanguage';

export default class Authorization extends AbstractLanguage {
  get welcome_message_start() {
    return this.getText({
      EN: 'Take your business to the',
      SG: 'Take your business to the',
      ID: 'Buat bisnismu',
      TH: 'ยกระดับธุรกิจของคุณให้',
      ZH: '使您的業務',
    });
  }

  get skip_for_now() {
    return this.getText({
      EN: 'Skip for now',
      SG: 'Skip for now',
      ID: 'Lewati',
      TH: 'ข้ามขั้นตอนนี้ไปก่อน',
      ZH: '現在跳過',
    });
  }

  get no_internet_connection() {
    return this.getText({
      EN: 'No internet connection',
      SG: 'No internet connection',
      ID: 'Tidak ada koneksi internet',
      TH: 'ไม่มีการเชื่อมต่ออินเทอร์เน็ต',
      ZH: '沒有網絡連接',
    });
  }

  get welcome_message_highlight() {
    return this.getText({
      EN: 'next level',
      SG: 'next level',
      ID: 'semakin maju',
      TH: 'เติบโตขึ้น',
      ZH: '更上一層樓',
    });
  }

  get welcome_message_end() {
    return this.getText({
      EN: 'and sell digitally',
      SG: 'and sell digitally',
      ID: 'dan jual secara digital',
      TH: 'และเริ่มขายแบบออนไลน์',
      ZH: '並進行銷售數碼化',
    });
  }

  get btn_get_started() {
    return this.getText({
      EN: 'Get Started',
      SG: 'Get Started',
      ID: 'Mulai',
      TH: 'เริ่ม',
      ZH: '開始使用',
    });
  }

  get welcome_header() {
    return this.getText({
      EN: 'Hi! And welcome to Tinvio',
      SG: 'Hi! And welcome to Tinvio',
      ID: 'Hai! Selamat datang di Tinvio',
      TH: 'ยินดีต้อนรับเข้าสู่ Tinvio',
      ZH: '哈囉！歡迎來到Tinvio',
    });
  }

  get phone_label() {
    return this.getText({
      EN: 'Phone Number',
      SG: 'Phone Number',
      ID: 'Nomor telepon',
      TH: 'เบอร์มือถือ',
      ZH: '電話號碼',
    });
  }

  get phone_placeholder() {
    return this.getText({
      EN: '+65 9123 4567',
      SG: '+65 9123 4567',
      ID: '+62 9123 4567',
      TH: '+66 12 345 6789',
      ZH: '+852 9123 4567',
    });
  }

  get phone_error_required() {
    return this.getText({
      EN: 'Phone is required',
      SG: 'Phone is required',
      ID: 'Nomor telepon harus di-isi',
      TH: 'กรุณากรอกเบอร์โทรศัพท์',
      ZH: '必須填寫電話號碼',
    });
  }

  get phone_error_invalid() {
    return this.getText({
      EN: 'Invalid number',
      SG: 'Invalid number',
      ID: 'Nomor telepon tidak valid',
      TH: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
      ZH: '電話號碼無效',
    });
  }

  get code_header() {
    return this.getText({
      EN: 'Enter the code',
      SG: 'Enter the code',
      ID: 'Masukkan kode verifikasi',
      TH: 'ใส่รหัสยืนยัน',
      ZH: '輸入驗證碼',
    });
  }

  get code_instruction() {
    return this.getText({
      EN: "We've sent you an SMS with a verification code",
      SG: "We've sent you an SMS with a verification code",
      ID: 'Kami telah mengirim kode verifikasi melalui SMS',
      TH: 'เราได้ส่งรหัสยืนยันไปยัง SMS ของคุณ',
      ZH: '請輸入發送到的驗證碼',
    });
  }

  get code_send_again() {
    return this.getText({
      EN: 'Send Code Again',
      SG: 'Send Code Again',
      ID: 'Kirim kode verifikasi lagi',
      TH: 'ส่งรหัสอีกครั้ง',
      ZH: '再次發送驗證碼',
    });
  }

  get code_send_error() {
    return this.getText({
      EN: 'Incorrect code. Try again',
      SG: 'Incorrect code. Try again',
      ID: 'Kode salah. Coba lagi',
      TH: 'รหัสไม่ถูกต้อง กรุณาลองอีกครั้ง',
      ZH: '驗證碼不正確。 請再試一次',
    });
  }

  get details_header() {
    return this.getText({
      EN: 'Enter your details',
      SG: 'Enter your details',
      ID: 'Masukkan detail Anda',
      TH: 'กรุณากรอกข้อมูลของคุณ',
      ZH: '输入您的詳细資料',
    });
  }

  get name_label() {
    return this.getText({
      EN: 'Your name',
      SG: 'Your name',
      ID: 'Nama kamu',
      TH: 'ชื่อของคุณ',
      ZH: '您的名稱',
    });
  }

  get name_placeholder() {
    return this.getText({
      EN: 'John Appleseed',
      SG: 'John Appleseed',
      ID: 'Adriansyah Pradana',
      TH: 'นายปลาหมึก สีแดง',
      ZH: '陳大文',
    });
  }

  get name_error() {
    return this.getText({
      EN: 'Name is required',
      SG: 'Name is required',
      ID: 'Nama harus di-isi',
      TH: 'กรุณาระบุชื่อ',
      ZH: '必須填寫名稱',
    });
  }

  get business_label() {
    return this.getText({
      EN: 'Business Name',
      SG: 'Business Name',
      ID: 'Nama bisnis',
      TH: 'ชื่อร้านอาหาร',
      ZH: '商家名稱',
    });
  }

  get business_placeholder() {
    return this.getText({
      EN: 'Fruit Planet Co Supplier',
      SG: 'Fruit Planet Co Supplier',
      ID: 'Planet Buah',
      TH: 'ร้านชานมไข่มุกตราปลาหมึก (สาทร)',
      ZH: '香港冰室',
    });
  }

  get business_error() {
    return this.getText({
      EN: 'Business name is required',
      SG: 'Business name is required',
      ID: 'Nama bisnis harus di-isi',
      TH: 'กรุณาระบุชื่อร้านอาหาร',
      ZH: '必須填寫商家名稱',
    });
  }

  get location_header() {
    return this.getText({
      EN: 'Where is your business located?',
      SG: 'Where is your business located?',
      ID: 'Dimana lokasi usaha kamu?',
      TH: 'ธุรกิจของคุณตั้งอยู่ที่ไหน',
      ZH: '您的公司位於那裏？',
    });
  }

  get country_label() {
    return this.getText({
      EN: 'Country',
      SG: 'Country',
      ID: 'Negara',
      TH: 'ประเทศ',
      ZH: '國家',
    });
  }

  get country_placeholder() {
    return this.getText({
      EN: 'Start typing',
      SG: 'Start typing',
      ID: 'Mulai ketik',
      TH: 'กรอกข้อมูล',
      ZH: '開始輸入',
    });
  }

  get country_error() {
    return this.getText({
      EN: 'Country is required',
      SG: 'Country is required',
      ID: 'Negara harus di-isi',
      TH: 'กรุณากรอกชื่อประเทศ',
      ZH: '必須填寫國家',
    });
  }

  get city_label() {
    return this.getText({
      EN: 'City',
      SG: 'City',
      ID: 'Kota',
      TH: 'จังหวัด',
      ZH: '城市',
    });
  }

  get city_placeholder() {
    return this.getText({
      EN: 'E.g. San Francisco',
      SG: 'E.g. San Francisco',
      ID: 'Contoh: Jakarta',
      TH: 'E.g. Bangkok',
      ZH: '例如 Hong Kong',
    });
  }

  get city_error() {
    return this.getText({
      EN: 'City is required',
      SG: 'City is required',
      ID: 'Kota harus di-isi',
      TH: 'กรุณากรอกชื่อจังหวัด',
      ZH: '必須填寫城市',
    });
  }

  get items_header() {
    return this.getText({
      EN: 'Add multiple items in 30 seconds',
      SG: 'Add multiple items in 30 seconds',
      ID: 'Tambah barang dalam 30 detik',
      TH: 'เพิ่มรายการสินค้าได้ภายใน 30 วินาที',
      ZH: '在30秒內添加多個商品',
    });
  }

  get items_description() {
    return this.getText({
      EN: 'Quick-add catalog items. You can edit details (prices, photos, descriptions) later',
      SG: 'Quick-add catalog items. You can edit details (prices, photos, descriptions) later',
      ID: 'Masukkan barang untuk katalog kamu. Kamu bisa merubah detail barang nanti (harga, gambar, deskripsi)',
      TH: 'เพิ่มรายการในแคตตาล็อก คุณสามารถแก้ไขรายละเอียด (ราคา รูปภาพ และคำอธิบาย) ได้ในภายหลัง',
      ZH: '快速添加產品目錄商品。 您以後可以編輯詳細信息（價格，照片，說明）',
    });
  }

  get items_number() {
    return this.getText({
      EN: 'Item',
      SG: 'Item',
      ID: 'Barang',
      TH: 'รายละเอียดของสินค้า',
      ZH: '商品',
    });
  }

  get item_placeholder() {
    return this.getText({
      EN: 'Item name*',
      SG: 'Item name*',
      ID: 'Nama barang*',
      TH: 'ชื่อรายการสินค้า*',
      ZH: '商品名稱*',
    });
  }

  get item_error() {
    return this.getText({
      EN: 'Item name is required',
      SG: 'Item name is required',
      ID: 'Nama barang harus di-isi',
      TH: 'กรุณาใส่ชื่อรายการสินค้า',
      ZH: '必須填寫商品名稱',
    });
  }

  get item_unit_label() {
    return this.getText({
      EN: 'Unit*',
      SG: 'Unit*',
      ID: 'Satuan*',
      TH: 'หน่วย*',
      ZH: '單位*',
    });
  }

  get item_unit_error() {
    return this.getText({
      EN: 'Unit is required',
      SG: 'Unit is required',
      ID: 'Satuan harus di isi',
      TH: 'จำเป็นต้องใส่หน่วยสินค้า',
      ZH: '必須填寫單位',
    });
  }

  get item_custom_unit_label() {
    return this.getText({
      EN: 'Custom unit*',
      SG: 'Custom unit*',
      ID: 'Satuan*',
      TH: 'หน่วยที่กำหนดเอง',
      ZH: '自訂單位*',
    });
  }

  get item_custom_unit_error() {
    return this.getText({
      EN: 'Custom unit is required',
      SG: 'Custom unit is required',
      ID: 'Satuan harus di isi',
      TH: 'จำเป็นต้องใส่หน่วยสินค้า',
      ZH: '必須填寫自訂單位',
    });
  }

  get delete_warning_header() {
    return this.getText({
      EN: 'Delete This Item?',
      SG: 'Delete This Item?',
      ID: 'Hapus Barang Ini?',
      TH: 'ลบรายการนี้',
      ZH: '刪除這個商品？',
    });
  }

  get delete_warning_message() {
    return this.getText({
      EN: 'This details entered cannot be restored',
      SG: 'This details entered cannot be restored',
      ID: 'Data yang dihapus tidak dapat dipulihkan',
      TH: 'คุณจะไม่สามารถเรียกคืนรายละเอียดนี้ได้',
      ZH: '輸入的詳細信息無法恢復',
    });
  }

  get success_header() {
    return this.getText({
      EN: "Yay, you're all set!",
      SG: "Yay, you're all set!",
      ID: 'Yay, selesai!',
      TH: 'แคตตาล็อคของคุณพร้อมใช้งานแล้ว',
      ZH: '是的，您都準備好了！',
    });
  }

  get success_info() {
    return this.getText({
      EN:
        'Share your catalog link with new and existing customers. You can easily change items and manage catalog settings later',
      SG:
        'Share your catalog link with new and existing customers. You can easily change items and manage catalog settings later',
      ID:
        'Bagikan link katalog kamu ke pelanggan. Kamu bisa merubah barang dan mengatur katalog di lain waktu.',
      TH:
        'แชร์ลิ้งค์แคตตาล็อกของคุณกับลูกค้าใหม่และลูกค้าปัจจุบัน คุณสามารถเปลี่ยนรายการและจัดการการตั้งค่าแคตตาล็อกได้อย่างง่ายดายในภายหลัง',
      ZH: '與新舊客戶分享您的目錄鏈結。 您以後可以輕鬆更改商品並管理目錄設置',
    });
  }

  get catalog_link_label() {
    return this.getText({
      EN: 'Catalogue Link',
      SG: 'Catalogue Link',
      ID: 'Link katalog',
      TH: 'ลิ้งค์แคตตาล็อก',
      ZH: '目錄鏈結',
    });
  }

  get catalog_link_copied() {
    return this.getText({
      EN: 'Link copied to clipboard',
      SG: 'Link copied to clipboard',
      ID: 'Link telah disalin',
      TH: 'คัดลอกลิ้งค์ไปยังคลิปบอร์ดแล้ว',
      ZH: '鏈結已復製到剪貼板',
    });
  }

  get order_link_copied() {
    return this.getText({
      EN: 'Order details copied to clipboard',
      SG: 'Order details copied to clipboard',
      ID: 'Detail pesanan disalin ke clipboard',
      TH: 'คัดลอกรายละเอียดคำสั่งซื้อไปยังคลิปบอร์ดแล้ว',
      ZH: '訂單細節已復製到剪貼板',
    });
  }

  get step_signup() {
    return this.getText({
      EN: 'Sign Up',
      SG: 'Sign Up',
      ID: 'Daftar',
      TH: 'ลงชื่อเข้าใช้',
      ZH: '註冊',
    });
  }

  get step_add_items() {
    return this.getText({
      EN: 'Add Items',
      SG: 'Add Items',
      ID: 'Tambah barang',
      TH: 'เพิ่มรายการ',
      ZH: '新增商品',
    });
  }

  get step_sell() {
    return this.getText({
      EN: 'Sell',
      SG: 'Sell',
      ID: 'Jual',
      TH: 'เริ่มต้นการขาย',
      ZH: '銷售',
    });
  }

  get btn_cancel() {
    return this.getText({
      EN: 'Cancel',
      SG: 'Cancel',
      ID: 'Batalkan',
      TH: 'ยกเลิก',
      ZH: '取消',
    });
  }

  get btn_delete() {
    return this.getText({
      EN: 'Delete',
      SG: 'Delete',
      ID: 'Hapus',
      TH: 'ลบ',
      ZH: '刪除',
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

  get btn_next() {
    return this.getText({
      EN: 'Next',
      SG: 'Next',
      ID: 'Lanjut',
      TH: 'ต่อไป',
      ZH: '下一步',
    });
  }

  get catalog_link_template() {
    return this.getText({
      EN: 'Here’s a catalog list of items I sell. Place a direct order for items you\'re interested in!',
      SG: 'Here’s a catalog list of items I sell. Place a direct order for items you\'re interested in!',
      ID: 'Berikut katalog barang yang kami jual. Silakan pesan barang yang Anda inginkan!',
      TH: 'นี่คือรายการแคตตาล็อกสินค้าของฉัน  สั่งซื้อโดยตรงสำหรับสินค้าที่คุณสนใจ!',
      ZH: '這是我的商品目錄清單。 直接訂購您感興趣的商品!',
    });
  }

  get ready_to_create() {
    return this.getText({
      EN: "Ready to create your first catalog? Let's start with some business details for your customers",
      SG: "Ready to create your first catalog? Let's start with some business details for your customers",
      ID: 'Siap untuk membuat katalog kamu? Ayo mulai dengan detail usaha kamu',
      TH: 'พร้อมที่จะสร้างแคตตาล็อกแรกของคุณแล้วหรือยัง? เริ่มจากรายละเอียดธุรกิจสำหรับลูกค้าของคุณ',
      ZH: '準備創建您的第一個目錄嗎？ 讓我們開始為您的客戶提供一些業務細節',
    });
  }

  get deliver_within() {
    return this.getText({
      EN: 'E.g. Fruit Planet sells only fresh fruits sourced from local farmers. We deliver within 1 day for orders placed before 4:00PM.',
      SG: 'E.g. Fruit Planet sells only fresh fruits sourced from local farmers. We deliver within 1 day for orders placed before 4:00PM.',
      ID: 'Contoh: Planet Buah hanya menjual buah dengan kualitas terbaik dari petani. Kami dapat melakukan pengiriman untuk esok hari!',
      TH: 'เช่น Fruit Planet จำหน่ายเฉพาะผลไม้สดที่มาจากเกษตรกรในพื้นที่ เราจัดส่งภายใน 1 วันสำหรับการสั่งซื้อก่อน 16:00 น.',
      ZH: '例如。 水果星球只出售當地農民提供的新鮮水果。 於4:00 PM之前下的訂單，我們會在1天之內交付。',
    });
  }

  get your_customers() {
    return this.getText({
      EN: 'Let your customers know about delivery fees. You can also allow them to choose delivery days',
      SG: 'Let your customers know about delivery fees. You can also allow them to choose delivery days',
      ID: 'Beri tahu pelangganmu mengenai tarif ongkos kirim dan atur izin mereka untuk memilih hari pengiriman',
      TH: 'แจ้งให้ลูกค้าของคุณทราบเกี่ยวกับค่าธรรมเนียมการจัดส่ง คุณยังสามารถอนุญาตให้พวกเขาเลือกวันจัดส่งได้ด้วย',
      ZH: '讓您的客戶知道送貨費用。 您還可以允許他們選擇交貨日期',
    });
  }

  get items_and_details() {
    return this.getText({
      EN: 'Add items and details like price, photos, description. You can always edit them later',
      SG: 'Add items and details like price, photos, description. You can always edit them later',
      ID: 'Tambahkan barang dan detail seperti harga, foto, dan deskripsi. Kamu bisa mengubah detail lagi nantinya',
      TH: 'เพิ่มรายการและรายละเอียด เช่น ราคา, รูปภาพ และคำอธิบาย คุณสามารถแก้ไขได้ในภายหลัง',
      ZH: '添加商品和細節，例如價格，照片，說明。 您以後可以隨時對其進行編輯。',
    });
  }

  get first_catalog() {
    return this.getText({
      EN: "Yay, you've created your first catalog!",
      SG: "Yay, you've created your first catalog!",
      ID: 'Hore, kamu telah membuat katalog pertamamu!',
      TH: 'คุณได้สร้างแคตตาล็อกแรกของคุณแล้ว!',
      ZH: '是的，您已經創建了第一個目錄！',
    });
  }

  get tap_the_catalog_link() {
    return this.getText({
      EN: 'Tap the catalog link to preview what it looks like for customers. You can edit details and items later.',
      SG: 'Tap the catalog link to preview what it looks like for customers. You can edit details and items later.',
      ID: 'Tekan link katalog untuk melihat toko dari sisi pelanggan. Kamu bisa mengubah detail dan barangnya lagi nanti',
      TH: 'แตะลิงก์แคตตาล็อกเพื่อดูว่าลูกค้าเป็นอย่างไร คุณสามารถแก้ไขรายละเอียดและรายการได้ในภายหลัง',
      ZH: '點擊目錄鏈結以預覽對客戶的外觀。 您可以稍後編輯細節和商品。',
    });
  }

  get modal_delete_title() {
    return this.getText({
      EN: 'Delete Item',
      SG: 'Delete Item',
      ID: 'Hapus barang',
      TH: 'ลบรายการสินค้า',
      ZH: '刪除商品',
    });
  }

  get modal_delete_text() {
    return this.getText({
      EN: 'This action cannot be undone',
      SG: 'This action cannot be undone',
      ID: 'Kamu akan menghapus barang secara permanen',
      TH: 'การดำเนินการนี้ไม่สามารถยกเลิกได้',
      ZH: '此操作無法撤消',
    });
  }

  get btn_remove() {
    return this.getText({
      EN: 'Delete',
      SG: 'Delete',
      ID: 'Hapus',
      TH: 'ลบ',
      ZH: '刪除',
    });
  }

  get install_app() {
    return this.getText({
      EN: 'Install the app on your Home Screen',
      SG: 'Install the app on your Home Screen',
      ID: 'Install aplikasi ini di beranda Anda',
      TH: 'ติดตั้งแอปบนหน้าจอหลักของคุณ',
      ZH: '在主屏幕上安裝應用程式',
    });
  }

  get install_cta() {
    return this.getText({
      EN: 'Install',
      SG: 'Install',
      ID: 'Install',
      TH: 'ติดตั้ง',
      ZH: '安裝',
    });
  }
}
