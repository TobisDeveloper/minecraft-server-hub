import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServersPage from "./pages/ServersPage";
import ServerDetailPage from "./pages/ServerDetailPage";
import TopListsPage from "./pages/TopListsPage";
import DashboardPage from "./pages/DashboardPage";
import AdvertisePage from "./pages/AdvertisePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servers" element={<ServersPage />} />
          <Route path="/server/:id" element={<ServerDetailPage />} />
          <Route path="/top" element={<TopListsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-servers" element={<DashboardPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
