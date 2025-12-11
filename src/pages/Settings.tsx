import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Video, Mic, Monitor, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

export default function Settings() {
  const [videoResolution, setVideoResolution] = useState("1080p");
  const [audioQuality, setAudioQuality] = useState("high");
  const [selectedCamera, setSelectedCamera] = useState("default");
  const [selectedMicrophone, setSelectedMicrophone] = useState("default");
  const [audioLevel, setAudioLevel] = useState([75]);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your recording preferences have been updated.",
    });
  };

  const testMicrophone = () => {
    toast({
      title: "Testing microphone...",
      description: "Speak into your microphone to test the audio level.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Recording Settings</h1>
          <p className="text-muted-foreground">
            Configure your camera and microphone preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Video Settings */}
          <div className="p-6 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Video Settings</h2>
                <p className="text-sm text-muted-foreground">Configure video quality and device</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Video Resolution</Label>
                <Select value={videoResolution} onValueChange={setVideoResolution}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">720p (HD)</SelectItem>
                    <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Camera</Label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Camera</SelectItem>
                    <SelectItem value="facetime">FaceTime HD Camera</SelectItem>
                    <SelectItem value="logitech">Logitech C920</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Camera Preview */}
              <div className="aspect-video rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Camera preview</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="p-6 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Mic className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Audio Settings</h2>
                <p className="text-sm text-muted-foreground">Configure audio quality and device</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Audio Quality</Label>
                <Select value={audioQuality} onValueChange={setAudioQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (64 kbps)</SelectItem>
                    <SelectItem value="medium">Medium (128 kbps)</SelectItem>
                    <SelectItem value="high">High (256 kbps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Microphone</Label>
                <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Microphone</SelectItem>
                    <SelectItem value="builtin">Built-in Microphone</SelectItem>
                    <SelectItem value="airpods">AirPods Pro</SelectItem>
                    <SelectItem value="blue">Blue Yeti</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Input Volume</Label>
                  <span className="text-sm text-muted-foreground">{audioLevel[0]}%</span>
                </div>
                <Slider value={audioLevel} onValueChange={setAudioLevel} max={100} step={1} />
              </div>

              {/* Audio Level Indicator */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Audio Level</span>
                  <Button variant="outline" size="sm" onClick={testMicrophone}>
                    Test Microphone
                  </Button>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-success via-success to-warning rounded-full transition-all duration-100"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button variant="hero" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
