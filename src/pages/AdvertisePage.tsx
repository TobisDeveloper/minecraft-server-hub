import { Link } from 'react-router-dom';
import { Check, Zap, MousePointer, Copy, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AdvertisePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-accent to-background">
          <div className="container text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Promoted Listings
            </Badge>
            <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl mb-6">
              Boost Your <span className="text-primary">Server</span> Visibility
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Get your Minecraft server in front of thousands of players with our sponsored listings. 
              Pay only for results with our click-based pricing model.
            </p>
            <Button size="lg" className="btn-pixel" asChild>
              <Link to="/dashboard">Start a Campaign</Link>
            </Button>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="container">
            <h2 className="font-pixel text-base sm:text-lg text-center mb-12">
              Transparent Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <CardHeader className="text-center">
                  <MousePointer className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <CardTitle className="font-pixel text-sm">Per Click</CardTitle>
                  <CardDescription>
                    Pay when users click your server listing
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="font-pixel text-3xl text-primary">€5</span>
                    <span className="text-muted-foreground"> / 100 clicks</span>
                  </div>
                  <ul className="space-y-3 text-sm text-left">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Appear as "Sponsored" in listings
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Priority placement
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Detailed click analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Daily budget controls
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <CardHeader className="text-center">
                  <Copy className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <CardTitle className="font-pixel text-sm">Per IP Copy</CardTitle>
                  <CardDescription>
                    Pay when users copy your server IP
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="font-pixel text-3xl text-primary">€0.50</span>
                    <span className="text-muted-foreground"> / copy</span>
                  </div>
                  <ul className="space-y-3 text-sm text-left">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      High-intent users
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Unique IP tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Real-time reporting
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Anti-fraud protection
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-pixel text-base sm:text-lg text-center mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-pixel">
                  <span className="font-pixel text-primary-foreground">1</span>
                </div>
                <h3 className="font-semibold mb-2">Create Campaign</h3>
                <p className="text-sm text-muted-foreground">
                  Set your daily budget and total spend limit in your dashboard
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-pixel">
                  <span className="font-pixel text-primary-foreground">2</span>
                </div>
                <h3 className="font-semibold mb-2">Get Featured</h3>
                <p className="text-sm text-muted-foreground">
                  Your server appears as "Sponsored" every 4th listing
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-pixel">
                  <span className="font-pixel text-primary-foreground">3</span>
                </div>
                <h3 className="font-semibold mb-2">Track Results</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor clicks, copies, and ROI in real-time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Guaranteed Visibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Sponsored servers are shown prominently across all pages
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Start Instantly</h3>
                  <p className="text-sm text-muted-foreground">
                    Your campaign goes live as soon as you activate it
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">No Contracts</h3>
                  <p className="text-sm text-muted-foreground">
                    Pause or stop your campaign anytime
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Check className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Fair Placement</h3>
                  <p className="text-sm text-muted-foreground">
                    Max 1 sponsored listing every 4 results
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container text-center">
            <h2 className="font-pixel text-lg sm:text-xl mb-4">
              Ready to Grow Your Server?
            </h2>
            <p className="text-secondary-foreground/70 mb-8 max-w-xl mx-auto">
              Join hundreds of server owners who use our promotion platform to reach new players.
            </p>
            <Button size="lg" className="btn-pixel bg-primary text-primary-foreground" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
