"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, Twitter, Linkedin, Mail, Send, Code, Palette, BookOpen, ArrowUpRight, Play, Pause } from "lucide-react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPlaying, setIsPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{
              background: `radial-gradient(circle, ${
                ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5", "#ffbe0b", "#fb5607"][i]
              }40, transparent)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${mousePosition.y * 0.01 * (i + 1)}px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
        ))}
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Orbital Navigation */}
      <div className="fixed top-8 right-8 z-50">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border border-white/20 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-2 border border-cyan-400/40 rounded-full animate-spin-reverse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
              <span className="text-xs font-bold">JD</span>
            </div>
          </div>
          {/* Orbital Menu Items */}
          {[
            { icon: <Code className="w-4 h-4" />, angle: 0, color: "bg-purple-500" },
            { icon: <Palette className="w-4 h-4" />, angle: 90, color: "bg-cyan-500" },
            { icon: <Mail className="w-4 h-4" />, angle: 180, color: "bg-pink-500" },
            { icon: <ThemeToggle />, angle: 270, color: "bg-yellow-500" },
          ].map((item, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-xl cursor-pointer hover:scale-110 transition-transform"
              style={{
                background: "rgba(255,255,255,0.1)",
                transform: `rotate(${item.angle}deg) translateY(-48px) rotate(-${item.angle}deg)`,
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero - Experimental Layout */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="container mx-auto px-6">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 grid-rows-8 gap-4 h-screen max-w-7xl mx-auto">
              {/* Main Title - Spans multiple cells */}
              <div className="col-span-8 row-span-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-mono">AVAILABLE FOR WORK</span>
                  </div>
                  <h1 className="text-6xl lg:text-8xl font-black leading-none mb-4">
                    <span className="block">JOHN</span>
                    <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      DOE
                    </span>
                  </h1>
                  <p className="text-xl text-white/70 max-w-md">
                    Digital craftsman pushing the boundaries of web experiences through code and creativity.
                  </p>
                </div>
              </div>

              {/* Profile Image - Liquid Shape */}
              <div className="col-span-4 row-span-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10"></div>
                <div className="relative">
                  <div
                    className="w-48 h-48 relative"
                    style={{
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      background: "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)",
                      padding: "4px",
                    }}
                  >
                    <div
                      className="w-full h-full bg-black flex items-center justify-center"
                      style={{
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      }}
                    >
                      <Image
                        src="/placeholder.svg?height=180&width=180"
                        alt="John Doe"
                        width={180}
                        height={180}
                        className="w-full h-full object-cover"
                        style={{
                          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="col-span-6 row-span-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Link href="/contact" className="relative z-10 flex items-center space-x-3">
                  <span className="text-2xl font-bold">LET'S WORK TOGETHER</span>
                  <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                </Link>
              </div>

              {/* Stats */}
              <div className="col-span-3 row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-center">
                <div className="text-4xl font-black text-cyan-400 mb-2">50+</div>
                <div className="text-sm text-white/70">Projects Completed</div>
              </div>

              <div className="col-span-3 row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-center">
                <div className="text-4xl font-black text-purple-400 mb-2">5+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>

              {/* Music Player */}
              <div className="col-span-4 row-span-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center space-x-4">
                <Button
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 border-0"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Coding Vibes</div>
                  <div className="text-xs text-white/70">Lo-fi Hip Hop</div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-2">
                    <div className="w-1/3 h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="col-span-8 row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                <div className="text-lg font-semibold">Connect With Me</div>
                <div className="flex space-x-4">
                  {[
                    { icon: <Github className="w-5 h-5" />, color: "hover:text-purple-400" },
                    { icon: <Twitter className="w-5 h-5" />, color: "hover:text-cyan-400" },
                    { icon: <Linkedin className="w-5 h-5" />, color: "hover:text-blue-400" },
                    { icon: <Mail className="w-5 h-5" />, color: "hover:text-pink-400" },
                  ].map((social, i) => (
                    <Link
                      key={i}
                      href="#"
                      className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors ${social.color}`}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work - Overlapping Cards */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-black mb-4">
                FEATURED
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">WORK</span>
              </h2>
            </div>

            {/* Overlapping Project Cards */}
            <div className="relative max-w-6xl mx-auto">
              {[
                {
                  title: "E-Commerce Revolution",
                  category: "Full-Stack Development",
                  image: "/placeholder.svg?height=400&width=600",
                  color: "from-purple-600 to-pink-600",
                  rotation: "-rotate-6",
                  zIndex: "z-30",
                },
                {
                  title: "AI Dashboard",
                  category: "Data Visualization",
                  image: "/placeholder.svg?height=400&width=600",
                  color: "from-cyan-600 to-blue-600",
                  rotation: "rotate-3",
                  zIndex: "z-20",
                },
                {
                  title: "Brand Identity",
                  category: "Visual Design",
                  image: "/placeholder.svg?height=400&width=600",
                  color: "from-yellow-600 to-orange-600",
                  rotation: "-rotate-2",
                  zIndex: "z-10",
                },
              ].map((project, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 ${project.rotation} ${project.zIndex} group cursor-pointer`}
                  style={{ top: `${i * 40}px`, left: `${i * 60}px` }}
                >
                  <div className="w-96 h-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="relative h-full">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="text-sm text-white/70 mb-2">{project.category}</div>
                          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                          <div className={`w-full h-1 bg-gradient-to-r ${project.color} rounded-full`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services - Liquid Shapes */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-6xl font-black mb-8">
                  WHAT I
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    CREATE
                  </span>
                </h2>
                <p className="text-xl text-white/70 mb-12">
                  Transforming ideas into digital experiences that captivate, engage, and inspire action.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: <Code className="w-8 h-8" />,
                    title: "Web Development",
                    description: "Full-stack applications with cutting-edge technologies",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: <Palette className="w-8 h-8" />,
                    title: "UI/UX Design",
                    description: "Interfaces that users love and remember",
                    color: "from-cyan-500 to-blue-500",
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="group relative"
                    style={{
                      transform: `translateX(${i % 2 === 0 ? "0" : "40px"})`,
                    }}
                  >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:bg-white/10 transition-all duration-500">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-white/70">{service.description}</p>
                    </div>
                    {/* Floating accent */}
                    <div
                      className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${service.color} rounded-full opacity-60 group-hover:scale-150 transition-transform duration-500`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog - Magazine Layout */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-6xl font-black mb-20 text-center">
                LATEST
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  THOUGHTS
                </span>
              </h2>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Featured Article */}
                <div className="lg:col-span-2 group cursor-pointer">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="h-64 bg-gradient-to-br from-purple-600/50 to-cyan-600/50 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white/50" />
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Featured</Badge>
                        <span className="text-sm text-white/50">Dec 15, 2024</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                        The Future of Web Interfaces
                      </h3>
                      <p className="text-white/70 text-lg">
                        Exploring how AI and new technologies are reshaping the way we design and build digital
                        experiences.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Side Articles */}
                <div className="space-y-8">
                  {[
                    {
                      title: "Micro-interactions That Matter",
                      date: "Dec 10, 2024",
                      color: "from-cyan-500 to-blue-500",
                    },
                    {
                      title: "Building for Performance",
                      date: "Dec 5, 2024",
                      color: "from-pink-500 to-purple-500",
                    },
                  ].map((article, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group cursor-pointer hover:bg-white/10 transition-all duration-300"
                    >
                      <div className={`w-full h-2 bg-gradient-to-r ${article.color} rounded-full mb-4`}></div>
                      <div className="text-sm text-white/50 mb-2">{article.date}</div>
                      <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{article.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter - Experimental Form */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16">
                  <h2 className="text-5xl font-black mb-6">
                    STAY IN THE
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      LOOP
                    </span>
                  </h2>
                  <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                    Get exclusive insights on design, development, and the future of digital experiences.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input
                      placeholder="your@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 py-4 backdrop-blur-xl"
                    />
                    <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-2xl px-8 py-4 font-semibold">
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="py-20 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-black">J</span>
              </div>
              <p className="text-white/50">© 2024 John Doe. Crafted with passion and pixels.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
