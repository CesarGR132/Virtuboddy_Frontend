import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Copy, Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  to: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  cc: z.string().email("Invalid CC email address").optional(),
  bcc: z.string().email("Invalid BCC email address").optional(),
  attachments: z.any().optional(),
});

const Email = () => {
  const { toast } = useToast();
  const { isRecording, transcription, startRecording, stopRecording, isBrowserSupported } = useSpeechRecognition();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      subject: "",
      message: "",
      cc: "",
      bcc: "",
    },
  });

  const handleCopyMessage = () => {
    const message = form.getValues("message");
    navigator.clipboard.writeText(message);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  const handleVoiceToText = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const onSubmit = async () => {
    const emailValues = form.getValues();
    const recipients = emailValues.to + (emailValues.cc ? `, ${emailValues.cc}` : "") + (emailValues.bcc ? `, ${emailValues.bcc}` : "");
    
    console.log("Sending email:", {
      text: emailValues.message,
      recipient: recipients,
      subject: emailValues.subject,
    });

    const emailRequest = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: emailValues.message,
        recipient: recipients,
        subject: emailValues.subject,
      }),
    });

    toast({
      title: emailRequest.ok ? "Success" : "Error",
      description: emailRequest.ok ? "Email sent successfully" : "Failed to send email",
      variant: emailRequest.ok ? "default" : "destructive",
    });
  };

  // Update message when transcription changes
  React.useEffect(() => {
    if (transcription) {
      form.setValue("message", form.getValues("message") + " " + transcription);
    }
  }, [transcription, form]);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Card className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold tracking-tight mb-6">Compose Email</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <Input placeholder="recipient@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Email subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CC</FormLabel>
                        <FormControl>
                          <Input placeholder="cc@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bcc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BCC</FormLabel>
                        <FormControl>
                          <Input placeholder="bcc@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea 
                            placeholder="Type your message here" 
                            className="min-h-[200px] pr-24" 
                            {...field} 
                          />
                        </FormControl>
                        <div className="absolute right-2 bottom-2 flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleCopyMessage}
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {isBrowserSupported && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={handleVoiceToText}
                              className={`h-8 w-8 ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
                            >
                              {isRecording ? (
                                <MicOff className="h-4 w-4" />
                              ) : (
                                <Mic className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attachments"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Attachments</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          onChange={(e) => onChange(e.target.files)}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Send Email
                </Button>
              </form>
            </Form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Email;