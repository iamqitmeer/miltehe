"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Globe, Users, Sparkles, Target, Heart } from "lucide-react"
import Link from "next/link"

const MotionLink = motion(Link)

export default function About() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const [currentValue, setCurrentValue] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(prev => (prev + 1) % 1000)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://plus.unsplash.com/premium_photo-1661683653197-ca2d0aab80eb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Visionary leader with 15+ years in event tech"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1669475535925-a011d7c31d45?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
      bio: "AI and machine learning expert, driving innovation"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://plus.unsplash.com/premium_photo-1683140621573-233422bfc7f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Award-winning UX designer, crafting intuitive experiences"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1722322426803-101270837197?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Full-stack wizard, building robust and scalable solutions"
    }
  ]

  const milestones = [
    {
      year: 2018,
      event:
        "MilteHe founded with a vision to revolutionize event management"
    },
    {
      year: 2019,
      event:
        "Launch of core platform, featuring AI-driven scheduling and attendee matching"
    },
    {
      year: 2020,
      event:
        "Reached 1 million users milestone, expanding to virtual event solutions"
    },
    {
      year: 2021,
      event:
        "Introduction of advanced AI-powered features, including predictive analytics"
    },
    {
      year: 2022,
      event:
        "Global expansion to 50+ countries, localizing the platform for diverse markets"
    },
    {
      year: 2023,
      event:
        "Launch of mobile app, enabling on-the-go event management and networking"
    }
  ]

  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      description:
        "Pushing the boundaries of what's possible in event technology"
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Striving for the highest quality in every aspect of our platform"
    },
    {
      icon: Users,
      title: "Community",
      description: "Fostering meaningful connections and collaborations"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Infusing enthusiasm and dedication into everything we do"
    }
  ]

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-zinc-50">
      

      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <motion.div
            style={{ opacity, scale, y }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team collaboration"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-zinc-900/60 dark:bg-zinc-900/80" />
          </motion.div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Redefining Event Experiences
              </h1>
              <p className="mt-4 text-xl text-zinc-200 max-w-3xl mx-auto mb-8">
                At MilteHe, we're not just managing events; we're crafting
                unforgettable moments and fostering connections that last a
                lifetime.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">
                MilteHe was born from a simple yet powerful idea: to
                democratize world-class event management. We envisioned a future
                where every organizer, regardless of scale or resources, could
                create extraordinary experiences with the same sophistication as
                global enterprises.
              </p>
              <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">
                Our platform is more than just a tool; it's a catalyst for human
                connection. We're harnessing the power of cutting-edge
                technology to break down barriers, spark innovation, and bring
                people together in ways never before possible.
              </p>
              <div className="flex justify-center space-x-8">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {currentValue}K+
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Events Powered
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    50+
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Countries Served
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    24/7
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">Support</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-zinc-100 dark:bg-zinc-800">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Meet Our Visionary Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover object-center"
                      />
                    </motion.div>
                    <CardHeader>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Our Journey
            </motion.h2>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-1/4 text-right pr-4">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="w-3/4 border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 py-2">
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-zinc-100 dark:bg-zinc-800">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Our Core Values
            </motion.h2>
            <motion.div
              variants={staggerChildrenVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div key={value.title} variants={fadeInUpVariants}>
                  <Card className="h-full">
                    <CardHeader>
                      <value.icon className="h-12 w-12 text-zinc-700 dark:text-zinc-300 mb-4" />
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">
                At MilteHe, we're not just building a platform; we're
                shaping the future of human interaction. We're looking for
                passionate innovators, creative problem-solvers, and dedicated
                team players to join us on this exciting journey.
              </p>
              <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">
                If you're excited about leveraging cutting-edge technology to
                create meaningful experiences and connections, we want to hear
                from you. Together, we can redefine what's possible in the world
                of events.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors duration-300"
                >
                  Explore Opportunities
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
  )
}
