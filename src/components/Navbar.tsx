
import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <Globe className="h-6 w-6 text-lingua-500" />
            <span className="font-bold text-xl">Lingua Connect</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="link-underline font-medium">
              Features
            </a>
            <a href="#languages" className="link-underline font-medium">
              Languages
            </a>
            <a href="#demo" className="link-underline font-medium">
              Try It
            </a>
            <a href="#contribute" className="link-underline font-medium">
              Contribute
            </a>
            <Button className="bg-lingua-500 hover:bg-lingua-600 text-white rounded-full">
              Get Started
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="py-2 px-4 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#languages"
                className="py-2 px-4 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Languages
              </a>
              <a
                href="#demo"
                className="py-2 px-4 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Try It
              </a>
              <a
                href="#contribute"
                className="py-2 px-4 hover:bg-accent rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contribute
              </a>
              <Button className="bg-lingua-500 hover:bg-lingua-600 text-white w-full">
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
