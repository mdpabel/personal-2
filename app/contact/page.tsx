"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, CheckCircle, Sparkles } from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        {/* Dynamic Cursor Trail */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300 ease-out"
          style={{
            background: "radial-gradient(circle, #ff006e, #8338ec, #3a86ff)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Back Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/"
          className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Home</span>
        </Link>
      </div>

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold">Let's Create Something Amazing</span>
            </div>
            <h1 className="text-7xl lg:text-9xl font-black mb-6">
              LET'S
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                CONNECT
              </span>
            </h1>
            <p className="text-2xl text-white/70 max-w-3xl mx-auto">
              Ready to bring your vision to life? I'm here to turn your ideas into extraordinary digital experiences.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h2 className="text-4xl font-black mb-8">SEND MESSAGE</h2>

                  {isSubmitted ? (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">MESSAGE SENT!</h3>
                      <p className="text-white/70 text-lg">
                        Thanks for reaching out! I'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="firstName" className="text-sm font-bold uppercase tracking-wider">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 py-4 backdrop-blur-xl focus:bg-white/20 focus:border-purple-400"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="lastName" className="text-sm font-bold uppercase tracking-wider">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 py-4 backdrop-blur-xl focus:bg-white/20 focus:border-purple-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 py-4 backdrop-blur-xl focus:bg-white/20 focus:border-purple-400"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-sm font-bold uppercase tracking-wider">Project Type</Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-2xl px-6 py-4 backdrop-blur-xl">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/20 backdrop-blur-xl">
                              <SelectItem value="web-development">Web Development</SelectItem>
                              <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-bold uppercase tracking-wider">Budget Range</Label>
                          <Select>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-2xl px-6 py-4 backdrop-blur-xl">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/20 backdrop-blur-xl">
                              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                              <SelectItem value="50k+">$50,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-sm font-bold uppercase tracking-wider">
                          Project Details
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                          rows={6}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 py-4 backdrop-blur-xl focus:bg-white/20 focus:border-purple-400"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 font-bold py-6 rounded-2xl text-lg relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <Send className="w-5 h-5 mr-3" />
                          SEND MESSAGE
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-8">GET IN TOUCH</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="w-6 h-6" />,
                      label: "Email",
                      value: "john@example.com",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      icon: <Phone className="w-6 h-6" />,
                      label: "Phone",
                      value: "+1 (555) 123-4567",
                      color: "from-cyan-500 to-blue-500",
                    },
                    {
                      icon: <MapPin className="w-6 h-6" />,
                      label: "Location",
                      value: "San Francisco, CA",
                      color: "from-yellow-500 to-orange-500",
                    },
                    {
                      icon: <Clock className="w-6 h-6" />,
                      label: "Response Time",
                      value: "Within 24 hours",
                      color: "from-green-500 to-emerald-500",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-white/70">{item.label}</p>
                        <p className="text-lg font-semibold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-bold uppercase tracking-wider text-sm">Available Now</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">READY TO START</h3>
                <p className="text-white/70 mb-6">
                  I'm currently accepting new projects and excited to discuss your vision.
                </p>
                <div className="space-y-3 text-sm">
                  {["Free consultation", "Detailed proposal", "Transparent pricing", "Regular updates"].map(
                    (feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 text-center">
                <div className="text-4xl mb-2">☕</div>
                <p className="text-sm text-white/70">
                  Fun fact: I've consumed over 1,000 cups of coffee while coding this year!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
