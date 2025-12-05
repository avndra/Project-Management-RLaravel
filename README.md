# OrxusPM - Sistem Manajemen Proyek

OrxusPM adalah aplikasi manajemen proyek modern yang dibangun dengan Laravel dan React. Aplikasi ini dirancang untuk membantu tim mengelola tugas, proyek, dan jadwal dengan efisien menggunakan antarmuka yang intuitif dan responsif.

## 🚀 Fitur Utama

-   **Manajemen Tugas (Kanban Board)**: Drag & drop tugas antar status (Todo, In Progress, Done).
-   **Manajemen Proyek**: Buat dan kelola proyek dengan mudah.
-   **Kalender Interaktif**: Jadwalkan meeting, lihat event mendatang, dan tag peserta.
-   **Sistem Peran (Role)**: Akses berbeda untuk Admin dan Staff.
-   **Dashboard Real-time**: Widget "Upcoming Events" yang dinamis dan statistik tugas.
-   **Desain Modern**: Antarmuka pengguna yang bersih dan responsif menggunakan Tailwind CSS.

## 🛠️ Teknologi yang Digunakan

-   **Backend**: Laravel 11
-   **Frontend**: React + Vite
-   **Database**: MySQL
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

-   PHP >= 8.2
-   Composer
-   Node.js & NPM
-   MySQL

## ⚙️ Cara Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

### 1. Clone Repository

```bash
git clone https://github.com/avndra/Project-Management-RLaravel.git
cd Project-Management-RLaravel
```

### 2. Setup Backend (Laravel)

```bash
# Install dependensi PHP
composer install

# Salin file environment
cp .env.example .env

# Generate Application Key
php artisan key:generate

# Konfigurasi Database di file .env
# Pastikan Anda sudah membuat database kosong (misal: orxus_pm) di MySQL
# DB_DATABASE=orxus_pm

# Jalankan Migrasi dan Seeder (PENTING: Ini akan mengisi data awal)
php artisan migrate --seed

# Jalankan Server Backend
php artisan serve
```

### 3. Setup Frontend (React)

Buka terminal baru dan masuk ke folder frontend (jika terpisah) atau root project tergantung struktur. Dalam proyek ini, frontend berada di `orxus-frontend`.

```bash
cd orxus-frontend

# Install dependensi JavaScript
npm install

# Jalankan Server Frontend
npm run dev
```

Akses aplikasi di `http://localhost:5173` (atau port yang ditampilkan di terminal).

## 🔐 Cara Penggunaan (Login & Daftar)

### Akun Default (Admin)

Setelah menjalankan `php artisan migrate --seed`, akun admin berikut sudah tersedia dan **tidak perlu mendaftar ulang**:

-   **Email**: `admin@orxus.com`
-   **Password**: `password`

Admin memiliki akses penuh untuk:
-   Membuat Proyek & Tugas
-   Menjadwalkan Meeting & Tag Peserta
-   Melihat semua aktivitas

### Akun Staff

Beberapa akun staff contoh juga telah dibuat:
-   **Email**: `budi@orxus.com` / `password`
-   **Email**: `siti@orxus.com` / `password`

### Pendaftaran Pengguna Baru (Register)

Jika Anda ingin mencoba sebagai pengguna baru:
1.  Buka halaman Login.
2.  Klik link **"Daftar"** atau **"Register"**.
3.  Isi Nama, Email, dan Password.
4.  Setelah mendaftar, Anda akan masuk sebagai **Staff** (User biasa) secara default.
5.  Staff hanya dapat melihat tugas yang diberikan kepada mereka dan event publik atau yang men-tag mereka.

## 📅 Fitur Kalender & Event

-   **Admin**: Klik tombol "Jadwalkan Meeting" di halaman Kalender. Anda bisa mengisi detail dan memilih (tag) staff yang akan hadir.
-   **Staff**: Akan melihat event di widget "Upcoming Events" di Dashboard dan di halaman Kalender. Klik event untuk melihat detail dan siapa saja yang hadir.

---

Dibuat dengan ❤️ oleh Tim Orxus.
