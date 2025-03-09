"use client";

import { useState } from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  Shield,
  MapPin,
} from "lucide-react";

// Sample users data
const users = [
  {
    id: "U001",
    name: "John Doe",
    email: "john.doe@police.mizoram.gov.in",
    role: "Administrator",
    status: "Active",
    checkpoint: "Headquarters",
    phone: "+91 9876543210",
    lastActive: "2023-06-10T15:30:00",
    avatar: "JD",
  },
  {
    id: "U002",
    name: "Jane Smith",
    email: "jane.smith@police.mizoram.gov.in",
    role: "Supervisor",
    status: "Active",
    checkpoint: "Aizawl East",
    phone: "+91 9876543211",
    lastActive: "2023-06-10T14:45:00",
    avatar: "JS",
  },
  {
    id: "U003",
    name: "Robert Johnson",
    email: "robert.johnson@police.mizoram.gov.in",
    role: "Officer",
    status: "Active",
    checkpoint: "Lengpui",
    phone: "+91 9876543212",
    lastActive: "2023-06-10T13:15:00",
    avatar: "RJ",
  },
  {
    id: "U004",
    name: "Sarah Williams",
    email: "sarah.williams@police.mizoram.gov.in",
    role: "Officer",
    status: "Active",
    checkpoint: "Champhai",
    phone: "+91 9876543213",
    lastActive: "2023-06-10T12:30:00",
    avatar: "SW",
  },
  {
    id: "U005",
    name: "Michael Brown",
    email: "michael.brown@police.mizoram.gov.in",
    role: "Supervisor",
    status: "Inactive",
    checkpoint: "Kolasib",
    phone: "+91 9876543214",
    lastActive: "2023-06-09T16:45:00",
    avatar: "MB",
  },
  {
    id: "U006",
    name: "Emily Davis",
    email: "emily.davis@police.mizoram.gov.in",
    role: "Officer",
    status: "Active",
    checkpoint: "Aizawl West",
    phone: "+91 9876543215",
    lastActive: "2023-06-10T11:00:00",
    avatar: "ED",
  },
  {
    id: "U007",
    name: "David Wilson",
    email: "david.wilson@police.mizoram.gov.in",
    role: "Officer",
    status: "On Leave",
    checkpoint: "Serchhip",
    phone: "+91 9876543216",
    lastActive: "2023-06-08T09:30:00",
    avatar: "DW",
  },
  {
    id: "U008",
    name: "Lisa Taylor",
    email: "lisa.taylor@police.mizoram.gov.in",
    role: "Administrator",
    status: "Active",
    checkpoint: "Headquarters",
    phone: "+91 9876543217",
    lastActive: "2023-06-10T10:15:00",
    avatar: "LT",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    // Search filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.checkpoint.toLowerCase().includes(searchTerm.toLowerCase());

    // Role filter
    const matchesRole =
      roleFilter === "all" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "On Leave":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <PageContainer title="Users">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search users..."
              className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="administrator">Administrator</option>
              <option value="supervisor">Supervisor</option>
              <option value="officer">Officer</option>
            </select>

            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on leave">On Leave</option>
            </select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">User</th>
                    <th className="px-4 py-3 text-left font-medium">Role</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Checkpoint
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Contact</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                            <span className="font-medium">{user.avatar}</span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Shield
                            className={`h-3.5 w-3.5 ${
                              user.role === "Administrator"
                                ? "text-blue-500"
                                : user.role === "Supervisor"
                                ? "text-amber-500"
                                : "text-green-500"
                            }`}
                          />
                          <span>{user.role}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{user.checkpoint}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Email</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {user.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
