
import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Clock, Languages, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Card,
  CardContent
} from "@/components/ui/card";

const History = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      sourceText: "irrigation system",
      translatedText: "mfumo wa kumwagiza",
      sourceLang: "English",
      targetLang: "Giriama",
      date: "2024-04-07 10:23",
      fromDashboard: true
    },
    {
      id: 2,
      sourceText: "crop rotation",
      translatedText: "kugaluza mimea",
      sourceLang: "English",
      targetLang: "Giriama",
      date: "2024-04-06 15:45",
      fromDashboard: true
    }
  ]);

  const handleDeleteAll = () => {
    setHistoryItems([]);
    toast.success("Translation history cleared successfully");
  };

  const handleDeleteItem = (id: number) => {
    setHistoryItems(items => items.filter(item => item.id !== id));
    toast.success("Translation removed from history");
  };

  const handleStartTranslating = () => {
    navigate("/dashboard");
  };

  const dashboardTranslations = historyItems.filter(item => item.fromDashboard);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="container mx-auto p-4 md:p-6 h-full flex flex-col max-w-5xl">
          {/* Header: Consistent Alignment and Button Placement */}
          <div className={`flex items-center justify-between mb-6 ${isMobile ? "mt-16" : "mt-10"}`}>
            <h1 className="text-2xl font-bold">
              Translation History
            </h1>
            {dashboardTranslations.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Translation History</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete all translation history? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAll}>
                      Delete All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <div className="grid gap-4">
            {dashboardTranslations.map((item) => (
              <Card key={item.id} className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className="bg-lingua-100 dark:bg-lingua-900/30 p-2 rounded-full mr-3">
                        <Languages className="h-5 w-5 text-lingua-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {item.sourceLang} → {item.targetLang}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    {/* Only show the delete (trash) icon */}
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDeleteItem(item.id)}
                        aria-label="Delete translation from history"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Original:</p>
                      <p>{item.sourceText}</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Translation:</p>
                      <p>{item.translatedText}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {dashboardTranslations.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No translation history yet</h2>
              <p className="text-muted-foreground mb-4">
                Your translation history will appear here once you start translating.
              </p>
              <Button onClick={handleStartTranslating}>Start Translating</Button>
            </div>
          )}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default History;
