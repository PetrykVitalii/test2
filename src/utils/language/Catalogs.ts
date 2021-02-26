import AbstractLanguage from './AbstractLanguage';

export default class Catalogs extends AbstractLanguage {
  get catalogs_header() {
    return this.getText({
      EN: 'Catalogs',
      SG: 'Catalogs',
      ID: 'Katalog',
      TH: 'แคตตาล็อก',
      ZH: '產品目錄',
    });
  }

  get add_details_label() {
    return this.getText({
      EN: 'Add details to attract more quotes and orders',
      SG: 'Add details to attract more quotes and orders',
      ID: 'Tambah deskripsi untuk menjadi lebih menarik',
      TH: 'เพิ่มคำอธิบาย เพื่อสร้างยอดขายที่มากขึ้น',
      ZH: '添加詳細信息以吸引更多報價和訂單',
    });
  }

  get no_catalogs_header() {
    return this.getText({
      EN: 'No Catalogs Yet',
      SG: 'No Catalogs Yet',
      ID: 'Belum ada katalog',
      TH: 'ยังไม่มีแคตตาล็อก',
      ZH: '暫無產品目錄',
    });
  }

  get no_catalogs_message() {
    return this.getText({
      EN: 'Add items to start creating and sharing catalogs',
      SG: 'Add items to start creating and sharing catalogs',
      ID: 'Tambah barang untuk memulai membuat dan membagikan katalog',
      TH: 'เพิ่มรายการสินค้าเพื่อเริ่มสร้างและแบ่งปันแคตตาล็อก',
      ZH: '添加商品以開始創建和分享產品目錄',
    });
  }

  get hidden_label() {
    return this.getText({
      EN: 'Hidden',
      SG: 'Hidden',
      ID: 'Tersembunyi',
      TH: 'ซ่อน',
      ZH: '隱藏',
    });
  }

  get tab_items_header() {
    return this.getText({
      EN: 'Items',
      SG: 'Items',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '商品',
    });
  }

  get tab_details_header() {
    return this.getText({
      EN: 'Details',
      SG: 'Details',
      ID: 'Detail',
      TH: 'รายละเอียด',
      ZH: '細節',
    });
  }

  get catalog_link_label() {
    return this.getText({
      EN: 'Catalog Link',
      SG: 'Catalog Link',
      ID: 'Link katalog',
      TH: 'ลิ้งค์แคตตาล็อก',
      ZH: '產品目錄鏈結',
    });
  }

  get add_details_header() {
    return this.getText({
      EN: 'Add More Details',
      SG: 'Add More Details',
      ID: 'Tambahkan detail',
      TH: 'เพิ่มรายละเอียดเพิ่มเติม',
      ZH: '添加更多詳細信息',
    });
  }

  get btn_add_details() {
    return this.getText({
      EN: 'Add Details',
      SG: 'Add Details',
      ID: 'Tambah deskripsi',
      TH: 'เพิ่มรายละเอียด',
      ZH: '添加詳細信息',
    });
  }

