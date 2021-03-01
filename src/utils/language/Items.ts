import AbstractLanguage from './AbstractLanguage';

export default class Items extends AbstractLanguage {
  get no_items() {
    return this.getText({
      EN: 'No Items Yet',
      SG: 'No Items Yet',
      ID: 'Belum ada item',
      TH: 'ยังไม่มีรายการสินค้า',
      ZH: '暫無商品',
    });
  }

  get no_items_sub_text() {
    return this.getText({
      EN: 'Add and manage your items or inventory in one place!',
      SG: 'Add and manage your items or inventory in one place!',
      ID: 'Tambah dan atur barang atau stokmu di satu tempat!',
      TH: 'เพิ่มรายการและแบ่งปันแคตตาล็อกเพื่อรับและจัดการคำสั่งซื้อในที่เดียว!',
      ZH: '一處添加和管理您的商品或庫存！',
    });
  }

  get add_items() {
    return this.getText({
      EN: 'Tap + to add items',
      SG: 'Tap + to add items',
      ID: 'Tap + untuk menambah item',
      TH: 'กด + เพื่อเพิ่มรายการสินค้า',
      ZH: '點按 + 添加商品',
    });
  }

  get all_items() {
    return this.getText({
      EN: 'All Items',
      SG: 'All Items',
      ID: 'Semua Item',
      TH: 'รายการสินค้าทั้งหมด',
      ZH: '所有商品',
    });
  }

  get filter() {
    return this.getText({
      EN: 'Filter',
      SG: 'Filter',
      ID: 'Filter',
      TH: 'ตัวกรอง',
      ZH: '篩選',
    });
  }

  get filter_items() {
    return this.getText({
      EN: 'Filter Items',
      SG: 'Filter Items',
      ID: 'Filter barang',
      TH: 'ตัวกรองรายการสินค้า',
      ZH: '篩選商品',
    });
  }

  get filter_all_items() {
    return this.getText({
      EN: 'All items',
      SG: 'All items',
      ID: 'Semua barang',
      TH: 'รายการสินค้าทั้งหมด',
      ZH: '所有商品',
    });
  }

  get filter_listed_items() {
    return this.getText({
      EN: 'Available',
      SG: 'Available',
      ID: 'Tersedia',
      TH: 'สินค้า',
      ZH: '可訂購',
    });
  }

  get filter_hidden_items() {
    return this.getText({
      EN: 'Unavailable',
      SG: 'Unavailable',
      ID: 'Tidak Tersedia',
      TH: 'ไม่มีสินค้า',
      ZH: '無法訂購',
    });
  }

  get no_results() {
    return this.getText({
      EN: 'No results found. Try adjusting your search',
      SG: 'No results found. Try adjusting your search',
      ID: 'Hasil tidak ditemukan. Mohon ubah filter pencarian Anda',
      TH: 'ไม่พบข้อมูล กรุณาปรับการค้นหา',
      ZH: '未找到結果。 嘗試調整搜索',
    });
  }

  get add_items_title() {
    return this.getText({
      EN: 'Add Items',
      SG: 'Add Items',
      ID: 'Tambah barang',
      TH: 'เพิ่มรายการ',
      ZH: '新增商品',
    });
  }

  get add() {
    return this.getText({
      EN: 'Add',
      SG: 'Add',
      ID: 'Tambah',
      TH: 'เพิ่ม',
      ZH: '添加',
    });
  }

  get add_item() {
    return this.getText({
      EN: 'Add Item',
      SG: 'Add Item',
      ID: 'Tambah barang',
      TH: 'เพิ่มรายการ',
      ZH: '添加商品',
    });
  }

  get select() {
    return this.getText({
      EN: 'Select',
      SG: 'Select',
      ID: 'Pilih',
      TH: 'เลือก',
      ZH: '選擇',
    });
  }

  get select_item() {
    return this.getText({
      EN: 'Select Item',
      SG: 'Select Item',
      ID: 'Pilih barang',
      TH: 'เลือก รายการ',
      ZH: '選擇商品',
    });
  }

  get items_header() {
    return this.getText({
      EN: 'Inventory',
      SG: 'Inventory',
      ID: 'Stok',
      TH: 'สินค้าคงคลัง',
      ZH: '庫存',
    });
  }

  get items() {
    return this.getText({
      EN: 'Items',
      SG: 'Items',
      ID: 'barang',
      TH: 'รายการ',
      ZH: '個商品',
    });
  }

  get item() {
    return this.getText({
      EN: 'Item',
      SG: 'Item',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '商品',
    });
  }

  get unit_item() {
    return this.getText({
      EN: 'Item',
      SG: 'Item',
      ID: 'barang',
      TH: 'รายการ',
      ZH: '個商品',
    });
  }

  get item_name() {
    return this.getText({
      EN: 'Item name*',
      SG: 'Item name*',
      ID: 'Nama barang*',
      TH: 'ชื่อรายการสินค้า*',
      ZH: '商品名稱*',
    });
  }

