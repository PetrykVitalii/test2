import AbstractLanguage from './AbstractLanguage';

export default class Catalogs extends AbstractLanguage {
  get search() {
    return this.getText({
      EN: 'Search',
      SG: 'Search',
      ID: 'Cari',
      TH: 'ค้นหา',
      ZH: '搜索',
    });
  }

  get header_coming_soon() {
    return this.getText({
      EN: 'Coming Soon',
      SG: 'Coming Soon',
      ID: 'Akan Datang',
      TH: 'เร็วๆ นี้',
      ZH: '即將來臨',
    });
  }

  get coming_soon_message() {
    return this.getText({
      EN: "We're working hard to build and launch this very soon. Stay tuned",
      SG: "We're working hard to build and launch this very soon. Stay tuned",
      ID: 'Kami bekerja keras untuk membuat dan meluncurkan fitur ini secepatnya.',
      TH: 'เรากำลังพัฒนาระบบให้เสร็จสมบูรณ์ โปรดติดตามเร็วๆ นี้',
      ZH: '我們正在努力構建並很快推出。 敬請期待',
    });
  }

  get install_app() {
    return this.getText({
      EN: 'Install App',
      SG: 'Install App',
      ID: 'Install Aplikasi',
      TH: 'ติดตั้งแอป',
      ZH: '安裝應用程式',
    });
  }

  get nav_dashboard() {
    return this.getText({
      EN: 'Dashboard',
      SG: 'Dashboard',
      ID: 'Dashboard',
      TH: 'แดชบอร์ด',
      ZH: '儀表板',
    });
  }

