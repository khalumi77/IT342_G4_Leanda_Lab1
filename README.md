

# StudentPortal Lite System

## Project Description

The **StudentPortal Lite System** is a standalone application designed to provide a secure and streamlined authentication experience for students. The system allows guest users to register and log in, while providing authenticated users with a private dashboard to view their profile information.



---

## Technologies Used

| Layer | Technology                                          |
| --- |-----------------------------------------------------|
| **Frontend** | React (Vite)                  |
| **Backend** | Spring Boot 4.0.2 |
| **Database** | MySQL (XAMPP)                                       |
| **Tools** | Maven, IntelliJ IDEA, VS Code                       |

---

## Steps to Run Backend

1. **Start MySQL:** Open the **XAMPP Control Panel** and start the **MySQL** and **Apache** modules.
2. **Database Setup:** * Navigate to `http://localhost/phpmyadmin`.
* Create a new database named `studentportallite_db`.


3. **Open Project:** Open the `backend` folder in **IntelliJ IDEA**.
4. **Configure Environment:** Ensure `src/main/resources/application.properties` contains your MySQL credentials.
5. **Run Application:** Run the `BackendApplication.java` file. Hibernate will automatically generate the `users` table based on the ERD.

---

## Steps to Run Web App

1. **Navigate to Folder:** Open your terminal and go to the `web` directory.
2. **Install Dependencies:**
```bash
npm install

```


3. **Launch Frontend:**
```bash
npm run dev

```


4. **Access App:** Open `http://localhost:5173` in your browser.


---

## List of API Endpoints

All endpoints are prefixed with `http://localhost:8080/api/auth`.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/register` | Public | Creates a new user account and hashes the password. |
| `POST` | `/login` | Public | Validates credentials and returns a JWT token. |
| `GET` | `/profile` | Private | Retrieves user details (Requires Authorization Header). |
| `POST` | `/logout` | Private | Clears the session on the client-side. |

