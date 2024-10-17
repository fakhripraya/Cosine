import React, { useEffect } from "react";
import "./style.scss";
import { smoothScrollTop } from "../../utils/functions/global";

const PrivacyPolicy: React.FC = () => {
  // INITIAL RENDER
  useEffect(() => {
    // scroll to top on entering
    smoothScrollTop();
  }, []);

  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-wrapper">
        <h2>Kebijakan Privasi</h2>
        <div className="breakline" />
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
        <label className="font-bold">
          1. Informasi yang Kami Kumpulkan
        </label>
        <p>
          Kami mengumpulkan informasi yang Anda berikan
          secara sukarela saat Anda mendaftar atau
          menggunakan layanan kami, termasuk: Informasi
          Identitas Pribadi: Saat Anda mendaftar menggunakan
          akun yang dibuat sendiri (email, nama pengguna,
          dan kata sandi) atau melalui akun Gmail, kami
          mengumpulkan data pribadi seperti nama lengkap,
          alamat email, dan kata sandi (terenskripsi).
          Informasi Lokasi: Ketika Anda menggunakan fitur
          pencarian lokasi berdasarkan chat dan menyimpan
          lokasi di dasbor, kami akan menyimpan informasi
          terkait lokasi yang Anda pilih atau simpan. Log
          Data: Kami mungkin secara otomatis mengumpulkan
          informasi tentang interaksi Anda dengan situs
          kami, termasuk alamat IP, jenis perangkat,
          browser, dan aktivitas selama Anda menggunakan
          layanan kami.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          2. Penggunaan Informasi
        </label>
        <p>
          Kami menggunakan informasi yang dikumpulkan untuk
          berbagai tujuan, termasuk: Memberikan dan
          memelihara layanan kami. Memverifikasi identitas
          dan mengamankan akun pengguna. Meningkatkan fitur
          dan fungsionalitas situs web. Memberikan
          rekomendasi lokasi berdasarkan interaksi chat
          Anda. Menyimpan lokasi yang Anda pilih di dasbor
          agar mudah diakses di masa mendatang. Mengirimkan
          pembaruan, notifikasi, dan komunikasi terkait
          penggunaan layanan.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          3. Keamanan Data Pribadi
        </label>
        <p>
          Kami berkomitmen untuk melindungi informasi
          pribadi Anda dengan menerapkan langkah-langkah
          keamanan teknis dan organisasi yang sesuai. Data
          pribadi Anda akan disimpan dalam sistem yang aman
          dan dilindungi dengan enkripsi. Namun, kami tidak
          dapat sepenuhnya menjamin keamanan data di
          internet, sehingga kami menganjurkan Anda untuk
          menjaga keamanan akun Anda, termasuk menggunakan
          kata sandi yang kuat dan tidak membagikan
          kredensial akun dengan orang lain.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          4. Pembagian Informasi
        </label>
        <p>
          Kami tidak akan membagikan, menjual, atau
          menyewakan informasi pribadi Anda kepada pihak
          ketiga, kecuali: Jika diwajibkan oleh hukum atau
          otoritas yang berwenang berdasarkan peraturan
          perundang-undangan di Indonesia. Jika kami bekerja
          sama dengan penyedia layanan pihak ketiga yang
          membantu dalam operasional teknis, namun mereka
          hanya akan mengakses informasi yang diperlukan
          untuk memberikan layanan tersebut dan wajib
          menjaga kerahasiaan data.
        </p>
        <div className="breakline" />
        <label className="font-bold">5. Hak Pengguna</label>
        <p>
          Sebagai pengguna, Anda memiliki hak sebagai
          berikut: Akses: Anda berhak mengakses informasi
          pribadi yang kami miliki tentang Anda. Koreksi:
          Anda berhak meminta koreksi atas informasi pribadi
          yang salah atau tidak lengkap. Penghapusan: Anda
          dapat meminta penghapusan akun dan data pribadi
          Anda kapan saja, kecuali jika penyimpanan data
          tersebut diperlukan untuk memenuhi kewajiban hukum
          kami.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          6. Cookie dan Teknologi Pelacakan
        </label>
        <p>
          Kami menggunakan cookie dan teknologi pelacakan
          lainnya untuk meningkatkan pengalaman pengguna dan
          menganalisis lalu lintas situs web. Cookie adalah
          file kecil yang disimpan di perangkat Anda. Anda
          dapat menonaktifkan cookie melalui pengaturan
          browser Anda, namun beberapa fitur mungkin tidak
          berfungsi dengan baik.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          7. Perubahan pada Kebijakan Privasi
        </label>
        <p>
          Kami berhak memperbarui Kebijakan Privasi ini dari
          waktu ke waktu. Setiap perubahan akan kami
          informasikan melalui situs web kami atau melalui
          email. Kami menganjurkan Anda untuk meninjau
          Kebijakan Privasi ini secara berkala.
        </p>
        <div className="breakline" />
        <label className="font-bold">
          8. Hukum yang Berlaku
        </label>
        <p>
          Kebijakan Privasi ini diatur oleh dan ditafsirkan
          sesuai dengan hukum yang berlaku di Indonesia,
          khususnya Undang-Undang Dasar Negara Republik
          Indonesia Tahun 1945, serta peraturan
          perundang-undangan terkait seperti Undang-Undang
          No. 27 Tahun 2022 tentang Perlindungan Data
          Pribadi.
        </p>
        <div className="breakline" />
        <label className="font-bold">9. Kontak Kami</label>
        <p>
          Jika Anda memiliki pertanyaan, keluhan, atau
          permintaan terkait Kebijakan Privasi ini, Anda
          dapat menghubungi kami melalui: Email:
          letmeask@pintrail.app. Kami berkomitmen untuk
          menangani setiap permintaan atau keluhan terkait
          privasi dengan serius dan segera menanganinya.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
