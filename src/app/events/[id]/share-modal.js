import {
  X,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  Copy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Share Event</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
          >
            <Facebook className="h-5 w-5 text-blue-600" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
          >
            <Twitter className="h-5 w-5 text-blue-400" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
          >
            <Linkedin className="h-5 w-5 text-blue-700" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12"
          >
            <Share2 className="h-5 w-5 text-green-600" />
            WhatsApp
          </Button>
        </div>
        <div className="relative">
          <input
            type="text"
            value={window.location.href}
            readOnly
            className="w-full p-2 pr-10 rounded-md border border-input bg-background text-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={handleCopyLink}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
