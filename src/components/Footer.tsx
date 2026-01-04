import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="font-pixel text-xs text-primary-foreground">F</span>
              </div>
              <span className="font-pixel text-sm text-secondary-foreground">
                Found<span className="text-primary">MC</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/70">
              Discover the best Minecraft servers. Vote for your favorites and join the community.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h3 className="font-pixel text-xs mb-4 text-primary">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servers" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  All Servers
                </Link>
              </li>
              <li>
                <Link to="/top" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Top Lists
                </Link>
              </li>
              <li>
                <Link to="/servers?gameType=Survival" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Survival
                </Link>
              </li>
              <li>
                <Link to="/servers?gameType=Skyblock" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Skyblock
                </Link>
              </li>
              <li>
                <Link to="/servers?gameType=Minigames" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Minigames
                </Link>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h3 className="font-pixel text-xs mb-4 text-primary">For Owners</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/add-server" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Add Your Server
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-pixel text-xs mb-4 text-primary">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} Found Minecraft Server. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground/50 hover:text-primary transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground/50 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground/50 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
