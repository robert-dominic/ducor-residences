"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Reveal from "@/components/shared/Reveal"

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(8, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  async function onSubmit(values: ContactValues) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    console.log("Contact Payload:", values)
    setSubmitted(true)
  }

  return (
    <Reveal className="border border-border bg-surface p-8 sm:p-12">
      {submitted ? (
        <div className="space-y-4">
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-muted">
            Thank You
          </p>
          <h2 className="font-heading text-3xl font-semibold text-primary">
            Your message has been received.
          </h2>
          <p className="max-w-xl font-sans text-sm leading-7 text-muted">
            Our reception team will get back to you shortly with the next
            available response.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 space-y-3">
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-muted">
              Contact Reception
            </p>
            <h2 className="font-heading text-3xl font-semibold text-primary">
              Ask about stays, events, or private arrangements
            </h2>
            <p className="max-w-xl font-sans text-sm leading-7 text-muted">
              Send us a message and our team will follow up with availability,
              rates, or any other information you need.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="h-12 border-border bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="h-12 border-border bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+231 77 000 0000"
                        className="h-12 border-border bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us how we can help."
                        className="min-h-[180px] border-border bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-14 w-full bg-accent font-sans text-sm font-semibold tracking-wide text-primary hover:bg-secondary hover:text-white"
              >
                {form.formState.isSubmitting ? "Sending Message" : "Send Message"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </Reveal>
  )
}
