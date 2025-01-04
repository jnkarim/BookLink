# BookLink

## Objective
**BookLink** is an innovative web platform designed to facilitate the seamless exchange and borrowing of books within a community. By allowing users to upload images of their book collections, browse available titles, and initiate secure book transactions, BookLink aims to promote accessibility to literature while reducing the cost and waste associated with book purchases. This platform offers an intuitive user interface to ensure a smooth experience from browsing to borrowing, reinforcing a culture of shared knowledge and sustainability.

## Target Audience
**BookLink** is designed for:
- Avid readers
- Students
- Book collectors
- Anyone interested in accessing books without the need to purchase them

The platform is aimed at individuals looking for an affordable, sustainable, and convenient way to exchange or borrow books.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Laravel
- **Database**: MySQL
- **Authentication**: JWT, Laravel Passport
- **Maps Integration**: Google Maps API (for location-based book exchanges)
- -**Hosting**: Vercel(for front-end)
- **Version Control**: GitHub

  
## API Endpoints

| **Method** | **Endpoint**                     | **Description**                  |
|------------|----------------------------------|----------------------------------|
| `POST`     | `/api/v1/auth/register`          | Register a new user.             |
| `POST`     | `/api/v1/auth/login`             | User login.                      |
| `POST`     | `/api/v1/auth/logout`            | User logout.                     |
| `GET`      | `/api/v1/auth/profile`           | Fetch user profile.              |
| `POST`     | `/api/v1/books`                  | Upload a new book.               |
| `POST`     | `/api/v1/location/save`          | Save user location.              |
| `DELETE`   | `/api/v1/books/:id`              | Remove a book.                   |
| `POST`     | `/api/v1/borrow`                 | Create a borrow request.         |
| `PUT`      | `/api/v1/borrow/:id/approve`     | Approve a borrow request.        |
| `PUT`      | `/api/v1/borrow/:id/reject`      | Reject a borrow request.         |
| `DELETE`   | `/api/v1/borrow/:id/cancel`      | Cancel a borrow request.         |
| `GET`      | `/api/v1/admin/users`            | Fetch all users (admin only).    |
| `DELETE`   | `/api/v1/admin/users/:id`        | Remove a user account.           |


## Project Milestones

### **Milestone 1: Project Setup**
- Design the front-end layout for landing pages in Canva.
- Implement basic frontend components and structure in React.
- Set up the backend environment with a basic structure for user management.

---

### **Milestone 2: Core Features**
- Implement user authentication (registration & login).
- Develop CRUD operations for managing books and borrow requests.
- Integrate location-based features for book exchanges.

---

### **Milestone 3: Finalization and Deployment**(
- Finalize UI/UX with a responsive design.
- Deploy the web application to a hosting platform.
- Conduct testing for performance, scalability, and security.

## Demo
Check out the live demonstration here: [Project Demo Link](https://www.canva.com/design/DAGbKhfc95k/EC34QSav3JdoEEESA62d_w/edit)


