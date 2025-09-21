"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationGuard } from "@/components/ui/navigation-guard";
import { Progress } from "@/components/ui/progress";

interface Character {
  name: string;
  description: string;
  role: string;
  abilities: string[];
  personality: string[];
}

interface Storyline {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: string;
  difficulty: string;
  themes: string[];
  hook: string;
  intensity?: number;
  epicness?: number;
}

const universeStorylines: Record<string, Storyline[]> = {
  "marvel": [
    {
      id: "cosmic-threat",
      title: "The Cosmic Threat",
      description: "A powerful cosmic entity threatens to destroy the universe. Only you and your allies can stop it before it's too late.",
      genre: "Epic Adventure",
      duration: "Long",
      difficulty: "Hard",
      themes: ["Cosmic Horror", "Teamwork", "Sacrifice", "Destiny"],
      hook: "The stars themselves are screaming as an ancient evil awakens...",
      intensity: 95,
      epicness: 90
    },
    {
      id: "civil-war",
      title: "Civil War",
      description: "A devastating conflict divides the hero community. Choose your side and fight for what you believe is right.",
      genre: "Political Drama",
      duration: "Medium",
      difficulty: "Medium",
      themes: ["Morality", "Loyalty", "Conflict", "Consequences"],
      hook: "When heroes fight heroes, who will be left to save the world?",
      intensity: 75,
      epicness: 80
    },
    {
      id: "street-level",
      title: "Street Level Justice",
      description: "Take to the streets to fight crime and corruption in your city. Every decision affects the lives of ordinary people.",
      genre: "Crime Drama",
      duration: "Short",
      difficulty: "Easy",
      themes: ["Justice", "Community", "Redemption", "Hope"],
      hook: "In the shadows of the city, real heroes are born...",
      intensity: 60,
      epicness: 65
    }
  ],
  "dc": [
    {
      id: "gotham-war",
      title: "Gotham's Darkest Hour",
      description: "Gotham City faces its greatest threat as all villains unite. Can you restore order to the chaotic streets?",
      genre: "Dark Thriller",
      duration: "Long",
      difficulty: "Hard",
      themes: ["Darkness", "Justice", "Fear", "Redemption"],
      hook: "When the night is darkest, even shadows have shadows...",
      intensity: 90,
      epicness: 85
    },
    {
      id: "metropolis-crisis",
      title: "Metropolis in Peril",
      description: "A brilliant mastermind threatens the city of tomorrow. Use your wits and powers to save the day.",
      genre: "Action Adventure",
      duration: "Medium",
      difficulty: "Medium",
      themes: ["Hope", "Innovation", "Heroism", "Progress"],
      hook: "The city of tomorrow needs heroes today...",
      intensity: 70,
      epicness: 75
    },
    {
      id: "atlantis-rising",
      title: "Atlantis Rising",
      description: "The underwater kingdom emerges, threatening the surface world. Navigate ancient politics and prevent a global catastrophe.",
      genre: "Fantasy Adventure",
      duration: "Medium",
      difficulty: "Medium",
      themes: ["Ancient Powers", "Diplomacy", "War", "Legacy"],
      hook: "From the depths of the ocean, an ancient power stirs...",
      intensity: 75,
      epicness: 80
    }
  ],
  "star-wars": [
    {
      id: "force-awakens",
      title: "The Force Awakens",
      description: "A new disturbance in the Force calls you to adventure. Will you embrace the light or succumb to the dark side?",
      genre: "Space Opera",
      duration: "Long",
      difficulty: "Hard",
      themes: ["Destiny", "Power", "Choice", "Balance"],
      hook: "The Force calls to you... but which path will you choose?",
      intensity: 85,
      epicness: 95
    },
    {
      id: "rebellion",
      title: "Spark of Rebellion",
      description: "Join the fight against tyranny in a galaxy far, far away. Every small act of rebellion matters.",
      genre: "Rebellion Story",
      duration: "Medium",
      difficulty: "Medium",
      themes: ["Freedom", "Hope", "Sacrifice", "Unity"],
      hook: "In a galaxy ruled by fear, one spark can ignite a revolution...",
      intensity: 70,
      epicness: 85
    },
    {
      id: "outer-rim",
      title: "Outer Rim Adventures",
      description: "Navigate the dangerous Outer Rim territories where fortune and danger go hand in hand.",
      genre: "Space Western",
      duration: "Short",
      difficulty: "Easy",
      themes: ["Survival", "Opportunity", "Danger", "Freedom"],
      hook: "Beyond the reach of empire, anything is possible...",
      intensity: 55,
      epicness: 60
    }
  ],
  "harry-potter": [
    {
      id: "dark-lord-rises",
      title: "The Dark Lord's Return",
      description: "Ancient evil stirs once more. Gather allies and master your magic to face the growing darkness.",
      genre: "Dark Fantasy",
      duration: "Long",
      difficulty: "Hard",
      themes: ["Dark Magic", "Friendship", "Courage", "Destiny"],
      hook: "The shadows grow longer... and ancient evil stirs...",
      intensity: 85,
      epicness: 90
    },
    {
      id: "magical-mystery",
      title: "Hogwarts Mystery",
      description: "Strange events plague Hogwarts. Uncover the truth behind the magical mysteries within the castle walls.",
      genre: "Mystery",
      duration: "Medium",
      difficulty: "Medium",
      themes: ["Mystery", "Friendship", "Discovery", "Magic"],
      hook: "Within these ancient walls, secrets wait to be discovered...",
      intensity: 65,
      epicness: 70
    },
    {
      id: "quidditch-cup",
      title: "Quidditch World Cup",
      description: "Lead your team to victory in the ultimate magical sporting event. Glory, rivalry, and magical sportsmanship await.",
      genre: "Sports Adventure",
      duration: "Short",
      difficulty: "Easy",
      themes: ["Competition", "Teamwork", "Glory", "Sportsmanship"],
      hook: "The stadium roars... the golden snitch awaits...",
      intensity: 50,
      epicness: 55
    }
  ],
  "lord-of-the-rings": [
    {
      id: "shadow-return",
      title: "The Shadow Returns",
      description: "A new darkness spreads across Middle-earth. Rally the free peoples and stand against the growing shadow.",
      genre: "Epic Fantasy",
      duration: "Long",
      difficulty: "Hard",
      themes: ["Good vs Evil", "Courage", "Friendship", "Sacrifice"],
      hook: "The One Ring may be destroyed, but evil never truly dies...",
      intensity: 90,
      epicness: 100
    },
    {
      id: "dwarf-kingdom",
      title: "The Dwarf Kingdoms",
      description: "Journey deep beneath the mountains to reclaim ancient dwarf halls from creatures of darkness.",
      genre: "Adventure",
      duration: "Medium",
      difficulty: "Medium",
      themes: ["Heritage", "Greed", "Courage", "Kingdom"],
      hook: "Deep beneath the earth, ancient treasures and terrible dangers await...",
      intensity: 70,
      epicness: 80
    },
    {
      id: "shire-peace",
      title: "Peace in the Shire",
      description: "Protect the peaceful Shire from creeping threats. Sometimes the smallest heroes make the biggest difference.",
      genre: "Heartwarming Adventure",
      duration: "Short",
      difficulty: "Easy",
      themes: ["Peace", "Home", "Courage", "Simplicity"],
      hook: "Even in the quietest corners, adventure finds a way...",
      intensity: 45,
      epicness: 50
    }
  ],
  "game-of-thrones": [
    {
      id: "iron-throne",
      title: "Game of Thrones",
      description: "The ultimate game of politics and power begins. Navigate deadly alliances and betrayals to claim the Iron Throne.",
      genre: "Political Drama",
      duration: "Long",
      difficulty: "Hard",
      themes: ["Power", "Betrayal", "Politics", "Survival"],
      hook: "When you play the game of thrones, you win or you die...",
      intensity: 95,
      epicness: 95
    },
    {
      id: "white-walker",
      title: "The Long Night",
      description: "Ancient horrors march south. Unite the realm against the true enemy that threatens all humanity.",
      genre: "Survival Horror",
      duration: "Long",
      difficulty: "Hard",
      themes: ["Survival", "Unity", "Ancient Evil", "Sacrifice"],
      hook: "Winter is coming... and it brings death with it...",
      intensity: 100,
      epicness: 100
    },
    {
      id: "dragon-queen",
      title: "The Dragon's Legacy",
      description: "Ancient dragons return to the world. Will you be their ally or their enemy in the coming age of fire and blood?",
      genre: "Fantasy Adventure",
      duration: "Medium",
      difficulty: "Medium",
      themes: ["Power", "Legacy", "Dragons", "Conquest"],
      hook: "Fire and blood will reshape the world...",
      intensity: 80,
      epicness: 90
    }
  ]
};

