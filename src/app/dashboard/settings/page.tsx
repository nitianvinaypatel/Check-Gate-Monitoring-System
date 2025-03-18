"use client";

import { useState } from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, Lock, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    appNotifications: true,
    soundAlerts: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: "system",
    language: "en",
    timezone: "Asia/Kolkata",
    compactMode: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    shareActivityData: true,
    allowLocationTracking: true,
  });

  const handleNotificationChange = (
    setting: keyof typeof notificationSettings
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });

    toast({
      title: "Settings updated",
      description: `${setting} has been ${
        notificationSettings[setting] ? "disabled" : "enabled"
      }.`,
    });
  };

  const handleDisplayChange = (
    setting: keyof typeof displaySettings,
    value: string | boolean
  ) => {
    setDisplaySettings({
      ...displaySettings,
      [setting]: value,
    });

    toast({
      title: "Settings updated",
      description: `${setting} has been changed to ${value}.`,
    });
  };

  const handlePrivacyChange = (setting: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting],
    });

    toast({
      title: "Settings updated",
      description: `${setting} has been ${
        privacySettings[setting] ? "disabled" : "enabled"
      }.`,
    });
  };

  return (
    <PageContainer title="Settings">
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-auto">
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display">
            <Sun className="h-4 w-4 mr-2" />
            Display
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-alerts">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-alerts"
                  checked={notificationSettings.emailAlerts}
                  onCheckedChange={() =>
                    handleNotificationChange("emailAlerts")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-alerts">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  id="sms-alerts"
                  checked={notificationSettings.smsAlerts}
                  onCheckedChange={() => handleNotificationChange("smsAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="app-notifications">App Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications
                  </p>
                </div>
                <Switch
                  id="app-notifications"
                  checked={notificationSettings.appNotifications}
                  onCheckedChange={() =>
                    handleNotificationChange("appNotifications")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound when notifications arrive
                  </p>
                </div>
                <Switch
                  id="sound-alerts"
                  checked={notificationSettings.soundAlerts}
                  onCheckedChange={() =>
                    handleNotificationChange("soundAlerts")
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Test Notifications
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Types</CardTitle>
              <CardDescription>
                Choose which types of alerts you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "checkpoint-alerts",
                  label: "Checkpoint Status Changes",
                  description: "When a checkpoint changes status",
                },
                {
                  id: "vehicle-alerts",
                  label: "Suspicious Vehicle Alerts",
                  description: "When a suspicious vehicle is detected",
                },
                {
                  id: "system-alerts",
                  label: "System Maintenance",
                  description: "System maintenance and updates",
                },
                {
                  id: "report-alerts",
                  label: "Report Generation",
                  description: "When reports are generated",
                },
              ].map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <Label htmlFor={alert.id}>{alert.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                  </div>
                  <Switch id={alert.id} defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize how the application looks and behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={displaySettings.theme}
                  onValueChange={(value) => handleDisplayChange("theme", value)}
                >
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center">
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center">
                        <Moon className="mr-2 h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={displaySettings.language}
                  onValueChange={(value) =>
                    handleDisplayChange("language", value)
                  }
                >
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        English
                      </div>
                    </SelectItem>
                    <SelectItem value="hi">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Hindi
                      </div>
                    </SelectItem>
                    <SelectItem value="mz">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Mizo
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={displaySettings.timezone}
                  onValueChange={(value) =>
                    handleDisplayChange("timezone", value)
                  }
                >
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">
                      <div className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="2" x2="12" y2="4"></line>
                          <line x1="12" y1="20" x2="12" y2="22"></line>
                          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
                          <line
                            x1="17.66"
                            y1="17.66"
                            x2="19.07"
                            y2="19.07"
                          ></line>
                          <line x1="2" y1="12" x2="4" y2="12"></line>
                          <line x1="20" y1="12" x2="22" y2="12"></line>
                          <line
                            x1="4.93"
                            y1="19.07"
                            x2="6.34"
                            y2="17.66"
                          ></line>
                          <line
                            x1="17.66"
                            y1="6.34"
                            x2="19.07"
                            y2="4.93"
                          ></line>
                        </svg>
                        IST (UTC+5:30)
                      </div>
                    </SelectItem>
                    <SelectItem value="UTC">
                      <div className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="2" x2="12" y2="4"></line>
                          <line x1="12" y1="20" x2="12" y2="22"></line>
                          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
                          <line
                            x1="17.66"
                            y1="17.66"
                            x2="19.07"
                            y2="19.07"
                          ></line>
                          <line x1="2" y1="12" x2="4" y2="12"></line>
                          <line x1="20" y1="12" x2="22" y2="12"></line>
                          <line
                            x1="4.93"
                            y1="19.07"
                            x2="6.34"
                            y2="17.66"
                          ></line>
                          <line
                            x1="17.66"
                            y1="6.34"
                            x2="19.07"
                            y2="4.93"
                          ></line>
                        </svg>
                        UTC
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use a more compact interface
                  </p>
                </div>
                <Switch
                  id="compact-mode"
                  checked={displaySettings.compactMode}
                  onCheckedChange={(checked) =>
                    handleDisplayChange("compactMode", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dashboard Layout</CardTitle>
              <CardDescription>Customize your dashboard layout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: "layout-1",
                    name: "Default",
                    description: "Standard layout with sidebar",
                  },
                  {
                    id: "layout-2",
                    name: "Compact",
                    description: "Minimized sidebar with icons",
                  },
                  {
                    id: "layout-3",
                    name: "Wide",
                    description: "Full-width layout with top navigation",
                  },
                ].map((layout) => (
                  <div
                    key={layout.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                      layout.id === "layout-1"
                        ? "border-primary bg-primary/5"
                        : ""
                    }`}
                  >
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <h3 className="font-medium">{layout.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {layout.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Apply Layout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="online-status">Show Online Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see when you are online
                  </p>
                </div>
                <Switch
                  id="online-status"
                  checked={privacySettings.showOnlineStatus}
                  onCheckedChange={() =>
                    handlePrivacyChange("showOnlineStatus")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-data">Share Activity Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Share your activity data for system improvements
                  </p>
                </div>
                <Switch
                  id="activity-data"
                  checked={privacySettings.shareActivityData}
                  onCheckedChange={() =>
                    handlePrivacyChange("shareActivityData")
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="location-tracking">
                    Allow Location Tracking
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow the system to track your location while on duty
                  </p>
                </div>
                <Switch
                  id="location-tracking"
                  checked={privacySettings.allowLocationTracking}
                  onCheckedChange={() =>
                    handlePrivacyChange("allowLocationTracking")
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your personal data stored in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Export Your Data</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Download a copy of your personal data
                  </p>
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-red-500 mb-1">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    These actions are irreversible
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm">
                      Clear Activity History
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
