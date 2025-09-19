import { Heart, MessageCircle, Shield, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">MindSpace</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Supporting college students' mental health with free, confidential, and accessible resources.
            </p>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get Support</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="/chat" className="hover:text-white transition-colors flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Free Chat</span>
                </a>
              </li>
              <li>
                <a href="/therapy" className="hover:text-white transition-colors">
                  Online Therapy
                </a>
              </li>
              <li>
                <a href="/resources" className="hover:text-white transition-colors">
                  Self-Help Resources
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-white transition-colors">
                  Peer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="/volunteer" className="hover:text-white transition-colors">
                  Become a Volunteer
                </a>
              </li>
              <li>
                <a href="/organizations" className="hover:text-white transition-colors">
                  Partner Organizations
                </a>
              </li>
              <li>
                <a href="/local" className="hover:text-white transition-colors">
                  Local Resources
                </a>
              </li>
              <li>
                <a href="/guidelines" className="hover:text-white transition-colors">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div className="space-y-4">
            <h3 className="font-semibold text-warning">Crisis Support</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-warning/20 rounded-lg">
                <p className="text-warning-foreground font-medium mb-1">In Crisis?</p>
                <p className="text-warning-foreground/80 text-xs mb-2">
                  If you're having thoughts of self-harm, please reach out immediately.
                </p>
                <a 
                  href="tel:988" 
                  className="flex items-center space-x-2 text-warning-foreground hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">Crisis Lifeline: 988</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
              <a href="/privacy" className="hover:text-white transition-colors flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Privacy Policy</span>
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
            
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} MindSpace. Supporting student mental health.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;