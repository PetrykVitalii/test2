import AbstractLanguage from './AbstractLanguage';

export default class Catalog extends AbstractLanguage {
  get catalog_header() {
    return this.getText({
      EN: 'Catalog',
      SG: 'Catalog',
      ID: 'Katalog',
      TH: 'แคตตาล็อก',
      ZH: '產品目錄',
    });
  }

  get link_more() {
    return this.getText({
      EN: 'more',
      SG: 'more',
      ID: 'lainnya',
      TH: 'ข้อมูลเพิ่มเติม',
      ZH: '更多',
    });
  }

  get select_items_header() {
    return this.getText({
      EN: 'Select Items',
      SG: 'Select Items',
      ID: 'Pilih barang',
      TH: 'เลือกสินค้า',
      ZH: '選擇商品',
    });
  }

  get btn_request_whatsapp() {
    return this.getText({
      EN: 'Request on WhatsApp',
      SG: 'Request on WhatsApp',
      ID: 'Request melalui WhatsApp',
      TH: 'ส่งสั่งซื้อทาง LINE',
      ZH: '在WhatsApp上發送請求',
    });
  }

  get about_header() {
    return this.getText({
      EN: 'About',
      SG: 'About',
      ID: 'Tentang',
      TH: 'รายละเอียด',
      ZH: '關於',
    });
  }

  get total_header() {
    return this.getText({
      EN: 'Total',
      SG: 'Total',
      ID: 'Total',
      TH: 'ทั้งหมด',
      ZH: '總共',
    });
  }

  get search_placeholder() {
    return this.getText({
      EN: 'Search items',
      SG: 'Search items',
      ID: 'Cari barang',
      TH: 'ค้นหาสินค้า',
      ZH: '搜索商品',
    });
  }

  get matches_header() {
    return this.getText({
      EN: 'Top Matches',
      SG: 'Top Matches',
      ID: 'Sesuai pencarian',
      TH: 'รายการที่เกี่ยวข้อง',
      ZH: '熱門配對',
    });
  }

  get no_item_image() {
    return this.getText({
      EN: 'Item has no image',
      SG: 'Item has no image',
      ID: 'Barang belum memiliki gambar',
      TH: 'รายการสินค้าไม่มีรูปภาพ',
      ZH: '此商品沒有圖像',
    });
  }

  get no_results() {
    return this.getText({
      EN: 'No results found. Try adjusting your search',
      SG: 'No results found. Try adjusting your search',
      ID: 'Hasil tidak ditemukan. Mohon ubah pencarian kamu',
      TH: 'ไม่พบรายการที่ค้นหา ลองปรับคำที่ใช้ในการค้นหา',
      ZH: '未找到結果。 嘗試調整搜索',
    });
  }

  get item_code_header() {
    return this.getText({
      EN: 'Item Code',
      SG: 'Item Code',
      ID: 'Kode barang',
      TH: 'รหัสสินค้า',
      ZH: '商品代碼',
    });
  }

  get get_a_quote() {
    return this.getText({
      EN: 'Get a Quote',
      SG: 'Get a Quote',
      ID: 'Ajukan Permintaan Harga',
      TH: 'ขอใบเสนอราคา',
      ZH: '獲取報價',
    });
  }

  get no_item_code_header() {
    return this.getText({
      EN: 'No Item Code',
      SG: 'No Item Code',
      ID: 'Tidak ada kode barang',
      TH: 'ไม่มีรหัสสินค้า',
      ZH: '沒有商品代碼',
    });
  }

  get price_on_request() {
    return this.getText({
      EN: 'Price on Request',
      SG: 'Price on Request',
      ID: 'Harga Berdasarkan Request',
      TH: 'สอบถามราคาทางร้าน',
      ZH: '詢問價格',
    });
  }

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

  get whats_app_hi() {
    return this.getText({
      EN: 'Hi',
      SG: 'Hi',
      ID: 'Hai',
      TH: 'สวัสดี',
      ZH: '您好',
    });
  }

  get whats_app() {
    return this.getText({
      EN: 'Hi {sellerName}, I am interested in {count} items:',
      SG: 'Hi {sellerName}, I am interested in {count} items:',
      ID: 'Hai {sellerName}, saya tertarik dengan {count} barang:',
      TH: 'สวัสดี {sellerName} ฉันสนใจสินค้า {count} รายการ:',
      ZH: '{sellerName} 你好， 我對 {count} 件商品感興趣:',
    });
  }

