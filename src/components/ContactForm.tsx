"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Honeypot check
    if (data.botField) {
      setStatus("success");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 text-green-900 p-8 rounded-lg border border-green-200 text-center">
        <h3 className="text-xl font-display font-semibold mb-2">Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot field - hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botField">Do not fill this out if you are human</label>
        <input type="text" id="botField" name="botField" tabIndex={-1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
          <Input id="name" name="name" required placeholder="John Doe" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
          <Input id="email" name="email" type="email" required placeholder="john@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
          <Input id="phone" name="phone" type="tel" placeholder="+234 800 000 0000" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
          <Input id="subject" name="subject" required placeholder="Inquiry about property" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
        <Textarea id="message" name="message" required placeholder="How can we help you?" />
      </div>

      {status === "error" && (
        <div className="text-red-600 bg-red-50 p-4 rounded-md text-sm border border-red-200">
          {errorMessage}
        </div>
      )}

      <Button type="submit" size="lg" isLoading={status === "loading"} className="w-full sm:w-auto self-start">
        Send Message
      </Button>
    </form>
  );
}
