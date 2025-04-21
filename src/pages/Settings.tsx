import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Toaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const isMobile = useIsMobile();

  const [autoTranslate, setAutoTranslate] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [defaultSourceLang, setDefaultSourceLang] = useState("en");
  const [defaultTargetLang, setDefaultTargetLang] = useState("gir");

  useEffect(() => {
    // Save auto-translate preference to localStorage
    localStorage.setItem('autoTranslate', String(autoTranslate));
  }, [autoTranslate]);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="container mx-auto p-4 md:p-6 max-w-5xl">
          <h1 className={`text-2xl font-bold mb-6 ${isMobile ? "mt-16" : ""}`}>Settings</h1>
          
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
                  Translation Preferences
                </CardTitle>
                <CardDescription>
                  Configure your translation behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
