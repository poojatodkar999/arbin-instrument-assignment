# EV Station Management Dashboard

A comprehensive React-based single-page application (SPA) designed for monitoring and managing Electric Vehicle (EV) charging stations. The system provides real-time status updates, an interactive station map, and a secure administration panel for managing station data.

## Project Overview

This application serves two primary user roles:
1.  **Operators**: View the live dashboard, monitor station health (Operational/Maintenance), and check connector types. Access is read-only.
2.  **Admins**: Have full control to Add, Edit, and Delete charging stations. They can upload images, update coordinates, and change maintenance status.

The project is built with **React**, **Vite**, **TanStack Query** for state management, and **CSS Modules** for a premium, responsive UI.

---

## Features

### 🛡️ Secure Authentication & RBAC
*   **Login System**: Secure JWT-based authentication.
*   **Role-Based Access Control (RBAC)**:
    *   **Admin (`admin`)**: Access to Dashboard and Admin Management (Add/Edit/Delete).
    *   **Operator**: Restricted access to specific actions.
*   **Protected Routes**: Automatic redirection to Login for unauthenticated users.
*   **Session Management**: Auto-logout functionality and token persistence.

### 📊 Live Dashboard
*   **Real-Time Monitoring**: Auto-refreshing data (every 1 second) to show the latest station status.
*   **Visual Indicators**: Color-coded cards (Green for Operational, Red for Maintenance).
*   **Rich Data Display**: Shows station images, pin codes, connector types, and direct map links.

### ⚙️ Station Management (Admin Only)
*   **CRUD Operations**: Create, Read, Update, and Delete stations.
*   **Image Management**: Support for direct file uploads (converting to Base64) or external URLs.
*   **Validation**: Robust form validation using `react-hook-form`.
*   **Interactive Feedback**: Toast notifications for success and error states.

---

## API Integration

The application connects to a local ASP.NET Core Web API.

### Configuration
The API base URL is configured in the `.env` file:
```env
VITE_API_BASE_URL=https://localhost:7269/
```

### Key Endpoints

#### Authentication
*   **`POST /UserProcessor/getGenerateToken`**: Authenticates user and returns a JWT token.
    *   *Payload*: `{ user_name, password }`
    *   *Response*: `{ token, user_name, ... }`

#### Station Management
*   **`GET /Station/getAllStations`**: Fetches the list of all stations.
*   **`GET /Station/station/{id}`**: Fetches details for a single station.
*   **`POST /Station/station`**: Creates a new station (Admin only).
*   **`PUT /Station/station`**: Updates an existing station (Admin only).
*   **`DELETE /Station/station/{id}`**: Deletes a station (Admin only).

### Security
*   **JWT Interceptor**: An Axios interceptor automatically attaches the `Authorization: Bearer <token>` header to every outgoing request if a user is logged in.

---

## Setup Instructions

### 1. Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   Backend API running on `localhost:7269` (or update `.env`)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/poojatodkar999/arbin-instrument-assignment
cd arbin-instrument-assignment
npm install
```

### 3. Running Locally
Start the development server:

```bash
npm run dev
```
Access the app at `http://localhost:5173`.

### 4. Login Credentials (Default)
*   **Username**: `admin`
*   **Password**: `admin@123`
Operator :
*   **Username**: `operator`
*   **Password**: `oper@123`

---

## Project Structure

*   **`/src/components/auth`**: Login form and Protected Route logic.
*   **`/src/components/admin`**: Admin Dashboard, Station Forms, and Modals.
*   **`/src/components/dashboard`**: Public/Operator view components.
*   **`/src/components/common`**: Reusable UI components (Navbar, Modal).
*   **`/src/services`**: API configuration and Service layer.
