// app/(auth)/auth/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]:any = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // Dynamic mouse-following gradient orb (replaces 3D tilt, adds life)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    if (!email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password required";
    else if (password.length < 6) newErrors.password = "Min 6 characters";
    if (!isLogin && password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Dynamic animated background particles / orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-foreground/5 blur-[150px]"
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-foreground/5 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-foreground/5 blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Mouse-following glow orb – dynamic, not disorienting */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-foreground/10 blur-[80px]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        />
      </div>

      {/* Dot grid overlay */}
      <div className="dot-grid opacity-30 absolute inset-0 pointer-events-none" />

      {/* Main content – larger, more spacious */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16 flex flex-col lg:flex-row gap-12 items-center justify-center">
        {/* Left column – animated headline */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:flex-1 text-center lg:text-left space-y-8 max-w-lg"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-12 h-12 rounded-2xl glass border border-border-bright flex items-center justify-center">
              <Sparkles size={24} className="text-foreground" />
            </div>
            <span className="font-mono text-xl font-semibold tracking-tight">Prism</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1]">
            {isLogin ? (
              <>
                Welcome <br />
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">back</span>
              </>
            ) : (
              <>
                Create your <br />
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">account</span>
              </>
            )}
          </h1>
          <p className="text-text-dim text-base md:text-lg leading-relaxed">
            {isLogin
              ? "Access your dashboard, manage projects, and continue building amazing experiences."
              : "Start your journey with Prism – the premium glassmorphism template for modern SaaS products."}
          </p>
          <div className="flex flex-col gap-4">
            {["Lifetime updates", "Commercial license", "Priority support"].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-text-muted"
              >
                <div className="w-6 h-6 rounded-full glass border border-border flex items-center justify-center text-xs">✓</div>
                <span className="text-sm font-mono">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column – larger glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:flex-1 w-full max-w-md lg:max-w-lg"
        >
          <div className="glass rounded-3xl border border-border-bright p-8 md:p-10 shadow-2xl backdrop-blur-xl">
            {/* Mode switcher */}
            <div className="relative flex gap-1 p-1 glass rounded-xl mb-10">
              <button
                onClick={() => setIsLogin(true)}
                className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-mono transition-colors ${
                  isLogin ? "text-background" : "text-text-dim hover:text-foreground"
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-mono transition-colors ${
                  !isLogin ? "text-background" : "text-text-dim hover:text-foreground"
                }`}
              >
                Sign up
              </button>
              <motion.div
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-foreground"
                animate={{ left: isLogin ? "2px" : "calc(50% + 2px)" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div className="relative group">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-foreground transition" />
                      <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full py-3.5 pl-12 pr-4 rounded-xl glass border border-border focus:border-foreground/50 focus:outline-none transition text-base"
                      />
                    </div>
                  )}
                  <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-foreground transition" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full py-3.5 pl-12 pr-4 rounded-xl glass border ${
                        errors.email ? "border-red-500/50" : "border-border"
                      } focus:border-foreground/50 focus:outline-none transition text-base`}
                    />
                    {errors.email && <p className="text-red-500/80 text-[11px] mt-1 pl-4">{errors.email}</p>}
                  </div>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-foreground transition" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full py-3.5 pl-12 pr-12 rounded-xl glass border ${
                        errors.password ? "border-red-500/50" : "border-border"
                      } focus:border-foreground/50 focus:outline-none transition text-base`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && <p className="text-red-500/80 text-[11px] mt-1 pl-4">{errors.password}</p>}
                  </div>
                  {!isLogin && (
                    <div className="relative group">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-foreground transition" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full py-3.5 pl-12 pr-12 rounded-xl glass border ${
                          errors.confirmPassword ? "border-red-500/50" : "border-border"
                        } focus:border-foreground/50 focus:outline-none transition text-base`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {errors.confirmPassword && <p className="text-red-500/80 text-[11px] mt-1 pl-4">{errors.confirmPassword}</p>}
                    </div>
                  )}
                  {isLogin && (
                    <div className="text-right">
                      <button type="button" className="text-[11px] font-mono text-text-muted hover:text-foreground transition">
                        Forgot password?
                      </button>
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-3.5 rounded-xl bg-foreground text-background font-medium text-base overflow-hidden group mt-2"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      ) : submitted ? (
                        "✓ Success!"
                      ) : (
                        <>
                          {isLogin ? "Sign in" : "Create account"}
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </motion.button>
                </form>
              </motion.div>
            </AnimatePresence>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-background text-text-muted font-mono">or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-border text-sm text-text-dim hover:text-foreground transition hover:scale-105">
                <User size={16} /> GitHub
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-border text-sm text-text-dim hover:text-foreground transition hover:scale-105">
                <User size={16} /> Twitter
              </button>
            </div>
            <p className="text-center text-xs font-mono text-text-muted mt-8">
              {isLogin ? "No account yet? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-foreground hover:underline underline-offset-2 font-medium">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-bright to-transparent" />
    </div>
  );
}