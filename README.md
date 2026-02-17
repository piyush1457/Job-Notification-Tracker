# Job Notification Tracker

**Live Demo:** [https://job-notification-tracker-v63o.vercel.app/](https://job-notification-tracker-v63o.vercel.app/)

A premium, intelligent job application tracker designed to help you organize your job search with style and efficiency. Built with React, TypeScript, and a focus on user experience.

## 🚀 Core Features

-   **Intelligent Match Scoring**: Automatically scores jobs based on your preferences (Location, Role, Experience) to highlight the best fits.
-   **Persistent Status Tracking**: Track your application status (Not Applied, Applied, Rejected, Selected) with `localStorage` persistence.
-   **Smart Filtering**: Filter jobs by status, match score, salary, and more.
-   **Daily Digest Simulation**: A "Digest" page that simulates email notifications for recent high-match jobs and status updates.
-   **Built-in Verification**: A self-test system (`/jt/07-test`) ensures all features are working correctly before "shipping".
-   **Proof of Work**: A dedicated proof page (`/proof`) to validate completion of the project requirements.
-   **Premium Design**: Custom CSS variables, smooth transitions, and a clean, typographic-focused UI.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Vanilla CSS (Custom Properties & Design System)
-   **Icons**: Lucide React
-   **Routing**: React Router DOM
-   **Deployment**: Vercel

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/piyush1457/Job-Notification-Tracker.git
    cd Job-Notification-Tracker
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build by production**
    ```bash
    npm run build
    ```

## 🧪 Verification System

This project includes a built-in verification system to ensure robustness.
-   Navigate to **/jt/07-test** to see the checklist.
-   Navigate to **/jt/08-ship** to see the "Ship" status (locked until tests pass).

## 📄 License

This project is open source and available for educational purposes.