  get item_name_required() {
    return this.getText({
      EN: 'Item name is required',
      SG: 'Item name is required',
      ID: 'Nama barang harus di-isi',
      TH: 'กรุณาใส่ชื่อสินค้า',
      ZH: '必須填寫商品名稱',
    });
  }

  get unit() {
    return this.getText({
      EN: 'Unit*',
      SG: 'Unit*',
      ID: 'Satuan*',
      TH: 'หน่วย*',
      ZH: '單位*',
    });
  }

  get unit_required() {
    return this.getText({
      EN: 'Unit is required',
      SG: 'Unit is required',
      ID: 'Satuan harus di isi',
      TH: 'จำเป็นต้องใส่หน่วยสินค้า',
      ZH: '必須填寫單位',
    });
  }

  get unit_custom() {
    return this.getText({
      EN: 'Custom unit*',
      SG: 'Custom unit*',
      ID: 'Satuan*',
      TH: 'หน่วยที่กำหนดเอง*',
      ZH: '自訂單位*',
    });
  }

  get unit_custom_required() {
    return this.getText({
      EN: 'Custom unit is required',
      SG: 'Custom unit is required',
      ID: 'Satuan harus di isi',
      TH: 'จำเป็นต้องใส่หน่วยสินค้า',
      ZH: '必須填寫自訂單位',
    });
  }

  get price() {
    return this.getText({
      EN: 'Catalogue price',
      SG: 'Catalogue price',
      ID: 'Harga Katalog',
      TH: 'ราคาในแคตตาล็อก',
      ZH: '目錄價格',
    });
  }

  get price_required() {
    return this.getText({
      EN: 'Price is required',
      SG: 'Price is required',
      ID: 'Harga harus di-isi',
      TH: 'กรุณาใส่ราคา',
      ZH: '必須填寫價格',
    });
  }

