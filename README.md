# 🚔 Check Gate Monitoring System Dashboard

<div align="center">

![Mizoram Police Logo](https://via.placeholder.com/150x150?text=MP)

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, responsive dashboard for monitoring check gates across Mizoram**

[Features](#-features) •
[Screenshots](#-screenshots) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[Project Structure](#-project-structure) •
[Deployment](#-deployment)

</div>

<p align="center">
  <img src="https://via.placeholder.com/1200x600?text=Check+Gate+Dashboard" alt="Dashboard Preview" width="100%" />
</p>

## ✨ Features

<div align="center">

|         🌓 Light & Dark Mode         |         📱 Fully Responsive          | 📊 Real-time Analytics  |     🗺️ Interactive Map     |
| :----------------------------------: | :----------------------------------: | :---------------------: | :------------------------: |
| Switch between light and dark themes | Works on desktop, tablet, and mobile | Live data visualization | Track checkpoints visually |

|          🚗 Vehicle Tracking           |         👮 User Management          |    📝 Report Generation     |    🔔 Smart Notifications    |
| :------------------------------------: | :---------------------------------: | :-------------------------: | :--------------------------: |
| Monitor vehicles passing through gates | Manage system users and permissions | Generate and export reports | Real-time alerts and updates |

</div>

## 📸 Screenshots

<div align="center">
  <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
    <img src="https://via.placeholder.com/400x225?text=Dashboard" width="400" alt="Dashboard" />
    <img src="https://via.placeholder.com/400x225?text=Monitoring" width="400" alt="Monitoring" />
    <img src="https://via.placeholder.com/400x225?text=Checkpoints" width="400" alt="Checkpoints" />
    <img src="https://via.placeholder.com/400x225?text=Reports" width="400" alt="Reports" />
  </div>
</div>

## 🛠️ Tech Stack

<div align="center">

|                                                     Frontend                                                      |                                                     UI Components                                                     |                                                      Data Visualization                                                       |                                        Utilities                                        |
| :---------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
|    ![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js&logoColor=white&style=flat-square)     |                    ![Radix UI](https://img.shields.io/badge/Radix_UI-1.0-purple?style=flat-square)                    |                        ![Recharts](https://img.shields.io/badge/Recharts-2.5-22B5BF?style=flat-square)                        | ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.171-gray?style=flat-square) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white&style=flat-square) | ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square) | ![Google Maps](https://img.shields.io/badge/Google_Maps_API-latest-4285F4?logo=google-maps&logoColor=white&style=flat-square) |    ![date-fns](https://img.shields.io/badge/date--fns-2.29-yellow?style=flat-square)    |

</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/check-gate-dashboard.git
cd check-gate-dashboard
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_URL=your_backend_api_url
```

## 📁 Project Structure

```
check-gate-dashboard/
├── public/                  # Static assets
│   ├── avatar.png           # Default user avatar
│   └── favicon.ico          # Site favicon
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── alerts/      # Alerts management
│   │   │   ├── analytics/   # Data analytics
│   │   │   ├── checkpoints/ # Checkpoint management
│   │   │   ├── monitoring/  # Real-time monitoring
│   │   │   ├── profile/     # User profile
│   │   │   ├── reports/     # Report generation
│   │   │   ├── settings/    # System settings
│   │   │   ├── users/       # User management
│   │   │   ├── vehicles/    # Vehicle tracking
│   │   │   └── layout.tsx   # Dashboard layout wrapper
│   │   ├── login/           # Authentication pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── monitoring/      # Monitoring components
│   │   └── ui/              # Reusable UI components
│   └── lib/                 # Utility functions and helpers
│       ├── data/            # Mock data for development
│       └── utils.ts         # Utility functions
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## 🧩 Key Components

### Dashboard Layout

The dashboard uses a responsive layout with a sidebar for navigation and a main content area. The sidebar collapses on mobile devices and can be toggled with a button in the navbar.

```tsx
<DashboardLayout>
  <PageContainer title="Your Page Title">
    {/* Your page content */}
  </PageContainer>
</DashboardLayout>
```

### Interactive Map

The checkpoint map provides a visual representation of all check gates across Mizoram, with real-time status indicators and alerts.

```tsx
<CheckpointMap />
```

### Data Visualization

Various charts and graphs provide insights into vehicle traffic patterns, checkpoint activity, and other key metrics.

```tsx
<TrafficChart />
<CheckpointChart />
<VehicleTypeChart />
```

## 🎨 Customization

### Themes

The application supports both light and dark themes using Tailwind CSS. You can customize the theme colors in the `tailwind.config.js` file.

```js
theme: {
  extend: {
    colors: {
      // Your custom colors
    }
  }
}
```

### Adding New Pages

To add a new page to the dashboard:

1. Create a new directory in `src/app/dashboard/`
2. Add a `page.tsx` file with your content
3. Use the `PageContainer` component for consistent styling
4. Add a link to the new page in the sidebar navigation

## 📦 Deployment

This application can be deployed to any hosting platform that supports Next.js applications.

### Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploying to Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `.next`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- **Mizoram Police Department** for their requirements and feedback
- **Next.js team** for the amazing framework
- **Tailwind CSS team** for the utility-first CSS framework
- **Radix UI team** for accessible UI components
- **Vercel** for hosting and deployment

---

<div align="center">

Made with ❤️ for Mizoram Police

</div>
