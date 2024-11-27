"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const TextSpan = ({ children }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

const FloatingElement = ({ delay }) => {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-zinc-200 rounded-full"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        y: [-20, -40],
        x: Math.random() * 40 - 20,
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    />
  );
};

export default function EnhancedHeroSection() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  const titleWords = "Discover Your Next Adventure".split(" ");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-900 lg:py-20 py-12"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale,
          opacity,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1325&auto=format&fit=crop"
          alt="Modern architectural interior"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-12">
            <div className="mb-8 relative">
              {[...Array(10)].map((_, i) => (
                <FloatingElement key={i} delay={i * 0.2} />
              ))}
              <motion.div
                className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                <AnimatePresence>
                  {isVisible && (
                    <div className="overflow-hidden">
                      {titleWords.map((word, i) => (
                        <motion.span
                          key={i}
                          className="inline-block mr-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400"
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-12 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Experience extraordinary local events in stunning venues
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                className="group relative px-8 py-4 rounded-full overflow-hidden bg-zinc-100 text-zinc-900 text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-zinc-300"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Get Started</span>
              </motion.button>

              <motion.button
                className="group relative px-8 py-4 rounded-full overflow-hidden text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 border-2 border-zinc-100 rounded-full"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 text-zinc-100">
                  Explore Events
                </span>
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { title: "Unique Venues", desc: "Discover extraordinary spaces" },
              { title: "Local Events", desc: "Connect with your community" },
              { title: "Exclusive Access", desc: "Premium experiences await" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-zinc-800/50 backdrop-blur-sm rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          className="w-8 h-14 border-2 border-zinc-100 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-3 bg-zinc-100 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