  get whats_app_catalog() {
    return this.getText({
      EN: "Hi {businessName}, I'm interested in some of the items in this catalog: {catalogLink}",
      SG: "Hi {businessName}, I'm interested in some of the items in this catalog: {catalogLink}",
      ID: 'Hai {businessName} , Saya tertarik dengan beberapa barang di katalog ini: {catalogLink}',
      TH: '{businessName} ฉันสนใจรายการบางส่วนในแคตตาล็อกนี้: {catalogLink}',
      ZH: '你好 {businessName}，我對該目錄中的某些商品感興趣: {catalogLink}',
    });
  }

  get summary() {
    return this.getText({
      EN: 'Summary',
      SG: 'Summary',
      ID: 'Total',
      TH: 'สรุป',
      ZH: '總共',
    });
  }

  get items() {
    return this.getText({
      EN: 'Items',
      SG: 'Items',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '件商品',
    });
  }

  get item() {
    return this.getText({
      EN: 'Item',
      SG: 'Item',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '件商品',
    });
  }

  get please_select() {
    return this.getText({
      EN: 'Please select at least 1 item to proceed',
      SG: 'Please select at least 1 item to proceed',
      ID: 'Pilih setidaknya 1 barang untuk dapat diproses',
      TH: 'กรุณาเลือกอย่างน้อย 1 รายการเพื่อดำเนินการต่อ',
      ZH: '請選擇至少一項以繼續',
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

  get additional_fees_header() {
    return this.getText({
      EN: 'Additional Fees',
      SG: 'Additional Fees',
      ID: 'Biaya Tambahan',
      TH: 'ค่าธรรมเนียมเพิ่มเติม',
      ZH: '附加費用',
    });
  }

  get delivery_fees() {
    return this.getText({
      EN: 'Delivery Fees',
      SG: 'Delivery Fees',
      ID: 'Biaya Pengiriman',
      TH: 'ค่าธรรมเนียมการจัดส่ง',
      ZH: '送貨費用',
    });
  }

  get free_delivery_above() {
    return this.getText({
      EN: 'Free delivery above:',
      SG: 'Free delivery above:',
      ID: 'Gratis pengiriman diatas:',
      TH: 'จัดส่งฟรี:',
      ZH: '以上免費送貨:',
    });
  }

  get intrested() {
    return this.getText({
      EN: 'I am interested in',
      SG: 'I am interested in',
      ID: 'saya tertarik dengan',
      TH: 'ฉันสนใจสินค้า',
      ZH: '我對',
    });
  }

  get count_items() {
    return this.getText({
      EN: 'items',
      SG: 'items',
      ID: 'barang',
      TH: 'รายการ',
      ZH: '件商品感興趣',
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

  get tab_profile_header() {
    return this.getText({
      EN: 'Details',
      SG: 'Details',
      ID: 'Detail',
      TH: 'รายละเอียด',
      ZH: '細節',
    });
  }

  get phone_label() {
    return this.getText({
      EN: 'Phone Number',
      SG: 'Phone Number',
      ID: 'Nomor Telepon',
      TH: 'เบอร์มือถือ',
      ZH: '電話號碼',
    });
  }

  get catalog_category_label() {
    return this.getText({
      EN: 'Catalog Category',
      SG: 'Catalog Category',
      ID: 'Kategori Katalog',
      TH: 'หมวดหมู่แคตตาล็อก',
      ZH: '商品目錄類別',
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

  get operating_hours_day() {
    return this.getText({
      EN: 'All Day',
      SG: 'All Day',
      ID: 'Sepanjang Hari',
      TH: 'เปิดทั้งวัน',
      ZH: '全天',
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

  get whatsapp_message() {
    return this.getText({
      EN: 'Hi there, I’d like to enquire about the products you sell at {sellerBusinessName}.',
      SG: 'Hi there, I’d like to enquire about the products you sell at {sellerBusinessName}.',
      ID: 'Hai, saya ingin bertanya tentang produk yang anda jual pada {sellerBusinessName}',
      TH: 'สวัสดีฉันต้องการสอบถามเกี่ยวกับผลิตภัณฑ์ที่คุณขายที่ {sellerBusinessName}',
      ZH: '您好，我想查詢您在{sellerBusinessName}出售的產品。',
    });
  }

  get no_catalog_message() {
    return this.getText({
      EN: 'Connect directly and ask for items and quotes!',
      SG: 'Connect directly and ask for items and quotes!',
      ID: 'Terhubung secara langsung dan tanyakan barang beserta harganya!',
      TH: 'เชื่อมต่อโดยตรงและขอรายการและราคา!',
      ZH: '直接連接，索取商品和報價！',
    });
  }

  get contact_seller() {
    return this.getText({
      EN: 'Contact Seller',
      SG: 'Contact Seller',
      ID: 'Hubungi Penjual',
      TH: 'ติดต่อผู้ขาย',
      ZH: '聯絡賣家',
    });
  }
}
