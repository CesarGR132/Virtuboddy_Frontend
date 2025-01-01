import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";

const Summarize = () => {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">Summarize</h1>
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            
            <Card className="relative backdrop-blur-sm bg-background/95">
              <CardContent className="p-6">
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[600px] rounded-lg border"
                >
                    <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="font-medium">Input Text</h3>
                      <span className="text-sm text-muted-foreground">
                        Words: {wordCount}
                      </span>
                      <Button size="sm" className="gap-2">
                        <Wand2 className="h-4 w-4" />
                        Summarize
                      </Button>
                      </div>
                      <Textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter your text here..."
                      className="flex-1 p-4 resize-none rounded-none border-0 focus-visible:ring-0"
                      />
                    </div>
                    </ResizablePanel>
                  
                  <ResizableHandle withHandle />
                  
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="font-medium">Summary</h3>
                      </div>
                      <div className="flex-1 p-4 bg-muted/50">
                        <p className="text-muted-foreground">
                          {text ? text : "Your summary will appear here..."}
                        </p>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Summarize;