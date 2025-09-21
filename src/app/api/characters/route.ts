import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const { universe } = await request.json();

    if (!universe) {
      return NextResponse.json(
        { error: "Universe is required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const universeDescriptions = {
      "marvel": "Marvel Universe with superheroes, villains, and cosmic adventures",
      "dc": "DC Universe with iconic heroes like Batman, Superman, Wonder Woman, and their villains",
      "star-wars": "Star Wars galaxy with Jedi, Sith, rebels, and various alien species",
      "harry-potter": "Harry Potter wizarding world with witches, wizards, and magical creatures",
      "lord-of-the-rings": "Middle-earth with hobbits, elves, dwarves, men, and dark forces",
      "game-of-thrones": "Game of Thrones world of Westeros with noble houses, dragons, and political intrigue"
    };

    const prompt = `Generate 6 unique and diverse characters for the ${universeDescriptions[universe as keyof typeof universeDescriptions]}. 

For each character, provide:
1. Name: A fitting name for the character
2. Description: A detailed 2-3 sentence description of their appearance, personality, and background
3. Role: Their primary role or profession in this universe
4. Abilities: 2-3 key abilities or skills they possess
5. Personality: 3-4 personality traits that define them

Format the response as a JSON array with the following structure:
[
  {
    "name": "Character Name",
    "description": "Character description...",
    "role": "Character role",
    "abilities": ["Ability 1", "Ability 2", "Ability 3"],
    "personality": ["Trait 1", "Trait 2", "Trait 3"]
  }
]

Make the characters diverse, interesting, and fitting for the ${universe} universe. Include both well-known character types and original creations.`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative character generator for RPG games. Generate detailed, diverse, and engaging characters that fit within specified universes. Always respond with valid JSON format."
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("No response from AI");
    }

    // Clean the response to ensure it's valid JSON
    let characters;
    try {
      // Remove any markdown formatting and extract JSON
      const jsonMatch = responseContent.match(/\[.*\]/s);
      if (jsonMatch) {
        characters = JSON.parse(jsonMatch[0]);
      } else {
        characters = JSON.parse(responseContent);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseContent);
      throw new Error("Failed to parse character data");
    }

    return NextResponse.json({ characters });

  } catch (error) {
    console.error("Error generating characters:", error);
    return NextResponse.json(
      { error: "Failed to generate characters" },
      { status: 500 }
    );
  }
}