"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationGuard } from "@/components/ui/navigation-guard";
import { Progress } from "@/components/ui/progress";

const universes = [
  {
    id: "marvel",
    title: "Marvel Universe",
    description: "Enter the world of superheroes, villains, and cosmic adventures across the multiverse.",
    color: "from-red-500 to-blue-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-400/30",
    icon: "🦸",
    themes: ["Superheroes", "Cosmic Adventures", "Multiverse", "Epic Battles"],
    backgroundImage: "linear-gradient(135deg, #dc2626 0%, #2563eb 100%)",
    popularity: 95,
    complexity: 70
  },
  {
    id: "dc",
    title: "DC Universe",
    description: "Explore the dark and gritty world of Gotham, Metropolis, and beyond with legendary heroes.",
    color: "from-gray-600 to-blue-700",
    bgColor: "bg-gray-600/10",
    borderColor: "border-gray-400/30",
    icon: "🦇",
    themes: ["Dark Heroes", "Gothic Cities", "Justice League", "Iconic Villains"],
    backgroundImage: "linear-gradient(135deg, #4b5563 0%, #1d4ed8 100%)",
    popularity: 90,
    complexity: 75
  },
  {
    id: "star-wars",
    title: "Star Wars",
    description: "Journey to a galaxy far, far away where the Force guides your destiny.",
    color: "from-amber-500 to-gray-900",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-400/30",
    icon: "⚔️",
    themes: ["Jedi vs Sith", "Space Opera", "Rebellion", "The Force"],
    backgroundImage: "linear-gradient(135deg, #f59e0b 0%, #111827 100%)",
    popularity: 98,
    complexity: 65
  },
  {
    id: "harry-potter",
    title: "Harry Potter",
    description: "Discover the magic of Hogwarts and the wizarding world in this enchanting universe.",
    color: "from-red-600 to-amber-500",
    bgColor: "bg-red-600/10",
    borderColor: "border-red-400/30",
    icon: "⚡",
    themes: ["Wizardry", "Hogwarts", "Magical Creatures", "Dark Arts"],
    backgroundImage: "linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)",
    popularity: 92,
    complexity: 60
  },
  {
    id: "lord-of-the-rings",
    title: "Lord of the Rings",
    description: "Embark on an epic quest through Middle-earth in this timeless fantasy adventure.",
    color: "from-green-600 to-amber-500",
    bgColor: "bg-green-600/10",
    borderColor: "border-green-400/30",
    icon: "🗡️",
    themes: ["Epic Quest", "Middle-earth", "Fellowship", "Ancient Evil"],
    backgroundImage: "linear-gradient(135deg, #16a34a 0%, #f59e0b 100%)",
    popularity: 88,
    complexity: 80
  },
  {
    id: "game-of-thrones",
    title: "Game of Thrones",
    description: "Navigate the treacherous politics of Westeros where winter is coming.",
    color: "from-gray-800 to-red-700",
    bgColor: "bg-gray-800/10",
    borderColor: "border-gray-400/30",
    icon: "👑",
    themes: ["Political Intrigue", "Dragons", "Winter is Coming", "Iron Throne"],
    backgroundImage: "linear-gradient(135deg, #1f2937 0%, #b91c1c 100%)",
    popularity: 85,
    complexity: 90
  }
];

