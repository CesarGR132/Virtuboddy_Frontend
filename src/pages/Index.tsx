import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to Dashboard</h1>
            <Button variant="default" size="sm">
              + Add new task
            </Button>
          </div>
          <p className="text-muted-foreground">
            Select an option from the sidebar to get started.
          </p>
        </main>
      </div>
    </div>
  );
}

export default Index;