  get btn_preview() {
    return this.getText({
      EN: 'Preview',
      SG: 'Preview',
      ID: 'Lihat',
      TH: 'ก่อนหน้า',
      ZH: '預覽',
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

  get business_details_header() {
    return this.getText({
      EN: 'Business Details',
      SG: 'Business Details',
      ID: 'Detail usaha',
      TH: 'รายละเอียดบริษัท',
      ZH: '業務詳細資料',
    });
  }

  // Catalog Items

  get catalog_items_header() {
    return this.getText({
      EN: 'Catalog Items',
      SG: 'Catalog Items',
      ID: 'Barang di Katalog',
      TH: 'รายการแคตตาล็อก',
      ZH: '目錄商品',
    });
  }

  get catalog_all_items() {
    return this.getText({
      EN: 'All Items ({{count}})',
      SG: 'All Items ({{count}})',
      ID: 'Semua Barang ({{count}})',
      TH: 'รายการสินค้าทั้งหมด ({{count}})',
      ZH: '所有商品 ({{count}})',
    });
  }

  get catalog_all_item() {
    return this.getText({
      EN: 'All Item ({{count}})',
      SG: 'All Item ({{count}})',
      ID: 'Semua Barang ({{count}})',
      TH: 'รายการทั้งหมด ({{count}})',
      ZH: '所有商品 ({{count}})',
    });
  }

  get catalog_x_items_selected() {
    return this.getText({
      EN: '{{count}} Items Selected',
      SG: '{{count}} Items Selected',
      ID: '{{count}} Barang Dipilih',
      TH: '{{count}} รายการที่เลือก',
      ZH: '{{count}} 選擇的商品',
    });
  }

  get catalog_x_item_selected() {
    return this.getText({
      EN: '{{count}} Item Selected',
      SG: '{{count}} Item Selected',
      ID: '{{count}} Barang Dipilih',
      TH: '{{count}} รายการที่เลือก',
      ZH: '{{count}} 件已選商品',
    });
  }

  get catalog_item_header() {
    return this.getText({
      EN: 'Catalog Item',
      SG: 'Catalog Item',
      ID: 'Barang di Katalog',
      TH: 'รายการแคตตาล็อก',
      ZH: '目錄商品',
    });
  }

  get manage_prices_header() {
    return this.getText({
      EN: 'Manage Prices',
      SG: 'Manage Prices',
      ID: 'Atur harga',
      TH: 'จัดการราคา',
      ZH: '管理價格',
    });
  }

  get custom_pricing_label() {
    return this.getText({
      EN: 'Custom Pricing',
      SG: 'Manage Prices',
      ID: 'Harga Khusus',
      TH: 'กำหนดราคา',
      ZH: '自定價格',
    });
  }

  get add_remove_header() {
    return this.getText({
      EN: 'Add/Remove Items',
      SG: 'Add/Remove Items',
      ID: 'Tambah/Hilangkan barang',
      TH: 'เพิ่ม/ลบรายการสินค้า',
      ZH: '添加/刪除商品',
    });
  }

  // Create Catalog

  get header_catalog() {
    return this.getText({
      EN: 'Create New Catalog',
      SG: 'Create New Catalog',
      ID: 'Buat Katalog Baru',
      TH: 'สร้างแคตตาล็อกใหม่',
      ZH: '創建新產品目錄',
    });
  }

  get manage_catalog_header() {
    return this.getText({
      EN: 'Manage Catalog',
      SG: 'Manage Catalog',
      ID: 'Atur Katalog',
      TH: 'จัดการแคตตาล็อก',
      ZH: '管理目錄',
    });
  }

  get btn_add_items() {
    return this.getText({
      EN: 'Select Items',
      SG: 'Select Items',
      ID: 'Pilih barang',
      TH: 'เลือก รายการ',
      ZH: '選擇 個商品',
    });
  }

  get btn_manage() {
    return this.getText({
      EN: 'Manage',
      SG: 'Manage',
      ID: 'Atur',
      TH: 'จัดการ',
      ZH: '管理',
    });
  }

  get catalog_name_label() {
    return this.getText({
      EN: 'Catalog name',
      SG: 'Catalog name',
      ID: 'Nama katalog',
      TH: 'ชื่อแคตตาล็อก',
      ZH: '產品目錄名稱',
    });
  }

  get catalog_name_placeholder() {
    return this.getText({
      EN: 'E.g. Fruits & Vegetables',
      SG: 'E.g. Fruits & Vegetables',
      ID: 'Contoh: Sayur & Buah',
      TH: 'เช่น ผักและผลไม้',
      ZH: '例如，水果和蔬菜',
    });
  }

  get catalog_name_error() {
    return this.getText({
      EN: 'Catalog name is required',
      SG: 'Name is required',
      ID: 'Nama Katalog harus di-isi',
      TH: 'กรุณาใส่ชื่อ',
      ZH: '必須填寫產品目錄名稱',
    });
  }

  get category_label() {
    return this.getText({
      EN: 'Category',
      SG: 'Category',
      ID: 'Kategori',
      TH: 'หมวดหมู่',
      ZH: '類別',
    });
  }

  get category_placeholder() {
    return this.getText({
      EN: 'Select Category',
      SG: 'Select Category',
      ID: 'Pilih kategori',
      TH: 'เลือกหมวดหมู่',
      ZH: '選擇類別',
    });
  }

  get category_error() {
    return this.getText({
      EN: 'Category is required',
      SG: 'Category is required',
      ID: 'Kategori harus di-isi',
      TH: 'กรุณาใส่หมวดหมู่',
      ZH: '必須填寫類別',
    });
  }

  get operating_hours_label() {
    return this.getText({
      EN: 'Operating Hours',
      SG: 'Operating Hours',
      ID: 'Jam operasional',
      TH: 'เวลาทำการ',
      ZH: '營業時間',
    });
  }

  get operating_hours_day() {
    return this.getText({
      EN: 'All Day',
      SG: 'All Day',
      ID: 'Sepanjang Hari',
      TH: 'เปิดทั้งวัน',
      ZH: '全天',
    });
  }

  get description_label() {
    return this.getText({
      EN: 'Description',
      SG: 'Description',
      ID: 'Deskripsi',
      TH: 'คำอธิบาย',
      ZH: '描述',
    });
  }

  get header_delivery_days() {
    return this.getText({
      EN: 'Delivery Days',
      SG: 'Delivery Days',
      ID: 'Hari pengiriman',
      TH: 'วันที่จัดส่ง',
      ZH: '送貨日期',
    });
  }

  get header_delivery_days_error() {
    return this.getText({
      EN: 'Delivery days are required',
      SG: 'Delivery days are required',
      ID: 'Hari pengiriman harus di-isi',
      TH: 'กรุณาใส่วันที่จัดส่ง',
      ZH: '必須填寫送貨日期',
    });
  }

  // Days
  get delivery_days_option_mon() {
    return this.getText({
      EN: 'M',
      SG: 'M',
      ID: 'S',
      TH: 'จ.',
      ZH: '一',
    });
  }

  get delivery_days_option_tues() {
    return this.getText({
      EN: 'T',
      SG: 'T',
      ID: 'S',
      TH: 'อ.',
      ZH: '二',
    });
  }

  get delivery_days_option_wed() {
    return this.getText({
      EN: 'W',
      SG: 'W',
      ID: 'R',
      TH: 'พ.',
      ZH: '三',
    });
  }

  get delivery_days_option_thu() {
    return this.getText({
      EN: 'T',
      SG: 'T',
      ID: 'K',
      TH: 'พฤ.',
      ZH: '四',
    });
  }

  get delivery_days_option_fri() {
    return this.getText({
      EN: 'F',
      SG: 'F',
      ID: 'J',
      TH: 'ศ.',
      ZH: '五',
    });
  }

  get delivery_days_option_sat() {
    return this.getText({
      EN: 'S',
      SG: 'S',
      ID: 'S',
      TH: 'ส.',
      ZH: '六',
    });
  }

  get delivery_days_option_sun() {
    return this.getText({
      EN: 'S',
      SG: 'S',
      ID: 'M',
      TH: 'อา.',
      ZH: '日',
    });
  }

  get delivery_fees_header() {
    return this.getText({
      EN: 'Delivery Fees',
      SG: 'Delivery Fees',
      ID: 'Biaya Pengiriman',
      TH: 'ค่าธรรมเนียมการจัดส่ง',
      ZH: '送貨費用',
    });
  }

  get additional_fees_header() {
    return this.getText({
      EN: 'Additional Fees',
      SG: 'Additional Fees',
      ID: 'Biaya Tambahan',
      TH: 'ค่าธรรมเนียมเพิ่มเติม',
      ZH: '附加費用',
    });
  }

  get standard_charge_label() {
    return this.getText({
      EN: 'Additional Fees',
      SG: 'Additional Fees',
      ID: 'Additional Fees',
      TH: 'ค่าธรรมเนียมเพิ่มเติม',
      ZH: '附加費用',
    });
  }

  get delivery_fees_label() {
    return this.getText({
      EN: 'Delivery Fees',
      SG: 'Delivery Fees',
      ID: 'Biaya Pengiriman',
      TH: 'ค่าธรรมเนียมการจัดส่ง',
      ZH: '送貨費用',
    });
  }

  get delivery_fees_placeholder() {
    return this.getText({
      EN: '$ 20',
      SG: '$ 20',
      ID: 'Rp 20.000',
      TH: '500 บาท',
      ZH: '$ 200',
    });
  }

  get min_order_label() {
    return this.getText({
      EN: 'Minimum order value for free delivery',
      SG: 'Minimum order value for free delivery',
      ID: 'Minimum pemesanan agar gratis ongkir',
      TH: 'ราคาการสั่งซื้อขั้นต่ำสำหรับการจัดส่งฟรี',
      ZH: '免費送貨的最低訂起訂量',
    });
  }

  get min_order_placeholder() {
    return this.getText({
      EN: '$ 400',
      SG: '$ 400',
      ID: 'Rp 400.000',
      TH: '10,000 บาท',
      ZH: '$ 4,000',
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

  get taxes_placeholder() {
    return this.getText({
      EN: '0',
      SG: '0',
      ID: '0',
      TH: '0',
      ZH: '0',
    });
  }

  get taxes_error() {
    return this.getText({
      EN: 'Enter 30% or less',
      SG: 'Enter 30% or less',
      ID: 'Masukkan 30% atau kurang',
      TH: '30% หรือน้อยกว่า',
      ZH: '輸入30％或更少',
    });
  }

  get btn_create_catalog() {
    return this.getText({
      EN: 'Create Catalog',
      SG: 'Create Catalog',
      ID: 'Buat Katalog',
      TH: 'สร้างแคตตาล็อก',
      ZH: '創建目錄',
    });
  }

  get btn_create_another_catalog() {
    return this.getText({
      EN: 'Create Another Catalog',
      SG: 'Create Another Catalog',
      ID: 'Buat Katalog Lainnya',
      TH: 'สร้างแคตตาล็อกใหม่',
      ZH: '創建另一個目錄',
    });
  }

  get create_new_catalog_message() {
    return this.getText({
      EN: 'Do you sell items at different prices or terms to different customers? Create customised catalogs for them!',
      SG: 'Do you sell items at different prices or terms to different customers? Create customised catalogs for them!',
      ID: 'Apa anda menjual barang dengan harga spesial kepada pelanggan tertentu? Buat custom katalog untuk mereka!',
      TH: 'คุณขายสินค้าในราคาหรือเงื่อนไขที่แตกต่างกันให้กับลูกค้าที่แตกต่างกันหรือไม่? สร้างแคตตาล็อกที่กำหนดเองสำหรับพวกเขา!',
      ZH: '您是否以不同的價格或條款將商品出售給不同的客戶？ 為他們定制的目錄！',
    });
  }

  // Create Catalog Steps

  get step_items() {
    return this.getText({
      EN: 'Items',
      SG: 'Items',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '商品',
    });
  }

  get step_items_active() {
    return this.getText({
      EN: 'Select Items',
      SG: 'Select Items',
      ID: 'Pilih Barang',
      TH: 'เลือกสินค้า',
      ZH: '選擇商品',
    });
  }

  get step_prices() {
    return this.getText({
      EN: 'Prices',
      SG: 'Prices',
      ID: 'Harga',
      TH: 'ราคา',
      ZH: '價格',
    });
  }

  get step_prices_active() {
    return this.getText({
      EN: 'Set Prices',
      SG: 'Set Prices',
      ID: 'Ubah Harga',
      TH: 'กำหนดราคา',
      ZH: '設定價格',
    });
  }

  get step_details() {
    return this.getText({
      EN: 'Details',
      SG: 'Details',
      ID: 'Detail',
      TH: 'รายละเอียด',
      ZH: '細節',
    });
  }

  get items_will_show() {
    return this.getText({
      EN: 'Items will show standard prices by default. Enable custom pricing to edit and manage prices for this catalog',
      SG: 'Items will show standard prices by default. Enable custom pricing to edit and manage prices for this catalog',
      ID: 'Barang akan menunjukkan harga standar. Aktifkan harga khusus untuk mengubah harga pada katalog ini',
      TH: 'รายการจะแสดงราคามาตรฐานตามค่าเริ่มต้น เปิดใช้งานการกำหนดราคาเองเพื่อแก้ไข และจัดการราคาสำหรับแคตตาล็อกนี้',
      ZH: '商品將默認顯示標準價格。 啟用自定價格以編輯和管理此目錄的價格',
    });
  }

  get create_a_new() {
    return this.getText({
      EN: 'Create a new catalog with different details, items, or prices. You can share this catalog with specific customers or groups',
      SG: 'Create a new catalog with different details, items, or prices. You can share this catalog with specific customers or groups',
      ID: 'Buat katalog baru dengan barang dan detail harga spesial yang berbeda. Kamu bisa membagikan katalog dengan pelanggan tertentu.',
      TH: 'สร้างแคตตาล็อกใหม่พร้อมรายละเอียด รายการ หรือราคาที่แตกต่างกัน คุณสามารถแบ่งปันแคตตาล็อกนี้กับลูกค้าเฉพาะกลุ่ม หรือกลุ่มเฉพาะได้',
      ZH: '創建具有不同細節, 商品或價格的新目錄。您可以與特定客戶或群體分享此目錄',
    });
  }

  get select_existing() {
    return this.getText({
      EN: 'Select existing items to include in this catalog or add new items with the + button',
      SG: 'Select existing items to include in this catalog or add new items with the + button',
      ID: 'Pilih barang untuk dimasukkan ke katalog atau tambahkan barang baru dengan tombol +',
      TH: 'เลือกรายการที่มีอยู่เพื่อรวมไว้ในแคตตาล็อกนี้ หรือเพิ่มรายการใหม่ด้วยปุ่ม +',
      ZH: '選擇要包含在此目錄中的現有商品，或使用 + 按鈕添加新商品',
    });
  }

  get delivery_date() {
    return this.getText({
      EN: 'Delivery options',
      SG: 'Delivery options',
      ID: 'Pilihan pengiriman',
      TH: 'ตัวเลือกการจัดส่ง',
      ZH: '送貨方式',
    });
  }

  get step_details_active() {
    return this.getText({
      EN: 'Add Details',
      SG: 'Add Details',
      ID: 'Tambah detail',
      TH: 'เพิ่มรายละเอียด',
      ZH: '添加詳細信息',
    });
  }

  // Business Details

  get all_items_header() {
    return this.getText({
      EN: 'Main Catalog',
      SG: 'Main Catalog',
      ID: 'Katalog Utama',
      TH: 'แคตตาล็อกหลัก',
      ZH: '主目錄',
    });
  }

  get edit_business_details_header() {
    return this.getText({
      EN: 'Edit business details',
      SG: 'Edit business details',
      ID: 'Ubah Detail Usaha',
      TH: 'แก้รายละเอียดธุรกิจ',
      ZH: '修改商家詳細信息',
    });
  }

  get description_placeholder() {
    return this.getText({
      EN: 'Optional',
      SG: 'Optional',
      ID: 'Opsional',
      TH: 'สามารถเลือกใส่ข้อมูล',
      ZH: '自選的',
    });
  }

  get pricing() {
    return this.getText({
      EN: 'Pricing',
      SG: 'Pricing',
      ID: 'Harga',
      TH: 'ราคา',
      ZH: '價格',
    });
  }

  get please_select_item() {
    return this.getText({
      EN: 'Please select at least 1 item to proceed',
      SG: 'Please select at least 1 item to proceed',
      ID: 'Pilih setidaknya 1 barang untuk dapat diproses',
      TH: 'กรุณาเลือกอย่างน้อย 1 รายการเพื่อดำเนินการต่อ',
      ZH: '請選擇至少一項以繼續',
    });
  }

  get tap_plus_button() {
    return this.getText({
      EN: 'Tap + button to add new items',
      SG: 'Tap + button to add new items',
      ID: 'Klik tombol + untuk menambahkan barang baru',
      TH: 'แตะปุ่ม + เพื่อเพิ่มรายการใหม่',
      ZH: '點擊 + 按鈕添加新商品',
    });
  }

  get no_items() {
    return this.getText({
      EN: 'No Items to Select',
      SG: 'No Items to Select',
      ID: 'Belum ada barang',
      TH: 'ไม่มีรายการให้เลือก',
      ZH: '沒有可供選擇的商品',
    });
  }

  // Category

  get category_alcoholic() {
    return this.getText({
      EN: 'Alcoholic Beverages',
      SG: 'Alcoholic Beverages',
      ID: 'Minuman Beralkohol',
      TH: 'เครื่องดื่มแอลกอฮอล์',
      ZH: '酒精飲料',
    });
  }

  get category_animal() {
    return this.getText({
      EN: 'Animal & Pet Supplies',
      SG: 'Animal & Pet Supplies',
      ID: 'Kebutuhan Hewan Peliharaan',
      TH: 'สัตว์เลี้ยง',
      ZH: '動物和寵物用品',
    });
  }

  get category_apparel() {
    return this.getText({
      EN: 'Apparel & Accessories',
      SG: 'Apparel & Accessories',
      ID: 'Baju & Aksesoris',
      TH: 'เสื้อผ้าและเครื่องประดับ',
      ZH: '服飾與配飾',
    });
  }

  get category_bakery() {
    return this.getText({
      EN: 'Bakery & Sweets',
      SG: 'Bakery & Sweets',
      ID: 'Roti & Kue',
      TH: 'เบเกอรี่',
      ZH: '麵包與甜點',
    });
  }

  get category_beverages() {
    return this.getText({
      EN: 'Beverages',
      SG: 'Beverages',
      ID: 'Minuman',
      TH: 'เครื่องดื่ม',
      ZH: '飲料',
    });
  }

  get category_coffee() {
    return this.getText({
      EN: 'Coffee & Tea',
      SG: 'Coffee & Tea',
      ID: 'Kopi & Teh',
      TH: 'ชาและกาแฟ',
      ZH: '咖啡和茶',
    });
  }

  get category_condiments() {
    return this.getText({
      EN: 'Condiments & Sauces',
      SG: 'Condiments & Sauces',
      ID: 'Bumbu & Saus',
      TH: 'เครื่องปรุรส',
      ZH: '調味品和調味料',
    });
  }

  get category_drygoods() {
    return this.getText({
      EN: 'Dry Goods',
      SG: 'Dry Goods',
      ID: 'Barang kering',
      TH: 'ของแห้ง',
      ZH: '乾貨',
    });
  }

  get category_electronics() {
    return this.getText({
      EN: 'Electronics',
      SG: 'Electronics',
      ID: 'Elektronik',
      TH: 'เครื่องใช้ไฟฟ้า',
      ZH: '電子產品',
    });
  }

  get category_fruits() {
    return this.getText({
      EN: 'Fruits & Vegetables',
      SG: 'Fruits & Vegetables',
      ID: 'Buah dan Sayur',
      TH: 'ผักและผลไม้',
      ZH: '水果和蔬菜',
    });
  }

  get category_hardware() {
    return this.getText({
      EN: 'Hardware & Tools',
      SG: 'Hardware & Tools',
      ID: 'Perkakas',
      TH: 'ฮาร์ดแวร์และอุปกรณ์',
      ZH: '五金工具',
    });
  }

  get category_health() {
    return this.getText({
      EN: 'Health & Beauty',
      SG: 'Health & Beauty',
      ID: 'Kesehatan & Kecantikan',
      TH: 'สุขภาพและความงาม',
      ZH: '健康與美容',
    });
  }

  get category_meat() {
    return this.getText({
      EN: 'Meat & Poultry',
      SG: 'Meat & Poultry',
      ID: 'Daging',
      TH: 'เนื้อสัตว์',
      ZH: '肉和家禽',
    });
  }

  get category_milk() {
    return this.getText({
      EN: 'Milk & Dairy',
      SG: 'Milk & Dairy',
      ID: 'Susu & olahan-nya',
      TH: 'นมและผลิตภัณฑ์นม',
      ZH: '牛奶和乳製品',
    });
  }

  get category_office() {
    return this.getText({
      EN: 'Office & Cleaning',
      SG: 'Office & Cleaning',
      ID: 'Kebutuhan kantor',
      TH: 'อุปกรณ์สำนักงานและทำความสะอาด',
      ZH: '辦公室與清潔',
    });
  }

  get category_packaging() {
    return this.getText({
      EN: 'Packaging & Disposables',
      SG: 'Packaging & Disposables',
      ID: 'Packaging',
      TH: 'บรรจุภัณฑ์',
      ZH: '包裝與一次性用品',
    });
  }

  get category_food() {
    return this.getText({
      EN: 'Prepared Food',
      SG: 'Prepared Food',
      ID: 'Makanan siap saji',
      TH: 'อาหารพร้อมทาน',
      ZH: '準備食物',
    });
  }

  get category_seafood() {
    return this.getText({
      EN: 'Seafood',
      SG: 'Seafood',
      ID: 'Hidangan laut',
      TH: 'อาหารทะเล',
      ZH: '海鮮',
    });
  }

  get category_seasoning() {
    return this.getText({
      EN: 'Seasonings & Spices',
      SG: 'Seasonings & Spices',
      ID: 'Rempah',
      TH: 'เครื่องเทศ',
      ZH: '調味料和香料',
    });
  }

  get category_general() {
    return this.getText({
      EN: 'General Items',
      SG: 'General Items',
      ID: 'Barang Umum',
      TH: 'รายการสินค้าทั่วไป',
      ZH: '一般商品',
    });
  }

  get exiting_page_modal() {
    return this.getText({
      EN: 'Exiting this page?',
      SG: 'Exiting this page?',
      ID: 'Kamu yakin ingin keluar?',
      TH: 'ออกจากหน้านี้?',
      ZH: '退出此頁面？',
    });
  }

  get catalog_detail_modal() {
    return this.getText({
      EN: 'Your catalog details will not be saved.',
      SG: 'Your catalog details will not be saved.',
      ID: 'Katalog kamu belum tersimpan, dan akan terhapus.',
      TH: 'รายละเอียดแคตตาล็อกของคุณจะไม่ถูกบันทึก',
      ZH: '您的商品目錄詳細信息將不會保存。',
    });
  }

  get free_delivery() {
    return this.getText({
      EN: 'Free delivery',
      SG: 'Free delivery',
      ID: 'Gratis pengiriman',
      TH: 'จัดส่งฟรี',
      ZH: '免費送貨',
    });
  }

  get free_delivery_above() {
    return this.getText({
      EN: 'Free delivery above: ',
      SG: 'Free delivery above: ',
      ID: 'Gratis pengiriman diatas:',
      TH: 'จัดส่งฟรี :',
      ZH: '以上免費送貨：',
    });
  }

  get catalog_delete_title_modal() {
    return this.getText({
      EN: 'Delete This Catalog?',
      SG: 'Delete This Catalog?',
      ID: 'Hapus katalog ini?',
      TH: 'ลบแคตตาล็อกนี้ใช่หรือไม่',
      ZH: '刪除這個產品目錄？',
    });
  }

  get catalog_delete_text_modal() {
    return this.getText({
      EN: 'You will not be able to restore the catalog once deleted',
      SG: 'You will not be able to restore the catalog once deleted',
      ID: 'Kamu tidak bisa memulihkan katalog yang dihapus',
      TH: 'คุณจะไม่สามารถกู้คืนแค็ตตาล็อกได้หลังจากที่ลบไปแล้ว',
      ZH: '刪除後，您將無法恢復該產品目錄',
    });
  }

  get catalog_category_label() {
    return this.getText({
      EN: 'Category',
      SG: 'Category',
      ID: 'Kategori',
      TH: 'ประเภท',
      ZH: '類別',
    });
  }

  get delivery_details_label() {
    return this.getText({
      EN: 'Delivery Details',
      SG: 'Delivery Details',
      ID: 'Detail Pengiriman',
      TH: 'รายละเอียดการจัดส่ง',
      ZH: '運送資料',
    });
  }

  get about_label() {
    return this.getText({
      EN: 'About',
      SG: 'About',
      ID: 'Tentang',
      TH: 'รายละเอียด',
      ZH: '關於',
    });
  }

  get no_items_header() {
    return this.getText({
      EN: 'No Items Yet',
      SG: 'No Items Yet',
      ID: 'Belum ada barang',
      TH: 'ยังไม่มีรายการ',
      ZH: '暫無商品',
    });
  }

  get no_catalog_items_header() {
    return this.getText({
      EN: 'No Items in Catalog',
      SG: 'No Items in Catalog',
      ID: 'Tidak ada barang pada katalog',
      TH: 'ไม่มีรายการในแคตตาล็อก',
      ZH: '目錄中沒有商品',
    });
  }

  get add_items_label() {
    return this.getText({
      EN: 'Add items to this catalog before you share the link with your customers!',
      SG: 'Add items to this catalog before you share the link with your customers!',
      ID: 'Tambahkan barang ke katalog ini sebelum kamu bagikan linknya ke pelangganmu!',
      TH: 'เพิ่มรายการและแบ่งปันแคตตาล็อกนี้เพื่อรับและจัดการคำสั่งซื้อในที่เดียว!',
      ZH: '添加商品並分享此目錄，以便在一處獲得和管理訂單！',
    });
  }

  get btn_empty_add_items() {
    return this.getText({
      EN: 'Add Items',
      SG: 'Add Items',
      ID: 'Tambah barang',
      TH: 'เพิ่มรายการ',
      ZH: '新增商品',
    });
  }

  get link_see_all() {
    return this.getText({
      EN: 'See All',
      SG: 'See All',
      ID: 'Lihat Semua',
      TH: 'ดูทั้งหมด',
      ZH: '查看全部',
    });
  }

  get link_delete_catalog() {
    return this.getText({
      EN: 'Delete Catalog',
      SG: 'Delete Catalog',
      ID: 'Hapus Katalog',
      TH: 'ลบแคตตาล็อก',
      ZH: '刪除目錄',
    });
  }

  get allow_customers() {
    return this.getText({
      EN: 'Allow customers to choose delivery date',
      SG: 'Allow customers to choose delivery date',
      ID: 'Perbolehkan pelanggan memilih tanggal pengiriman',
      TH: 'อนุญาตให้ลูกค้าเลือกวันจัดส่ง',
      ZH: '允許客戶選擇送貨日期',
    });
  }

  get catalog_category() {
    return this.getText({
      EN: 'Catalog Category',
      SG: 'Catalog Category',
      ID: 'Kategori Katalog ',
      TH: 'หมวดหมู่แคตตาล็อก',
      ZH: '商品目錄類別',
    });
  }

  get search_no_results() {
    return this.getText({
      EN: 'No results found. Try adjusting your search',
      SG: 'No results found. Try adjusting your search',
      ID: 'Hasil tidak ditemukan. Mohon ubah filter pencarian kamu',
      TH: 'ไม่พบข้อมูล กรุณาปรับการค้นหา',
      ZH: '未找到結果。 嘗試調整搜索',
    });
  }

  get manage_items() {
    return this.getText({
      EN: 'Edit Items & Prices',
      SG: 'Edit Items & Prices',
      ID: 'Edit Barang & Harga',
      TH: 'แก้ไขรายการและราคา',
      ZH: '編輯商品和價格',
    });
  }

  get publish_catalog() {
    return this.getText({
      EN: 'Publish Catalog',
      SG: 'Publish Catalog',
      ID: 'Publish Katalog',
      TH: 'เผยแพร่แคตตาล็อก',
      ZH: '發佈目錄',
    });
  }

  get catalog_switched_on_text() {
    return this.getText({
      EN: 'Turn this off if you want to temporarily disable and hide this catalog',
      SG: 'Turn this off if you want to temporarily disable and hide this catalog',
      ID: 'Matikan ini jika kamu ingin menutup akses katalog secara sementara',
      TH: 'ปิดสิ่งนี้หากคุณต้องการปิดใช้งานชั่วคราวและซ่อนแคตตาล็อกนี้',
      ZH: '如果要暫時停用並隱藏此目錄，請關閉此功能',
    });
  }

  get edit_details() {
    return this.getText({
      EN: 'Edit Details',
      SG: 'Edit Details',
      ID: 'Ubah Detail',
      TH: 'แก้ไขรายละเอียด',
      ZH: '編輯細節',
    });
  }

  get edit_details_prices() {
    return this.getText({
      EN: 'Edit Item Prices',
      SG: 'Edit Item Prices',
      ID: 'Ubah Harga Barang',
      TH: 'แก้ไขราคาสินค้า',
      ZH: '編輯商品價格',
    });
  }

  get catalog_disabled_text() {
    return this.getText({
      EN: 'This catalog was disabled. Please publish it before sharing the link with your customers',
      SG: 'This catalog was disabled. Please publish it before sharing the link with your customers',
      ID: 'Katalog ini telah dimatikan secara sementara. Mohon publish katalog sebelum membagikan link kepada pelanggan',
      TH: 'แคตตาล็อกนี้ถูกปิดใช้งาน โปรดเผยแพร่ก่อนแชร์ลิงก์กับลูกค้าของคุณ',
      ZH: '此目錄已停用。請先發佈它, 然後再與您的客戶分享鏈結',
    });
  }

  get edit_prices() {
    return this.getText({
      EN: 'Edit Prices',
      SG: 'Edit Prices',
      ID: 'Ubah Harga',
      TH: 'แก้ไขราคา',
      ZH: '修改價格',
    });
  }

  get publish_modal_title() {
    return this.getText({
      EN: 'Your catalog is disabled',
      SG: 'Your catalog is disabled',
      ID: 'Katalogmu dinonaktifkan',
      TH: 'แคตตาล็อกของคุณถูกปิดใช้งาน',
      ZH: '您的目錄已停用',
    });
  }

  get publish_modal_text() {
    return this.getText({
      EN: 'Publish it to share the link with your customers',
      SG: 'Publish it to share the link with your customers',
      ID: 'Terbitkan untuk membagikan link ke pelangganmu',
      TH: 'เผยแพร่เพื่อแชร์ลิ้งค์กับลูกค้าของคุณ',
      ZH: '發佈它與您的客戶分享鏈結',
    });
  }

  get disable_catalog() {
    return this.getText({
      EN: 'Disable Catalog',
      SG: 'Disable Catalog',
      ID: 'Nonaktifkan Katalog',
      TH: 'ปิดใช้งานแคตตาล็อก',
      ZH: '停用目錄',
    });
  }

  get disable_catalog_text() {
    return this.getText({
      EN: 'Do you want to temporarily disable this catalog? This prevents customers from browsing items or placing orders.',
      SG: 'Do you want to temporarily disable this catalog? This prevents customers from browsing items or placing orders.',
      ID: 'Apakah untuk sementara kamu ingin menonaktifkan katalog ini? Hal ini akan mencegah pelanggan untuk mencari barang atau membuat pesanan.',
      TH: 'ปิดใช้งานและซ่อนแคตตาล็อกนี้ชั่วคราว วิธีนี้จะป้องกันไม่ให้ลูกค้าเข้าถึงแคตตาล็อกของคุณเพื่อเรียกดูหรือสั่งซื้อ',
      ZH: '暫時停用並隱藏此目錄。 這將阻止客戶訪問您的目錄以瀏覽或下訂單。',
    });
  }

  get catalog_next_step_warning() {
    return this.getText({
      EN: 'Complete this step to continue',
      SG: 'Complete this step to continue',
      ID: 'Selesaikan langkah ini untuk melanjutkan',
      TH: 'ทำตามขั้นตอนนี้เพื่อดำเนินการต่อ',
      ZH: '完成此步驟以繼續',
    });
  }

  get catalog_previous_step_warning() {
    return this.getText({
      EN: 'Don’t worry, you can always edit details later',
      SG: 'Don’t worry, you can always edit details later',
      ID: 'Tak perlu khawatir, anda bisa merubah detail di lain waktu',
      TH: 'ไม่ต้องกังวล คุณสามารถแก้ไขรายละเอียดในภายหลังได้ตลอดเวลา',
      ZH: '不用擔心，您以後隨時可以編輯詳細信息',
    });
  }

  get name_central_district() {
    return this.getText({
      EN: 'Central District',
      SG: 'Central District',
      ID: 'Distrik Pusat',
      TH: 'ภาคกลาง',
      ZH: '中西區',
    });
  }

  get name_business_customers() {
    return this.getText({
      EN: 'Business Customers',
      SG: 'Business Customers',
      ID: 'Rekan Bisnis',
      TH: 'ลูกค้าธุรกิจ',
      ZH: '商業客戶',
    });
  }

  get name_pick_up_only() {
    return this.getText({
      EN: 'Pick-up Only',
      SG: 'Pick-up Only',
      ID: 'Hanya Pick-up',
      TH: 'รับสินค้าที่ร้าน',
      ZH: '自取',
    });
  }

  get name_group_buys() {
    return this.getText({
      EN: 'Group Buys',
      SG: 'Group Buys',
      ID: 'Pembelian Berkelompok',
      TH: 'ซื้อแบบกลุ่ม',
      ZH: '團購',
    });
  }

  get name_organic_items() {
    return this.getText({
      EN: 'Organic Items',
      SG: 'Organic Items',
      ID: 'Barang Organik',
      TH: 'สินค้าออร์แกนิก',
      ZH: '有機食品',
    });
  }

  get name_credit_card_payment() {
    return this.getText({
      EN: 'Credit Card Payment',
      SG: 'Credit Card Payment',
      ID: 'Pembayaran Kartu Kredit',
      TH: 'ชำระด้วยบัตรเครดิต',
      ZH: '信用卡付款',
    });
  }

  get name_east_java() {
    return this.getText({
      EN: 'East Java Customers',
      SG: 'East Java Customers',
      ID: 'Pelanggan Jawa Timur',
      TH: 'ลูกค้าชวาชลบุรีตะวันออก',
      ZH: '九龍客戶',
    });
  }

  get name_next_day_delivery() {
    return this.getText({
      EN: 'Next Day Delivery',
      SG: 'Next Day Delivery',
      ID: 'Pengiriman di Hari Berikutnya',
      TH: 'จัดส่งในวันถัดไป',
      ZH: '隔天送達',
    });
  }

  get name_preorders() {
    return this.getText({
      EN: 'Pre-orders',
      SG: 'Pre-orders',
      ID: 'Pre-order',
      TH: 'สั่งซื้อล่วงหน้า',
      ZH: '預購',
    });
  }

  get name_wholesale_orders() {
    return this.getText({
      EN: 'Wholesale Orders',
      SG: 'Wholesale Orders',
      ID: 'Pesanan Grosir',
      TH: 'ซื้อแบบค้าส่ง',
      ZH: '批發訂單',
    });
  }

  get catalog_success_message() {
    return this.getText({
      EN: 'Catalog successfully created',
      SG: 'Catalog successfully created',
      ID: 'Katalog berhasil dibuat',
      TH: 'สร้างแคตตาล็อกสำเร็จแล้ว',
      ZH: '目錄創建成功',
    });
  }

  get all_items_count() {
    return this.getText({
      EN: 'All {{count}} Items',
      SG: 'All {{count}} Items',
      ID: 'Semua {{count}} Item',
      TH: 'ทั้ง {{count}} รายการ',
      ZH: '所有{{count}} 商品 ',
    });
  }
}
