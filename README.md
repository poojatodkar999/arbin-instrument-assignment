# ArbinInstruments - EV Station Management API

This is an ASP.NET Core Web API project designed to manage Electric Vehicle (EV) charging stations and user authentication.

## 🚀 Features

*   **Station Management (CRUD):**
    *   Add, Update, Delete, and Retrieve EV Charging Stations.
    *   Manage details like Station Name, Address, Pin Code, Connector Type (e.g., CCS, Type 2), Status (Operational, Maintenance), Image URL, and Location Link.
*   **Authentication & Security:**
    *   **JWT Authentication:** Secure API endpoints using JSON Web Tokens.
    *   User Login/Token Generation endpoint.
    *   Global Authorization policy requiring authenticated users for protected routes.
*   **Database:**
    *   Uses **SQL Server** as the backend database.
    *   Implements **ADO.NET** with Stored Procedures (`sp_Stations_CRUD`) for efficient data access.
*   **Documentation:**
    *   Integrated **Swagger/OpenAPI** for API exploration and testing.

## 🛠 Technology Stack

*   **Framework:** .NET Core 6.0+ (ASP.NET Core Web API)
*   **Language:** C#
*   **Database:** SQL Server
*   **Data Access:** ADO.NET (`Microsoft.Data.SqlClient`)
*   **Authentication:** JWT Bearer (`Microsoft.AspNetCore.Authentication.JwtBearer`)

## 📂 Project Structure

*   **Controllers (`/Controllers`):**
    *   `StationController`: Handles HTTP requests for station operations.
    *   `UserProcessor`: Handles user authentication and token generation.
*   **Services (`/Services`):**
    *   `StationService` & `UserService`: Contains business logic.
*   **Database Layer (`/DB`):**
    *   `StationDb` & `UserDB`: Repository classes interacting with the database.
    *   `SqlConnectionHelper`: Helper class for managing SQL connections and executing commands.
*   **Models (`/Model`):**
    *   Entities like `StationModel` and `User`.
*   **Extensions (`/Extention`):**
    *   `BeforeAppExtension`: Handles Dependency Injection and App Configuration (Auth, DB connection).

## ⚙️ Configuration

The project uses `appsettings.json` for configuration. You need to ensure the following sections are present:

```json
{
  "DbConfig": {
    "DbUrl": "Data Source=ADMIN;Initial Catalog=Arbin; User ID=sa;Password=sa@123;Encrypt=True;TrustServerCertificate=True;",
    "DbType": "SQLSERVER"
  },
  "JwtConfig": {
    "Issuer": "Pooja",
    "Audience": "SA",
    "IssuerSigningKey": "Yh2k7QSu4l8CZg5p6X3Pna9L0Miy4D3Bvt0JVr87UcOj69Kqw5R2Nmf4FWs03Hdx",
    "Subject": "ServiceAccessToken"
  }
}
```

## 🔌 API Endpoints

### Stations
*   `GET /StationController/getAllStations` - Get a list of all stations.
*   `GET /StationController/station/{stationId}` - Get details of a specific station.
*   `POST /StationController/station` - Add a new station.
*   `PUT /StationController/station` - Update an existing station.
*   `DELETE /StationController/station/{stationId}` - Delete a station.

### Users (Authentication)
*   `POST /UserProcessor/getGenerateToken` - Authenticate user and get JWT token.

## 🏃 Value Proposition

This API serves as a backend for an EV charging network application, allowing operators to manage their infrastructure and client applications to retrieve station data securely.
