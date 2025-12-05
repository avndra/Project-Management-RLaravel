# OrxusPM

## 🚀 Features

-   **Role-Based Access Control**:
    -   **Admin**: Manage projects, users, and view global statistics.
    -   **Staff**: View assigned tasks, update task status, and track personal progress.
-   **Dashboard**:
    -   Real-time statistics (Total Tasks, In Progress, Overdue, Completed).
-   **Task Management**:
    -   Create, edit, and delete tasks.
    -   Assign tasks to specific users.
-   **Project Management**: Organize tasks into specific projects.
-   **Calendar**: View upcoming deadlines and events.
-   **UI**: Built with React and Tailwind CSS with some Material UI

## 🛠️ Tech Stack

-   **Backend**: Laravel 11 (PHP)
-   **Frontend**: React + Vite
-   **Database**: MySQL
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   [PHP](https://www.php.net/downloads) 
-   [Composer](https://getcomposer.org/)
-   [Node.js](https://nodejs.org/)
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
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | Login and get token |
| `POST` | `/api/logout` | Logout (Requires Auth) |

### Users
| `GET` | `/api/user` | Get current authenticated user |
| `GET` | `/api/users` | List all users |
| `GET` | `/api/users/{id}/tasks` | Get tasks assigned to a specific user |

### Projects & Tasks
| `GET` | `/api/projects` | List all projects |
| `POST` | `/api/projects` | Create a new project |
| `GET` | `/api/tasks` | List all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/{id}` | Update a task |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

### Dashboard
| `GET` | `/api/calendar/events` | Get events for the calendar |

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
