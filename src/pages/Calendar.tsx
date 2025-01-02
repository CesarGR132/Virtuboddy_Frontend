import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { useState } from "react";

interface Event {
  id: string;
  date: Date;
  title: string;
  description: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      date: new Date(2024, 3, 15),
      title: "Team Meeting",
      description: "Weekly team sync",
    },
    {
      id: "2",
      date: new Date(2024, 3, 20),
      title: "Project Deadline",
      description: "Final submission due",
    },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddEvent = () => {
    if (!date || !newEvent.title) {
      toast({
        title: "Error",
        description: "Please select a date and enter an event title",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      date: date,
      title: newEvent.title,
      description: newEvent.description,
    };

    setEvents([...events, event]);
    setNewEvent({ title: "", description: "" });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Event added successfully",
    });

    console.log("Added new event:", event);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    toast({
      title: "Success",
      description: "Event deleted successfully",
    });
    console.log("Deleted event:", id);
  };

  const getDayEvents = (day: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, description: e.target.value })
                      }
                      placeholder="Enter event description"
                    />
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            <Card className="p-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                modifiers={{
                  event: (date) => getDayEvents(date).length > 0,
                }}
                modifiersStyles={{
                  event: {
                    fontWeight: "bold",
                    backgroundColor: "hsl(var(--primary) / 0.2)",
                  },
                }}
              />
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">
                  {date
                    ? `Events for ${date.toLocaleDateString()}`
                    : "Select a date"}
                </h2>
              </div>
              <div className="space-y-4">
                {date &&
                  getDayEvents(date).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 group"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                {date && getDayEvents(date).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No events scheduled for this date
                  </p>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;