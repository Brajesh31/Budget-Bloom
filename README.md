# Budget Bloom - Expense Tracker

A modern, full-stack expense tracking application built with Next.js that helps users manage their finances by tracking expenses, creating budgets, and gaining insights into spending habits.

## 🚀 Features

- **User Authentication**: Secure sign-in/sign-up with Clerk
- **Budget Management**: Create, edit, and delete budgets with custom icons
- **Expense Tracking**: Add, view, and delete expenses for each budget
- **Visual Analytics**: Interactive charts and graphs using Recharts
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live data synchronization
- **Dark/Light Mode**: Theme switching support

## 🛠️ Technologies Used

### Frontend
- **Next.js 15** - React framework for production
- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful & consistent icon library
- **Recharts** - Composable charting library for React

### Backend & Database
- **Neon Database** - Serverless PostgreSQL database
- **Drizzle ORM** - TypeScript ORM for SQL databases
- **Drizzle Kit** - Database migration toolkit

### Authentication
- **Clerk** - Complete authentication and user management

### UI/UX Libraries
- **Radix UI** - Low-level UI primitives
- **Class Variance Authority** - CSS-in-JS variant API
- **Tailwind Merge** - Utility for merging Tailwind CSS classes
- **Sonner** - Toast notification library
- **Emoji Picker React** - Emoji picker component
- **Moment.js** - Date manipulation library

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- A Neon Database account
- A Clerk account for authentication

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expense
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database
NEXT_PUBLIC_DATABASE_URL=your_neon_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Database Setup

#### Set up Neon Database:
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string to your `.env.local` file

#### Run Database Migrations:
```bash
npm run db:push
```

#### (Optional) Open Database Studio:
```bash
npm run db:studio
```

### 5. Set up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy the publishable key and secret key to your `.env.local` file
4. Configure sign-in/sign-up pages in Clerk dashboard

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
expense/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (routes)/                 # Protected routes
│   ├── dashboard/                # Dashboard pages
│   │   ├── _components/          # Dashboard components
│   │   ├── budgets/              # Budget management
│   │   ├── expenses/             # Expense tracking
│   │   └── about/                # About page
│   ├── _components/              # Global components
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── @/components/ui/              # Shadcn UI components
├── components/ui/                # Custom UI components
├── utils/                        # Utility files
│   ├── dbConfig.jsx              # Database configuration
│   └── schema.js                 # Database schema
├── lib/                          # Library functions
├── public/                       # Static assets
└── drizzle/                      # Database migrations
```

## 🎯 Usage

### Creating a Budget
1. Navigate to the Budgets page
2. Click "Create New Budget"
3. Choose an emoji icon
4. Enter budget name and amount
5. Click "Create Budget"

### Adding Expenses
1. Click on a budget card
2. Use the "Add Expense" form
3. Enter expense name and amount
4. Click "Add New Expense"

### Viewing Analytics
- Dashboard shows overview cards with total budget, spending, and number of budgets
- Bar chart displays spending vs budget for each category
- Latest expenses table shows recent transactions

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Make sure to add all environment variables in your deployment platform:
- `NEXT_PUBLIC_DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Hariprasath V**
- Email: officialhari2030@gmail.com
- Phone: 8925425514
- GitHub: [Hariprasath2030](https://github.com/Hariprasath2030)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for authentication services
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

---

**Budget Bloom** - Take control of your finances! 🌸💰
