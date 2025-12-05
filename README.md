# OrxusPM

Sistem Manajemen Proyek sederhana.

## 🛠️ Teknologi

-   **Backend**: Laravel 11 (PHP)
-   **Frontend**: React + Vite
-   **Database**: MySQL
-   **Styling**: Tailwind CSS

## 🔗 API Routes

### Authentication
-   `POST /api/register`
-   `POST /api/login`
-   `POST /api/logout`

### Resources (Standard CRUD)
-   `api/projects` (ProjectController)
-   `api/tasks` (TaskController)
-   `api/users` (UserController)
-   `api/categories` (CategoryController)
-   `api/events` (EventController)
-   `api/tasks.comments` (CommentController)

### Other Endpoints
-   `GET /api/user` (Current User)
-   `POST /api/user/profile` (Update Profile)
-   `GET /api/users/{user}/tasks` (User Tasks)
-   `GET /api/dashboard/stats` (Dashboard Stats)
-   `GET /api/calendar/events` (Calendar Data)
