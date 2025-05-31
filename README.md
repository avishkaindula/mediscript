# MediScript Prescription Management Web App

This is a full-stack prescription management web application built with Next.js, React, TypeScript, and Supabase. It supports both user and pharmacy flows, including prescription uploads, quotations, and order management.

## Getting Started

### 1. Install Node.js
Make sure you have Node.js installed (version 18 or higher is recommended). You can download it from [nodejs.org](https://nodejs.org/).

### 2. Install pnpm
This project uses [pnpm](https://pnpm.io/) as the package manager for faster and more reliable installs. If you don't have pnpm, follow the official installation guide:

👉 [Install pnpm](https://pnpm.io/installation)

### 3. Clone and Open the Project
Clone this repository and open the project folder in your terminal or code editor.

### 4. Install Dependencies
Run the following command in the project root:

```
pnpm install
```

### 5. Start the Development Server
Run:

```
pnpm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables
A pre-configured `.env` file is included for your convenience. **No local database setup is required**—the app connects to a cloud-hosted Supabase instance.

## Test Credentials
You can use the following test accounts to log in without creating your own users:

### User Login
- **Email:** avishkaindula@gmail.com
- **Password:** Qwer123;

### Pharmacy Login
- **Email:** avishkaindularaja@outlook.com
- **Password:** Qwer123;

---

Feel free to explore both user and pharmacy flows. If you have any questions or issues, please open an issue or contact the maintainer. 