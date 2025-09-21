"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./loading";

interface NavigationGuardProps {
  children: React.ReactNode;
  requiredData: {
    difficulty?: boolean;
    universe?: boolean;
    character?: boolean;
    storyline?: boolean;
  };
  redirectTo?: string;
}

export function NavigationGuard({ children, requiredData, redirectTo = "/" }: NavigationGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAllData, setHasAllData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkData = () => {
      const checks = {
        difficulty: !requiredData.difficulty || !!localStorage.getItem("rpg-difficulty"),
        universe: !requiredData.universe || !!localStorage.getItem("rpg-universe"),
        character: !requiredData.character || !!localStorage.getItem("rpg-character"),
        storyline: !requiredData.storyline || !!localStorage.getItem("rpg-storyline")
      };

      const allChecksPass = Object.values(checks).every(check => check);
      setHasAllData(allChecksPass);
      setIsLoading(false);

      if (!allChecksPass) {
        router.push(redirectTo);
      }
    };

    // Small delay to prevent flash of loading state
    const timer = setTimeout(checkData, 100);
    return () => clearTimeout(timer);
  }, [requiredData, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Preparing your adventure..." />
      </div>
    );
  }

  if (!hasAllData) {
    return null; // Will redirect automatically
  }

  return <>{children}</>;
}