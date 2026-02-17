# Mini App (Full README)

## Project Description

Mini App is a minimal authentication example demonstrating the core user flows:

- User registration (full name, email, password)
- User login (returns a JWT)
- View profile and a simple dashboard while authenticated
- Logout
- Protected pages and API endpoints that require a valid JWT

The repo contains a Spring Boot backend and a React (Vite) frontend. The frontend uses a small auth context and a `ProtectedRoute` for client-side guarding; the backend enforces authentication with JWT validation.

---

## Tech stack

- Frontend (Web): React + Vite
- Frontend (Mobile): Kotlin
- Backend: Spring Boot 
- Database: MySQL 
- Tools: Maven, npm

---

## Quick start — Backend

1. Start your database (MySQL). If you use XAMPP, start MySQL in the XAMPP control panel.
2. Create a database for the app (example name: `miniapp_db`). You can use phpMyAdmin or the MySQL CLI.
3. Open the `backend` folder in your IDE (IntelliJ IDEA or VS Code).
4. Configure the database connection in `src/main/resources/application.properties` (example below).
5. Run the backend:

```bash
cd backend
mvn spring-boot:run
```

The backend will start on port `8080` by default and will create the `users` table automatically if JPA/Hibernate is configured to do so.

### Example `application.properties` (development)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/miniapp_db
spring.datasource.username=root
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

Use `ddl-auto=update` for local development; do not use it in production without understanding its effects.

---

## Quick start — Frontend (web)

1. Open a terminal and change to the `web` directory.

```bash
cd web
npm install
npm run dev
```

2. Open the app in your browser at `http://localhost:5173`.

---

## Quick start — Mobile

### Prerequisites
- Android Studio (Android emulator or physical device)
- Android SDK 24+ (minSdk)

### Setup

1. Open the `mobile` folder in Android Studio.
2. Configure the backend API URL in `app/src/main/java/com/leanda/miniapp/mobile/api/RetrofitClient.kt`:
   - **For physical device**: Use your PC's IP address (e.g., `http://192.168.1.9:8080/api/`)
   - **For Android emulator**: Use `http://10.0.2.2:8080/api/`

3. Make sure your WiFi network is set to **private** mode when using a physical phone (required for the app to communicate with the backend).

4. Start the backend

5. Build and run the app:
   - Click **Run** in Android Studio, or
   - Use the AVD Manager to start an emulator
   - Select your target device and click **Run**

6. The app will launch on your device/emulator at the login screen.
---

## Database schema (MySQL)

If you prefer to create the table manually, run this SQL in your MySQL database (replace `miniapp_db` with your DB name):

```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

The JPA `User` entity maps fields as `fullName`, `email`, and `password`; column naming can be adjusted in the entity or via SQL.

---

## Environment variables / config notes

- Backend (`backend/src/main/resources/application.properties`): set the datasource URL, username, and password. Example keys: `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`, `spring.jpa.hibernate.ddl-auto`.
- Frontend (`web/src/services/api.js`): default `baseURL` is `/api`. Change to `http://localhost:8080/api` if not using Vite proxy.

When testing mobile from a device, use your machine's IP (e.g., `http://192.168.1.100:8080/api`).

---

## API endpoints

Auth (public):

- `POST /api/auth/register` — Register a new user. Body: `{ "fullName": "Alice", "email": "a@b.com", "password": "Secret123" }`.
- `POST /api/auth/login` — Login with `{ "email": ..., "password": ... }`. Returns `{ token, email, fullName }` on success.
- `POST /api/auth/logout` — (Optional) server-side logout placeholder (client usually just removes token).

User (protected — require `Authorization: Bearer <token>`):

- `GET /api/user/profile` — Returns `{ id, fullName, email }` for the authenticated user.
- `PUT /api/user/profile` — Update allowed fields (currently `fullName`). Body example: `{ "fullName": "New Name" }`. Returns updated user.
- `GET /api/user/dashboard` — Simple dashboard payload: `{ message, user: { fullName } }`.

---

## Testing the app (example flow)

1. Start the backend (`mvn spring-boot:run`).
2. Start the frontend (`npm run dev` in `web`).
3. Register a new user from the frontend, then log in.
4. Visit `Profile` → edit your full name → Save. Navigate to `Dashboard` — it should display the updated name without refreshing.

---

