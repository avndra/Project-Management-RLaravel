
## 📑 Technical Specification Document: OrxusPM Backend API

### 1. 🎯 Tujuan & Prinsip Utama

| Area | Deskripsi |
| :--- | :--- |
| **Nama Proyek** | OrxusPM (Project Management System) |
| **Tujuan** | Menyediakan **RESTful API** yang *stateless* (token-based) dan aman untuk mendukung kebutuhan *dashboard* Admin dan Staff. |
| **Teknologi Utama** | **Laravel** (Versi 11/12), **Laravel Sanctum** (Autentikasi Token API), **MySQL/PostgreSQL**. |
| **Prinsip Pengembangan** | **Clean Code:** Menggunakan **Service/Repository Pattern** untuk memisahkan logika bisnis dari Controller. **DRY:** Memanfaatkan **Resource Classes** untuk format respons JSON yang konsisten dan **Form Request Classes** untuk validasi. |
| **Format Respons** | Semua respons API harus dalam format **JSON** standar. |

***

### 2. 🛡️ Otentikasi & Otorisasi

Sistem ini memiliki dua peran utama yang harus diverifikasi pada setiap *request* yang dilindungi.

#### 2.1. Mekanisme Autentikasi

* **Package:** Menggunakan **Laravel Sanctum** untuk *stateless* token *authentication*.
* **Proses Login:** Setelah *login*, API harus mengembalikan *token* Sanctum yang akan digunakan oleh React di setiap *request* selanjutnya melalui *header* `Authorization: Bearer <token>`.

#### 2.2. Kontrol Akses (Otorisasi)

Implementasikan **Middleware Otorisasi** kustom atau *Policy* untuk memverifikasi `role` pengguna (`admin` atau `staff`) pada *endpoint* yang sensitif.

| Role | Deskripsi Hak Akses |
| :--- | :--- |
| **Admin** | Akses penuh (*CRUD*) ke semua entitas (User, Category, Project, Task). |
| **Staff** | Akses terbatas hanya untuk melihat dan memperbarui status Task yang ditugaskan kepadanya. |

***

### 3. 🏗️ Model Data dan Relasi (Eloquent)

Semua entitas harus di-*migrate* dan memiliki relasi yang tepat, termasuk *field* yang mendukung *role* dan *status* yang telah ditentukan.

| Model | Field Kunci | Relasi | Catatan Implementasi |
| :--- | :--- | :--- | :--- |
| **User** | `id`, `name`, `email`, `password`, **`role`** (`enum`: 'admin', 'staff') | *Has Many* Project (Admin), *Belongs To Many* Tasks (Staff). | `role` di-set melalui *migration enum* atau *string field* dengan validasi ketat. |
| **Category**| `id`, `name`, `description` | *Has Many* Project | Digunakan untuk mengelompokkan proyek. |
| **Project** | `id`, `name`, `description`, `admin_id` | *Belongs To* Category, *Has Many* Task | `admin_id` mengacu pada Admin yang membuat proyek (FK ke User). |
| **Task** | `id`, `project_id`, `title`, `description`, **`status`** (`enum`), `due_date` | *Belongs To* Project, *Belongs To Many* User (Staff). | **Status Enum:** `TO_DO`, `IN_PROGRESS`, `ON_HOLD`, `DONE`. Default: `TO_DO`. |
| **Pivot Table**| `task_id`, `user_id` | Menghubungkan Task dengan User (Staff) | Wajib untuk fitur *Task Assignment*. |

***

### 4. 🔗 Spesifikasi Endpoint API (CRUD & Aksi)

Semua *endpoint* harus didahului dengan `/api/`.

#### 4.1. Authentication (Akses: Publik)

| HTTP Method | Endpoint | Aksi | Respons Kunci |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Otentikasi user dan mengembalikan Sanctum Token. | `token`, `user` (`id`, `name`, `role`). |
| `POST` | `/api/auth/logout` | Menghapus token Sanctum saat ini. | Status 200 OK. |
| `GET` | `/api/auth/user` | Mendapatkan data user yang sedang login (memerlukan Token). | Objek `user` lengkap. |

#### 4.2. Admin Management (Akses: Admin Only)

| HTTP Method | Endpoint | Aksi | Keterangan |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Daftar semua Staff. | Tidak menampilkan Admin lain. |
| `POST` | `/api/users` | **CREATE** Staff baru. | Membutuhkan `name`, `email`, `password`. `role` di-set otomatis ke `'staff'`. |
| `POST` | `/api/users/{id}/avatar` | **UPLOAD** Avatar User. | Menerima `multipart/form-data`. Mengembalikan **URL publik** gambar yang disimpan. |
| `CRUD` | `/api/categories` | CRUD Kategori. | Standar `index`, `store`, `show`, `update`, `destroy`. |
| `CRUD` | `/api/projects` | CRUD Proyek. | `store` harus menetapkan `admin_id` ke user yang sedang login. |

#### 4.3. Task Management (Akses: Admin & Staff)

| HTTP Method | Endpoint | Aksi | Akses |
| :--- | :--- | :--- | :--- |
| `CRUD` | `/api/tasks` | CRUD Task (oleh Admin). | **Admin Only** |
| `POST` | `/api/tasks/{task_id}/assign` | **ASSIGN** Staff ke Task. | **Admin Only** |
| | | | Data yang diterima: `user_ids` (array Staff IDs). Memperbarui tabel pivot. |
| `GET` | `/api/staff/tasks` | **READ** Tasks yang ditugaskan. | **Staff Only** |
| | | | Hanya mengembalikan Task di mana Staff yang *request* terhubung via tabel pivot. |
| `PUT` | `/api/tasks/{task_id}/status` | **UPDATE** Status Task. | **Staff Only** |
| | | | Membutuhkan `status` baru. Staff hanya boleh mengubah status Task yang ditugaskan padanya. |

***

### 5. 🛠️ Standar Pengembangan & Testing

* **Database Seeder:** Wajib membuat *Seeder* untuk mengisi *data dummy* awal:
    * Satu **Admin** user (misal: `admin@orxus.com`, pass: `password`).
    * Empat **Staff** user.
    * Tiga **Category**.
    * Tiga **Project** (dibuat oleh Admin).
    * Sepuluh **Task** (sebagian ditugaskan ke Staff).
* **Testing:** Gunakan **Pest** (sesuai pilihan) untuk menulis *Feature Tests* yang memverifikasi:
    * Semua *endpoint* **Admin Only** memblokir akses Staff.
    * Endpoint **Staff** hanya mengembalikan data yang relevan.
    * Fungsi *Task Assignment* berhasil memperbarui tabel pivot.
* **Documentation:** Semua *Controller* harus dilengkapi dengan PHPDoc yang menjelaskan fungsi, parameter, dan responsnya, siap untuk di-*generate* menjadi dokumentasi API.
