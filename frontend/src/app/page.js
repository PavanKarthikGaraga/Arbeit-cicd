'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link.js';
import Nav from './components/nav/nav.js';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  BarChart3,
  Building2,
  Users,
  Star,
  Target,
  TrendingUp,
  Lightbulb,
  Zap,
  Search,
  Check,
  AlertTriangle,
  Brain,
  Globe,
  User,
  Rocket,
  Bot,
  GraduationCap,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const particles = Array.from({ length: 30 }).map((_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 1,
  duration: Math.random() * 10 + 10,
}));

// Counter animation component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''));
      const incrementTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [value, duration, inView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Nav />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left Content */}
              <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-sm tracking-wide"
                >
                   The Future of Job Search is Here
                </motion.div>

                <motion.h1
                  className="text-7xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Find Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50 relative inline-block">
                    Dream
                  </span>
                  <br />
                  Career Today
                </motion.h1>

                <motion.p
                  className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Unlock your potential with AI-powered matching, resume optimization, and personalized mentorship.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link href="/Bauth">
                    <Button size="lg" className="w-full sm:w-auto px-10 py-6 text-xl rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                      Get Started as Recruiter
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-6 text-xl rounded-2xl border-2 hover:bg-secondary transition-all duration-300">
                      Join as Freelancer
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Hero Illustration */}
              <motion.div
                className="flex-1 relative"
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 1, type: "spring" }}
              >
                <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-[3rem] transform rotate-6 blur-2xl" />
                  <div className="absolute inset-0 bg-card/80 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/10 p-8">
                    <div className="relative h-full flex flex-col justify-between">
                      {/* Resume Preview Header */}
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/50 rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="h-5 bg-primary/10 rounded-full w-3/4"></div>
                          <div className="h-4 bg-primary/5 rounded-full w-1/2"></div>
                        </div>
                      </div>

                      {/* Content Lines */}
                      <div className="space-y-6 flex-1">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary">
                              {i === 0 ? <Building2 size={20} /> : i === 1 ? <Target size={20} /> : <GraduationCap size={20} />}
                            </div>
                            <div className="flex-1 h-3 bg-primary/10 rounded-full"></div>
                          </div>
                        ))}
                      </div>

                      {/* Skills Section */}
                      <div className="mt-8">
                        <div className="flex flex-wrap gap-3">
                          {["React", "Node.js", "AI/ML", "Design"].map((skill, i) => (
                            <span key={i} className="px-4 py-2 bg-background border border-primary/10 text-primary rounded-xl text-sm font-medium shadow-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 top-1/4 w-20 h-20 bg-background/90 backdrop-blur-md rounded-3xl shadow-2xl flex items-center justify-center border border-white/20"
                  >
                    <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-8 bottom-1/4 w-20 h-20 bg-background/90 backdrop-blur-md rounded-3xl shadow-2xl flex items-center justify-center border border-white/20"
                  >
                    <Check className="w-10 h-10 text-green-500" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-24 bg-background border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { number: "150,000", label: "Active Jobs", icon: BarChart3 },
              { number: "75,000", label: "Companies", icon: Building2 },
              { number: "2,000,000", label: "Job Seekers", icon: Users },
              { number: "95,000", label: "Success Stories", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-secondary/50 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-110">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-5xl font-black text-foreground mb-2 tracking-tighter">
                  <AnimatedCounter value={stat.number} />+
                </h3>
                <p className="text-muted-foreground text-lg font-medium tracking-wide uppercase text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Scanner Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter">
                AI-Powered
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mt-2">ATS Scanner</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed">
                Beat the bots with our advanced Applicant Tracking System scanner. Get instant, actionable feedback to optimize your resume for success.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  {
                    icon: Target,
                    title: "Keyword Analysis",
                    description: "Smart matching with job descriptions"
                  },
                  {
                    icon: TrendingUp,
                    title: "Score Tracking",
                    description: "Monitor your improvement over time"
                  },
                  {
                    icon: Lightbulb,
                    title: "Smart Suggestions",
                    description: "AI-driven optimization tips"
                  },
                  {
                    icon: Zap,
                    title: "Instant Results",
                    description: "Real-time feedback engine"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-lg transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/scanner">
                <Button size="lg" className="px-10 py-6 text-lg rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Scan Your Resume Free
                </Button>
              </Link>
            </motion.div>

            {/* Updated ATS Scanner Preview */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-[2.5rem] blur-2xl opacity-50" />
                <Card className="relative p-8 rounded-[2rem] border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl">
                  <CardContent className="p-0">
                    <div className="space-y-8">
                      {/* Scanner Header */}
                      <div className="flex items-center justify-between border-b border-border/50 pb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
                            <Search className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <div className="font-bold text-xl">ATS Analysis</div>
                            <div className="text-sm text-muted-foreground">Resume_Final_v2.pdf</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-4xl font-black text-primary">92</div>
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</div>
                        </div>
                      </div>

                      {/* Score Bars */}
                      <div className="space-y-6">
                        {[
                          { label: "Keywords Match", score: 95 },
                          { label: "Format Optimization", score: 88 },
                          { label: "Content Quality", score: 92 }
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">{item.label}</span>
                              <span className="font-bold text-primary">{item.score}%</span>
                            </div>
                            <div className="h-3 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.score}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Suggestions */}
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-2xl">
                          <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
                            <Check className="w-4 h-4" />
                            <span>Strong Points</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-green-500/10 rounded w-full"></div>
                            <div className="h-2 bg-green-500/10 rounded w-3/4"></div>
                          </div>
                        </div>
                        <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-2xl">
                          <div className="flex items-center gap-2 mb-2 text-yellow-600 font-bold">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Improvements</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-yellow-500/10 rounded w-full"></div>
                            <div className="h-2 bg-yellow-500/10 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Empowering your career journey with cutting-edge technology and human-centric design.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI-Powered Matching",
                description: "Smart algorithms that connect the right talent with the right opportunities",
                icon: Target,
                stats: "95% Match Rate"
              },
              {
                title: "Real-time Analytics",
                description: "Detailed insights and tracking for your job search progress",
                icon: BarChart3,
                stats: "24/7 Monitoring"
              },
              {
                title: "Smart Learning",
                description: "Personalized skill development recommendations",
                icon: Brain,
                stats: "500+ Courses"
              },
              {
                title: "Global Network",
                description: "Connect with professionals and companies worldwide",
                icon: Globe,
                stats: "150+ Countries"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-[2rem] bg-secondary/20 border border-border hover:border-primary/50 hover:bg-secondary/40 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute -top-4 right-8 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {feature.stats}
                  </div>
                  <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 border border-border">
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center leading-relaxed text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-muted/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Your Journey to Success
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A simple yet powerful process to advance your career
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Build your professional identity with our AI-powered profile builder",
                icon: User,
                color: "primary"
              },
              {
                step: "02",
                title: "Set Your Goals",
                description: "Define your career objectives and get a personalized roadmap",
                icon: Target,
                color: "primary"
              },
              {
                step: "03",
                title: "Connect & Grow",
                description: "Match with opportunities and mentors aligned with your goals",
                icon: Rocket,
                color: "primary"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="p-10 rounded-[2.5rem] bg-background border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative z-10">
                  <div className="absolute -top-6 left-10 bg-primary text-primary-foreground font-black px-5 py-3 rounded-2xl text-xl shadow-xl border-4 border-muted">
                    {step.step}
                  </div>
                  <div className="mb-8 mt-4 flex justify-center">
                    <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center border border-border">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 w-12 h-12 text-muted-foreground/20 transform translate-x-1/2 -translate-y-1/2 z-0">
                    <ArrowRight className="w-12 h-12" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Mentorship Section */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter">
                AI-Powered
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mt-2">Mentorship</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 font-light leading-relaxed">
                Get personalized career guidance and track your professional growth with our intelligent mentorship system.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  {
                    icon: Target,
                    title: "Smart Goal Setting",
                    description: "AI helps set achievable career milestones"
                  },
                  {
                    icon: Bot,
                    title: "AI Mentor Match",
                    description: "Connect with mentors based on your goals"
                  },
                  {
                    icon: TrendingUp,
                    title: "Progress Analytics",
                    description: "Track your growth with detailed insights"
                  },
                  {
                    icon: GraduationCap,
                    title: "Learning Paths",
                    description: "Customized skill development roadmaps"
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-secondary/20 border border-border hover:bg-secondary/40 transition-colors">
                    <div className="mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <Link href="/auth/UserAuth">
                <Button size="lg" className="px-10 py-6 text-lg rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>

            {/* Interactive Mentorship Dashboard Preview */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-l from-primary/20 to-primary/5 rounded-[2.5rem] blur-2xl opacity-50" />
                <Card className="relative p-8 rounded-[2rem] border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl">
                  <CardContent className="p-0">
                    <div className="space-y-8">
                      {/* Dashboard Header */}
                      <div className="flex items-center justify-between border-b border-border/50 pb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center border border-border">
                            <User className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <div className="font-bold text-lg">Your AI Mentor</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              Online Now
                            </div>
                          </div>
                        </div>
                        <div className="bg-primary/10 px-4 py-1.5 rounded-full text-primary text-sm font-bold">
                          Active Session
                        </div>
                      </div>

                      {/* Goal Progress */}
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-lg">Current Goals</h4>
                          <span className="text-primary text-sm font-medium bg-primary/5 px-3 py-1 rounded-full">3/5 Completed</span>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-secondary/30 p-5 rounded-2xl border border-border">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-bold">Learn React Advanced</span>
                              <span className="text-primary font-bold">85%</span>
                            </div>
                            <div className="h-2.5 bg-background rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                            </div>
                          </div>
                          <div className="bg-secondary/30 p-5 rounded-2xl border border-border">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-bold">System Design</span>
                              <span className="text-primary font-bold">60%</span>
                            </div>
                            <div className="h-2.5 bg-background rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-4 pt-2">
                        <Button className="flex-1 py-6 rounded-xl text-base font-bold shadow-lg shadow-primary/10">
                          Schedule Session
                        </Button>
                        <Button variant="outline" className="flex-1 py-6 rounded-xl text-base font-bold border-2">
                          View Roadmap
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2
              className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Success Stories
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hear from professionals who found their dream jobs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer at Google",
                image: "/testimonial1.jpg",
                quote: "The AI matching system helped me find the perfect role that matched my skills and aspirations."
              },
              {
                name: "Michael Chen",
                role: "Product Designer at Apple",
                image: "/testimonial2.jpg",
                quote: "The platform's design tools and resources were invaluable in showcasing my portfolio."
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Manager at Netflix",
                image: "/testimonial3.jpg",
                quote: "Found my dream job within weeks. The process was smooth and professional throughout."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="p-10 rounded-[2rem] bg-background border border-border hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <Avatar className="w-16 h-16 border-2 border-primary/10">
                      <AvatarFallback className="text-xl font-bold bg-secondary text-primary">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground text-lg leading-relaxed flex-1">"{testimonial.quote}"</blockquote>
                  <div className="mt-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h2
            className="text-5xl lg:text-7xl font-black text-primary-foreground mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            className="text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of professionals who have already found their dream careers with Arbeit.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/auth">
              <Button size="lg" variant="secondary" className="px-12 py-8 text-xl rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 font-bold">
                Get Started Now <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Guides</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Twitter</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">LinkedIn</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Facebook</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 Arbeit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}