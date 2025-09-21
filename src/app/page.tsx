"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const difficultyLevels = [
  {
    id: "easy",
    title: "Easy",
    description: "Perfect for beginners. Experience the story with gentle challenges and helpful guidance.",
    color: "from-emerald-400 to-green-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-400/30",
    features: ["Auto-save enabled", "Hint system available", "Forgiving gameplay", "Unlimited retries"],
    icon: "🌟",
    progress: 25
  },
  {
    id: "medium",
    title: "Medium",
    description: "For experienced players. Balanced challenges that test your skills without being overwhelming.",
    color: "from-amber-400 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-400/30",
    features: ["Limited hints", "Strategic decisions", "Moderate challenges", "Consequence system"],
    icon: "⚖️",
    progress: 50
  },
  {
    id: "hard",
    title: "Hard",
    description: "For the brave. Face intense challenges with permanent consequences and no safety nets.",
    color: "from-rose-400 to-red-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-400/30",
    features: ["No hints", "Permanent consequences", "Expert-level challenges", "Ironman mode"],
    icon: "🔥",
    progress: 75
  }
];

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const router = useRouter();

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleContinue = async () => {
    if (selectedDifficulty) {
      setIsNavigating(true);
      localStorage.setItem("rpg-difficulty", selectedDifficulty);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push("/universe");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-purple-900/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <span className="text-3xl">🎮</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              RPG
            </span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Odyssey
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Embark on an epic journey through legendary universes. 
            <span className="block text-purple-300 font-medium mt-2">
              Your adventure begins with a single choice.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Choose your difficulty to begin</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {difficultyLevels.map((difficulty, index) => (
            <motion.div
              key={difficulty.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.4 + index * 0.2,
                ease: "easeOut"
              }}
              className="h-full"
              onHoverStart={() => setHoveredCard(difficulty.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-500 transform-gpu ${
                  selectedDifficulty === difficulty.id
                    ? `ring-4 ring-purple-500/50 ${difficulty.bgColor} border-purple-400/50 shadow-2xl shadow-purple-500/25 scale-105`
                    : hoveredCard === difficulty.id
                    ? `${difficulty.bgColor} border-white/20 shadow-xl shadow-purple-500/10 scale-102`
                    : "bg-slate-800/30 backdrop-blur-sm border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
                }`}
                onClick={() => handleDifficultySelect(difficulty.id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardHeader className="text-center space-y-4">
                  <motion.div 
                    className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${difficulty.color} flex items-center justify-center text-4xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {difficulty.icon}
                  </motion.div>
                  
                  <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-white">
                      {difficulty.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {difficulty.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Challenge Level</span>
                      <span className="text-white font-medium">{difficulty.progress}%</span>
                    </div>
                    <Progress 
                      value={difficulty.progress} 
                      className="h-2 bg-slate-700"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                      Features
                    </h4>
                    <div className="space-y-2">
                      {difficulty.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2 + featureIndex * 0.1 }}
                        >
                          <motion.div 
                            className={`w-2 h-2 rounded-full ${
                              selectedDifficulty === difficulty.id 
                                ? "bg-purple-400" 
                                : "bg-gray-500"
                            }`}
                            animate={{ 
                              scale: selectedDifficulty === difficulty.id ? [1, 1.2, 1] : 1,
                              opacity: selectedDifficulty === difficulty.id ? 1 : 0.5
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: selectedDifficulty === difficulty.id ? Infinity : 0,
                              delay: featureIndex * 0.2 
                            }}
                          />
                          <span className={`text-sm ${
                            selectedDifficulty === difficulty.id 
                              ? "text-white" 
                              : "text-gray-400"
                          }`}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-center"
        >
          <AnimatePresence>
            <motion.div
              key={selectedDifficulty || "no-selection"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleContinue}
                disabled={!selectedDifficulty || isNavigating}
                className={`group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl disabled:shadow-none ${
                  selectedDifficulty ? "scale-100" : "scale-95"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  {isNavigating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <motion.span
                      animate={{ 
                        scale: selectedDifficulty ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: selectedDifficulty ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      🚀
                    </motion.span>
                  )}
                  <span className="font-semibold">
                    {selectedDifficulty 
                      ? `Begin ${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Adventure` 
                      : "Select Difficulty to Continue"
                    }
                  </span>
                </div>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}