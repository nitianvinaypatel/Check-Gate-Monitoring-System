import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">MP</span>
            </div>
            <span className="font-bold text-xl">Mizoram Police</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Check Gate Monitoring System
            </h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive solution for monitoring and managing vehicle
              movement through check gates across Mizoram.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="text-center p-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold mb-2">
                  Real-time Monitoring
                </h3>
                <p className="text-muted-foreground">
                  Track vehicles, manage checkpoints, and analyze traffic
                  patterns
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z"></path>
                <circle cx="12" cy="8" r="2"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Checkpoint Management</h3>
            <p className="text-muted-foreground">
              Efficiently manage all check gates across the state with real-time
              status updates.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
                <path d="M17 3h2c1.1 0 2 .9 2 2v2"></path>
                <path d="M21 17v2c0 1.1-.9 2-2 2h-2"></path>
                <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"></path>
                <rect width="7" height="5" x="7" y="7" rx="1"></rect>
                <rect width="7" height="5" x="10" y="12" rx="1"></rect>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Vehicle Tracking</h3>
            <p className="text-muted-foreground">
              Track and monitor vehicles passing through check gates with
              detailed information.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Gain insights from comprehensive analytics and reports on traffic
              patterns.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mizoram Police. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
