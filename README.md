# OrxusPM

OrxusPM is a modern, lightweight Project Management System designed to streamline team collaboration. It features a responsive dashboard, task management with Kanban support, and role-based access control for Admins and Staff.

## 🚀 Features

-   **Role-Based Access Control**:
    -   **Admin**: Manage projects, users, and view global statistics.
    -   **Staff**: View assigned tasks, update task status, and track personal progress.
-   **Dashboard**:
    -   Real-time statistics (Total Tasks, In Progress, Overdue, Completed).
    -   Visual charts and widgets.
-   **Task Management**:
    -   Create, edit, and delete tasks.
    -   Assign tasks to specific users.
    -   **Kanban Board**: Drag-and-drop interface for managing task status (Todo, In Progress, Done).
-   **Project Management**: Organize tasks into specific projects.
-   **Calendar Integration**: View upcoming deadlines and events.
-   **Modern UI**: Built with React, Tailwind CSS, and Material UI.

## 🛠️ Tech Stack

-   **Backend**: Laravel 11 (PHP)
-   **Frontend**: React + Vite
-   **Database**: MySQL
-   **Styling**: Tailwind CSS + Material UI
-   **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   [PHP](https://www.php.net/downloads) (>= 8.2)
-   [Composer](https://getcomposer.org/)
-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [MySQL](https://www.mysql.com/)

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/avndra/Project-Management-RLaravel.git
cd Project-Management-RLaravel
```

### 2. Backend Setup (Laravel)
```bash
# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env
# DB_DATABASE=orxus_pm
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations and seeders
php artisan migrate --seed
```

### 3. Frontend Setup (React)
```bash
cd orxus-frontend

# Install Node dependencies
npm install
```

## 🚀 Running the Application

You need to run both the backend and frontend servers.

**Terminal 1 (Backend):**
```bash
# From the root directory
php artisan serve
```
The API will be available at `http://localhost:8000`.

**Terminal 2 (Frontend):**
```bash
# From the orxus-frontend directory
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## 🔗 API Documentation

### Authentication
-   `POST /api/register` - Register a new user
-   `POST /api/login` - Login and get token
-   `POST /api/logout` - Logout (Requires Auth)

### Users
-   `GET /api/user` - Get current authenticated user
-   `POST /api/user/profile` - Update user profile
-   `GET /api/users` - List all users
-   `GET /api/users/{id}/tasks` - Get tasks assigned to a specific user

### Projects & Tasks
-   `GET /api/projects` - List all projects
-   `POST /api/projects` - Create a new project
-   `GET /api/tasks` - List all tasks
-   `POST /api/tasks` - Create a new task
-   `PUT /api/tasks/{id}` - Update a task
-   `DELETE /api/tasks/{id}` - Delete a task

### Dashboard
-   `GET /api/dashboard/stats` - Get dashboard statistics
-   `GET /api/calendar/events` - Get events for the calendar

## 👥 Authors

-   **Silvaris** - *Initial work*

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
