import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome to Dashboard</h1>
          <p className="text-muted-foreground">
            Select an option from the sidebar to get started.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Index;