# Restaurant Admin App

This is the **Restaurant Reservation Admin** application, designed for restaurant administrators to manage restaurants, reservations, and notifications.

## Hosted Application

The admin app of the application is hosted at:
**[Restaurant Admin Backend](https://restaurant-app-admin.netlify.app)**

## Features
- Admin authentication (Login/Register)
- Manage restaurants
- Manage reservations
- Notifications system
- Profile management

## Technologies Used
- **React.js** for frontend development
- **React Router** for navigation
- **LocalStorage** for session management

## Installation & Setup

### Prerequisites
Make sure you have **Node.js** and **npm** installed.

### Clone the Repository
```sh
git clone https://github.com/MabohlaleNkuna/restaurant-app-admin/tree/development
cd restaurant-admin-app
```

### Install Dependencies
```sh
npm install
```

### Run the Application
```sh
npm start
```

## Application Structure
```sh
src/
├── components/
│   ├── Navigation.js
├── pages/
│   ├── AdminDashboard.js
│   ├── AddRestaurant.js
│   ├── Login.js
│   ├── ManageReservations.js
│   ├── ManageRestaurants.js
│   ├── Notifications.js
│   ├── Profile.js
│   ├── Register.js
├── App.js
└── index.js
```

## Authentication
- Uses **localStorage** to store `adminToken`.
- `useEffect` checks for the token on page load.

## Routing
Routes are managed with `react-router-dom`, ensuring private pages are accessible only when logged in.

## Contribution
Feel free to fork and contribute to the project.

