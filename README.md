# MediScript Prescription Management Web App

**🌐 Hosted Demo:** [https://mediscript-two.vercel.app/](https://mediscript-two.vercel.app/)

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

## Development Details & Time Taken

This project was designed, developed, and deployed in just **2 and a half days**. All core features—including user and pharmacy flows, Supabase integration, file uploads, quotations, dashboards, and email notifications—were implemented within this rapid timeframe.

The app features robust **role-based access control (RBAC)** and **Supabase Row Level Security (RLS)** policies to ensure data privacy and secure separation between user and pharmacy roles. This means users and pharmacies only see and interact with the data relevant to their role, with all access enforced at the database level.

This demonstrates the power of modern full-stack tools and a focused workflow.

Feel free to explore both user and pharmacy flows. If you have any questions or issues, please open an issue or contact the maintainer. 