  get nav_orders() {
    return this.getText({
      EN: 'Orders',
      SG: 'Orders',
      ID: 'Pesanan',
      TH: ' คำสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get nav_items() {
    return this.getText({
      EN: 'Items',
      SG: 'Items',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '商品',
    });
  }

  get nav_inventory() {
    return this.getText({
      EN: 'Inventory',
      SG: 'Inventory',
      ID: 'Stok',
      TH: 'สินค้าคงคลัง',
      ZH: '庫存',
    });
  }

  get nav_catalogs() {
    return this.getText({
      EN: 'Catalogs',
      SG: 'Catalogs',
      ID: 'Katalog',
      TH: 'แคตตาล็อก',
      ZH: '產品目錄',
    });
  }

  get nav_settings() {
    return this.getText({
      EN: 'Settings',
      SG: 'Settings',
      ID: 'Pengaturan',
      TH: 'การตั้งค่า',
      ZH: '設定',
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

  get btn_done() {
    return this.getText({
      EN: 'Done',
      SG: 'Done',
      ID: 'Selesai',
      TH: 'เสร็จสิ้น',
      ZH: '完成',
    });
  }

  get btn_save() {
    return this.getText({
      EN: 'Save',
      SG: 'Save',
      ID: 'Simpan',
      TH: 'บันทึก',
      ZH: '保存',
    });
  }

  get btn_save_changes() {
    return this.getText({
      EN: 'Save Changes',
      SG: 'Save Changes',
      ID: 'Simpan Perubahan',
      TH: 'บันทึกการเปลี่ยนแปลง',
      ZH: '保存更改',
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

  get btn_delete() {
    return this.getText({
      EN: 'Delete',
      SG: 'Delete',
      ID: 'Hapus',
      TH: 'ลบทิ้ง',
      ZH: '刪除',
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

  get btn_edit() {
    return this.getText({
      EN: 'Edit',
      SG: 'Edit',
      ID: 'Ubah',
      TH: 'แก้ไข',
      ZH: '編輯',
    });
  }

  get btn_share() {
    return this.getText({
      EN: 'Share',
      SG: 'Share',
      ID: 'Bagikan',
      TH: 'แบ่งปัน',
      ZH: '分享',
    });
  }

  get btn_create() {
    return this.getText({
      EN: 'Create',
      SG: 'Create',
      ID: 'Buat',
      TH: 'สร้าง',
      ZH: '創建',
    });
  }

  get item_count() {
    return this.getText({
      EN: 'Item',
      SG: 'Item',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '件商品',
    });
  }

  get order_count() {
    return this.getText({
      EN: 'Order',
      SG: 'Order',
      ID: 'Pesanan',
      TH: 'คำสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get outlet_count() {
    return this.getText({
      EN: 'Outlet',
      SG: 'Outlet',
      ID: 'Outlet',
      TH: 'สาขา',
      ZH: '分店',
    });
  }

  get top_matches() {
    return this.getText({
      EN: 'Top Matches',
      SG: 'Top Matches',
      ID: 'Sesuai pencarian',
      TH: 'รายการที่เกี่ยวข้อง',
      ZH: '熱門配對',
    });
  }

  get category_header() {
    return this.getText({
      EN: 'Category',
      SG: 'Category',
      ID: 'Kategori',
      TH: 'แคตตาล็อก',
      ZH: '類別',
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

  get monday_full() {
    return this.getText({
      EN: 'Monday',
      SG: 'Monday',
      ID: 'Senin',
      TH: 'จันทร์',
      ZH: '星期一',
    });
  }

  get tuesday_full() {
    return this.getText({
      EN: 'Tuesday',
      SG: 'Tuesday',
      ID: 'Selasa',
      TH: 'อังคาร',
      ZH: '星期二',
    });
  }

  get wednesday_full() {
    return this.getText({
      EN: 'Wednesday',
      SG: 'Wednesday',
      ID: 'Rabu',
      TH: 'พุธ',
      ZH: '星期三',
    });
  }

  get thursday_full() {
    return this.getText({
      EN: 'Thursday',
      SG: 'Thursday',
      ID: 'Kamis',
      TH: 'พฤหัสบดี',
      ZH: '星期四',
    });
  }

  get friday_full() {
    return this.getText({
      EN: 'Friday',
      SG: 'Friday',
      ID: 'Jumat',
      TH: 'ศุกร์',
      ZH: '星期五',
    });
  }

  get saturday_full() {
    return this.getText({
      EN: 'Saturday',
      SG: 'Saturday',
      ID: 'Sabtu',
      TH: 'เสาร์',
      ZH: '星期六',
    });
  }

  get sunday_full() {
    return this.getText({
      EN: 'Sunday',
      SG: 'Sunday',
      ID: 'Minggu',
      TH: 'อาทิตย์',
      ZH: '星期日',
    });
  }

  get january() {
    return this.getText({
      EN: 'January',
      SG: 'January',
      ID: 'Januari',
      TH: 'มกราคม',
      ZH: '一月',
    });
  }

  get january_short() {
    return this.getText({
      EN: 'Jan',
      SG: 'Jan',
      ID: 'Jan',
      TH: 'ม.ค.',
      ZH: '一月',
    });
  }

  get february() {
    return this.getText({
      EN: 'February',
      SG: 'February',
      ID: 'Februari',
      TH: 'กุมภาพันธ์',
      ZH: '二月',
    });
  }

  get february_short() {
    return this.getText({
      EN: 'Feb',
      SG: 'Feb',
      ID: 'Feb',
      TH: 'ก.พ.',
      ZH: '二月',
    });
  }

  get march() {
    return this.getText({
      EN: 'March',
      SG: 'March',
      ID: 'Maret',
      TH: 'มีนาคม',
      ZH: '三月',
    });
  }

  get march_short() {
    return this.getText({
      EN: 'Mar',
      SG: 'Mar',
      ID: 'Mar',
      TH: 'มี.ค.',
      ZH: '三月',
    });
  }

  get april() {
    return this.getText({
      EN: 'April',
      SG: 'April',
      ID: 'April',
      TH: 'เมษายน',
      ZH: '四月',
    });
  }

  get april_short() {
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
      ID: 'Mei',
      TH: 'พฤษภาคม',
      ZH: '五月',
    });
  }

  get may_short() {
    return this.getText({
      EN: 'May',
      SG: 'May',
      ID: 'Mei',
      TH: 'พ.ค.',
      ZH: '五月',
    });
  }

  get june() {
    return this.getText({
      EN: 'June',
      SG: 'June',
      ID: 'Juni',
      TH: 'มิถุนายน',
      ZH: '六月',
    });
  }

  get june_short() {
    return this.getText({
      EN: 'Jun',
      SG: 'Jun',
      ID: 'Jun',
      TH: 'มิ.ย.',
      ZH: '六月',
    });
  }

  get july() {
    return this.getText({
      EN: 'July',
      SG: 'July',
      ID: 'Juli',
      TH: 'กรกฎาคม',
      ZH: '七月',
    });
  }

  get july_short() {
    return this.getText({
      EN: 'Jul',
      SG: 'Jul',
      ID: 'Jul',
      TH: 'ก.ค.',
      ZH: '七月',
    });
  }

  get august() {
    return this.getText({
      EN: 'August',
      SG: 'August',
      ID: 'Agustus',
      TH: 'สิงหาคม',
      ZH: '八月',
    });
  }

  get august_short() {
    return this.getText({
      EN: 'Aug',
      SG: 'Aug',
      ID: 'Agu',
      TH: 'ส.ค.',
      ZH: '八月',
    });
  }

  get september() {
    return this.getText({
      EN: 'September',
      SG: 'September',
      ID: 'September',
      TH: 'กันยายน',
      ZH: '九月',
    });
  }

  get september_short() {
    return this.getText({
      EN: 'Sep',
      SG: 'Sep',
      ID: 'Sep',
      TH: 'ก.ย.',
      ZH: '九月',
    });
  }

  get october() {
    return this.getText({
      EN: 'October',
      SG: 'October',
      ID: 'Oktober',
      TH: 'ตุลาคม',
      ZH: '十月',
    });
  }

  get october_short() {
    return this.getText({
      EN: 'Oct',
      SG: 'Oct',
      ID: 'Okt',
      TH: 'ต.ค.',
      ZH: '十月',
    });
  }

  get november() {
    return this.getText({
      EN: 'November',
      SG: 'November',
      ID: 'November',
      TH: 'พฤศจิกายน',
      ZH: '十一月',
    });
  }

  get november_short() {
    return this.getText({
      EN: 'Nov',
      SG: 'Nov',
      ID: 'Nov',
      TH: 'พ.ย.',
      ZH: '十一月',
    });
  }

  get december() {
    return this.getText({
      EN: 'December',
      SG: 'December',
      ID: 'Desember',
      TH: 'ธันวาคม',
      ZH: '十二月',
    });
  }

  get december_short() {
    return this.getText({
      EN: 'Dec',
      SG: 'Dec',
      ID: 'Des',
      TH: 'ธ.ค.',
      ZH: '十二月',
    });
  }

  get kg() {
    return this.getText({
      EN: 'Kg',
      SG: 'Kg',
      ID: 'Kg',
      TH: 'กิโลกรัม',
      ZH: '公斤',
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

  get yes_exit() {
    return this.getText({
      EN: 'Yes, Exit',
      SG: 'Yes, Exit',
      ID: 'Ya, keluar',
      TH: 'ใช่ ออกจากหน้านี้',
      ZH: '是，退出',
    });
  }

  get word_order() {
    return this.getText({
      EN: 'Order',
      SG: 'Order',
      ID: 'Pesanan',
      TH: 'คำสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get word_orders() {
    return this.getText({
      EN: 'Orders',
      SG: 'Orders',
      ID: 'Pesanan',
      TH: 'คำสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get word_item() {
    return this.getText({
      EN: 'Item',
      SG: 'Item',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '商品',
    });
  }

  get word_items() {
    return this.getText({
      EN: 'Items',
      SG: 'Items',
      ID: 'Barang',
      TH: 'รายการ',
      ZH: '商品',
    });
  }

  get status_action_needed() {
    return this.getText({
      EN: 'Action Needed',
      SG: 'Action Needed',
      ID: 'Menunggu konfirmasi',
      TH: 'จำเป็นต้องดำเนินการ',
      ZH: '需要採取的行動',
    });
  }

  get status_pending() {
    return this.getText({
      EN: 'Pending',
      SG: 'Pending',
      ID: 'Menunggu',
      TH: 'รอการยืนยัน',
      ZH: '待定',
    });
  }

  get status_completed() {
    return this.getText({
      EN: 'Completed',
      SG: 'Completed',
      ID: 'Selesai',
      TH: 'ดำเนินการเสร็จสิ้น',
      ZH: '已完成',
    });
  }

  get status_sent() {
    return this.getText({
      EN: 'Sent',
      SG: 'Sent',
      ID: 'Terkirim',
      TH: 'ส่ง',
      ZH: '發送',
    });
  }

  get status_confirmed() {
    return this.getText({
      EN: 'Confirmed',
      SG: 'Confirmed',
      ID: 'Dikonfirmasi',
      TH: 'ยืนยันเรียบร้อย',
      ZH: '已確認',
    });
  }

  get status_processed() {
    return this.getText({
      EN: 'Processed',
      SG: 'Processed',
      ID: 'Telah di proses',
      TH: 'ดำเนินการแล้ว',
      ZH: '已處理',
    });
  }

  get status_amended() {
    return this.getText({
      EN: 'Amended',
      SG: 'Amended',
      ID: 'Diubah',
      TH: 'แก้ไขเรียบร้อย',
      ZH: '已修改',
    });
  }

  get status_cancelled() {
    return this.getText({
      EN: 'Cancelled',
      SG: 'Cancelled',
      ID: 'Dibatalkan',
      TH: 'ยกเลิกเรียบร้อย',
      ZH: '已取消',
    });
  }

  get status_delivered() {
    return this.getText({
      EN: 'Delivered',
      SG: 'Delivered',
      ID: 'Diterima',
      TH: 'จัดส่งเรียบร้อย',
      ZH: '已交付',
    });
  }

  get status_shipped() {
    return this.getText({
      EN: 'Shipped',
      SG: 'Shipped',
      ID: 'Dikirim',
      TH: 'ออกจากคลัง',
      ZH: '已出貨',
    });
  }

  get lan() {
    return this.getText({
      EN: 'EN',
      SG: 'SG',
      ID: 'ID',
      TH: 'TH',
      ZH: 'ZH-CN',
    });
  }

  get btn_no() {
    return this.getText({
      EN: 'No',
      SG: 'No',
      ID: 'Tidak',
      TH: 'ไม่',
      ZH: '取消',
    });
  }

  get on() {
    return this.getText({
      EN: 'on',
      SG: 'on',
      ID: 'pada',
      TH: 'ในวันที่',
      ZH: '在',
    });
  }

  get at() {
    return this.getText({
      EN: 'at',
      SG: 'at',
      ID: 'pada',
      TH: 'เมื่อ',
      ZH: '在',
    });
  }

  get word_delivery() {
    return this.getText({
      EN: 'Delivery',
      SG: 'Delivery',
      ID: 'Pengiriman',
      TH: 'จัดส่ง',
      ZH: '送貨',
    });
  }

  get word_deliveries() {
    return this.getText({
      EN: 'Deliveries',
      SG: 'Deliveries',
      ID: 'Pengiriman',
      TH: 'จัดส่ง',
      ZH: '送貨',
    });
  }

  get btn_confirm() {
    return this.getText({
      EN: 'Confirm',
      SG: 'Confirm',
      ID: 'Konfirmasi',
      TH: 'ยืนยัน',
      ZH: '確認',
    });
  }

  get btn_publish() {
    return this.getText({
      EN: 'Publish',
      SG: 'Publish',
      ID: 'Terbitkan',
      TH: 'เผยแพร่',
      ZH: '發佈',
    });
  }

  get btn_disable() {
    return this.getText({
      EN: 'Disable',
      SG: 'Disable',
      ID: 'Nonaktifkan',
      TH: 'ปิดการใช้งาน',
      ZH: '停用',
    });
  }

  get btn_copy_details() {
    return this.getText({
      EN: 'Copy Details',
      SG: 'Copy Details',
      ID: 'Salin Detil',
      TH: 'คัดลอกรายการ',
      ZH: '拷貝内容',
    });
  }

  get copy() {
    return this.getText({
      EN: 'Copy',
      SG: 'Copy',
      ID: 'Salin',
      TH: 'สำเนา',
      ZH: '複製',
    });
  }
}