export default function UniversePage() {
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedDifficulty = localStorage.getItem("rpg-difficulty");
    if (savedDifficulty) {
      setDifficulty(savedDifficulty);
    }
  }, []);

  const handleUniverseSelect = (universe: string) => {
    setSelectedUniverse(universe);
  };

  const handleContinue = async () => {
    if (selectedUniverse) {
      setIsNavigating(true);
      localStorage.setItem("rpg-universe", selectedUniverse);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push("/character");
    }
  };

  const handleBack = async () => {
    setIsNavigating(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    router.push("/");
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "from-emerald-400 to-green-600";
      case "medium": return "from-amber-400 to-orange-600";
      case "hard": return "from-rose-400 to-red-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  const getDifficultyIcon = (diff: string) => {
    switch (diff) {
      case "easy": return "🌟";
      case "medium": return "⚖️";
      case "hard": return "🔥";
      default: return "⚪";
    }
  };

  return (
    <NavigationGuard requiredData={{ difficulty: true }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-purple-900/20 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
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
        <div className="relative z-10 w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <Button
                onClick={handleBack}
                disabled={isNavigating}
                variant="ghost"
                className="group text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-full px-6 py-3"
              >
                <motion.span
                  animate={{ x: [-2, 0] }}
                  transition={{ duration: 0.3 }}
                  className="mr-2"
                >
                  ←
                </motion.span>
                Back to Difficulty
              </Button>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Choose Your
              <motion.span 
                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {" "}Universe
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-gray-300">Difficulty:</span>
                <Badge className={`bg-gradient-to-r ${getDifficultyColor(difficulty || "")} text-white border-0`}>
                  {getDifficultyIcon(difficulty || "")} {difficulty?.toUpperCase()}
                </Badge>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Select the universe where your epic adventure will unfold. Each world offers unique stories, characters, and challenges that will shape your journey.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {universes.map((universe, index) => (
              <motion.div
                key={universe.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2 + index * 0.1,
                  ease: "easeOut"
                }}
                className="h-full"
                onHoverStart={() => setHoveredCard(universe.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-500 transform-gpu overflow-hidden ${
                    selectedUniverse === universe.id
                      ? `ring-4 ring-purple-500/50 ${universe.bgColor} border-purple-400/50 shadow-2xl shadow-purple-500/25 scale-105`
                      : hoveredCard === universe.id
                      ? `${universe.bgColor} border-white/20 shadow-xl shadow-purple-500/10 scale-102`
                      : "bg-slate-800/30 backdrop-blur-sm border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                  onClick={() => handleUniverseSelect(universe.id)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background overlay */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: universe.backgroundImage,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  <CardHeader className="relative z-10 text-center space-y-4">
                    <motion.div 
                      className="text-7xl mb-2"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {universe.icon}
                    </motion.div>
                    
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold text-white">
                        {universe.title}
                      </CardTitle>
                      <CardDescription className="text-gray-200 text-sm leading-relaxed">
                        {universe.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Popularity</span>
                          <span className="text-white font-medium">{universe.popularity}%</span>
                        </div>
                        <Progress 
                          value={universe.popularity} 
                          className="h-1.5 bg-slate-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Complexity</span>
                          <span className="text-white font-medium">{universe.complexity}%</span>
                        </div>
                        <Progress 
                          value={universe.complexity} 
                          className="h-1.5 bg-slate-700"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        Themes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {universe.themes.map((theme, themeIndex) => (
                          <motion.div
                            key={themeIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + themeIndex * 0.1 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className={`text-xs bg-white/10 text-white border-white/20 hover:bg-white/20 ${
                                selectedUniverse === universe.id ? "bg-purple-500/30 border-purple-400/50" : ""
                              }`}
                            >
                              {theme}
                            </Badge>
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
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center"
          >
            <AnimatePresence>
              <motion.div
                key={selectedUniverse || "no-selection"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={handleContinue}
                  disabled={!selectedUniverse || isNavigating}
                  className={`group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl disabled:shadow-none ${
                    selectedUniverse ? "scale-100" : "scale-95"
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
                          scale: selectedUniverse ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: selectedUniverse ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      >
                        🌌
                      </motion.span>
                    )}
                    <span className="font-semibold">
                      {selectedUniverse 
                        ? `Enter ${universes.find(u => u.id === selectedUniverse)?.title}` 
                        : "Select Universe to Continue"
                      }
                    </span>
                  </div>
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </NavigationGuard>
  );
}