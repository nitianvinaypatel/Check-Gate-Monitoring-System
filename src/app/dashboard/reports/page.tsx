"use client";

import { PageContainer } from "@/components/dashboard/page-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

// Sample reports data
const reports = [
  {
    id: "R001",
    name: "Daily Vehicle Traffic Report",
    description: "Summary of all vehicles passing through checkpoints",
    type: "Daily",
    lastGenerated: "2023-06-10T18:30:00",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    id: "R002",
    name: "Flagged Vehicles Report",
    description: "Details of vehicles flagged for inspection",
    type: "Weekly",
    lastGenerated: "2023-06-07T09:15:00",
    format: "Excel",
    size: "3.5 MB",
  },
  {
    id: "R003",
    name: "Checkpoint Activity Summary",
    description: "Activity metrics for all checkpoints",
    type: "Monthly",
    lastGenerated: "2023-06-01T14:45:00",
    format: "PDF",
    size: "4.8 MB",
  },
  {
    id: "R004",
    name: "Officer Performance Report",
    description: "Performance metrics for checkpoint officers",
    type: "Monthly",
    lastGenerated: "2023-06-01T15:30:00",
    format: "Excel",
    size: "2.7 MB",
  },
  {
    id: "R005",
    name: "Vehicle Type Distribution",
    description: "Analysis of vehicle types passing through checkpoints",
    type: "Quarterly",
    lastGenerated: "2023-04-01T10:00:00",
    format: "PDF",
    size: "5.3 MB",
  },
  {
    id: "R006",
    name: "Peak Traffic Hours Analysis",
    description: "Analysis of peak traffic hours at checkpoints",
    type: "Monthly",
    lastGenerated: "2023-06-01T16:15:00",
    format: "PDF",
    size: "3.1 MB",
  },
];

export default function ReportsPage() {
  return (
    <PageContainer title="Reports">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {report.type}
                  </span>
                </div>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm mb-4">
                  <div className="text-muted-foreground">
                    Last generated: {formatDate(report.lastGenerated)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {report.format}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {report.size}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Custom Report Generator</CardTitle>
            <CardDescription>
              Create a custom report by selecting parameters below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option>Vehicle Traffic</option>
                  <option>Checkpoint Activity</option>
                  <option>Flagged Vehicles</option>
                  <option>Officer Performance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Custom Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
