
import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Toaster } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Bell, Moon, Sun, User, Lock, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [defaultSourceLang, setDefaultSourceLang] = useState("en");
  const [defaultTargetLang, setDefaultTargetLang] = useState("gir");
  const isMobile = useIsMobile();

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="container mx-auto p-4 md:p-6 max-w-5xl">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="grid gap-6">
            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how Lingua Connect looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="theme-toggle">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch 
                        id="theme-toggle" 
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language Preferences
                </CardTitle>
                <CardDescription>
                  Configure your default translation languages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source-language">Default Source Language</Label>
                    <Select value={defaultSourceLang} onValueChange={setDefaultSourceLang}>
                      <SelectTrigger id="source-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="gir">Giriama</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target-language">Default Target Language</Label>
                    <Select value={defaultTargetLang} onValueChange={setDefaultTargetLang}>
                      <SelectTrigger id="target-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gir">Giriama</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-translate">Auto-Translate</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically translate as you type
                    </p>
                  </div>
                  <Switch 
                    id="auto-translate" 
                    checked={autoTranslate}
                    onCheckedChange={setAutoTranslate}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Privacy
                </CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="save-history">Save Translation History</Label>
                    <p className="text-sm text-muted-foreground">
                      Keep a record of your translations
                    </p>
                  </div>
                  <Switch 
                    id="save-history" 
                    checked={saveHistory}
                    onCheckedChange={setSaveHistory}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Allow Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about translations
                    </p>
                  </div>
                  <Switch 
                    id="notifications" 
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Account Settings (placeholder for future) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Account settings will be available in future updates
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full md:w-auto" onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Settings;