const universeColors = {
  "marvel": "from-red-500 to-blue-600",
  "dc": "from-gray-600 to-blue-700",
  "star-wars": "from-amber-500 to-gray-900",
  "harry-potter": "from-red-600 to-amber-500",
  "lord-of-the-rings": "from-green-600 to-amber-500",
  "game-of-thrones": "from-gray-800 to-red-700"
};

const universeBgColors = {
  "marvel": "bg-red-500/10",
  "dc": "bg-gray-600/10",
  "star-wars": "bg-amber-500/10",
  "harry-potter": "bg-red-600/10",
  "lord-of-the-rings": "bg-green-600/10",
  "game-of-thrones": "bg-gray-800/10"
};

const universeIcons = {
  "marvel": "🦸",
  "dc": "🦇",
  "star-wars": "⚔️",
  "harry-potter": "⚡",
  "lord-of-the-rings": "🗡️",
  "game-of-thrones": "👑"
};

export default function StorylinePage() {
  const [selectedStoryline, setSelectedStoryline] = useState<Storyline | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [universe, setUniverse] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedDifficulty = localStorage.getItem("rpg-difficulty");
    const savedUniverse = localStorage.getItem("rpg-universe");
    const savedCharacter = localStorage.getItem("rpg-character");
    
    if (savedDifficulty && savedUniverse && savedCharacter) {
      setDifficulty(savedDifficulty);
      setUniverse(savedUniverse);
      setCharacter(JSON.parse(savedCharacter));
    }
  }, []);

  const handleStorylineSelect = (storyline: Storyline) => {
    setSelectedStoryline(storyline);
  };

  const handleBeginAdventure = async () => {
    if (selectedStoryline) {
      setIsNavigating(true);
      localStorage.setItem("rpg-storyline", JSON.stringify(selectedStoryline));
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      alert(`🎮 Adventure begins! You are ${character?.name} in "${selectedStoryline.title}"\n\nDifficulty: ${difficulty}\nUniverse: ${universe}\n\nGet ready for an epic journey!`);
    }
  };

  const handleBack = async () => {
    setIsNavigating(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    router.push("/character");
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

  const getDurationIcon = (duration: string) => {
    switch (duration) {
      case "short": return "⏱️";
      case "medium": return "⏳";
      case "long": return "⌛";
      default: return "📅";
    }
  };

  const getGenreIcon = (genre: string) => {
    const genreIcons: Record<string, string> = {
      "Epic Adventure": "🌟",
      "Political Drama": "🏛️",
      "Crime Drama": "🕵️",
      "Dark Thriller": "🌑",
      "Action Adventure": "⚡",
      "Fantasy Adventure": "🐉",
      "Space Opera": "🚀",
      "Rebellion Story": "✊",
      "Space Western": "🤠",
      "Dark Fantasy": "🔮",
      "Mystery": "🔍",
      "Sports Adventure": "⚽",
      "Epic Fantasy": "🏰",
      "Adventure": "🗺️",
      "Heartwarming Adventure": "💝",
      "Survival Horror": "😱",
      "Political Drama": "👑"
    };
    return genreIcons[genre] || "📖";
  };

  const getUniverseTitle = (universeId: string) => {
    const titles: Record<string, string> = {
      "marvel": "Marvel Universe",
      "dc": "DC Universe",
      "star-wars": "Star Wars",
      "harry-potter": "Harry Potter",
      "lord-of-the-rings": "Lord of the Rings",
      "game-of-thrones": "Game of Thrones"
    };
    return titles[universeId] || universeId;
  };

  const storylines = universe ? universeStorylines[universe] || [] : [];

  return (
    <NavigationGuard requiredData={{ difficulty: true, universe: true, character: true }}>
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
                Back to Character
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
                {" "}Storyline
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
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-2xl">{universeIcons[universe || ""]}</span>
                <Badge className="bg-purple-600 text-white">
                  {getUniverseTitle(universe || "")}
                </Badge>
              </div>
              {character && (
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {character.name}
                  </Badge>
                </div>
              )}
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Every great adventure begins with a choice. Select the path that will define your legend and shape your destiny.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {storylines.map((storyline, index) => (
              <motion.div
                key={storyline.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2 + index * 0.15,
                  ease: "easeOut"
                }}
                className="h-full"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-500 transform-gpu overflow-hidden ${
                    selectedStoryline === storyline
                      ? `ring-4 ring-purple-500/50 ${universeBgColors[universe || ""]} border-purple-400/50 shadow-2xl shadow-purple-500/25 scale-105`
                      : hoveredCard === index
                      ? `${universeBgColors[universe || ""]} border-white/20 shadow-xl shadow-purple-500/10 scale-102`
                        : "bg-slate-800/30 backdrop-blur-sm border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                  onClick={() => handleStorylineSelect(storyline)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: universe && universeColors[universe] 
                        ? `linear-gradient(135deg, ${universeColors[universe].replace('from-', '').replace('to-', ', ')})`
                        : 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  <CardHeader className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={`bg-gradient-to-r ${getDifficultyColor(storyline.difficulty)} text-white border-0`}>
                        {getGenreIcon(storyline.genre)} {storyline.genre}
                      </Badge>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs border-white/20 text-white/80 bg-white/5">
                          {getDifficultyIcon(storyline.difficulty)} {storyline.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-white/20 text-white/80 bg-white/5">
                          {getDurationIcon(storyline.duration)} {storyline.duration}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold text-white">
                        {storyline.title}
                      </CardTitle>
                      <CardDescription className="text-lg text-purple-200 italic leading-relaxed">
                        "{storyline.hook}"
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                      {storyline.description}
                    </p>
                    
                    {storyline.intensity && storyline.epicness && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Intensity</span>
                            <span className="text-white font-medium">{storyline.intensity}%</span>
                          </div>
                          <Progress 
                            value={storyline.intensity} 
                            className="h-1.5 bg-slate-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Epicness</span>
                            <span className="text-white font-medium">{storyline.epicness}%</span>
                          </div>
                          <Progress 
                            value={storyline.epicness} 
                            className="h-1.5 bg-slate-700"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        Story Themes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {storyline.themes.map((theme, themeIndex) => (
                          <motion.div
                            key={themeIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + themeIndex * 0.1 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className={`text-xs bg-white/10 text-white border-white/20 hover:bg-white/20 ${
                                selectedStoryline === storyline ? "bg-purple-500/30 border-purple-400/50" : ""
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

          <AnimatePresence>
            {selectedStoryline && character && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-12"
              >
                <h3 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Your Epic Adventure Awaits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-purple-400 mb-4">Your Character</h4>
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/20">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                        {character.name.charAt(0)}
                      </div>
                      <h5 className="text-2xl font-bold text-white mb-2">{character.name}</h5>
                      <p className="text-gray-300 mb-4">{character.role}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {character.personality.slice(0, 3).map((trait, index) => (
                          <Badge key={index} className="text-xs bg-pink-500/20 text-pink-300 border-pink-500/30">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-purple-400 mb-4">Your Story</h4>
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/20">
                      <h5 className="text-2xl font-bold text-white mb-2">{selectedStoryline.title}</h5>
                      <p className="text-gray-300 text-sm italic mb-4">"{selectedStoryline.hook}"</p>
                      <div className="flex justify-center gap-3 mb-4">
                        <Badge className="text-xs bg-white/10 text-white border-white/20">
                          {getDifficultyIcon(selectedStoryline.difficulty)} {selectedStoryline.difficulty}
                        </Badge>
                        <Badge className="text-xs bg-white/10 text-white border-white/20">
                          {getDurationIcon(selectedStoryline.duration)} {selectedStoryline.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300">{selectedStoryline.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleBeginAdventure}
                disabled={!selectedStoryline || isNavigating}
                className={`group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl disabled:shadow-none ${
                  selectedStoryline ? "scale-100" : "scale-95"
                }`}
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
                        scale: selectedStoryline ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: selectedStoryline ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      🎮
                    </motion.span>
                  )}
                  <span className="font-semibold">
                    {selectedStoryline ? "Begin Your Adventure" : "Select Storyline to Begin"}
                  </span>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </NavigationGuard>
  );
}