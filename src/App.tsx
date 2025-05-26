import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CalendarPage from "./pages/CalendarPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import SimpliciaPage from "./pages/SimpliciaPage";
import ReziliaAIPage from "./pages/ReziliaAIPage";
import AdmiliaPage from "./pages/AdmiliaPage";
import ForumPage from "./pages/ForumPage";
import { CalendarProvider } from "./contexts/CalendarContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingChatButton from "./components/FloatingChatButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CalendarProvider>
          <BrowserRouter>
            <Routes>
              {/* Landing Page is now the default route */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/simplicia" 
                element={
                  <ProtectedRoute>
                    <SimpliciaPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rezilia-ai" 
                element={
                  <ProtectedRoute>
                    <ReziliaAIPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admilia" 
                element={
                  <ProtectedRoute>
                    <AdmiliaPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/forum" 
                element={
                  <ProtectedRoute>
                    <ForumPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calendar" 
                element={
                  <ProtectedRoute>
                    <CalendarPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Floating Chat Button - appears on all protected routes */}
            <FloatingChatButton />
          </BrowserRouter>
        </CalendarProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
