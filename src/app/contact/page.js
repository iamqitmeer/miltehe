"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Globe, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();


  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
   

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-200 dark:to-zinc-400">
                Get in Touch
              </h1>
              <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">
                Have questions about MilteHe? Want to partner with us? Or
                just want to say hello? We'd love to hear from you!
              </p>
            </motion.div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUpVariants}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Reach out to us through any of these channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      <span>hello@MilteHe.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      <span>123 Event Street, San Francisco, CA 94122</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUpVariants}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      We'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message here..."
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Send className="mr-2 h-4 w-4" />
                          </motion.div>
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-zinc-100 dark:bg-zinc-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUpVariants}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">
                Let's Create Something Amazing Together
              </h2>
              <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">
                Whether you're planning a small meetup or a large-scale
                conference, MilteHe is here to turn your vision into
                reality. Reach out to us and let's start crafting unforgettable
                experiences.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors duration-300"
                >
                  Start Your Event Journey
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
              <span className="font-bold text-xl">MilteHe</span>
            </div>
            <nav className="flex space-x-4">
              <MotionLink
                href="/privacy"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </MotionLink>
              <MotionLink
                href="/terms"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </MotionLink>
              <MotionLink
                href="/contact"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                whileHover={{ y: -2 }}
              >
                Contact Us
              </MotionLink>
            </nav>
          </div>
          <div className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            © 2024 MilteHe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
