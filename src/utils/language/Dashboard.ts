import AbstractLanguage from './AbstractLanguage';

export default class Dashboard extends AbstractLanguage {
  get welcome_header() {
    return this.getText({
      EN: 'Welcome, ',
      SG: 'Welcome, ',
      ID: 'Selamat datang, ',
      TH: 'ยินดีต้อนรับ ',
      ZH: '歡迎, ',
    });
  }

  get date_today() {
    return this.getText({
      EN: 'Today',
      SG: 'Today',
      ID: 'Hari ini',
      TH: 'วันนี้',
      ZH: '今天',
    });
  }

  get date_tomorrow() {
    return this.getText({
      EN: 'Tomorrow',
      SG: 'Tomorrow',
      ID: 'Besok',
      TH: 'พรุ่งนี้',
      ZH: '明天',
    });
  }

  get catalog_visit() {
    return this.getText({
      EN: 'Catalog Visits',
      SG: 'Catalog Visits',
      ID: 'Kunjungan',
      TH: 'เข้าชมแคตตาล็อก',
      ZH: '目錄訪問',
    });
  }

  get orders_received() {
    return this.getText({
      EN: 'Orders Received',
      SG: 'Orders Received',
      ID: 'Pesanan Diterima',
      TH: 'รายการที่ได้รับ',
      ZH: '已收訂單',
    });
  }

  get pending_orders() {
    return this.getText({
      EN: 'Pending Orders',
      SG: 'Pending Orders',
      ID: 'Butuh Konfirmasi',
      TH: 'คำสั่งซื้อคงค้าง',
      ZH: '待處理訂單',
    });
  }

  get to_be_confirmed_orders() {
    return this.getText({
      EN: 'Orders To Be Confirmed',
      SG: 'Orders To Be Confirmed',
      ID: 'Pesanan untuk konfirmasi',
      TH: 'คำสั่งซื้อที่ต้องได้รับการยืนยัน',
      ZH: '個訂單待確認',
    });
  }

  get no_to_be_shipped_orders() {
    return this.getText({
      EN: 'No orders to be shipped at this time',
      SG: 'No orders to be shipped at this time',
      ID: 'Tidak ada pesanan untuk dikirim saat ini',
      TH: 'ไม่มีคำสั่งซื้อที่จะต้องจัดส่งในขณะนี้',
      ZH: '目前無訂單可發貨',
    });
  }

  get to_be_shipped_orders() {
    return this.getText({
      EN: 'Orders To Be Shipped',
      SG: 'Orders To Be Shipped',
      ID: 'Kirim Pesanan',
      TH: 'คำสั่งซื้อที่จะต้องจัดส่ง',
      ZH: '待發貨訂單',
    });
  }

  get action_needed() {
    return this.getText({
      EN: 'Action Needed',
      SG: 'Action Needed',
      ID: 'Menunggu konfirmasi',
      TH: 'จำเป็นต้องดำเนินการ',
      ZH: '需要採取的行動',
    });
  }

  get no_new_orders() {
    return this.getText({
      EN: 'No New Orders',
      SG: 'No New Orders',
      ID: 'Belum ada pesanan',
      TH: 'ไม่มีคำสั่งซื้อใหม่',
      ZH: '沒有新訂單',
    });
  }

  get no_new_orders_subtext() {
    return this.getText({
      EN: 'Ready? Share your catalogs now',
      SG: 'Ready? Share your catalogs now',
      ID: 'Siap? Bagikan katalog sekarang',
      TH: 'พร้อมหรือยัง แบ่งปันแคตตาล็อกของคุณตอนนี้',
      ZH: '準備好？ 立即分享您的目錄',
    });
  }

  get add_more_items() {
    return this.getText({
      EN: 'Add More Items',
      SG: 'Add More Items',
      ID: 'Tambah Barang',
      TH: 'เพิ่มรายการสินค้า',
      ZH: '添加更多商品',
    });
  }

  get add_more_items_subtext() {
    return this.getText({
      EN: 'Add more items!',
      SG: 'Add more items!',
      ID: 'Tambah barang!',
      TH: 'เพิ่มรายการสินค้า!',
      ZH: '添加更多商品！',
    });
  }

  get add_more_items_description() {
    return this.getText({
      EN: "Nice work, you've added your first item! Add the rest and manage your orders here",
      SG: "Nice work, you've added your first item! Add the rest and manage your orders here",
      ID: 'Anda telah menambahkan barang pertama Anda! Tambahkan lagi dan atur pesanan disini',
      TH: 'เยี่ยมมากคุณได้เพิ่มรายการแรกแล้ว! เพิ่มส่วนที่เหลือและจัดการคำสั่งซื้อของคุณที่นี่',
      ZH: '做得好，您已經添加了第一件商品！ 添加其餘內容並在此處管理您的訂單',
    });
  }

