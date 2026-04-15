"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"

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
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      form.setError("root", { message: "Something went wrong. Please try again." })
      return
    }

    setSubmitted(true)
  }

  return (
    <Reveal className="rounded-2xl border border-primary/5 bg-[#F9F9F9] px-5 py-8">
      {submitted ? (
        <div className="space-y-6">
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-primary/40">
              Thank You
            </p>
            <h2 className="mt-4 font-heading text-[1.8rem] font-medium leading-[1.04] tracking-[0.01em] text-primary md:text-[2.2rem]">
              Your message has been received.
            </h2>
          </div>
          <p className="max-w-xl font-sans text-[15px] leading-relaxed text-primary/70">
            Our reception team will get back to you shortly with the next
            available response. We look forward to hosting you soon.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-10 space-y-4">
            <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-primary/40">
              Contact Reception
            </p>
            <h2 className="font-heading text-[1.2rem] md:text-[1.7rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">
              Ask about stays, events, or private arrangements
            </h2>
            <p className="max-w-xl font-sans text-[15px] leading-relaxed text-primary/60">
              Send us a message and our team will follow up with availability,
              rates, or any other information you need.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading text-[10px] uppercase tracking-[0.18em] text-primary/50">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="h-12 border-primary/10 bg-white focus:border-primary/30 transition-all rounded-xl"
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
                      <FormLabel className="font-heading text-[10px] uppercase tracking-[0.18em] text-primary/50">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="h-12 border-primary/10 bg-white focus:border-primary/30 transition-all rounded-xl"
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
                    <FormLabel className="font-heading text-[10px] uppercase tracking-[0.18em] text-primary/50">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+231 77 000 0000"
                        className="h-12 border-primary/10 bg-white focus:border-primary/30 transition-all rounded-xl"
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
                    <FormLabel className="font-heading text-[10px] uppercase tracking-[0.18em] text-primary/50">
                      How can we help?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about your plans..."
                        className="min-h-[160px] border-primary/10 bg-white focus:border-primary/30 transition-all rounded-xl p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error message */}
              {form.formState.errors.root && (
                <p className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 font-sans text-[13px] text-red-600">
                  {form.formState.errors.root.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-14 w-full rounded-xl bg-[#1A1A2E] font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:bg-black hover:translate-y-[-2px] active:translate-y-0 shadow-sm"
              >
                {form.formState.isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </Reveal>
  )
}
