import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Summarize = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Summarize</h1>
          </div>
          <div className="grid gap-4">
            <p className="text-muted-foreground">Text summarization functionality coming soon...</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Summarize;