  get no_items_yet() {
    return this.getText({
      EN: 'No Items Yet',
      SG: 'No Items Yet',
      ID: 'Belum ada barang',
      TH: 'ยังไม่มีรายการ',
      ZH: '暫無商品',
    });
  }

  get no_items_yet_subtext() {
    return this.getText({
      EN: 'Add items to get started!',
      SG: 'Add items to get started!',
      ID: 'Tambahkan barang untuk memulai!',
      TH: 'เพิ่มรายการเพื่อเริ่มต้น!',
      ZH: '添加項目即可開始！',
    });
  }

  get no_items_yet_description() {
    return this.getText({
      EN: 'Add items, share catalogs, and manage orders in one place!',
      SG: 'Add items, share catalogs, and manage orders in one place!',
      ID: 'Tambah barang, bagikan katalog, dan atur pesanan di satu tempat!',
      TH: 'เพิ่มรายการ, แบ่งปันแคตตาล็อกและจัดการคำสั่งซื้อที่นี่!',
      ZH: '在此處添加商品，分享目錄並管理訂單！',
    });
  }

  get btn_add_items() {
    return this.getText({
      EN: 'Add Items',
      SG: 'Add Items',
      ID: 'Tambah barang',
      TH: 'เพิ่มรายการ',
      ZH: '新增商品',
    });
  }

  get clear_all() {
    return this.getText({
      EN: 'Clear All',
      SG: 'Clear All',
      ID: 'Hapus Semua',
      TH: 'ลบทั้งหมด',
      ZH: '全部清除',
    });
  }

  get upcoming_deliveries() {
    return this.getText({
      EN: 'Upcoming Deliveries',
      SG: 'Upcoming Deliveries',
      ID: 'Menunggu Pengiriman',
      TH: 'การจัดส่งที่จะเกิดขึ้น',
      ZH: '即將運送',
    });
  }

  get status_header() {
    return this.getText({
      EN: 'Status',
      SG: 'Status',
      ID: 'Status',
      TH: 'สถานะ',
      ZH: '狀態',
    });
  }

  get upcoming_deliveries_only() {
    return this.getText({
      EN: 'Upcoming Deliveries Only',
      SG: 'Upcoming Deliveries Only',
      ID: 'Menunggu Pengiriman',
      TH: 'การจัดส่งที่กำลังจะเกิดขึ้นเท่านั้น',
      ZH: '僅即將交貨',
    });
  }

  get upcoming_text() {
    return this.getText({
      EN: 'Orders with an upcoming delivery date chosen by customers',
      SG: 'Orders with an upcoming delivery date chosen by customers',
      ID: 'Pesanan dengan tanggal pengiriman oleh pelanggan',
      TH: 'คำสั่งซื้อที่มีวันจัดส่งที่กำลังจะมาถึงตามที่ลูกค้าเลือก',
      ZH: '客戶選擇即將到來的運送日期的訂單',
    });
  }

  get sort_button() {
    return this.getText({
      EN: 'Sort',
      SG: 'Sort',
      ID: 'Urutkan',
      TH: 'จัดเรียง',
      ZH: '分類',
    });
  }

  get sort_orders() {
    return this.getText({
      EN: 'Sort Orders',
      SG: 'Sort Orders',
      ID: 'Urutkan pesanan',
      TH: 'จัดเรียงคำสั่งซื้อ',
      ZH: '訂單分類',
    });
  }

  get quote_requests() {
    return this.getText({
      EN: 'Quote Requests',
      SG: 'Quote Requests',
      ID: 'Permintaan Harga',
      TH: 'คำขอใบเสนอราคา',
      ZH: '報價請求',
    });
  }

  get quick_links_header() {
    return this.getText({
      EN: 'Quick Links',
      SG: 'Quick Links',
      ID: 'Link kilat',
      TH: 'ลิ้งค์ด่วน',
      ZH: '快速鏈結',
    });
  }

