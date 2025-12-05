## 🎨 Desain Frontend (React)
---

### 1. Sidebar

Sidebar ini akan selalu terlihat di sisi kiri dan isinya akan **berubah sedikit** berdasarkan peran pengguna.

| Menu | Admin | Staff |
| :--- | :--- | :--- |
| **Dashboard** 📊 | Ya (Ringkasan Proyek & Analisis) | Ya (Ringkasan Tugas Saya) |
| **Tasks** 📝 | Ya (Semua Tugas) | Ya (Tugas Saya) |
| **Projects** 📂 | Ya (CRUD Proyek) | Tidak |
| **Calendar** 📅 | Ya (Deadline Proyek & Tugas) | Ya (Deadline Tugas Saya) |
| **Team/Users** 🧑‍🤝‍🧑 | Ya (CRUD User/Staff, Role) | Tidak |
| **Categories** 🏷️ | Ya (CRUD Kategori Tugas) | Tidak |
| **Settings** ⚙️ | Ya (Pengaturan Aplikasi & Profil) | Ya (Pengaturan Profil) |

---

### 2. 💻 Halaman Admin (Project Manager)

Halaman ini berfokus pada kontrol penuh dan manajemen proyek, pengguna, serta tugas.

#### A. Halaman Projects 📂 (Create Project)

* **Tampilan:** Tabel daftar proyek yang ada.
* **Kolom Tabel:** Nama Proyek, Admin Proyek, Tanggal Dibuat, Status, Aksi.
* **Tombol Utama:** **\[+ Create New Project]** (membuka modal/form baru).
    * **Form Create Project:** Input Nama Proyek, Deskripsi, Tanggal Mulai, Tanggal Selesai.

#### B. Halaman Team/Users 🧑‍🤝‍🧑 (Create User)

* **Tampilan:** Tabel daftar pengguna/staff yang ada.
* **Kolom Tabel:** Nama, Email, Peran (Admin/Staff), Proyek yang Ditugaskan, Aksi.
* **Tombol Utama:** **\[+ Add New User]** (membuka modal/form baru).
    * **Form Add User:** Input Nama, Email, Password, **Role (Dropdown: Admin/Staff)**.

#### C. Halaman Categories 🏷️ (Create Category)

* **Tampilan:** Tabel daftar kategori tugas (misalnya: *Bug, Feature, Documentation, Review*).
* **Tombol Utama:** **\[+ Add New Category]**.
    * **Form Add Category:** Input Nama Kategori, Warna.

#### D. Halaman Tasks 📝 (Create Task & Assign Staff)

* **Tampilan:** **Kanban Board** (lebih visual) *atau* Tabel dengan filter.
    * **Filter/Search:** Berdasarkan Proyek, Staff yang Ditugaskan, Status, Prioritas.
* **Tombol Utama:** **\[+ Create New Task]**.
    * **Form Create Task:**
        1.  **Project (Dropdown)**: Pilih proyek yang relevan.
        2.  **Title & Description**.
        3.  **Category (Dropdown)**: Pilih dari kategori yang sudah dibuat.
        4.  **Priority (Dropdown)**: Low, Medium, High.
        5.  **Due Date (Date Picker)**.
        6.  **Assignee (Multi-Select Dropdown)**: Pilih **Staff** mana yang akan mengerjakan.
        7.  Tombol **\[Save Task]**.

---

### 3. 🖥️ Halaman Staff (Developer, QA, UI/UX, dll.)

Halaman ini berfokus pada tugas yang diberikan kepada Staff.

#### A. Halaman Dashboard 📊

* **Summary Cards:**
    * Total Tugas Saya.
    * Tugas *In Progress*.
    * Tugas Tertunda (Overdue).
    * Tugas Selesai Bulan/hari Ini.

#### B. Halaman Tasks 📝 (Melihat & Update Status)

Ini adalah halaman kerja utama Staff.

* **Tampilan:** Sebaiknya menggunakan **Kanban Board** yang dibagi berdasarkan status (**To Do, In Progress, Complete**).
* **Filter:** Hanya menampilkan tugas yang **ditugaskan kepada pengguna yang login**.
* **Card Tugas (Task Item):** Setiap kartu tugas akan menampilkan:
    * Judul Tugas.
    * Proyek Induk.
    * Due Date.
    * Prioritas.

* **Interaksi Staff:**
    1.  **Menggeser Card:** Staff dapat menyeret (**Drag and Drop**) card tugas dari satu kolom status ke kolom lain (misalnya dari **To Do** ke **In Progress** atau ke **Complete**).
    2.  **Detail Tugas (Klik Card):** Membuka modal/sidebar detail:
        * Teks **Title** dan **Description** (ReadOnly).
        * Bagian **Comments** (dapat menambah komentar).
        * Tombol **\[Mark as Complete]** (jika status masih In Progress).

Desain ini memastikan **Admin** memiliki semua alat manajemen yang diperlukan, sementara **Staff** fokus pada eksekusi dan pelaporan status tugas mereka.
