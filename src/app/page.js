// AUTH Krwani he Using GMAIL, OR Create Events Krwaani he. Cloudinary lagani he Or Events Show krwani he

"use client";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Globe,
  Users,
  Zap,
  Check,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Coordinator",
      company: "TechConf Inc.",
      testimonial:
        "MilteHe has transformed the way we manage our annual tech conference. The platform's intuitive interface and powerful features have saved us countless hours and significantly improved attendee satisfaction.",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Global Summit Group",
      testimonial:
        "The real-time analytics provided by MilteHe have been a game-changer for our marketing efforts. We can now make data-driven decisions on the fly, ensuring our events are always optimized for success.",
    },
    {
      name: "Emily Rodriguez",
      role: "CEO",
      company: "Startup Launchpad",
      testimonial:
        "As a startup founder, I appreciate how MilteHe scales with our needs. From intimate networking sessions to large-scale product launches, this platform has been instrumental in our growth journey.",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered scheduling to optimize your event timeline",
    },
    {
      icon: Users,
      title: "Attendee Engagement",
      description: "Interactive features to keep your audience captivated",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Seamlessly manage events across multiple time zones",
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Gain insights with powerful event performance metrics",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-zinc-50">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-zinc-900/60 dark:bg-zinc-900/80" />
          </motion.div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Revolutionize Your Event Management
              </h1>
              <p className="mt-4 text-xl text-zinc-200 max-w-3xl mx-auto mb-8">
                MilteHe empowers you to create, manage, and experience events
                like never before. Seamlessly connect with attendees, speakers,
                and sponsors in one intuitive platform.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
              >
                <Button
                  size="lg"
                  className="bg-zinc-50 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-300"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-zinc-50 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-300"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-zinc-900 dark:text-zinc-100">
              Unleash the Power of MilteHe
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                    <CardHeader className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 opacity-0  duration-300" />
                      <feature.icon className="h-12 w-12 text-zinc-700 dark:text-zinc-300 mb-4 relative z-10" />
                      <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100 relative z-10">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-zinc-100 dark:bg-zinc-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100">
                  Experience Events on the Go
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400">
                  With our mobile app, stay connected to your events anytime,
                  anywhere. Manage registrations, engage with attendees, and
                  access real-time updates at your fingertips.
                </p>
                <ul className="space-y-2">
                  {[
                    "Real-time notifications",
                    "Interactive event maps",
                    "Networking tools",
                    "Personal schedule builder",
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="text-green-500" />
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex gap-4 mt-6">
                  <Button
                    size="lg"
                    className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors duration-300"
                  >
                    Download App
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl"
              >
                <img
                  alt="MilteHe Mobile App"
                  className="object-cover object-center w-full h-full"
                  src="https://images.unsplash.com/photo-1714976326342-cf51796acad6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-zinc-900/0" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-zinc-900 dark:text-zinc-100">
              What Our Clients Say
            </h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 max-w-4xl mx-auto">
                    <CardHeader>
                      <div className="flex items-center justify-center gap-4">
                        <img
                          alt={testimonials[activeTestimonial].name}
                          className="rounded-full border-2 border-zinc-200 dark:border-zinc-700"
                          height="80"
                          src="https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width="80"
                        />
                        <div>
                          <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {testimonials[activeTestimonial].name}
                          </CardTitle>
                          <CardDescription className="text-lg text-zinc-600 dark:text-zinc-400">
                            {testimonials[activeTestimonial].role},{" "}
                            {testimonials[activeTestimonial].company}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-700 dark:text-zinc-300 text-xl italic">
                        "{testimonials[activeTestimonial].testimonial}"
                      </p>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-current" />
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center mt-6 gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-zinc-100 dark:bg-zinc-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-zinc-900 dark:text-zinc-100">
              Choose Your Perfect Plan
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$49",
                  description: "Perfect for small events and meetups",
                  features: [
                    "Up to 100 attendees",
                    "Basic analytics",
                    "Email support",
                    "Mobile app access",
                  ],
                },
                {
                  name: "Professional",
                  price: "$99",
                  description: "Ideal for medium-sized conferences",
                  features: [
                    "Up to 500 attendees",
                    "Advanced analytics",
                    "Priority support",
                    "Custom branding",
                    "Networking tools",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "For large-scale events and organizations",
                  features: [
                    "Unlimited attendees",
                    "Full-suite analytics",
                    "24/7 dedicated support",
                    "White-label solution",
                    "API access",
                  ],
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="flex flex-col h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-zinc-600 dark:text-zinc-400">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        {plan.price}
                        <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
                          /month
                        </span>
                      </p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="text-green-500" />
                            <span className="text-zinc-700 dark:text-zinc-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors duration-300">
                        Choose Plan
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                Ready to Transform Your Events?
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                Join the MilteHe community and take your event management to the
                next level.
              </p>
              <form className="space-y-4">
                <Input
                  className="bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600"
                  placeholder="Your Email"
                  type="email"
                />
                <Button
                  size="lg"
                  className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors duration-300"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Features
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Pricing
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Integrations
                  </MotionLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    About
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Blog
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Careers
                  </MotionLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Documentation
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Help Center
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    API Reference
                  </MotionLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Privacy Policy
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Terms of Service
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="#"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    whileHover={{ x: 5 }}
                  >
                    Cookie Policy
                  </MotionLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
              © 2024 MilteHe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
