import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Calendar = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          </div>
          <div className="grid gap-4">
            {/* Calendar content will go here */}
            <p className="text-muted-foreground">Calendar functionality coming soon...</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Calendar;