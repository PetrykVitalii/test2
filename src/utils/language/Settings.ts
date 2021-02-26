import AbstractLanguage from './AbstractLanguage';

export default class Settings extends AbstractLanguage {
  get settings_header() {
    return this.getText({
      EN: 'Settings',
      SG: 'Settings',
      ID: 'Pengaturan',
      TH: 'การตั้งค่า',
      ZH: '設定',
    });
  }

  get link_notifications() {
    return this.getText({
      EN: 'Notifications',
      SG: 'Notifications',
      ID: 'Notifikasi',
      TH: 'การแจ้งเตือน',
      ZH: '通知',
    });
  }

  get link_help_support() {
    return this.getText({
      EN: 'Help & Support',
      SG: 'Help & Support',
      ID: 'Bantuan',
      TH: 'ช่วยเหลือและสนับสนุน',
      ZH: '幫助中心',
    });
  }

  get link_legal_info() {
    return this.getText({
      EN: 'Legal Info',
      SG: 'Legal Info',
      ID: 'Lihat Info',
      TH: 'ดูข้อมูลด้านกฎหมาย',
      ZH: '法律說明',
    });
  }

  get link_logout() {
    return this.getText({
      EN: 'Log Out',
      SG: 'Log Out',
      ID: 'Keluar',
      TH: 'ออกจากระบบ',
      ZH: '登出',
    });
  }

  get profile_header() {
    return this.getText({
      EN: 'Profile Settings',
      SG: 'Profile Settings',
      ID: 'Pengaturan Profil',
      TH: 'การตั้งค่าข้อมูลส่วนตัว',
      ZH: '編輯個人資料',
    });
  }

  get first_name_label() {
    return this.getText({
      EN: 'First name',
      SG: 'First name',
      ID: 'Nama Depan',
      TH: 'ชื่อจริง',
      ZH: '名字',
    });
  }

  get first_name_placeholder() {
    return this.getText({
      EN: 'John',
      SG: 'John',
      ID: 'Adriansyah',
      TH: 'นายปลาหมึก',
      ZH: 'John',
    });
  }

  get first_name_error() {
    return this.getText({
      EN: 'First name is required',
      SG: 'First name is required',
      ID: 'Nama depan harus di-isi',
      TH: 'กรุณาใส่ชื่อจริง',
      ZH: '必須填寫名字',
    });
  }

  get last_name_label() {
    return this.getText({
      EN: 'Last name',
      SG: 'Last name',
      ID: 'Nama Belakang',
      TH: 'นามสกุล',
      ZH: '姓氏',
    });
  }

  get last_name_placeholder() {
    return this.getText({
      EN: 'Appleseed',
      SG: 'Appleseed',
      ID: 'Pradana',
      TH: 'สีแดง',
      ZH: 'Appleseed',
    });
  }

  get last_name_error() {
    return this.getText({
      EN: 'Last name is required',
      SG: 'Last name is required',
      ID: 'Name belakang harus di-isi',
      TH: 'กรุณาใส่นามสกุล',
      ZH: '必須填寫姓氏',
    });
  }

  get business_label() {
    return this.getText({
      EN: 'Business Name',
      SG: 'Business Name',
      ID: 'Nama Bisnis',
      TH: 'ชื่อร้านอาหาร',
      ZH: '商家名稱',
    });
  }

  get business_placeholder() {
    return this.getText({
      EN: 'Burger King',
      SG: 'Burger King',
      ID: 'Babarafi',
      TH: 'ร้านชานมไข่มุกตราปลาหมึก',
      ZH: 'Burgers & Boba',
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

  get email_label() {
    return this.getText({
      EN: 'Email',
      SG: 'Email',
      ID: 'Email',
      TH: 'อีเมล',
      ZH: '電子郵件',
    });
  }

  get email_placeholder() {
    return this.getText({
      EN: 'john@appleseed.com',
      SG: 'john@appleseed.com',
      ID: 'adriansyah@pradana.com',
      TH: 'octopus@red.com',
      ZH: 'john@appleseed.com',
    });
  }

  get email_error() {
    return this.getText({
      EN: 'Email is invalid',
      SG: 'Email is invalid',
      ID: 'Email tidak valid',
      TH: 'อีเมลไม่ถูกต้อง',
      ZH: '電子郵件無效',
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
      EN: 'Singapore',
      SG: 'Singapore',
      ID: 'Jakarta',
      TH: 'Bangkok',
      ZH: 'Kowloon',
    });
  }

  get city_error() {
    return this.getText({
      EN: 'City is required',
      SG: 'City is required',
      ID: 'Kota harus di-isi',
      TH: 'กรุณาใส่จังหวัด',
      ZH: '必須填寫城市',
    });
  }

  get btn_delete_account() {
    return this.getText({
      EN: 'Delete Account',
      SG: 'Delete Account',
      ID: 'Hapus Akun',
      TH: 'ลบบัญชี',
      ZH: '刪除帳戶',
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

  get notifications_header() {
    return this.getText({
      EN: 'Language',
      SG: 'Language',
      ID: 'Bahasa',
      TH: 'ภาษา',
      ZH: '語言',
    });
  }

  get logout_popup_text() {
    return this.getText({
      EN: 'Are you sure you want to log out?',
      SG: 'Are you sure you want to log out?',
      ID: 'Apakah kamu yakin ingin keluar?',
      TH: 'คุณแน่ใจว่าคุณต้องการที่จะออกจากระบบ?',
      ZH: '您確定要登出嗎？',
    });
  }

  get logout_popup_cancel() {
    return this.getText({
      EN: 'Cancel',
      SG: 'Cancel',
      ID: 'Batal',
      TH: 'ยกเลิก',
      ZH: '取消',
    });
  }

  get logout_popup_confirm() {
    return this.getText({
      EN: 'Log Out',
      SG: 'Log Out',
      ID: 'Keluar',
      TH: 'ออกจากระบบ',
      ZH: '登出',
    });
  }

  delete_account_text(sellerPhoneNumber: string) {
    return this.getText({
      EN: `Hello,%0D%0A I would like to delete my Sell by Tinvio account. This is the relevant phone number for my account: +${sellerPhoneNumber}.%0D%0A %0D%0A Thank you.`,
      SG: `Hello,%0D%0A I would like to delete my Sell by Tinvio account. This is the relevant phone number for my account: +${sellerPhoneNumber}.%0D%0A %0D%0A Thank you.`,
      ID: `Halo, saya ingin menfhapus akun saya. Berikut nomor telepon saya +${sellerPhoneNumber}.%0D%0A %0D%0A Terima kasih!`,
      TH: `สวัสดี ฉันต้องการลบบัญชี Sell by Tinvio ของฉัน นี่คือหมายเลขโทรศัพท์สำหรับบัญชีของฉัน : +${sellerPhoneNumber}%0D%0A %0D%0A ขอบคุณ`,
      ZH: `你好，%0D%0A 我想刪除我的Tinvio銷售帳戶。 這是我帳戶的相關電話號碼：+${sellerPhoneNumber}。%0D%0A %0D%0A 謝謝`,
    });
  }

  get delete_account_subject() {
    return this.getText({
      EN: 'Sell by Tinvio - Delete Account Request',
      SG: 'Sell by Tinvio - Delete Account Request',
      ID: 'Sell by Tinvio - Ajukan Penghapusan Akun',
      TH: 'Sell by Tinvio - ลบคำขอบัญชี',
      ZH: 'Sell by Tinvio - 刪除帳戶請求',
    });
  }
}
