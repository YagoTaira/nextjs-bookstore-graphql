# 📚 Book Store App

An admin-friendly bookstore web app built with **Next.js**, **TypeScript**, **GraphQL**, **Relay**, **Tailwind CSS**, and **MongoDB Yoga**. It allows users to browse, favorite, and add books to a cart. Admin users can manage the book catalog.

---

## 🚀 Features

- 🔐 User authentication with role-based access (admin/user)
- 📖 Browse books with detailed view pages
- ❤️ Favorite system per user
- 🛒 Add books to cart
- ⚙️ Admin dashboard for managing books
- 🌈 Responsive design with Tailwind CSS
- 🧪 End-to-end testing with Playwright

---

## 🛠️ Tech Stack

- **Frontend:** Next.js + React + TypeScript
- **Styling:** Tailwind CSS
- **State & Data:** GraphQL + Relay
- **Backend:** MongoDB + Mongoose
- **Authentication:** JWT-based with role access (admin/user)
- **Testing:** Playwright

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/book-store-app.git
cd book-store-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your .env file

Create a .env file at the root of your project:

```bash
MONGODB_URI="your_mongodb_connection_string"
ADMIN_USERNAME="your_admin_username"
ADMIN_PASSWORD="your_admin_password"
JWT_SECRET="your_jwt_secret"

NEXT_PUBLIC_CLOUDINARY_URL="https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload"
NEXT_PUBLIC_UPLOAD_PRESET="your_upload_preset"

TEST_ADMIN_USERNAME="your_test_admin_username"
TEST_ADMIN_PASSWORD="your_test_admin_password"
```

## 🌱 Seed the Database

To populate the database with initial books:

```bash
npm run seed
```

Make sure to define these in package.json:

```bash
"scripts": {
    "relay": "relay-compiler",
    "seed": "tsx scripts/seed.ts",
    "test": "playwright test",
}
```

## 🧪 Run Tests

To run Playwright tests:

```bash
npm run test
```

## 🧪 Test Users

This project includes seeded users for testing purposes. You can use these credentials when running automated tests or testing manually in development.

🔐 Admin Test User
• Username: admintest
• Password: Admin@1234
• Role: admin

🙋 Regular Test User
• Username: testuser
• Password: Test@1234
• Role: user

---

## 🖼 Folder Structure

```bash
book-store-app/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── relay.config.json
├── babel.config.js
├── eslint.config.mjs
├── postcss.config.mjs
├── next-env.d.ts
├── playwright.config.ts
├── public/
│   ├── images/                # Book cover images
│   └── ...                    # Misc SVGs/icons
├── scripts/                   # Seeding scripts
│   ├── seed.ts
│   └── seed-test-user.ts
├── playwright/
│   └── global-setup.ts
├── tests/                     # End-to-end tests (Playwright)
│   ├── add-book.spec.ts
│   ├── add-cart.spec.ts
│   ├── add-favourite.spec.ts
│   ├── access-control.spec.ts
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   └── register.spec.ts
├── src/
│   ├── app/                   # App routes & pages (Next.js 13+ App Router)
│   │   ├── api/               # API routes (REST + GraphQL)
│   │   ├── admin/             # Admin routes
│   │   ├── books/             # Book listing and detail pages
│   │   ├── cart/              # Cart page
│   │   ├── favourites/        # Favourites page
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   └── layout.tsx        # Global layout component
│   ├── components/            # Reusable UI components
│   ├── context/               # React Contexts (e.g., Auth)
│   ├── graphql/               # GraphQL schema, types, resolvers
│   ├── lib/                   # Utilities and helper functions
│   ├── models/                # Mongoose models
│   ├── mutations/             # Relay mutations
│   ├── queries/               # Relay queries
│   └── styles/                # Global styles
└── test-results/              # Playwright test output
```

## 📌 To Do

- Fix Book not being added to cart list
- Enable admin to edit book details
- Add more tests

## 📚 Useful Resources

Here are some resources and documentation that can help you understand or contribute to this project more effectively:

### 🔧 Technologies & Frameworks

- [Next.js Documentation](https://nextjs.org/docs) – Framework used for building the frontend
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) – Strongly typed JavaScript
- [Tailwind CSS Docs](https://tailwindcss.com/docs) – Utility-first CSS framework
- [GraphQL Docs](https://graphql.org/learn/) – Query language for the API
- [Relay Docs](https://relay.dev/docs/) – A GraphQL client used with React

### 📦 Tools & Libraries

- [Playwright Testing](https://playwright.dev/docs/intro) – End-to-end testing framework
- [Mongoose](https://mongoosejs.com/docs/index.html) – MongoDB ODM
- [Cloudinary Docs](https://cloudinary.com/documentation) – Image hosting and upload service

### 🌐 Hosting & Deployment

- [Vercel](https://vercel.com/docs) – Hosting platform optimized for Next.js
- [MongoDB Yoga](https://www.mongodb.com/yoga) – Fast and flexible MongoDB development and hosting environment

## 📩 Contact

For any questions regarding this project, please contact:

Yago Taira

[GitHub Profile](https://github.com/YagoTaira)
