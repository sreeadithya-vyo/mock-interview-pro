import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, Video, MicOff, WifiOff, AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  type?: "404" | "mic" | "recording" | "network";
}

export default function ErrorPage({ type = "404" }: ErrorPageProps) {
  const navigate = useNavigate();

  const errorConfig = {
    "404": { icon: AlertTriangle, title: "Page Not Found", description: "The page you're looking for doesn't exist.", action: "Go Home", href: "/" },
    mic: { icon: MicOff, title: "Microphone Access Denied", description: "Please allow microphone access in your browser settings to continue.", action: "Try Again", href: null },
    recording: { icon: Video, title: "Recording Failed", description: "There was an issue with the recording. Please check your device settings.", action: "Retry", href: null },
    network: { icon: WifiOff, title: "Connection Lost", description: "Your internet connection was interrupted. Please check your connection.", action: "Reconnect", href: null },
  };

  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-8">
          <Icon className="w-12 h-12 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">{config.title}</h1>
        <p className="text-muted-foreground mb-8">{config.description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {config.href ? (
            <Button variant="hero" asChild><Link to={config.href}><Home className="w-4 h-4 mr-2" />{config.action}</Link></Button>
          ) : (
            <Button variant="hero" onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4 mr-2" />{config.action}</Button>
          )}
          <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}
