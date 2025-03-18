"use client";

import { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  CircleF,
} from "@react-google-maps/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Maximize2,
  Minimize2,
  RefreshCw,
  Filter,
  Search,
  Car,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHECKPOINTS, type Checkpoint } from "@/lib/data/checkpoints";

// Keep existing CHECKPOINTS data and other constants...

export function Overview() {
  const activeCheckpoints = CHECKPOINTS.filter(
    (cp) => cp.status === "active"
  ).length;
  const totalVehicles = CHECKPOINTS.reduce((sum, cp) => sum + cp.vehicles, 0);
  const totalAlerts = CHECKPOINTS.reduce((sum, cp) => sum + cp.alerts, 0);

  return (
    <div className="col-span-1 md:col-span-2">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Checkpoints
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCheckpoints}</div>
            <p className="text-xs text-muted-foreground">
              out of {CHECKPOINTS.length} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vehicles
            </CardTitle>
            <Car className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Passed through today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function RecentActivity() {
  const activities = [
    {
      checkpoint: "Vairengte",
      event: "Vehicle passed",
      time: "2 minutes ago",
      details: "MZ01A1234",
    },
    {
      checkpoint: "Bairabi",
      event: "Alert triggered",
      time: "5 minutes ago",
      details: "Suspicious activity",
    },
    {
      checkpoint: "Lengpui",
      event: "Status change",
      time: "10 minutes ago",
      details: "Checkpoint activated",
    },
    {
      checkpoint: "Champhai",
      event: "Vehicle passed",
      time: "15 minutes ago",
      details: "MZ05B5678",
    },
  ];

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest events from all checkpoints</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.checkpoint} - {activity.event}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.details}
                </p>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 23.8,
  lng: 92.9,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  styles: [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [{ color: "#4a90e2" }, { weight: 1 }],
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#c3e6ff" }],
    },
  ],
};

export function CheckpointMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "alerts"
  >("all");
  const [showCoverage, setShowCoverage] = useState(true);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const filteredCheckpoints = CHECKPOINTS.filter((checkpoint: Checkpoint) => {
    const matchesSearch = checkpoint.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && checkpoint.status === "active") ||
      (statusFilter === "inactive" && checkpoint.status === "inactive") ||
      (statusFilter === "alerts" &&
        checkpoint.status === "active" &&
        checkpoint.alerts > 0);
    return matchesSearch && matchesStatus;
  });

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Map Updated",
        description: "Checkpoint data has been refreshed successfully",
        variant: "default",
      });
    }, 1500);
  };

  if (loadError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Error loading Google Maps. Please check your API key and try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={isFullscreen ? "fixed inset-4 z-50" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold text-foreground">
            Checkpoint Map
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time monitoring of check gates
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search checkpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value: "all" | "active" | "inactive" | "alerts") =>
              setStatusFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Checkpoints</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
              <SelectItem value="alerts">With Alerts</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="default"
            onClick={() => setShowCoverage(!showCoverage)}
            className={showCoverage ? "bg-muted" : ""}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Coverage Areas
          </Button>
        </div>

        <div
          className={`relative border rounded-md overflow-hidden ${
            isFullscreen ? "h-[calc(100vh-10rem)]" : "h-[500px]"
          }`}
        >
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/20">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={8}
              center={center}
              options={options}
              onLoad={onMapLoad}
            >
              {showCoverage &&
                filteredCheckpoints.map((checkpoint) => (
                  <CircleF
                    key={`circle-${checkpoint.id}`}
                    center={checkpoint.location}
                    radius={checkpoint.coverage}
                    options={{
                      fillColor:
                        checkpoint.status === "active"
                          ? checkpoint.alerts > 0
                            ? "#fee2e2"
                            : "#dcfce7"
                          : "#f3f4f6",
                      fillOpacity: 0.2,
                      strokeColor:
                        checkpoint.status === "active"
                          ? checkpoint.alerts > 0
                            ? "#ef4444"
                            : "#22c55e"
                          : "#9ca3af",
                      strokeOpacity: 0.8,
                      strokeWeight: 1,
                    }}
                  />
                ))}

              {filteredCheckpoints.map((checkpoint) => (
                <MarkerF
                  key={checkpoint.id}
                  position={checkpoint.location}
                  onClick={() => setSelectedCheckpoint(checkpoint.id)}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor:
                      checkpoint.status === "active"
                        ? checkpoint.alerts > 0
                          ? "#ef4444"
                          : "#22c55e"
                        : "#9ca3af",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#ffffff",
                  }}
                />
              ))}

              {selectedCheckpoint && (
                <InfoWindowF
                  position={
                    CHECKPOINTS.find((cp) => cp.id === selectedCheckpoint)
                      ?.location
                  }
                  onCloseClick={() => setSelectedCheckpoint(null)}
                >
                  <div className="p-2 min-w-[200px] bg-popover text-popover-foreground">
                    {(() => {
                      const checkpoint = CHECKPOINTS.find(
                        (cp) => cp.id === selectedCheckpoint
                      );
                      if (!checkpoint) return null;
                      return (
                        <>
                          <div className="mb-3">
                            <h3 className="font-medium text-lg text-foreground">
                              {checkpoint.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={
                                  checkpoint.status === "active"
                                    ? "outline"
                                    : "secondary"
                                }
                                className={
                                  checkpoint.status === "active"
                                    ? "bg-green-500/10 text-green-500 dark:text-green-400 hover:bg-green-500/20"
                                    : ""
                                }
                              >
                                {checkpoint.status === "active" ? (
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                ) : (
                                  <span className="mr-1 h-2 w-2 rounded-full bg-gray-400" />
                                )}
                                {checkpoint.status === "active"
                                  ? "Active"
                                  : "Inactive"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Updated{" "}
                                {formatLastUpdated(checkpoint.lastUpdated)}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>Location</span>
                              </div>
                              <span className="font-mono text-xs text-foreground">
                                {checkpoint.location.lat.toFixed(3)},{" "}
                                {checkpoint.location.lng.toFixed(3)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                              <span className="text-muted-foreground">
                                Coverage Radius
                              </span>
                              <span className="font-medium text-foreground">
                                {(checkpoint.coverage / 1000).toFixed(1)} km
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                              <span className="text-muted-foreground">
                                Vehicles Today
                              </span>
                              <span className="font-medium text-foreground">
                                {checkpoint.vehicles}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Status
                              </span>
                              {checkpoint.alerts > 0 ? (
                                <span className="flex items-center text-red-500 dark:text-red-400">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {checkpoint.alerts} active alerts
                                </span>
                              ) : (
                                <span className="text-green-500 dark:text-green-400">
                                  No alerts
                                </span>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
