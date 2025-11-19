🚗 Car Rental System 2.0
A web-based application designed to streamline the process of renting cars. This system allows users to register, book vehicles, manage their profiles, and view booking summaries, utilizing a lightweight file-based backend for data management.

📋 Table of Contents
    Features
    Technology Stack
    File Structure
    Installation & Usage
    Screenshots
    Future Improvements
✨ Features

User Authentication

Sign Up/Login: Secure user registration and login functionality (signup.html, login.html).
Forgot Password: Recovery flow for users who have lost access to their accounts (forgotpwd.html).
User Profiles: View and manage user details (profile.html).

Booking Management

    Dashboard: Central hub for users to view available cars and status (dashboard.html).
    Book a Car: Interface to select and book vehicles (book.html).
    Booking Summary: Review booking details before confirmation (summary.html).
    Update Booking: Modify existing reservations (update.html).
    Cancel Booking: Remove reservations from the system (del.html).

Data Handling
    File-Based Storage: Utilizes text files (users.txt, booking.txt) as a lightweight database to persist user and booking data.

🛠 Technology Stack

    Frontend: HTML5, CSS3
    Backend Logic: JavaScript (index.js)
    Data Storage: Text Files (.txt)

📂 File Structure

CAR RENTAL SYSTEM 2.0/
│
├── Assets
│   └── 3201623.webp        # Background/Hero images
│
├── Core Logic
│   └── index.js            # Main JavaScript application logic
│
├── Data Store              # Flat file database
│   ├── users.txt           # Stores user credentials and info
│   └── booking.txt         # Stores reservation details
│
├── Authentication Pages
│   ├── login.html
│   ├── signup.html
│   ├── signup.css
│   ├── forgotpwd.html
│   └── forgot.css
│
└── Booking & Dashboard
    ├── welcome.html        # Landing page
    ├── welcome.css
    ├── dashboard.html      # Main user interface
    ├── dashboard.css
    ├── book.html           # Booking form
    ├── book.css
    ├── summary.html        # Invoice/Confirmation
    ├── summary.css
    ├── update.html         # Edit booking
    ├── update.css
    ├── del.html            # Delete booking
    |── del.css
    ├── profile.html        # User profile and deleting
    └── profile.css
 



🚀 Installation & Usage
Clone the repository:
    git clone [https://github.com/Deepcode007/Car-rental-2.0-FE-BE.git](https://github.com/Deepcode007/Car-rental-2.0-FE-BE.git)


Navigate to the project directory:
    cd Car-rental-2.0-FE-BE


Running the Application:
    Option A (If using Node.js):
    Run the main script to start the server.
    node index.js

    Then open your browser and navigate to http://localhost:3010 (or whichever port is defined).

    Option B (If static/frontend only):
    Simply open welcome.html or login.html in your preferred web browser.

🔮 Future Improvements

Database Integration: Migrate from .txt files to a relational database (MySQL/PostgreSQL) or MongoDB for better scalability and security.
Payment Gateway: Integrate Stripe or PayPal for real-time payments.
Admin Panel: Create a dedicated view for administrators to add/remove cars and manage all bookings.
Responsive Design: Enhance CSS to ensure full compatibility across mobile devices.

🤝 Contributing:
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