  get other_details() {
    return this.getText({
      EN: 'Other Details',
      SG: 'Other Details',
      ID: 'Detail lainnya',
      TH: 'รายละเอียดอื่นๆ',
      ZH: '其他詳細資料',
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

  get add_images() {
    return this.getText({
      EN: 'Add Images',
      SG: 'Add Images',
      ID: 'Tambah gambar',
      TH: 'เพิ่มรูปภาพ',
      ZH: '添加圖片',
    });
  }

  get item_description() {
    return this.getText({
      EN: 'Item description',
      SG: 'Item description',
      ID: 'Deskripsi barang',
      TH: 'คำอธิบายรายการสินค้า',
      ZH: '商品描述',
    });
  }

  get optional() {
    return this.getText({
      EN: 'Optional',
      SG: 'Optional',
      ID: 'Opsional',
      TH: 'สามารถเลือกใส่ข้อมูล',
      ZH: '自選的',
    });
  }

  get add_new_items() {
    return this.getText({
      EN: 'Add New Items',
      SG: 'Add New Items',
      ID: 'Tambah Barang Baru',
      TH: 'เพิ่มรายการใหม่',
      ZH: '新增商品',
    });
  }

  get item_code() {
    return this.getText({
      EN: 'Item code',
      SG: 'Item code',
      ID: 'Kode barang',
      TH: 'รหัสสินค้า',
      ZH: '商品代碼',
    });
  }

  get code() {
    return this.getText({
      EN: '#SKU-Banana-001',
      SG: '#SKU-Banana-001',
      ID: '#SKU-Pisang-001',
      TH: '#SKU-กล้วย-001',
      ZH: '#SKU-香蕉-001',
    });
  }

  get save() {
    return this.getText({
      EN: 'Save',
      SG: 'Save',
      ID: 'Simpan',
      TH: 'บันทึก',
      ZH: '保存',
    });
  }

  get item_image() {
    return this.getText({
      EN: 'Item Image',
      SG: 'Item Image',
      ID: 'Gambar Barang',
      TH: 'ภาพรายการสินค้า',
      ZH: '商品圖片',
    });
  }

  get item_list() {
    return this.getText({
      EN: 'List Item',
      SG: 'List Item',
      ID: 'List Barang',
      TH: 'รายการสินค้า',
      ZH: '商品清單',
    });
  }

  get hide_items() {
    return this.getText({
      EN: 'Is this item unavailable? You can hide it from all catalogs by turning this off',
      SG: 'Is this item unavailable? You can hide it from all catalogs by turning this off',
      ID: 'Barang ini tidak tersedia? Kamu dapat menyembunyikannya di semua katalog dengan menonaktifkannya',
      TH: 'คุณสามารถซ่อนรายการสินค้าจากแคตตาล็อกได้โดยทำการปิดปุ่ม',
      ZH: '您可以通過關閉此選項來隱藏目錄中的所有商品',
    });
  }

  get images() {
    return this.getText({
      EN: 'Images',
      SG: 'Images',
      ID: 'Gambar',
      TH: 'ภาพ',
      ZH: '圖片',
    });
  }

  get item_delete() {
    return this.getText({
      EN: 'Delete Item',
      SG: 'Delete Item',
      ID: 'Hapus barang',
      TH: 'ลบรายการสินค้า',
      ZH: '刪除商品',
    });
  }

  get this_item_delete() {
    return this.getText({
      EN: 'Delete This Item?',
      SG: 'Delete This Item?',
      ID: 'Hapus barang ini?',
      TH: 'ต้องการลบรายการสินค้านี้ใช่ไหม',
      ZH: '刪除這個商品？',
    });
  }

  get sure_item_delete() {
    return this.getText({
      EN: 'Are you sure? This action cannot be undone.',
      SG: 'Are you sure? This action cannot be undone.',
      ID: 'Apakah kamu yakin? Tindakan ini tidak dapat dibatalkan.',
      TH: 'คุณจะไม่สามารถเรียกคืนได้',
      ZH: '您將無法還原它',
    });
  }

  get item_standard_price() {
    return this.getText({
      EN: 'Standard Price',
      SG: 'Standard Price',
      ID: 'Harga Standar',
      TH: 'ราคามาตรฐาน',
      ZH: '標準價',
    });
  }

  get whatsapp_help_title() {
    return this.getText({
      EN: 'Need to add many items?',
      SG: 'Need to add many items?',
      ID: 'Butuh menambahkan banyak barang?',
      TH: 'ต้องเพิ่มหลายรายการ?',
      ZH: '需要添加多個商品？',
    });
  }

  get whatsapp_help_sub_title() {
    return this.getText({
      EN: 'Send your list, we\'ll help!',
      SG: 'Send your list, we\'ll help!',
      ID: 'Kirim daftar barangmu, kami bantu!',
      TH: 'ส่งรายการของคุณมา ทางเราจะช่วยคุณเอง!',
      ZH: '發送您的清單，我們將為您提供幫助！',
    });
  }

  get whatsapp_help_message() {
    return this.getText({
      EN: 'Hi! I would like some help with adding new items. Can I send a photo or excel file?',
      SG: 'Hi! I would like some help with adding new items. Can I send a photo or excel file?',
      ID: 'Hai! Saya butuh bantuan untuk menambahkan barang baru. Bolehkah saya kirim foto atau file excel?',
      TH: 'ไฮ! ฉันต้องการความช่วยเหลือในการเพิ่มรายการใหม่ ฉันสามารถส่งรูปถ่ายหรือไฟล์ excel ได้หรือไม่?',
      ZH: '嗨！我需要添加新項目的幫助。我可以發送照片或Excel文件嗎？',
    });
  }

  get new_items() {
    return this.getText({
      EN: '{count} new items',
      SG: '{count} new items',
      ID: '{count} barang baru',
      TH: '{count} รายการใหม่',
      ZH: '{count }個新商品',
    });
  }

  get new_item() {
    return this.getText({
      EN: '1 new item',
      SG: '1 new item',
      ID: '1 barang baru',
      TH: '1 รายการใหม่',
      ZH: '1 個新商品',
    });
  }

  get select_catalogs() {
    return this.getText({
      EN: 'Select Catalogs',
      SG: 'Select Catalogs',
      ID: 'Pilih Katalog',
      TH: 'เลือกแคตตาล็อก',
      ZH: '選擇目錄',
    });
  }

  get add_to_catalog() {
    return this.getText({
      EN: 'Add to 1 Catalog',
      SG: 'Add to 1 Catalog',
      ID: 'Tambah ke 1 Katalog',
      TH: 'เพิ่มใน 1 แคตตาล็อก',
      ZH: '添加到 1 個目錄目錄',
    });
  }

  get add_to_catalogs() {
    return this.getText({
      EN: 'Add to {count} Catalogs',
      SG: 'Add to {count} Catalogs',
      ID: 'Tambah ke {count} Katalog',
      TH: 'เพิ่มใน {count} แคตตาล็อก',
      ZH: '添加到 {count} 個目錄',
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

  get item_code_header() {
    return this.getText({
      EN: 'Item Code',
      SG: 'Item Code',
      ID: 'Kode barang',
      TH: 'รหัสสินค้า',
      ZH: '商品代碼',
    });
  }

  get info_text() {
    return this.getText({
      EN: 'This is a preview of what your customers will see for this catalog',
      SG: 'This is a preview of what your customers will see for this catalog',
      ID: 'Ini adalah tampilan katalog yang akan dilihat oleh pelanggan Anda',
      TH: 'นี่คือตัวอย่างของสิ่งที่ลูกค้าของคุณจะเห็นสำหรับแคตตาล็อกนี้ ',
      ZH: '這是您的客戶目錄預覽',
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
}
