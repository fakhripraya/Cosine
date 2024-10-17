import React, { useEffect } from "react";
import "./style.scss";
import { smoothScrollTop } from "../../utils/functions/global";

const TermsAndConditions: React.FC = () => {
  // INITIAL RENDER
  useEffect(() => {
    // scroll to top on entering
    smoothScrollTop();
  }, []);

  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-wrapper">
        <h2>Syarat dan Ketentuan Penggunaan Pintrail</h2>
        <div className="breakline" />
        <p>
          Selamat datang di Pintrail! Syarat dan Ketentuan
          ini mengatur penggunaan platform Pintrail di mana
          pengguna dapat mencari lokasi yang diinginkan
          berdasarkan percakapan dan menyimpan lokasi
          tersebut di dasbor. Dengan menggunakan situs ini,
          Anda dianggap telah membaca, memahami, dan
          menyetujui seluruh Syarat dan Ketentuan ini.
        </p>
        <div className="breakline" />
        <label className="font-bold">1. Definisi</label>
        <p>
          Pintrail: Layanan yang kami sediakan, yang
          memungkinkan pengguna mencari lokasi yang relevan
          berdasarkan interaksi percakapan, serta menyimpan
          lokasi tersebut. Pengguna: Orang yang menggunakan
          layanan Pintrail, baik yang membuat akun dengan
          email, nama pengguna, dan kata sandi, maupun yang
          masuk menggunakan akun Gmail. Dasbor: Bagian dari
          situs yang memungkinkan pengguna melihat dan
          mengelola lokasi yang telah disimpan.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          2. Ketentuan Umum Penggunaan
        </label>
        <p>
          Akses Layanan: Pengguna harus mendaftar untuk
          dapat mengakses layanan Pintrail. Pengguna dapat
          mendaftar dengan dua cara: Membuat akun dengan
          memasukkan email, nama pengguna, dan kata sandi.
          Masuk dengan menggunakan akun Gmail. Keakuratan
          Data Pengguna: Pengguna wajib memberikan informasi
          yang benar, akurat, dan terkini saat mendaftar.
          Pengguna bertanggung jawab sepenuhnya atas
          kerahasiaan data login dan penggunaan akun mereka.
          Batasan Usia: Layanan ini hanya dapat digunakan
          oleh individu yang berusia minimal 18 tahun. Jika
          Anda berusia di bawah 18 tahun, Anda harus
          mendapatkan izin orang tua atau wali sah sebelum
          menggunakan layanan kami.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          3. Tanggung Jawab Pengguna
        </label>
        <p>
          Pengguna setuju untuk tidak menggunakan layanan
          Pintrail untuk tujuan ilegal atau melanggar hukum
          Indonesia, termasuk namun tidak terbatas pada:
          Undang-Undang Informasi dan Transaksi Elektronik
          (UU ITE) No. 11 Tahun 2008, yang mengatur
          penggunaan teknologi informasi dan transaksi
          elektronik secara sah dan beretika. Undang-Undang
          Perlindungan Data Pribadi yang menjamin hak-hak
          individu atas data pribadi mereka. Pengguna
          dilarang melakukan kegiatan yang dapat mengganggu
          sistem atau platform situs, seperti hacking,
          phishing, atau penyebaran malware. Pengguna
          bertanggung jawab penuh atas interaksi yang mereka
          lakukan di platform, termasuk percakapan dan
          penyimpanan data lokasi.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          4. Keamanan Akun
        </label>
        <p>
          Pengguna wajib menjaga kerahasiaan akun dan kata
          sandi mereka, serta bertanggung jawab atas semua
          aktivitas yang terjadi melalui akun mereka. Kami
          tidak bertanggung jawab atas kehilangan atau
          penyalahgunaan akun yang disebabkan oleh kelalaian
          pengguna dalam menjaga keamanan akun mereka.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          5. Penggunaan Data Pribadi
        </label>
        <p>
          Data pribadi pengguna yang dikumpulkan saat
          pendaftaran, seperti email dan informasi terkait
          lokasi yang disimpan, akan diproses sesuai dengan
          kebijakan privasi kami dan Undang-Undang
          Perlindungan Data Pribadi yang berlaku di
          Indonesia. Pengguna setuju bahwa data percakapan
          dan lokasi yang disimpan dalam dasbor akan
          digunakan oleh platform untuk memberikan layanan
          yang lebih baik sesuai dengan preferensi pengguna.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          6. Penangguhan dan Penghentian Layanan
        </label>
        <p>
          Kami berhak, atas kebijakan kami sendiri, untuk
          menangguhkan atau menghentikan akun pengguna yang
          dianggap melanggar Syarat dan Ketentuan ini, atau
          yang terlibat dalam aktivitas ilegal. Kami juga
          berhak untuk mengubah, menunda, atau menghentikan
          layanan, baik sebagian maupun seluruhnya, dengan
          atau tanpa pemberitahuan sebelumnya.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          7. Batasan Tanggung Jawab
        </label>
        <p>
          Layanan Pintrail disediakan sebagaimana adanya.
          Kami tidak memberikan jaminan bahwa layanan akan
          selalu bebas dari gangguan, bug, atau kesalahan
          teknis. Kami tidak bertanggung jawab atas:
          Keakuratan lokasi yang direkomendasikan oleh
          Pintrail berdasarkan percakapan. Kegagalan teknis,
          akses yang terhenti, atau kehilangan data yang
          terjadi di luar kendali kami.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          8. Perubahan Syarat dan Ketentuan
        </label>
        <p>
          Kami berhak untuk mengubah Syarat dan Ketentuan
          ini kapan saja. Setiap perubahan akan
          diinformasikan kepada pengguna melalui email atau
          pemberitahuan di platform. Pengguna diwajibkan
          untuk memeriksa pembaruan Syarat dan Ketentuan
          secara berkala. Dengan terus menggunakan layanan
          setelah perubahan dipublikasikan, pengguna
          dianggap telah menyetujui perubahan tersebut.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          9. Hukum yang Berlaku
        </label>
        <p>
          Syarat dan Ketentuan ini diatur dan ditafsirkan
          sesuai dengan hukum Negara Kesatuan Republik
          Indonesia, termasuk tetapi tidak terbatas pada
          Undang-Undang Informasi dan Transaksi Elektronik
          (UU ITE). Setiap perselisihan yang timbul dari
          penggunaan layanan ini akan diselesaikan secara
          damai. Jika tidak dapat diselesaikan, perselisihan
          akan diajukan ke pengadilan yang berwenang di
          Indonesia.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
