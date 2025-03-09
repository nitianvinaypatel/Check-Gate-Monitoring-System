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
  Download,
  Search,
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

// Mock data for checkpoints
const CHECKPOINTS = [
  {
    id: 1,
    name: "Vairengte Check Gate",
    location: { lat: 24.5, lng: 92.8 },
    status: "active",
    vehicles: 128,
    alerts: 0,
    lastUpdated: "2024-03-20T10:30:00Z",
    coverage: 2000, // Coverage radius in meters
  },
  {
    id: 2,
    name: "Bairabi Check Gate",
    location: { lat: 24.4, lng: 92.6 },
    status: "active",
    vehicles: 87,
    alerts: 2,
    lastUpdated: "2024-03-20T10:28:00Z",
    coverage: 1500,
  },
  {
    id: 3,
    name: "Lengpui Airport Check Gate",
    location: { lat: 23.8, lng: 92.6 },
    status: "active",
    vehicles: 45,
    alerts: 0,
    lastUpdated: "2024-03-20T10:25:00Z",
    coverage: 3000,
  },
  {
    id: 4,
    name: "Kolasib Check Gate",
    location: { lat: 24.2, lng: 92.7 },
    status: "inactive",
    vehicles: 0,
    alerts: 0,
    lastUpdated: "2024-03-20T09:15:00Z",
    coverage: 1800,
  },
  {
    id: 5,
    name: "Champhai Check Gate",
    location: { lat: 23.5, lng: 93.3 },
    status: "active",
    vehicles: 62,
    alerts: 1,
    lastUpdated: "2024-03-20T10:29:00Z",
    coverage: 2500,
  },
];

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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCoverage, setShowCoverage] = useState(true);
  const mapRef = useRef<google.maps.Map | undefined>(undefined);

  const onMapLoad = useCallback((map: google.maps.Map | undefined) => {
    if (map) {
      mapRef.current = map;
    }
  }, []);

  const filteredCheckpoints = CHECKPOINTS.filter((checkpoint) => {
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

  const handleExport = () => {
    const data = filteredCheckpoints.map((cp) => ({
      name: cp.name,
      status: cp.status,
      vehicles: cp.vehicles,
      alerts: cp.alerts,
      location: `${cp.location.lat}, ${cp.location.lng}`,
      lastUpdated: new Date(cp.lastUpdated).toLocaleString(),
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `checkpoints-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Complete",
      description: "Checkpoint data has been exported to CSV",
      variant: "default",
    });
  };

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

  if (loadError) {
    return (
      <Card className="col-span-3">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Error loading Google Maps. Please check your API key and try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`col-span-3 ${isFullscreen ? "fixed inset-4 z-50" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold text-foreground">
            Checkpoint Map
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time monitoring of check gates across Mizoram
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
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
            <>
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

              {/* Legend */}
              <div className="absolute top-4 left-4 z-10 bg-card/95 dark:bg-card/95 p-3 rounded-lg shadow-lg border">
                <h3 className="text-sm font-medium mb-2 text-foreground">
                  Checkpoint Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>
                    <span className="text-xs text-muted-foreground">
                      Active & Normal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500"></span>
                    <span className="text-xs text-muted-foreground">
                      Active with Alerts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-gray-400"></span>
                    <span className="text-xs text-muted-foreground">
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Checkpoint list */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredCheckpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                selectedCheckpoint === checkpoint.id
                  ? "bg-muted border-primary"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedCheckpoint(checkpoint.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    checkpoint.status === "active"
                      ? checkpoint.alerts > 0
                        ? "bg-red-500"
                        : "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></div>
                <div>
                  <div className="font-medium text-sm text-foreground">
                    {checkpoint.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated {formatLastUpdated(checkpoint.lastUpdated)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {checkpoint.vehicles} vehicles
                </div>
                {checkpoint.alerts > 0 && (
                  <div className="text-xs text-red-500 dark:text-red-400">
                    {checkpoint.alerts} alerts
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
