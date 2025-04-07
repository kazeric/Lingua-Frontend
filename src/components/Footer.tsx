import React from "react";
import { Globe, Mail, Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div id="contribute" className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="h-6 w-6 text-lingua-500" />
              <span className="font-bold text-xl">Lingua Connect</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Bridging language gaps in agricultural data collection for low-resource languages.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-lingua-100 dark:hover:bg-lingua-900/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-lingua-100 dark:hover:bg-lingua-900/20 transition-colors"
                aria-label="Mail"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-lingua-100 dark:hover:bg-lingua-900/20 transition-colors"
                aria-label="Community"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6">
              Contribute to Our Language Database
            </h3>
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <p className="text-muted-foreground mb-4">
                Join our community of language experts and farmers to help build
                bridges across agricultural knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Input placeholder="Your email address" type="email" />
                <Button className="bg-lingua-500 hover:bg-lingua-600 text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to receive updates about our data
                collection projects. We respect your privacy.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <nav className="flex flex-wrap gap-x-8 gap-y-4 mb-6 md:mb-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lingua Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
