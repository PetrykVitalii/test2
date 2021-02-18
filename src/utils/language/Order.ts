import AbstractLanguage from './AbstractLanguage';

export default class Order extends AbstractLanguage {
  get order_list() {
    return this.getText({
      EN: 'Order List',
      SG: 'Order List',
      ID: 'Daftar Pesanan',
      TH: 'รายการสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get select_quantity() {
    return this.getText({
      EN: 'Select Quantity',
      SG: 'Select Quantity',
      ID: 'Masukkan Jumlah',
      TH: 'เลือกจำนวน',
      ZH: '選擇數量',
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

  get catalog_link_copied() {
    return this.getText({
      EN: 'Order details copied to clipboard',
      SG: 'Order details copied to clipboard',
      ID: 'Detail pesanan disalin ke clipboard',
      TH: 'คัดลอกรายละเอียดคำสั่งซื้อไปยังคลิปบอร์ดแล้ว',
      ZH: '訂單細節已復製到剪貼板',
    });
  }

  get btn_download_pdf() {
    return this.getText({
      EN: 'Download PDF',
      SG: 'Download PDF',
      ID: 'Unduh PDF',
      TH: 'ดาวน์โหลดไฟล์ PDF',
      ZH: '下載 PDF',
    });
  }

  get remove() {
    return this.getText({
      EN: 'Remove',
      SG: 'Remove',
      ID: 'Hapus',
      TH: 'ลบ',
      ZH: '刪除',
    });
  }

  get sub_total() {
    return this.getText({
      EN: 'Sub Total',
      SG: 'Sub Total',
      ID: 'Sub Total',
      TH: 'ทั้งหมด',
      ZH: '小計',
    });
  }

  get total_item() {
    return this.getText({
      EN: 'Total: {count} Item',
      SG: 'Total: {count} Item',
      ID: 'Total: {count} Barang',
      TH: 'ทั้งหมด: {count} รายการ',
      ZH: '總共: {count} 件商品',
    });
  }

  get total_including_fees() {
    return this.getText({
      EN: 'Total (incl. fees)',
      SG: 'Total (incl. fees)',
      ID: 'Total (semua biaya)',
      TH: 'รวม (รวมค่าธรรมเนียม)',
      ZH: '總計(包括費用)',
    });
  }

  get fees() {
    return this.getText({
      EN: 'Fees',
      SG: 'Fees',
      ID: 'Biaya',
      TH: 'ค่าธรรมเนียม',
      ZH: '費用',
    });
  }

  get sent() {
    return this.getText({
      EN: 'Sent',
      SG: 'Sent',
      ID: 'Terkirim',
      TH: 'ส่ง',
      ZH: '發送',
    });
  }

  get sent_desc() {
    return this.getText({
      EN: 'We\'ll let you know when it\'s confirmed',
      SG: 'We\'ll let you know when it\'s confirmed',
      ID: 'Kami akan memberi tahu Anda ketika telah dikonfirmasi',
      TH: 'เราจะแจ้งให้คุณทราบเมื่อได้รับการยืนยันแล้ว',
      ZH: '確認後我們會通知您',
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

  get order() {
    return this.getText({
      EN: 'Order',
      SG: 'Order',
      ID: 'Pesanan',
      TH: 'คำสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get order_details() {
    return this.getText({
      EN: 'Order Details',
      SG: 'Order Details',
      ID: 'Daftar pesanan',
      TH: 'รายละเอียดคำสั่งซื้อ',
      ZH: '訂單詳細信息',
    });
  }

  get order_summary() {
    return this.getText({
      EN: 'Order Summary',
      SG: 'Order Summary',
      ID: 'Rangkuman Pesanan',
      TH: 'สรุปคำสั่งซื้อ',
      ZH: '訂單摘要',
    });
  }

  get delivery_charges() {
    return this.getText({
      EN: 'Delivery Charges',
      SG: 'Delivery Charges',
      ID: 'Biaya Pengiriman',
      TH: 'ค่าจัดส่ง',
      ZH: '送貨費用',
    });
  }

  get taxes() {
    return this.getText({
      EN: 'Taxes',
      SG: 'Taxes',
      ID: 'Pajak',
      TH: 'ภาษี',
      ZH: '稅額',
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

  get total() {
    return this.getText({
      EN: 'Total',
      SG: 'Total',
      ID: 'Total',
      TH: 'ทั้งหมด',
      ZH: '總共',
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

  get select() {
    return this.getText({
      EN: 'Select',
      SG: 'Select',
      ID: 'Pilih',
      TH: 'เลือก',
      ZH: '請選擇',
    });
  }

  get full_name() {
    return this.getText({
      EN: 'Full name',
      SG: 'Full name',
      ID: 'Nama lengkap',
      TH: 'ชื่อของคุณ',
      ZH: '您的名稱',
    });
  }

  get palceholder_name() {
    return this.getText({
      EN: 'John Appleseed',
      SG: 'John Appleseed',
      ID: 'Adriansyah Pradana',
      TH: 'นายปลาหมึก สีแดง',
      ZH: 'John Appleseed',
    });
  }

  get address() {
    return this.getText({
      EN: 'Address',
      SG: 'Address',
      ID: 'Alamat',
      TH: 'ที่อยู่',
      ZH: '地址',
    });
  }

  get palceholder_address() {
    return this.getText({
      EN: '774 Sioro Road',
      SG: '774 Sioro Road',
      ID: 'Jalan Jendral Sudirman',
      TH: '999/99 ถนนพระราม 4',
      ZH: '香港佐敦彌敦道274號',
    });
  }

  get city() {
    return this.getText({
      EN: 'City',
      SG: 'City',
      ID: 'Kota',
      TH: 'จังหวัด',
      ZH: '城市',
    });
  }

  get palceholder_city() {
    return this.getText({
      EN: 'Start typing... E.g. Jakarta',
      SG: 'Start typing... E.g. Jakarta',
      ID: 'Ketik disini… Contoh: Jakarta',
      TH: 'เริ่มพิมพ์ ... เช่น กรุงเทพมหานคร',
      ZH: '開始輸入... 例如:香港',
    });
  }

  get post_code() {
    return this.getText({
      EN: 'Post code',
      SG: 'Post code',
      ID: 'Kode Pos',
      TH: 'รหัสไปรษณีย์',
      ZH: '郵政編碼',
    });
  }

  get palceholder_code() {
    return this.getText({
      EN: 'Enter post code',
      SG: 'Enter post code',
      ID: 'Masukkan kode pos',
      TH: 'กรอกรหัสไปรษณีย์',
      ZH: '輸入郵遞區號',
    });
  }

  get business_name() {
    return this.getText({
      EN: 'Business Name',
      SG: 'Business Name',
      ID: 'Nama Bisnis',
      TH: 'ชื่อร้านอาหาร',
      ZH: '商家名稱',
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

  get your_details() {
    return this.getText({
      EN: 'Your details',
      SG: 'Your details',
      ID: 'Detail Anda',
      TH: 'รายละเอียดของคุณ',
      ZH: '你的資料',
    });
  }

  get delivery_date() {
    return this.getText({
      EN: 'Delivery Date',
      SG: 'Delivery Date',
      ID: 'Tanggal pengiriman',
      TH: 'วันที่จัดส่ง',
      ZH: '運送日期',
    });
  }

  get delivery_on() {
    return this.getText({
      EN: 'Delivery on',
      SG: 'Delivery on',
      ID: 'Pengiriman pada',
      TH: 'จัดส่งเมื่อ',
      ZH: '送貨時間',
    });
  }

  get delivery_details() {
    return this.getText({
      EN: 'Delivery Details',
      SG: 'Delivery Details',
      ID: 'Detail Pengiriman',
      TH: 'รายละเอียดการจัดส่ง',
      ZH: '運送資料',
    });
  }

  get order_notes() {
    return this.getText({
      EN: 'Order notes',
      SG: 'Order notes',
      ID: 'Catatan Pesanan',
      TH: 'หมายเหตุคำสั่งซื้อ',
      ZH: '訂單筆記',
    });
  }

  get order_no() {
    return this.getText({
      EN: 'Order no',
      SG: 'Order no',
      ID: 'Nomor Pesanan',
      TH: 'เลขที่คำสั่งซื้อ',
      ZH: '訂單編號',
    });
  }

  get place_order() {
    return this.getText({
      EN: 'Place Order',
      SG: 'Place Order',
      ID: 'Pesan',
      TH: 'ส่งคำสั่งซื้อ',
      ZH: '下訂單',
    });
  }

  get contact_seller() {
    return this.getText({
      EN: 'Contact Seller',
      SG: 'Contact Seller',
      ID: 'Kontak Penjual',
      TH: 'ติดต่อผู้ขาย',
      ZH: '聯繫賣方',
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

  get status_confirmed() {
    return this.getText({
      EN: 'Confirmed',
      SG: 'Confirmed',
      ID: 'Dikonfirmasi',
      TH: 'ยืนยัน',
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

  get order_count() {
    return this.getText({
      EN: 'Order',
      SG: 'Order',
      ID: 'Pesanan',
      TH: 'คำสั่งซื้อ',
      ZH: '訂單',
    });
  }

  get status_processed_desc() {
    return this.getText({
      EN: 'We\'ll let you know when it\'s shipped',
      SG: 'We\'ll let you know when it\'s shipped',
      ID: 'Kami akan memberi tahu Anda ketika telah dikirimkan',
      TH: 'เราจะแจ้งให้คุณทราบเมื่อทำการจัดส่ง',
      ZH: '我們會在發貨時通知您',
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

  get status_shipped_desc() {
    return this.getText({
      EN: 'Your order\'s on the way',
      SG: 'Your order\'s on the way',
      ID: 'Pesanan Anda sedang dalam perjalanan',
      TH: 'คำสั่งซื้อของคุณกำลังอยู่ในระหว่างการจัดส่ง',
      ZH: '您的訂單正在處理中',
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

  get status_delivered_desc() {
    return this.getText({
      EN: 'Received the order? Contact the seller if you\'ve questions',
      SG: 'Received the order? Contact the seller if you\'ve questions',
      ID: 'Sudah terima pesanannya? Hubungi penjual jika Anda ada pertanyaan',
      TH: 'ได้รับสินค้าหรือไม่ ติดต่อผู้ขายหากคุณมีคำถาม',
      ZH: '收到訂單？ 如有疑問，請聯繫賣家',
    });
  }

  get status_cancelled() {
    return this.getText({
      EN: 'Cancelled',
      SG: 'Cancelled',
      ID: 'Dibatalkan',
      TH: 'ยกเลิก',
      ZH: '已取消',
    });
  }

  get status_cancelled_desc() {
    return this.getText({
      EN: 'Contact the seller if you need help',
      SG: 'Contact the seller if you need help',
      ID: 'Hubungi penjual jika Anda butuh bantuan',
      TH: 'ติดต่อผู้ขายหากคุณต้องการความช่วยเหลือ',
      ZH: '如果需要幫助，請聯繫賣家',
    });
  }

  get address_is_required() {
    return this.getText({
      EN: 'Address is required',
      SG: 'Address is required',
      ID: 'Alamat harus di-isi',
      TH: 'กรุณากรอกที่อยู่',
      ZH: '地址為必填項',
    });
  }

  get city_is_required() {
    return this.getText({
      EN: 'City is required',
      SG: 'City is required',
      ID: 'Kota harus di-isi',
      TH: 'กรุณากรอกชื่อจังหวัด',
      ZH: '必須填寫城市',
    });
  }

  get post_code_is_required() {
    return this.getText({
      EN: 'Post code is required',
      SG: 'Post code is required',
      ID: 'Kode pos harus di-isi',
      TH: 'กรุณากรอกรหัสไปรษณีย์',
      ZH: '郵政編碼為必填項',
    });
  }

  get name_error() {
    return this.getText({
      EN: 'Full name is required',
      SG: 'Full name is required',
      ID: 'Nama lengkap harus di-isi',
      TH: 'กรุณากรอกชื่อนามสกุล',
      ZH: '必須填寫全名',
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

  get placed_on() {
    return this.getText({
      EN: 'Placed on {orderDate} at {orderTime}',
      SG: 'Placed on {orderDate} at {orderTime}',
      ID: 'Dipesan pada {orderDate} pukul {orderTime}',
      TH: 'เมื่อ {orderDate} {orderTime}',
      ZH: '在 {orderDate} {orderTime} 下單',
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

  get phone_label() {
    return this.getText({
      EN: 'Enter your phone number',
      SG: 'Enter your phone number',
      ID: 'Masukkan nomor telepon kamu',
      TH: 'กรอกหมายเลขโทรศัพท์ของคุณ',
      ZH: '輸入您的電話號碼',
    });
  }

  get phone_sub_text() {
    return this.getText({
      EN: 'Get verified to complete your order and receive updates',
      SG: 'Get verified to complete your order and receive updates',
      ID: 'Verifikasi untuk memenuhi pesanan anda dan menerima update',
      TH: 'รับการยืนยันเพื่อดำเนินการตามคำสั่งซื้อของคุณและรับการอัปเดต',
      ZH: '獲得驗證，以完成訂單和接收更新',
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
      EN: "We've sent an SMS with a verification code to",
      SG: "We've sent an SMS with a verification code to",
      ID: 'Kami telah mengirim kode verifikasi melalui SMS ke',
      TH: 'เราได้ส่ง SMS พร้อมรหัสยืนยันไปที่',
      ZH: '我們已將包含驗證碼的短信發送至',
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
      ZH: 'รหัสไม่ถูกต้อง กรุณาลองอีกครั้ง',
    });
  }

  get whats_app_message() {
    return this.getText({
      EN: 'Hello! I am contacting you regarding order T-{orderRef}: {tokenisedBuyerLink}',
      SG: 'Hello! I am contacting you regarding order T-{orderRef}: {tokenisedBuyerLink}',
      ID: 'Halo, Saya mengontak kamu terkait pesanan T-{orderRef}: {tokenisedBuyerLink}',
      TH: 'สวัสดี! ฉันกำลังติดต่อคุณเกี่ยวกับใบสั่งซื้อ T-{orderRef}: {tokenisedBuyerLink}',
      ZH: '你好! 我與您聯繫有關訂單 T-{orderRef}: {tokenisedBuyerLink}',
    });
  }

  get order_success_message() {
    return this.getText({
      EN: 'Yay, your order was successfully sent!',
      SG: 'Yay, your order was successfully sent!',
      ID: 'Hore, pesananmu berhasil terkirim!',
      TH: 'เย้, ส่งคำสั่งซื้อของคุณเรียบร้อยแล้ว!',
      ZH: '是的，您的訂單已成功發送！',
    });
  }
}
