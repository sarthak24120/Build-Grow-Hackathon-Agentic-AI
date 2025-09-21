"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingCard, LoadingSpinner, ErrorMessage } from "@/components/ui/loading";
import { NavigationGuard } from "@/components/ui/navigation-guard";
import { Progress } from "@/components/ui/progress";

interface Character {
  name: string;
  description: string;
  role: string;
  abilities: string[];
  personality: string[];
  powerLevel?: number;
  complexity?: number;
}

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

const getCharacterIcon = (role: string) => {
  const roleIcons: Record<string, string> = {
    "Superhero": "🦸",
    "Vigilante": "🥷",
    "Scientist Hero": "🔬",
    "Jedi Master": "⚡",
    "Smuggler": "🚀",
    "Politician": "🏛️",
    "Professor": "📚",
    "Auror": "⚔️",
    "Herbologist": "🌿",
    "Ranger": "🏹",
    "Scholar": "📜",
    "Warrior": "⚔️",
    "Knight": "🛡️",
    "Spy": "🕵️",
    "Maester": "📖",
    "Tech Hero": "💻"
  };
  return roleIcons[role] || "👤";
};

export default function CharacterPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [universe, setUniverse] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedDifficulty = localStorage.getItem("rpg-difficulty");
    const savedUniverse = localStorage.getItem("rpg-universe");
    
    if (savedDifficulty && savedUniverse) {
      setDifficulty(savedDifficulty);
      setUniverse(savedUniverse);
      generateCharacters(savedUniverse);
    }
  }, []);

  const generateCharacters = async (universeId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ universe: universeId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate characters');
      }

      const data = await response.json();
      
      if (!data.characters || !Array.isArray(data.characters) || data.characters.length === 0) {
        throw new Error('No characters received');
      }

      // Add power levels and complexity to characters
      const enhancedCharacters = data.characters.map((char: Character) => ({
        ...char,
        powerLevel: Math.floor(Math.random() * 40) + 60, // 60-100
        complexity: Math.floor(Math.random() * 30) + 40 // 40-70
      }));

      setCharacters(enhancedCharacters);
    } catch (error) {
      console.error('Error generating characters:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate characters');
      setCharacters(getFallbackCharacters(universeId));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackCharacters = (universeId: string): Character[] => {
    const fallbackData: Record<string, Character[]> = {
      "marvel": [
        {
          name: "Captain Cosmic",
          description: "A legendary hero with the power to manipulate cosmic energy and protect the galaxy from threats.",
          role: "Superhero",
          abilities: ["Cosmic Energy Manipulation", "Flight", "Super Strength"],
          personality: ["Brave", "Noble", "Protective", "Determined"],
          powerLevel: 95,
          complexity: 65
        },
        {
          name: "Shadow Walker",
          description: "A mysterious vigilante who moves through shadows and fights crime in the darkest corners of the city.",
          role: "Vigilante",
          abilities: ["Shadow Manipulation", "Stealth", "Enhanced Agility"],
          personality: ["Mysterious", "Brooding", "Loyal", "Strategic"],
          powerLevel: 75,
          complexity: 70
        },
        {
          name: "Quantum Sage",
          description: "A brilliant scientist who gained the ability to manipulate quantum physics and reality itself.",
          role: "Scientist Hero",
          abilities: ["Reality Manipulation", "Quantum Physics", "Time Travel"],
          personality: ["Intelligent", "Curious", "Responsible", "Innovative"],
          powerLevel: 90,
          complexity: 85
        }
      ],
      "dc": [
        {
          name: "Night Guardian",
          description: "A dark protector who watches over the city streets, dispensing justice to those who prey on the innocent.",
          role: "Vigilante",
          abilities: ["Enhanced Senses", "Martial Arts", "Tactical Genius"],
          personality: ["Determined", "Brooding", "Protective", "Strategic"],
          powerLevel: 80,
          complexity: 75
        },
        {
          name: "Solar Flare",
          description: "A hero blessed with solar powers who brings light and hope to the darkest corners of the world.",
          role: "Superhero",
          abilities: ["Solar Energy", "Flight", "Healing Factor"],
          personality: ["Optimistic", "Noble", "Compassionate", "Courageous"],
          powerLevel: 85,
          complexity: 60
        },
        {
          name: "Tech Phantom",
          description: "A master hacker and inventor who uses technology to fight crime and protect the innocent.",
          role: "Tech Hero",
          abilities: ["Hacking", "Invention", "Tactical Analysis"],
          personality: ["Brilliant", "Resourceful", "Dedicated", "Innovative"],
          powerLevel: 70,
          complexity: 80
        }
      ],
      "star-wars": [
        {
          name: "Jedi Master Kael",
          description: "A wise and powerful Jedi Knight who has spent decades mastering the Force and training new padawans.",
          role: "Jedi Master",
          abilities: ["Force Mastery", "Lightsaber Combat", "Battle Meditation"],
          personality: ["Wise", "Patient", "Disciplined", "Compassionate"],
          powerLevel: 95,
          complexity: 70
        },
        {
          name: "Smuggler Rex",
          description: "A charismatic rogue who navigates the galaxy's underworld, always looking for the next big score.",
          role: "Smuggler",
          abilities: ["Piloting", "Marksmanship", "Persuasion"],
          personality: ["Charismatic", "Cunning", "Loyal", "Rebellious"],
          powerLevel: 65,
          complexity: 55
        },
        {
          name: "Senator Vex",
          description: "A skilled diplomat and politician working to bring peace and justice to the galaxy through political means.",
          role: "Politician",
          abilities: ["Diplomacy", "Strategy", "Leadership"],
          personality: ["Diplomatic", "Strategic", "Charismatic", "Idealistic"],
          powerLevel: 60,
          complexity: 75
        }
      ],
      "harry-potter": [
        {
          name: "Professor Eldrin",
          description: "A powerful wizard and master of ancient magic who teaches at Hogwarts and protects its students.",
          role: "Professor",
          abilities: ["Ancient Magic", "Potion Brewing", "Magical Theory"],
          personality: ["Wise", "Patient", "Mysterious", "Protective"],
          powerLevel: 90,
          complexity: 80
        },
        {
          name: "Auror Swift",
          description: "A skilled dark wizard hunter who tracks down dark wizards and protects the wizarding world.",
          role: "Auror",
          abilities: ["Combat Magic", "Investigation", "Stealth"],
          personality: ["Brave", "Determined", "Skilled", "Protective"],
          powerLevel: 85,
          complexity: 70
        },
        {
          name: "Herbologist Sage",
          description: "A master of magical plants and herbs who creates powerful potions and remedies.",
          role: "Herbologist",
          abilities: ["Plant Magic", "Potion Brewing", "Healing"],
          personality: ["Knowledgeable", "Patient", "Nurturing", "Wise"],
          powerLevel: 75,
          complexity: 65
        }
      ],
      "lord-of-the-rings": [
        {
          name: "Ranger Elara",
          description: "A skilled ranger who protects the borders of civilized lands from dark creatures and ancient evils.",
          role: "Ranger",
          abilities: ["Archery", "Tracking", "Survival"],
          personality: ["Vigilant", "Skilled", "Independent", "Protective"],
          powerLevel: 80,
          complexity: 75
        },
        {
          name: "Loremaster Theron",
          description: "A wise scholar who studies ancient texts and prophecies to understand the coming darkness.",
          role: "Scholar",
          abilities: ["Ancient Knowledge", "Languages", "Prophecy"],
          personality: ["Wise", "Learned", "Observant", "Strategic"],
          powerLevel: 70,
          complexity: 85
        },
        {
          name: "Captain Borin",
          description: "A brave warrior and leader of men who stands against the forces of darkness with sword and shield.",
          role: "Warrior",
          abilities: ["Combat", "Leadership", "Strategy"],
          personality: ["Brave", "Honorable", "Strong", "Protective"],
          powerLevel: 85,
          complexity: 60
        }
      ],
      "game-of-thrones": [
        {
          name: "Ser Valerius",
          description: "A noble knight sworn to protect the innocent and uphold honor in a world of political intrigue.",
          role: "Knight",
          abilities: ["Swordsmanship", "Strategy", "Leadership"],
          personality: ["Honorable", "Brave", "Loyal", "Determined"],
          powerLevel: 80,
          complexity: 65
        },
        {
          name: "Whisper Lyra",
          description: "A master spy and assassin who navigates the deadly politics of Westeros with skill and cunning.",
          role: "Spy",
          abilities: ["Stealth", "Poison", "Information Gathering"],
          personality: ["Cunning", "Patient", "Observant", "Adaptable"],
          powerLevel: 75,
          complexity: 90
        },
        {
          name: "Maester Elias",
          description: "A learned scholar and healer who serves as advisor to lords and tends to the sick and wounded.",
          role: "Maester",
          abilities: ["Healing", "Knowledge", "Alchemy", "Strategy"],
          personality: ["Wise", "Learned", "Compassionate", "Strategic"],
          powerLevel: 70,
          complexity: 80
        }
      ]
    };

    return fallbackData[universeId] || fallbackData.marvel;
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleContinue = async () => {
    if (selectedCharacter) {
      setIsNavigating(true);
      localStorage.setItem("rpg-character", JSON.stringify(selectedCharacter));
      
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push("/storyline");
    }
  };

  const handleBack = async () => {
    setIsNavigating(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    router.push("/universe");
  };

  const handleRegenerate = () => {
    if (universe) {
      generateCharacters(universe);
    }
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

  return (
    <NavigationGuard requiredData={{ difficulty: true, universe: true }}>
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
                Back to Universe
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
                {" "}Character
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
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Select a character to embody in your epic adventure. Each character has unique abilities, personality traits, and a story waiting to unfold.
            </motion.p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <ErrorMessage 
                message={error} 
                onRetry={handleRegenerate}
              />
            </motion.div>
          )}

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <LoadingCard count={6} />
              <div className="text-center mt-8">
                <LoadingSpinner size="lg" text="Generating unique characters..." />
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {characters.map((character, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.2 + index * 0.1,
                    ease: "easeOut"
                  }}
                  className="h-full"
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card
                    className={`h-full cursor-pointer transition-all duration-500 transform-gpu overflow-hidden ${
                      selectedCharacter === character
                        ? `ring-4 ring-purple-500/50 ${universeBgColors[universe || ""]} border-purple-400/50 shadow-2xl shadow-purple-500/25 scale-105`
                        : hoveredCard === index
                        ? `${universeBgColors[universe || ""]} border-white/20 shadow-xl shadow-purple-500/10 scale-102`
                        : "bg-slate-800/30 backdrop-blur-sm border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
                    }`}
                    onClick={() => handleCharacterSelect(character)}
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
                    
                    <CardHeader className="relative z-10 text-center space-y-4">
                      <motion.div 
                        className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${universe && universeColors[universe] ? universeColors[universe] : 'from-purple-500 to-pink-500'} flex items-center justify-center text-4xl shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getCharacterIcon(character.role)}
                      </motion.div>
                      
                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-white">
                          {character.name}
                        </CardTitle>
                        <CardDescription className="text-gray-200 text-sm">
                          {character.role}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 space-y-6">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {character.description}
                      </p>
                      
                      {character.powerLevel && character.complexity && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Power Level</span>
                              <span className="text-white font-medium">{character.powerLevel}%</span>
                            </div>
                            <Progress 
                              value={character.powerLevel} 
                              className="h-1.5 bg-slate-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Complexity</span>
                              <span className="text-white font-medium">{character.complexity}%</span>
                            </div>
                            <Progress 
                              value={character.complexity} 
                              className="h-1.5 bg-slate-700"
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                          Abilities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {character.abilities.map((ability, abilityIndex) => (
                            <motion.div
                              key={abilityIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.5 + abilityIndex * 0.1 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className={`text-xs bg-white/10 text-white border-white/20 hover:bg-white/20 ${
                                  selectedCharacter === character ? "bg-purple-500/30 border-purple-400/50" : ""
                                }`}
                              >
                                {ability}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-pink-300 uppercase tracking-wider">
                          Personality
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {character.personality.map((trait, traitIndex) => (
                            <motion.div
                              key={traitIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.7 + traitIndex * 0.1 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className={`text-xs bg-white/10 text-white border-white/20 hover:bg-white/20 ${
                                  selectedCharacter === character ? "bg-pink-500/30 border-pink-400/50" : ""
                                }`}
                              >
                                {trait}
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
          )}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center gap-6 flex-wrap">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleRegenerate}
                  disabled={loading || isNavigating}
                  variant="outline"
                  className="group border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white disabled:opacity-50 transition-all duration-200 rounded-full px-6 py-3"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" text="" />
                  ) : (
                    <>
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        🔄
                      </motion.span>
                      Generate New Characters
                    </>
                  )}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleContinue}
                  disabled={!selectedCharacter || isNavigating}
                  className={`group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl disabled:shadow-none ${
                    selectedCharacter ? "scale-100" : "scale-95"
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
                          scale: selectedCharacter ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: selectedCharacter ? Infinity : 0,
                          repeatType: "reverse"
                        }}
                      >
                        🎭
                      </motion.span>
                    )}
                    <span className="font-semibold">
                      {selectedCharacter 
                        ? `Begin as ${selectedCharacter.name}` 
                        : "Select Character to Continue"
                      }
                    </span>
                  </div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </NavigationGuard>
  );
}