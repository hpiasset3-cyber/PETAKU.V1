# 🧭 PetaKu

Aplikasi peta & GPS berbasis web (PWA), terinspirasi Avenza Maps. Bisa dipasang di layar utama HP dan dipakai layar penuh.

**Fitur:** peta OpenStreetMap, Satelit (Esri), Topografi · GPS & akurasi · rekam jejak · titik (placemark) · ukur jarak · cache peta offline · ekspor GPX/GeoJSON · URL tile kustom.

## Struktur

```
petaku/
├── app/                      # isi aplikasi (yang dipublikasikan)
│   ├── index.html
│   ├── sw.js                 # service worker (cache offline)
│   ├── manifest.webmanifest
│   └── icon-192.png, icon-512.png
├── .github/workflows/
│   ├── pages.yml             # deploy web ke GitHub Pages
│   └── android.yml           # build APK Android otomatis
├── capacitor.config.json     # konfigurasi pembungkus Android
├── package.json
├── scripts/patch-manifest.py # menambah izin lokasi Android
├── LICENSE
└── README.md
```

## Cara membuat repo di GitHub

### Opsi A – lewat website (tanpa terminal)
1. Buka <https://github.com/new>, beri nama repo `petaku`, pilih **Public**, klik **Create repository**.
2. Klik **uploading an existing file**, lalu seret **seluruh isi folder `petaku`** (termasuk folder `app` dan `.github`). Catatan: folder `.github` tersembunyi di beberapa sistem, jadi aktifkan "tampilkan file tersembunyi" atau pakai Opsi B.
3. Klik **Commit changes**.

### Opsi B – lewat terminal (disarankan)
```bash
cd petaku
git init -b main
git add .
git commit -m "PetaKu: versi awal"
git remote add origin https://github.com/USERNAME/petaku.git
git push -u origin main
```
Ganti `USERNAME` dengan nama pengguna GitHub Anda. Dengan GitHub CLI: `gh repo create petaku --public --source=. --push`.

## Mengaktifkan GitHub Pages
1. Di repo, buka **Settings → Pages**.
2. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
3. Buka tab **Actions**, tunggu workflow *Deploy ke GitHub Pages* berwarna hijau (sekitar 1 menit).
4. Aplikasi aktif di `https://USERNAME.github.io/petaku/`.

Setiap `git push` ke cabang `main` akan memperbarui situs otomatis.

## Memasang di HP
- **Android (Chrome):** buka alamat di atas → ⋮ → *Pasang aplikasi*.
- **iPhone (Safari):** Bagikan → *Tambah ke Layar Utama*.

Buka sekali saat online agar service worker aktif; setelah itu tile yang pernah dilihat tetap tersedia offline.

## Mencoba di komputer
```bash
cd app
python -m http.server 8000
```
Buka <http://localhost:8000>.

## Memperbarui cache setelah mengubah kode
Naikkan nama cache di `app/sw.js` (misalnya `shell-v1` → `shell-v2`) agar pengguna mendapat versi baru.

## Membuat aplikasi Android (APK) lewat GitHub

Aplikasi web dibungkus dengan [Capacitor](https://capacitorjs.com) dan dibuild di server GitHub, jadi tidak perlu Android Studio.

1. Push repo ini ke GitHub (lihat langkah di atas).
2. Buka tab **Actions → Build APK Android**. Workflow berjalan otomatis setiap push ke `main`; bisa juga dijalankan manual lewat **Run workflow**.
3. Setelah hijau (sekitar 5–8 menit), buka run tersebut, lalu unduh **PetaKu-apk** di bagian *Artifacts* (file ZIP berisi `PetaKu.apk`).
4. Ekstrak, kirim `PetaKu.apk` ke HP, lalu buka untuk memasang. Android akan meminta izin *pasang dari sumber tidak dikenal* untuk aplikasi yang Anda pakai membukanya.

**APK permanen di Releases:** buat tag versi, maka APK otomatis terlampir di halaman *Releases*:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Catatan:
- APK yang dihasilkan adalah build *debug* (ditandatangani kunci debug), cukup untuk dipasang sendiri. Untuk Google Play diperlukan build *release* bertanda tangan (AAB) dengan keystore Anda sendiri.
- Ikon aplikasi masih ikon bawaan Capacitor. Ganti nanti memakai `@capacitor/assets`.
- GPS berjalan saat aplikasi terbuka; pelacakan di latar belakang (layar mati) belum didukung.
- Tombol ekspor GPX/GeoJSON di Android membuka menu Bagikan.
- Folder `android/` dibuat otomatis di server dan sengaja tidak disimpan di repo. Untuk membukanya di Android Studio: `npm install && npx cap add android && npx cap open android`.

## Catatan penggunaan peta
- Server tile publik OpenStreetMap **melarang unduhan massal**. Fitur unduh offline dibatasi 600 tile per unduhan; untuk area luas gunakan penyedia tile sendiri (menu *Lainnya → URL tile kustom*). Lihat <https://operations.osmfoundation.org/policies/tiles/>.
- Tile satelit Esri memiliki syarat penggunaan sendiri; periksa sebelum dipakai komersial.
- Atribusi peta ditampilkan di pojok peta dan tidak boleh dihapus.

## Lisensi
MIT, lihat [LICENSE](LICENSE). Pustaka peta: [Leaflet](https://leafletjs.com) (BSD-2-Clause).
