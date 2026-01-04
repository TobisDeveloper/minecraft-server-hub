import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, Plus, BarChart3, Users, TrendingUp, Eye, 
  MousePointer, Copy, Settings, Key, AlertCircle, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { mockServers } from '@/data/mockData';
import type { ServerRegion, GameType, MinecraftVersion } from '@/types';

const regions: { value: ServerRegion; label: string }[] = [
  { value: 'north-america', label: 'North America' },
  { value: 'south-america', label: 'South America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'oceania', label: 'Oceania' },
  { value: 'africa', label: 'Africa' },
];

const gameTypes: GameType[] = [
  'Survival', 'Creative', 'Skyblock', 'Prison', 'Factions', 
  'RPG', 'Minigames', 'PvP', 'Hardcore', 'Modded'
];

const versions: MinecraftVersion[] = [
  '1.20.4', '1.20.2', '1.19.4', '1.18.2', '1.16.5', '1.12.2', '1.8.9'
];

export default function DashboardPage() {
  const myServers = mockServers.slice(0, 3);
  const [selectedServer, setSelectedServer] = useState(myServers[0]);
  const [serverRegion, setServerRegion] = useState<ServerRegion>(selectedServer.region);

  const stats = {
    totalVotes: myServers.reduce((sum, s) => sum + s.totalVotes, 0),
    totalPlayers: myServers.reduce((sum, s) => sum + s.playersOnline, 0),
    totalViews: 45678,
    totalClicks: 12345,
    totalIpCopies: 8901,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-pixel text-lg sm:text-xl mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your servers and campaigns</p>
            </div>
            <Button className="btn-pixel gap-2" asChild>
              <Link to="/add-server">
                <Plus className="w-4 h-4" />
                Add Server
              </Link>
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-bold text-xl">{stats.totalVotes.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Votes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-bold text-xl">{stats.totalPlayers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Players Online</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-bold text-xl">{stats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Page Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MousePointer className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-bold text-xl">{stats.totalClicks.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Clicks</p>
              </CardContent>
            </Card>
            <Card className="col-span-2 sm:col-span-1">
              <CardContent className="p-4 text-center">
                <Copy className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-bold text-xl">{stats.totalIpCopies.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">IP Copies</p>
              </CardContent>
            </Card>
          </div>

          {/* Server Selection */}
          <div className="mb-6">
            <Label className="mb-2 block">Select Server to Manage</Label>
            <Select 
              value={selectedServer.id} 
              onValueChange={(v) => {
                const server = myServers.find(s => s.id === v);
                if (server) {
                  setSelectedServer(server);
                  setServerRegion(server.region);
                }
              }}
            >
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {myServers.map((server) => (
                  <SelectItem key={server.id} value={server.id}>
                    <div className="flex items-center gap-2">
                      <img src={server.iconUrl} alt="" className="w-5 h-5 rounded" />
                      {server.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="w-full max-w-lg grid grid-cols-4">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="campaign">Campaign</TabsTrigger>
              <TabsTrigger value="api">API Keys</TabsTrigger>
            </TabsList>

            {/* Server Settings */}
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Server Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your server details and configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="server-name">Server Name</Label>
                      <Input id="server-name" defaultValue={selectedServer.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="server-ip">IP Address</Label>
                      <Input id="server-ip" defaultValue={selectedServer.ipAddress} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="game-type">Game Type</Label>
                      <Select defaultValue={selectedServer.gameType}>
                        <SelectTrigger id="game-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {gameTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="version">Minecraft Version</Label>
                      <Select defaultValue={selectedServer.version}>
                        <SelectTrigger id="version">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {versions.map((v) => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* REGION SELECTOR - Server Owner Only */}
                    <div className="space-y-2">
                      <Label htmlFor="region" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Server Region
                      </Label>
                      <Select value={serverRegion} onValueChange={(v) => setServerRegion(v as ServerRegion)}>
                        <SelectTrigger id="region">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        This is used by our recommendation algorithm to show your server to nearby players
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-players">Max Players</Label>
                      <Input id="max-players" type="number" defaultValue={selectedServer.maxPlayers} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      defaultValue={selectedServer.description}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" defaultValue={selectedServer.tags.join(', ')} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">Verification Status</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedServer.isVerified 
                          ? 'Your server ownership is verified' 
                          : 'Verify your server ownership to get a badge'}
                      </p>
                    </div>
                    {selectedServer.isVerified ? (
                      <Badge className="bg-primary">Verified</Badge>
                    ) : (
                      <Button variant="outline">Verify Now</Button>
                    )}
                  </div>

                  <Button className="btn-pixel">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Statistics */}
            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Server Statistics
                  </CardTitle>
                  <CardDescription>
                    View detailed analytics for {selectedServer.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-2xl text-primary">{selectedServer.totalVotes.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Votes</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-2xl">{selectedServer.playersOnline.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Players Online</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-2xl">{selectedServer.rating.toFixed(1)}</p>
                      <p className="text-sm text-muted-foreground">Avg Rating</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-2xl">{selectedServer.totalReviews.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-12 bg-muted/30 rounded-lg border-2 border-dashed text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Player trend graphs will be displayed here when backend is connected
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Campaign Management */}
            <TabsContent value="campaign" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Promotion Campaign
                  </CardTitle>
                  <CardDescription>
                    Boost your server's visibility with sponsored listings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-accent rounded-lg">
                    <h3 className="font-medium mb-2">Pricing</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• €5.00 per 100 clicks on your server</li>
                      <li>• €0.50 per IP address copied</li>
                      <li>• Your server will appear as "Sponsored" every 4th listing</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">Campaign Status</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedServer.isSponsored ? 'Campaign is active' : 'No active campaign'}
                      </p>
                    </div>
                    <Switch checked={selectedServer.isSponsored} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="daily-budget">Daily Budget (EUR)</Label>
                      <Input id="daily-budget" type="number" placeholder="10.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-budget">Total Budget (EUR)</Label>
                      <Input id="total-budget" type="number" placeholder="100.00" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-xl">1,234</p>
                      <p className="text-xs text-muted-foreground">Total Clicks</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-xl">567</p>
                      <p className="text-xs text-muted-foreground">IP Copies</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-xl">€89.50</p>
                      <p className="text-xs text-muted-foreground">Spent</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-bold text-xl">€10.50</p>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                    </div>
                  </div>

                  <Button className="btn-pixel">Update Campaign</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Keys */}
            <TabsContent value="api" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Keys
                  </CardTitle>
                  <CardDescription>
                    Manage API keys for integrations and automation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">
                        API keys allow you to programmatically access your server data and integrate with external services.
                      </p>
                      <p>
                        Keep your API keys secure and never share them publicly.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Production Key</p>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          value="fmc_live_xxxxxxxxxxxxxxxxxxxxx" 
                          readOnly 
                          className="font-mono text-sm"
                        />
                        <Button variant="outline" size="icon">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Development Key</p>
                        <Badge variant="outline">Test Mode</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          value="fmc_test_xxxxxxxxxxxxxxxxxxxxx" 
                          readOnly 
                          className="font-mono text-sm"
                        />
                        <Button variant="outline" size="icon">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline">Generate New Key</Button>

                  <div className="border-t pt-6">
                    <Link to="/api-docs" className="text-primary hover:underline text-sm">
                      View API Documentation →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