  get other_header() {
    return this.getText({
      EN: 'Other',
      SG: 'Other',
      ID: 'Lainnya',
      TH: 'กำหนดเอง',
      ZH: '其他',
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

  get other_all_orders() {
    return this.getText({
      EN: 'View All Orders',
      SG: 'View All Orders',
      ID: 'Lihat Semua Pesanan',
      TH: 'ดูคำสั่งซื้อทั้งหมด',
      ZH: '查看所有訂單',
    });
  }

  get other_tutorial() {
    return this.getText({
      EN: 'How It Works',
      SG: 'How It Works',
      ID: 'Cara Kerja',
      TH: 'ทำงานอย่างไร',
      ZH: '運作方法',
    });
  }

  get other_support() {
    return this.getText({
      EN: 'Contact Support',
      SG: 'Contact Support',
      ID: 'Kontak Support',
      TH: 'ติดต่อฝ่ายสนับสนุนลูกค้า',
      ZH: '聯繫Tinvio團隊',
    });
  }

  get how_it_works() {
    return this.getText({
      EN: 'How It Works',
      SG: 'How It Works',
      ID: 'Cara Kerja',
      TH: 'ทำงานอย่างไร',
      ZH: '運作方法',
    });
  }

  get notification_header() {
    return this.getText({
      EN: 'Notifications',
      SG: 'Notifications',
      ID: 'Notifikasi',
      TH: 'การแจ้งเตือน',
      ZH: '通知',
    });
  }

  get are_you_ready() {
    return this.getText({
      EN: 'Are you ready?',
      SG: 'Are you ready?',
      ID: 'Kamu siap?',
      TH: 'คุณพร้อมหรือไม่?',
      ZH: '你準備好了嗎？',
    });
  }

  get deliveries_to_complete() {
    return this.getText({
      EN: 'deliveries to complete',
      SG: 'deliveries to complete',
      ID: 'pesanan harus dikirim',
      TH: 'รายการที่ต้องจัดส่ง',
      ZH: '個交付完成',
    });
  }

  get orders_header() {
    return this.getText({
      EN: 'Orders',
      SG: 'Orders',
      ID: 'Pesanan',
      TH: 'คำสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get filter_orders_header() {
    return this.getText({
      EN: 'Filter Orders',
      SG: 'Filter Orders',
      ID: 'Filter pesanan',
      TH: 'กรองคำสั่งซื้อ',
      ZH: '篩選訂單',
    });
  }

  get delivery_date_header() {
    return this.getText({
      EN: 'Delivery Date',
      SG: 'Delivery Date',
      ID: 'Tanggal Pengiriman',
      TH: 'วันที่จัดส่ง',
      ZH: '運送日期',
    });
  }

  get order_date_header() {
    return this.getText({
      EN: 'Order Date',
      SG: 'Order Date',
      ID: 'Tanggal Pesanan',
      TH: 'วันที่สั่ง',
      ZH: '訂單日期',
    });
  }

  get btn_apply_filters() {
    return this.getText({
      EN: 'Apply Filters',
      SG: 'Apply Filters',
      ID: 'Gunakan Filter',
      TH: 'ใช้ตัวกรอง',
      ZH: '套用篩選器',
    });
  }

  get range_all_orders() {
    return this.getText({
      EN: 'All Orders',
      SG: 'All Orders',
      ID: 'Semua',
      TH: 'คำสั่งซื้อทั้งหมด',
      ZH: '所有訂單',
    });
  }

  get range_option_upcoming() {
    return this.getText({
      EN: 'All Upcoming',
      SG: 'All Upcoming',
      ID: 'Semua pesanan',
      TH: 'กำลังจะเกิดขึ้นทั้งหมด',
      ZH: '所有即將的',
    });
  }

  get range_option_today() {
    return this.getText({
      EN: 'Today',
      SG: 'Today',
      ID: 'Hari ini',
      TH: 'วันนี้',
      ZH: '今天',
    });
  }

  get range_option_tomorrow() {
    return this.getText({
      EN: 'Tomorrow',
      SG: 'Tomorrow',
      ID: 'Besok',
      TH: 'พรุ่งนี้',
      ZH: '明天',
    });
  }

  get range_option_yesterday() {
    return this.getText({
      EN: 'Yesterday',
      SG: 'Yesterday',
      ID: 'Kemarin',
      TH: 'เมื่อวาน',
      ZH: '昨天',
    });
  }

  get range_option_seven() {
    return this.getText({
      EN: 'Last 7 Days',
      SG: 'Last 7 Days',
      ID: '7 Hari Terakhir',
      TH: '7 วันที่ผ่านมา',
      ZH: '最近7天',
    });
  }

  get range_option_thirty() {
    return this.getText({
      EN: 'Last 30 Days',
      SG: 'Last 30 Days',
      ID: '30 Hari Terakhir',
      TH: '30 วันที่ผ่านมา',
      ZH: '最近30天',
    });
  }

  get range_option_next_seven() {
    return this.getText({
      EN: 'Next 7 Days',
      SG: 'Next 7 Days',
      ID: '7 Hari Berikutnya',
      TH: '7 วันถัดไป',
      ZH: '最近7天',
    });
  }

  get range_option_next_thirty() {
    return this.getText({
      EN: 'Next 30 Days',
      SG: 'Next 30 Days',
      ID: '30 Hari Berikutnya',
      TH: '30 วันถัดไป',
      ZH: '最近30天',
    });
  }

  get range_option_custom() {
    return this.getText({
      EN: 'Custom',
      SG: 'Custom',
      ID: 'Sesuaikan',
      TH: 'กำหนดเอง',
      ZH: '自訂',
    });
  }

  get from_label() {
    return this.getText({
      EN: 'From',
      SG: 'From',
      ID: 'Dari',
      TH: 'จาก',
      ZH: '從',
    });
  }

  get from_error() {
    return this.getText({
      EN: 'Date is invalid',
      SG: 'Date is invalid',
      ID: 'Tanggal tidak valid',
      TH: 'วันที่ไม่ถูกต้อง',
      ZH: '日期無效',
    });
  }

  get till_label() {
    return this.getText({
      EN: 'Till',
      SG: 'Till',
      ID: 'Hingga',
      TH: 'จนถึง',
      ZH: '直到',
    });
  }

  get till_error() {
    return this.getText({
      EN: 'Date is invalid',
      SG: 'Date is invalid',
      ID: 'Tanggal tidak valid',
      TH: 'วันที่ไม่ถูกต้อง',
      ZH: '日期無效',
    });
  }

  get ordered_in() {
    return this.getText({
      EN: 'Ordered In',
      SG: 'Ordered In',
      ID: 'Dipesan pada',
      TH: 'มีคำสั่งซื้อเข้ามา',
      ZH: '訂購於',
    });
  }

  get add_items_first() {
    return this.getText({
      EN: 'Add Items First',
      SG: 'Add Items First',
      ID: 'Add Items First',
      TH: 'Add Items First',
      ZH: 'Add Items First',
    });
  }

  get add_items_first_text() {
    return this.getText({
      EN: 'Wait, you have to add items first! Once done, you can share catalogs and manage your orders here!',
      SG: 'Wait, you have to add items first! Once done, you can share catalogs and manage your orders here!',
      ID: 'Wait, you have to add items first! Once done, you can share catalogs and manage your orders here!',
      TH: 'Wait, you have to add items first! Once done, you can share catalogs and manage your orders here!',
      ZH: 'Wait, you have to add items first! Once done, you can share catalogs and manage your orders here!',
    });
  }

  get no_orders_yet() {
    return this.getText({
      EN: 'No Orders Yet',
      SG: 'No Orders Yet',
      ID: 'Belum ada pesanan',
      TH: 'ยังไม่มีคำสั่งซื้อ',
      ZH: '尚無訂單',
    });
  }

  get no_orders_text() {
    return this.getText({
      EN: 'Share catalog links with your customers so that they can place orders',
      SG: 'Share catalog links with your customers so that they can place orders',
      ID: 'Bagikan link katalog dengan pelanggan agar mereka bisa memesan',
      TH: 'แบ่งปันลิ้งค์แคตตาล็อกกับลูกค้าของคุณเพื่อให้พวกเขาสามารถสั่งซื้อได้',
      ZH: '與您的客戶分享目錄鏈結，以便他們下訂單',
    });
  }

  get btn_share_catalogs() {
    return this.getText({
      EN: 'Share Catalogs',
      SG: 'Share Catalogs',
      ID: 'Bagikan katalog',
      TH: 'แบ่งปันแคตตาล็อก',
      ZH: '分享目錄',
    });
  }

  get btn_select() {
    return this.getText({
      EN: 'Select',
      SG: 'Select',
      ID: 'Pilih',
      TH: 'เลือก',
      ZH: '請選擇',
    });
  }

  get date_range_error() {
    return this.getText({
      EN: 'Oops! There are no orders with these filters. Try adjusting the filters.',
      SG: 'Oops! There are no orders with these filters. Try adjusting the filters.',
      ID: 'Oops! Tidak ada pesanan dengan filter tersebut. Coba ubah filter Anda.',
      TH: 'ไม่พบคำสั่งซื้อสำหรับตัวกรองนี้ ลองปรับตัวกรองใหม่',
      ZH: '哎呀！ 這些篩選器沒有訂單。 嘗試調整篩選器。',
    });
  }

  get pending_order_headers() {
    return this.getText({
      EN: 'Pending Orders',
      SG: 'Pending Orders',
      ID: 'Butuh Konfirmasi',
      TH: 'คำสั่งซื้อรอการยืนยัน',
      ZH: '待處理訂單',
    });
  }

  get copy_details() {
    return this.getText({
      EN: 'Copy Details',
      SG: 'Copy Details',
      ID: 'Salin Detil',
      TH: 'คัดลอกรายการ',
      ZH: '拷貝内容',
    });
  }

  get download_pdf() {
    return this.getText({
      EN: 'Download PDF',
      SG: 'Download PDF',
      ID: 'Unduh PDF',
      TH: 'ดาวน์โหลดไฟล์ PDF',
      ZH: '下載 PDF',
    });
  }

  get delivery_on() {
    return this.getText({
      EN: 'Delivery on ',
      SG: 'Delivery on ',
      ID: 'Pengiriman pada',
      TH: 'จัดส่ง',
      ZH: '運送',
    });
  }

  get order_notes() {
    return this.getText({
      EN: 'Order Notes',
      SG: 'Order Notes',
      ID: 'Catatan Pesanan',
      TH: 'หมายเหตุคำสั่งซื้อ',
      ZH: '訂單筆記',
    });
  }

  get placed_by_header() {
    return this.getText({
      EN: 'Placed By',
      SG: 'Placed By',
      ID: 'Dipesan oleh',
      TH: 'ส่งคำสั่งซื้อโดย',
      ZH: '由',
    });
  }

  get delivery_address() {
    return this.getText({
      EN: 'Delivery Address',
      SG: 'Delivery Address',
      ID: 'Alamat Pengimiran',
      TH: 'ที่อยู่ในการจัดส่ง',
      ZH: '運送地址',
    });
  }

  get instructions_header() {
    return this.getText({
      EN: 'Special Instructions',
      SG: 'Special Instructions',
      ID: 'Instruksi Khusus',
      TH: 'หมายเหตุ',
      ZH: '特别指示',
    });
  }

  get deliveries_header() {
    return this.getText({
      EN: 'Deliveries',
      SG: 'Deliveries',
      ID: 'Pengiriman',
      TH: 'การส่งของ',
      ZH: '運送',
    });
  }

  get delivery_today() {
    return this.getText({
      EN: 'Delivery Today',
      SG: 'Delivery Today',
      ID: 'Pengiriman hari ini',
      TH: 'จัดส่งวันนี้',
      ZH: '今天運送',
    });
  }

  get delivery_tomorrow() {
    return this.getText({
      EN: 'Delivery Tomorrow',
      SG: 'Delivery Tomorrow',
      ID: 'Pengiriman besok',
      TH: 'จัดส่งพรุ่งนี้',
      ZH: '明天運送',
    });
  }

  get select_delivery_date() {
    return this.getText({
      EN: 'Select Delivery Date',
      SG: 'Select Delivery Date',
      ID: 'Pilih Tanggal Pengiriman',
      TH: 'เลือกวันที่จัดส่ง',
      ZH: '請選擇運送日期',
    });
  }

  get delivery_date() {
    return this.getText({
      EN: 'Delivery Date',
      SG: 'Delivery Date',
      ID: 'Tanggal Pengiriman',
      TH: 'วันที่จัดส่ง',
      ZH: '運送日期',
    });
  }

  get order_date() {
    return this.getText({
      EN: 'Order Date',
      SG: 'Order Date',
      ID: 'Tanggal Pesanan',
      TH: 'วันที่สั่ง',
      ZH: '訂單日期',
    });
  }

  get free() {
    return this.getText({
      EN: 'Free',
      SG: 'Free',
      ID: 'Gratis',
      TH: 'ฟรี',
      ZH: '免費',
    });
  }

  get subtotal_label() {
    return this.getText({
      EN: 'Sub Total',
      SG: 'Sub Total',
      ID: 'Sub Total',
      TH: 'ทั้งหมด',
      ZH: '小計',
    });
  }

  get delivery_charges_label() {
    return this.getText({
      EN: 'Delivery Charges',
      SG: 'Delivery Charges',
      ID: 'Biaya Pengiriman',
      TH: 'ค่าจัดส่ง',
      ZH: '送貨費用',
    });
  }

  get taxes_label() {
    return this.getText({
      EN: 'Taxes',
      SG: 'Taxes',
      ID: 'Pajak',
      TH: 'ภาษี',
      ZH: '稅額',
    });
  }

  get total_label() {
    return this.getText({
      EN: 'Total',
      SG: 'Total',
      ID: 'Total',
      TH: 'ทั้งหมด',
      ZH: '總共',
    });
  }

  get order_notes_header() {
    return this.getText({
      EN: 'Order Notes',
      SG: 'Order Notes',
      ID: 'Catatan Pesanan',
      TH: 'หมายเหตุคำสั่งซื้อ',
      ZH: '訂單筆記',
    });
  }

  get customer_details_header() {
    return this.getText({
      EN: 'Customer Details',
      SG: 'Customer Details',
      ID: 'Detail Pelanggan',
      TH: 'ข้อมูลลูกค้า',
      ZH: '客戶資料',
    });
  }

  get delivery_details_header() {
    return this.getText({
      EN: 'Delivery Details',
      SG: 'Delivery Details',
      ID: 'Detail Pengiriman',
      TH: 'รายละเอียดการจัดส่ง',
      ZH: '運送資料',
    });
  }

  get btn_ship_order() {
    return this.getText({
      EN: 'Ship Order',
      SG: 'Ship Order',
      ID: 'Kirim Pesanan',
      TH: 'ส่งคำสั่งซื้อ',
      ZH: '出貨',
    });
  }

  get btn_whatsapp() {
    return this.getText({
      EN: 'WhatsApp',
      SG: 'WhatsApp',
      ID: 'WhatsApp',
      TH: 'LINE',
      ZH: 'WhatsApp',
    });
  }

  get cancel_title_modal() {
    return this.getText({
      EN: 'Cancel Order',
      SG: 'Cancel Order',
      ID: 'Batalkan pesanan',
      TH: 'ยกเลิกคำสั่งซื้อนี้หรือไม่?',
      ZH: '取消此訂單？',
    });
  }

  get cancel_text_modal() {
    return this.getText({
      EN: 'This action cannot be undone. Your customer will also be informed.',
      SG: 'This action cannot be undone. Your customer will also be informed.',
      ID: 'Tindakan ini tidak dapat dibatalkan. Pelangganmu juga akan diinformasikan.',
      TH: 'เราจะแจ้งให้ลูกค้าของคุณทราบ',
      ZH: '我們會通知您的客戶',
    });
  }

  get cancel_btn_confirm() {
    return this.getText({
      EN: 'Cancel Order',
      SG: 'Cancel Order',
      ID: 'Batalkan pesanan',
      TH: 'ยกเลิกคำสั่งซื้อ',
      ZH: '取消訂單',
    });
  }

  get ship_title_modal() {
    return this.getText({
      EN: 'Mark this order as shipped',
      SG: 'Mark this order as shipped',
      ID: 'Tandai pesanan telah terkirim',
      TH: 'ทำเครื่องหมายคำสั่งซื้อนี้ว่าจัดส่งแล้ว',
      ZH: '將此訂單標記為已發貨',
    });
  }

  get ship_text_modal() {
    return this.getText({
      EN: 'Have you shipped this order? We’ll let your customer know',
      SG: 'Have you shipped this order? We’ll let your customer know',
      ID: 'Apakah kamu telah mengirim pesanan? Kami akan memberi tahu pelanggan',
      TH: 'คุณได้จัดส่งสินค้าตามคำสั่งซื้อนี้แล้วหรือไม่? เราจะแจ้งให้ลูกค้าของคุณทราบ',
      ZH: '您是否已運送此訂單？ 我們會通知您的客戶',
    });
  }

  get ship_btn_confirm() {
    return this.getText({
      EN: 'Yes',
      SG: 'Yes',
      ID: 'Ya',
      TH: 'ใช่',
      ZH: '是',
    });
  }

  get order_title_modal() {
    return this.getText({
      EN: 'Mark this order as delivered',
      SG: 'Mark this order as delivered',
      ID: 'Tandai pesanan telah sampai',
      TH: 'ทำเครื่องหมายคำสั่งซื้อนี้ว่าส่งเรียบร้อยแล้ว',
      ZH: '將此訂單標記為已交付',
    });
  }

  get order_text_modal() {
    return this.getText({
      EN: 'Are you sure this order has been delivered?',
      SG: 'Are you sure this order has been delivered?',
      ID: 'Apa kamu yakin pesanan telah diterima?',
      TH: 'คุณแน่ใจหรือไม่ว่าคำสั่งซื้อนี้ได้ถูกจัดส่งแล้ว?',
      ZH: '您確定此訂單已送達嗎？',
    });
  }

  get order_btn_confirm() {
    return this.getText({
      EN: 'Yes, delivered',
      SG: 'Yes, delivered',
      ID: 'Ya, Diterima',
      TH: 'ใช่ คำสั่งซื้อนี้ได้ถูกจัดส่งแล้ว',
      ZH: '是的，已交付',
    });
  }

  get orderView_share_button() {
    return this.getText({
      EN: 'Here’s the order summary for T-orderRef: tokenisedBuyerLink',
      SG: 'Here’s the order summary for T-orderRef: tokenisedBuyerLink',
      ID: 'Berikut rangkuman pesanan kamu untuk T-orderRef: tokenisedBuyerLink',
      TH: 'นี่คือสรุปคำสั่งซื้อสำหรับ T-orderRef: tokenisedBuyerLink',
      ZH: '這是 T-orderRef 的訂單摘要: tokenisedBuyerLink',
    });
  }

  get orderView_wa_button() {
    return this.getText({
      EN: 'Hello! I am contacting you regarding order T-orderRef: tokenisedBuyerLink',
      SG: 'Hello! I am contacting you regarding order T-orderRef: tokenisedBuyerLink',
      ID: 'Halo, Saya mengontak kamu terkait pesanan T-orderRef: tokenisedBuyerLink',
      TH: 'สวัสดี! ฉันกำลังติดต่อคุณเกี่ยวกับใบสั่งซื้อ T-orderRef: tokenisedBuyerLink',
      ZH: '你好! 我與您聯繫有關訂單 T-orderRef: tokenisedBuyerLink',
    });
  }

  get orders() {
    return this.getText({
      EN: 'Orders',
      SG: 'Orders',
      ID: 'Pesanan',
      TH: 'คำสั่งซื้อ',
      ZH: '個訂單',
    });
  }

  get header_quote_requests() {
    return this.getText({
      EN: 'Quote Requests',
      SG: 'Quote Requests',
      ID: 'Permintaan Harga',
      TH: 'คำขอใบเสนอราคา',
      ZH: '報價請求',
    });
  }

  get past_requests() {
    return this.getText({
      EN: 'Past Requests',
      SG: 'Past Requests',
      ID: 'Histori Permintaan Harga',
      TH: 'คำขอที่ผ่านมา',
      ZH: '過去的請求',
    });
  }

  get header_quote_details() {
    return this.getText({
      EN: 'Quote Details',
      SG: 'Quote Details',
      ID: 'Detail Permintaan',
      TH: 'รายละเอียดใบเสนอราคา',
      ZH: '報價詳情',
    });
  }

  get detail_requested_by() {
    return this.getText({
      EN: 'Request by',
      SG: 'Request by',
      ID: 'Diajukan oleh',
      TH: 'คำขอจาก',
      ZH: '要求者',
    });
  }

  get detail_phone() {
    return this.getText({
      EN: 'Phone',
      SG: 'Phone',
      ID: 'Nomor Telepon',
      TH: 'โทรศัพท์',
      ZH: '電話號碼',
    });
  }

  get detail_sent_on() {
    return this.getText({
      EN: 'Sent on',
      SG: 'Sent on',
      ID: 'Dikirim pada',
      TH: 'จัดส่ง',
      ZH: '已發送',
    });
  }

  get header_notes() {
    return this.getText({
      EN: 'Notes',
      SG: 'Notes',
      ID: 'Catatan',
      TH: 'หมายเหตุ',
      ZH: '須知',
    });
  }

  get btn_call() {
    return this.getText({
      EN: 'Call',
      SG: 'Call',
      ID: 'Telepon',
      TH: 'โทรติดต่อ',
      ZH: '致電',
    });
  }

  get this_month() {
    return this.getText({
      EN: 'This Month',
      SG: 'This Month',
      ID: 'Bulan ini',
      TH: 'เดือนนี้',
      ZH: '上個月',
    });
  }

  get last_month() {
    return this.getText({
      EN: 'Last Month',
      SG: 'Last Month',
      ID: 'Bulan lalu',
      TH: 'เดือนที่แล้ว',
      ZH: '這個月',
    });
  }

  get pending_sub_text() {
    return this.getText({
      EN: 'Review the order and confirm it soon',
      SG: 'Review the order and confirm it soon',
      ID: 'Tinjau pesanan dan konfirmasi segera',
      TH: 'ตรวจสอบคำสั่งซื้อและยืนยันโดยเร็วที่สุด',
      ZH: '查看訂單並儘快確認',
    });
  }

  get processed_sub_text() {
    return this.getText({
      EN: 'Mark the order as "Shipped" when it\'s sent out',
      SG: 'Mark the order as "Shipped" when it\'s sent out',
      ID: 'Tandai pesanan menjadi "Dikirimkan" jika memang sudah dikirimkan',
      TH: 'ทำเครื่องหมายคำสั่งซื้อว่า "จัดส่งแล้ว" เมื่อทำการจัดส่ง',
      ZH: '訂單發送後，將其標記為“已發貨”',
    });
  }

  get cancelled_sub_text() {
    return this.getText({
      EN: 'Contact the customer if this was a mistake',
      SG: 'Contact the customer if this was a mistake',
      ID: 'Hubungi pelanggan jika ini adalah sebuah kesalahan',
      TH: 'ติดต่อลูกค้าหากสิ่งนี้เป็นข้อผิดพลาด',
      ZH: '如果有誤，請與客戶聯絡',
    });
  }

  get shipped_sub_text() {
    return this.getText({
      EN: 'Mark the order as "Delivered" when the customer receives it',
      SG: 'Mark the order as "Delivered" when the customer receives it',
      ID: 'Tandai pesanan menjadi "Terkirim" jika pelanggan sudah menerimanya',
      TH: 'ทำเครื่องหมายคำสั่งซื้อว่า "จัดส่งเรียบร้อยแล้ว" เมื่อลูกค้าได้รับสินค้า',
      ZH: '客戶收到訂單後，將其標記為“已被送達”',
    });
  }

  get delivered_sub_text() {
    return this.getText({
      EN: 'We\'ve let the customer know it\'s delivered',
      SG: 'We\'ve let the customer know it\'s delivered',
      ID: 'Kami telah memberi tahu pelanggan bahwa sudah terkirim',
      TH: 'เราแจ้งให้ลูกค้าทราบว่ามีการจัดส่งเรียบร้อยแล้ว ',
      ZH: '我們已經通知客戶它已被送達',
    });
  }

  get order_confirmed_success() {
    return this.getText({
      EN: 'The order has been confirmed',
      SG: 'The order has been confirmed',
      ID: 'Pesanan telah dikonfirmasi',
      TH: 'คำสั่งซื้อได้รับการยืนยัน ',
      ZH: '訂單已被確認',
    });
  }

  get order_shipped_success() {
    return this.getText({
      EN: 'Nice work! The order has been shipped',
      SG: 'Nice work! The order has been shipped',
      ID: 'Kerja bagus! Pesanan telah dikirimkan',
      TH: 'เยี่ยม! คำสั่งซื้อได้ถูกจัดส่งแล้ว ',
      ZH: '幹得好！訂單已發貨',
    });
  }

  get order_delivered_success() {
    return this.getText({
      EN: 'Yay! You’ve completed this order',
      SG: 'Yay! You’ve completed this order',
      ID: 'Yay! Kamu telah menyelesaikan pesanan ini',
      TH: 'เย้! คุณได้จัดการคำสั่งซื้อนี้เรียบร้อยแล้ว ',
      ZH: '好極了！ 您已完成此訂單',
    });
  }

  get order_cancelled_success() {
    return this.getText({
      EN: 'The order has been cancelled',
      SG: 'The order has been cancelled',
      ID: 'Pesanan telah dibatalkan',
      TH: 'คำสั่งซื้อได้ถูกยกเลิก',
      ZH: '訂單已被取消',
    });
  }

  get сonfirm_order() {
    return this.getText({
      EN: 'Confirm Order',
      SG: 'Confirm Order',
      ID: 'Konfirmasi Pesanan',
      TH: 'ยืนยันรายการ',
      ZH: '確認訂單',
    });
  }

  get if_there_are_any_issues() {
    return this.getText({
      EN: "If there are any issues, contact {Seller's Name} ({+62 88888 88888}) as soon as possible.",
      SG: "If there are any issues, contact {Seller's Name} ({+62 88888 88888}) as soon as possible.",
      ID: "Jika ada masalah, hubungi {Seller's Name} ({+62 88888 88888}) segera.",
      TH: "หากมีปัญหาใด ๆ โปรดติดต่อ {Seller's Name} ({+62 88888 88888}) โดยเร็วที่สุด",
      ZH: "如果有任何問題，請盡快與{Seller's Name} ({+62 88888 88888})聯繫。",
    });
  }
}
