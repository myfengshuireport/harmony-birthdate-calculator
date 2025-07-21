import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import AnimatedBackground from "./AnimatedBackground";

const FengShuiCalculator = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    zodiac: string;
    kuaNumber: number;
  } | null>(null);

  const calculateChineseZodiac = (birthYear: number): string => {
    const animals = [
      "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
      "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
    ];
    const baseYear = 2020; // Year of the Rat
    const index = (birthYear - baseYear) % 12;
    return animals[(index + 12) % 12];
  };

  const calculateKuaNumber = (birthYear: number, gender: string, bornBeforeChineseNewYear = false): number => {
    if (bornBeforeChineseNewYear) birthYear -= 1;
    
    const sumDigits = (year: number): number => 
      year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    let sum = sumDigits(birthYear);
    while (sum >= 10) sum = sumDigits(sum);
    
    let kua: number;
    const isAfter2000 = birthYear >= 2000;
    
    if (gender.toLowerCase() === "male") {
      kua = (isAfter2000 ? 9 : 10) - sum;
      if (kua === 5) kua = 2;
    } else {
      kua = (isAfter2000 ? 6 : 5) + sum;
      while (kua >= 10) kua = sumDigits(kua);
      if (kua === 5) kua = 8;
    }
    
    return kua;
  };

  const handleCalculate = () => {
    if (!selectedDate) return;
    setIsModalOpen(true);
    setShowResults(false);
    setSelectedGender("");
  };

  const handleProceed = () => {
    if (!selectedDate || !selectedGender) return;
    
    const birthYear = selectedDate.getFullYear();
    const zodiac = calculateChineseZodiac(birthYear);
    const kuaNumber = calculateKuaNumber(birthYear, selectedGender);
    
    setResults({ zodiac, kuaNumber });
    setShowResults(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setShowResults(false);
    setSelectedGender("");
    setResults(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-wealth-gradient bg-clip-text text-transparent">
              Discover Your Feng Shui
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Calculate your personal feng shui elements, find harmony in your space, 
              and unlock the secrets of ancient Chinese wisdom
            </p>
            
            {/* Input Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className="flex-1 w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-14 justify-between text-left font-normal text-lg px-6",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Enter your birthdate to start</span>
                      )}
                      <CalendarIcon className="ml-3 h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <Button 
                onClick={handleCalculate}
                disabled={!selectedDate}
                className="h-14 px-8 text-lg font-semibold bg-wealth-gradient hover:opacity-90 transition-opacity shadow-lg"
              >
                Calculate Now
              </Button>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="w-16 h-16 bg-prosperity-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐉</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chinese Zodiac</h3>
              <p className="text-muted-foreground">Discover your zodiac animal and its unique characteristics</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="w-16 h-16 bg-prosperity-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☯️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kua Number</h3>
              <p className="text-muted-foreground">Learn your personal feng shui number for optimal energy</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="w-16 h-16 bg-prosperity-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Space Harmony</h3>
              <p className="text-muted-foreground">Align your living space with ancient wisdom</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      <Dialog open={isModalOpen} onOpenChange={resetModal}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-center text-2xl font-bold bg-wealth-gradient bg-clip-text text-transparent">
            {showResults ? "Your Feng Shui Profile" : "Complete Your Profile"}
          </DialogTitle>
          
          {!showResults ? (
            <div className="space-y-6 py-4">
              <div className="text-center">
                <p className="text-lg mb-6">What is your gender?</p>
                <RadioGroup 
                  value={selectedGender} 
                  onValueChange={setSelectedGender}
                  className="flex justify-center space-x-8"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="text-lg">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="text-lg">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                onClick={handleProceed}
                disabled={!selectedGender}
                className="w-full bg-wealth-gradient hover:opacity-90 transition-opacity"
              >
                Proceed
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-4 animate-fade-in">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Born: {selectedDate && format(selectedDate, "PPP")}
                </p>
                
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-prosperity-red">Chinese Zodiac</h3>
                    <p className="text-2xl font-bold">{results?.zodiac}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-prosperity-gold">Kua Number</h3>
                    <p className="text-2xl font-bold">{results?.kuaNumber}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Use these insights to enhance harmony and prosperity in your life
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FengShuiCalculator;