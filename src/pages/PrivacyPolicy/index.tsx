import React, { useEffect } from "react";
import "./style.scss";
import {
  sendWACS,
  smoothScrollTop,
} from "../../utils/functions/global";
import { APP_EMAIL } from "../../config/environment";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/svg/arrow-left.svg";

const PrivacyPolicy: React.FC = () => {
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
          Kebijakan Privasi
        </h2>
        <p>
          Kami menghargai dan melindungi privasi Anda.
          Kebijakan Privasi ini menjelaskan bagaimana kami
          mengumpulkan, menggunakan, dan melindungi data
          pribadi yang Anda berikan melalui layanan situs
          web AI Chat kami. Dengan menggunakan layanan kami,
          Anda dianggap telah membaca dan menyetujui
          Kebijakan Privasi ini.
        </p>
        <div className="breakline" />
        <h3 className="align-self-start main-color">
          1. Informasi yang Kami Kumpulkan
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami mengumpulkan informasi yang Anda berikan
          secara sukarela saat Anda mendaftar atau
          menggunakan layanan kami, termasuk: {"\n\n"}
          <span className="font-bold">
            Informasi Identitas Pribadi
          </span>
          {"\n"} Saat Anda mendaftar menggunakan akun yang
          dibuat sendiri (email, nama pengguna, dan kata
          sandi) atau melalui akun Gmail, kami mengumpulkan
          data pribadi seperti nama lengkap, alamat email,
          dan kata sandi (terenskripsi). {"\n\n"}
          <span className="font-bold">
            Informasi Lokasi
          </span>
          {"\n"} Ketika Anda menggunakan fitur pencarian
          lokasi berdasarkan chat dan menyimpan lokasi di
          halaman home, kami akan menyimpan informasi
          terkait lokasi yang Anda pilih atau simpan.{" "}
          {"\n\n"}{" "}
          <span className="font-bold">Log Data</span>
          {"\n"} Kami mungkin secara otomatis mengumpulkan
          informasi tentang interaksi Anda dengan situs
          kami, termasuk alamat IP, jenis perangkat,
          browser, dan aktivitas selama Anda menggunakan
          layanan kami.{"\n\n"}Kami mungkin mengumpulkan
          informasi lokasi dari media pihak ketiga yang
          tersedia secara publik, seperti Instagram, untuk
          memperkaya hasil pencarian lokasi berdasarkan chat
          Anda. Kami hanya menggunakan informasi yang telah
          tersedia secara publik dan tidak mengakses data
          pribadi tanpa izin.
        </p>

        <h3 className="align-self-start main-color">
          2. Penggunaan Informasi
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami menggunakan informasi yang dikumpulkan untuk
          berbagai tujuan, termasuk:{"\n\n"}
          Memberikan dan memelihara layanan kami,
          memverifikasi identitas dan mengamankan akun
          pengguna, meningkatkan fitur dan fungsionalitas
          situs web, memberikan rekomendasi lokasi
          berdasarkan interaksi chat Anda, menyimpan lokasi
          yang Anda pilih di halaman home agar mudah diakses
          di masa mendatang, Mengirimkan pembaruan,
          notifikasi, dan komunikasi terkait penggunaan
          layanan.
        </p>

        <h3 className="align-self-start main-color">
          3. Keamanan Data Pribadi
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami berkomitmen untuk melindungi informasi
          pribadi Anda dengan menerapkan langkah-langkah
          keamanan teknis dan organisasi yang sesuai.
          {"\n\n"}
          Data pribadi Anda akan disimpan dalam sistem yang
          aman dan dilindungi dengan enkripsi. Namun, kami
          tidak dapat sepenuhnya menjamin keamanan data di
          internet, sehingga kami menganjurkan Anda untuk
          menjaga keamanan akun Anda, termasuk menggunakan
          kata sandi yang kuat dan tidak membagikan
          kredensial akun dengan orang lain.
        </p>

        <h3 className="align-self-start main-color">
          4. Pembagian Informasi
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami tidak akan membagikan, menjual, atau
          menyewakan informasi pribadi Anda kepada pihak
          ketiga, kecuali:{"\n\n"} Jika diwajibkan oleh
          hukum atau otoritas yang berwenang berdasarkan
          peraturan perundang-undangan di Indonesia. Jika
          kami bekerja sama dengan penyedia layanan pihak
          ketiga yang membantu dalam operasional teknis,
          namun mereka hanya akan mengakses informasi yang
          diperlukan untuk memberikan layanan tersebut dan
          wajib menjaga kerahasiaan data.
        </p>

        <h3 className="align-self-start main-color">
          5. Hak Pengguna
        </h3>
        <p className="align-self-start white-space-pre-line">
          Sebagai pengguna, Anda memiliki hak sebagai
          berikut:{"\n\n"}{" "}
          <span className="font-bold">Akses</span>
          {"\n"} Anda berhak mengakses informasi pribadi
          yang kami miliki tentang Anda.
          {"\n\n"}
          <span className="font-bold">Koreksi</span>
          {"\n"} Anda berhak meminta koreksi atas informasi
          pribadi yang salah atau tidak lengkap.
          {"\n\n"}
          <span className="font-bold">Penghapusan</span>
          {"\n"}
          Anda dapat meminta penghapusan akun dan data
          pribadi Anda kapan saja, kecuali jika penyimpanan
          data tersebut diperlukan untuk memenuhi kewajiban
          hukum kami.
        </p>

        <h3 className="align-self-start main-color">
          6. Cookie dan Teknologi Pelacakan
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami menggunakan cookie dan teknologi pelacakan
          lainnya untuk meningkatkan pengalaman pengguna dan
          menganalisis lalu lintas situs web. Cookie adalah
          file kecil yang disimpan di perangkat Anda. Anda
          dapat menonaktifkan cookie melalui pengaturan
          browser Anda, namun beberapa fitur mungkin tidak
          berfungsi dengan baik.
        </p>

        <h3 className="align-self-start main-color">
          7. Perubahan pada Kebijakan Privasi
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kami berhak memperbarui Kebijakan Privasi ini dari
          waktu ke waktu. Setiap perubahan akan kami
          informasikan melalui situs web kami atau melalui
          email. Kami menganjurkan Anda untuk meninjau
          Kebijakan Privasi ini secara berkala.
        </p>

        <h3 className="align-self-start main-color">
          8. Hukum yang Berlaku
        </h3>
        <p className="align-self-start white-space-pre-line">
          Kebijakan Privasi ini diatur oleh dan ditafsirkan
          sesuai dengan hukum yang berlaku di Indonesia,
          khususnya Undang-Undang Dasar Negara Republik
          Indonesia Tahun 1945, serta peraturan
          perundang-undangan terkait seperti Undang-Undang
          No. 27 Tahun 2022 tentang Perlindungan Data
          Pribadi.
        </p>

        <h3 className="align-self-start main-color">
          9. Kontak Kami
        </h3>
        <p className="align-self-start white-space-pre-line">
          Jika Anda memiliki pertanyaan, keluhan, atau
          permintaan terkait Kebijakan Privasi ini, Anda
          dapat menghubungi kami melalui:{"\n\n"} Email:{" "}
          <a
            className="main-color cursor-pointer"
            href={`mailto:${APP_EMAIL}`}>
            {APP_EMAIL}
          </a>
          {"\n"} Whatsapp:{" "}
          <span
            onClick={() => sendWACS()}
            className="main-color cursor-pointer">
            081280111698
          </span>{" "}
          {"\n\n"}Kami berkomitmen untuk menangani setiap
          permintaan atau keluhan terkait privasi dengan
          serius dan segera menanganinya.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
