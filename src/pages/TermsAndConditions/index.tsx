import React, { useEffect } from "react";
import "./style.scss";
import { smoothScrollTop } from "../../utils/functions/global";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/svg/arrow-left.svg";

const TermsAndConditions: React.FC = () => {
  // HOOKS
  const navigation = useNavigate();

  useEffect(() => {
    // scroll to top on entering
    smoothScrollTop();
  }, []);

  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-wrapper">
        <img
          onClick={() => navigation("/")}
          className="align-self-start cursor-pointer icon-medium"
          src={BackIcon}
          alt="back-icon"
        />
        <h2 className="align-self-start main-color">
          Syarat dan Ketentuan
        </h2>
        <p className="align-self-start white-space-pre-line">
          Selamat datang di Pintrail! Syarat dan Ketentuan
          ini mengatur penggunaan platform Pintrail di mana
          pengguna dapat mencari lokasi yang diinginkan
          berdasarkan percakapan dan menyimpan lokasi
          tersebut. Dengan menggunakan situs ini, Anda
          dianggap telah membaca, memahami, dan menyetujui
          seluruh Syarat dan Ketentuan ini.
        </p>
        <div className="breakline" />
        <h3 className="align-self-start main-color">
          1. Definisi
        </h3>
        <p className="align-self-start white-space-pre-line">
          <span className="font-bold">Pintrail</span>
          {"\n"} Agent AI yang kami sediakan, yang
          memungkinkan pengguna mencari lokasi yang relevan
          ataupun sekedar informasi dasar berdasarkan
          interaksi percakapan dengan Pintrail. {"\n\n"}
          <span className="font-bold">Pengguna</span>
          {"\n"} Orang yang menggunakan layanan Pintrail,
          baik yang membuat akun dengan email, nama
          pengguna, dan kata sandi, maupun yang masuk
          menggunakan akun Gmail. {"\n\n"}
          <span className="font-bold">Trailtokens</span>
          {"\n"} Trailtokens adalah bentuk token chat yang
          diberikan kepada pengguna untuk berinteraksi dalam
          percakapan. Pengguna dapat menggunakan token ini
          untuk melakukan percakapan dengan Pintrail demi
          menemukan lokasi yang diinginkan ataupun untuk
          kepentingan mendapatkan informasi tambahan. Setiap
          minggu, pengguna akan menerima 10 Trailtokens
          secara gratis. Token ini akan digunakan setiap
          kali pengguna melakukan percakapan.
        </p>
        <h3 className="align-self-start main-color">
          2. Ketentuan Umum Penggunaan
        </h3>
        <p className="align-self-start white-space-pre-line">
          <span className="font-bold">Akses layanan</span>
          {"\n"} Pengguna harus mendaftar untuk dapat
          memulai percakapan dengan Agent Pintrail. Pengguna
          dapat mendaftar dengan dua cara: Membuat akun
          dengan memasukkan email, nama pengguna, dan kata
          sandi. Masuk dengan menggunakan akun Gmail.{" "}
          {"\n\n"}
          <span className="font-bold">
            Keakuratan Data Pengguna
          </span>
          {"\n"} Pengguna wajib memberikan informasi yang
          benar, akurat, dan terkini saat mendaftar.
          Pengguna bertanggung jawab sepenuhnya atas
          kerahasiaan data login dan penggunaan akun mereka.
          {"\n\n"}
          <span className="font-bold">Batasan Usia</span>
          {"\n"} Layanan ini hanya dapat digunakan oleh
          individu yang berusia minimal 18 tahun. Jika Anda
          berusia di bawah 18 tahun, Anda harus mendapatkan
          izin orang tua atau wali sah sebelum menggunakan
          layanan kami.
        </p>

        <h3 className="align-self-start main-color">
          3. Tanggung Jawab Pengguna
        </h3>
        <p className="align-self-start white-space-pre-line">
          Pengguna setuju untuk tidak menggunakan layanan
          Pintrail ataupun melakukan percakapan dengan Agent
          Pintrail untuk tujuan ilegal atau melanggar hukum
          Indonesia, termasuk namun tidak terbatas pada:
          {"\n\n"}
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
          lakukan di platform, termasuk percakapan dengan
          Agent dan/atau penggunaan layanan Pintrail.
        </p>
        <h3 className="align-self-start main-color">
          4. Keamanan Akun
        </h3>
        <p className="align-self-start white-space-pre-line">
          Pengguna wajib menjaga kerahasiaan akun dan kata
          sandi mereka, serta bertanggung jawab atas semua
          aktivitas yang terjadi melalui akun mereka. Kami
          tidak bertanggung jawab atas kehilangan atau
          penyalahgunaan akun yang disebabkan oleh kelalaian
          pengguna dalam menjaga keamanan akun mereka.
        </p>
        <h3 className="align-self-start main-color">
          5. Penggunaan Data Pribadi
        </h3>
        <p className="align-self-start white-space-pre-line">
          Data pribadi pengguna yang dikumpulkan saat
          pendaftaran, seperti email dan informasi terkait
          lokasi yang disimpan, akan diproses sesuai dengan
          kebijakan privasi kami dan Undang-Undang
          Perlindungan Data Pribadi yang berlaku di
          Indonesia. Pengguna setuju bahwa data percakapan
          dan maupun informasi akun akan digunakan oleh
          platform untuk mengembangkan layanan demi
          memberikan layanan yang lebih baik.
        </p>
        <h3 className="align-self-start main-color">
          6. Penangguhan dan Penghentian Layanan
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami berhak, atas kebijakan kami sendiri, untuk
          menangguhkan atau menghentikan akun pengguna yang
          dianggap melanggar Syarat dan Ketentuan ini, atau
          yang terlibat dalam aktivitas ilegal. Kami juga
          berhak untuk mengubah, menunda, atau menghentikan
          layanan, baik sebagian maupun seluruhnya, dengan
          atau tanpa pemberitahuan sebelumnya.
        </p>

        <h3 className="align-self-start main-color">
          7. Batasan Tanggung Jawab
        </h3>
        <p className="align-self-start white-space-pre-line">
          Layanan Pintrail disediakan sebagaimana adanya.
          Kami tidak memberikan jaminan bahwa layanan akan
          selalu bebas dari gangguan, bug, atau kesalahan
          teknis. Kami tidak bertanggung jawab atas:
          Keakuratan lokasi yang direkomendasikan oleh
          Pintrail berdasarkan percakapan. Kegagalan teknis,
          akses yang terhenti, atau kehilangan data yang
          terjadi di luar kendali kami.
        </p>
        <h3 className="align-self-start main-color">
          8. Perubahan Syarat dan Ketentuan
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami berhak untuk mengubah Syarat dan Ketentuan
          ini kapan saja. Setiap perubahan akan
          diinformasikan kepada pengguna melalui email atau
          pemberitahuan di platform. Pengguna diwajibkan
          untuk memeriksa pembaruan Syarat dan Ketentuan
          secara berkala. Dengan terus menggunakan layanan
          setelah perubahan dipublikasikan, pengguna
          dianggap telah menyetujui perubahan tersebut.
        </p>
        <h3 className="align-self-start main-color">
          9. Hukum yang Berlaku
        </h3>
        <p className="align-self-start white-space-pre-line">
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
