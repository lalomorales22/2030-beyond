import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  User, 
  Shield, 
  Zap, 
  Home, 
  DollarSign, 
  Users, 
  Brain, 
  Bell, 
  Globe, 
  Palette, 
  Database,
  Lock,
  Eye,
  Smartphone,
  Wifi,
  Activity,
  FileText,
  Download,
  Trash2,
  RefreshCw,
  Settings as SettingsIcon,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      energy: true,
      housing: true,
      finance: true,
      governance: true,
      ai: false
    },
    privacy: {
      shareEnergyData: true,
      shareFinancialData: false,
      shareHousingData: true,
      allowDataAnalytics: true,
      publicProfile: false
    },
    ai: {
      enableAssistant: true,
      dataSharing: true,
      automatedOptimization: true,
      personalizedRecommendations: true
    },
    community: {
      autoJoinDiscussions: false,
      showOnlineStatus: true,
      allowDirectMessages: true,
      participateInPolls: true
    }
  });

  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    email: "alex.rivera@2030.community",
    phone: "+1 (555) 123-4567",
    location: "Bay Area, CA",
    timezone: "PST",
    language: "en",
    role: "Community Member"
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} preferences have been updated successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center gap-4 p-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your 2030 community preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="systems" className="gap-2">
              <Activity className="w-4 h-4" />
              Systems
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Brain className="w-4 h-4" />
              AI & Automation
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <Users className="w-4 h-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <Database className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PST">Pacific (PST)</SelectItem>
                          <SelectItem value="MST">Mountain (MST)</SelectItem>
                          <SelectItem value="CST">Central (CST)</SelectItem>
                          <SelectItem value="EST">Eastern (EST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={profile.language} onValueChange={(value) => setProfile({...profile, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Community Role</Label>
                      <Badge variant="secondary" className="justify-center py-2">
                        {profile.role}
                      </Badge>
                    </div>
                  </div>
                  <Button onClick={() => handleSave("Profile")} className="mt-4">
                    Save Profile Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Change Password</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                    </div>
                  </div>
                  <Button variant="outline">Update Password</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="systems">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Energy System Settings</CardTitle>
                  <CardDescription>Configure your energy sharing and optimization preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <div>
                        <Label>Energy Sharing</Label>
                        <p className="text-sm text-muted-foreground">Share excess energy with the community</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Energy Share (%)</Label>
                    <Slider defaultValue={[75]} max={100} step={5} className="w-full" />
                    <p className="text-sm text-muted-foreground">75% of excess energy</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Housing Network Settings</CardTitle>
                  <CardDescription>Manage your housing and space sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-blue-500" />
                      <div>
                        <Label>Space Sharing</Label>
                        <p className="text-sm text-muted-foreground">Allow community access to shared spaces</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get alerts for housing maintenance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Finance Cooperative Settings</CardTitle>
                  <CardDescription>Configure your financial services and data sharing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <div>
                        <Label>Credit Building</Label>
                        <p className="text-sm text-muted-foreground">Share data to improve credit scoring</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Investment Recommendations</Label>
                      <p className="text-sm text-muted-foreground">Receive AI-powered investment advice</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how and when you want to be notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Delivery Methods</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bell className="w-4 h-4" />
                            <Label>Push Notifications</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.push}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, push: checked}
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4" />
                            <Label>Email Notifications</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.email}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, email: checked}
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-4 h-4" />
                            <Label>SMS Notifications</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.sms}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, sms: checked}
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-4">System Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <Label>Energy Commons</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.energy}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, energy: checked}
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Home className="w-4 h-4 text-blue-500" />
                            <Label>Housing Network</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.housing}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, housing: checked}
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <Label>Finance Cooperative</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.finance}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, finance: checked}
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-purple-500" />
                            <Label>Governance</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.governance}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, governance: checked}
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Brain className="w-4 h-4 text-pink-500" />
                            <Label>AI Engine</Label>
                          </div>
                          <Switch 
                            checked={preferences.notifications.ai}
                            onCheckedChange={(checked) => 
                              setPreferences({
                                ...preferences, 
                                notifications: {...preferences.notifications, ai: checked}
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => handleSave("Notification")} className="mt-6">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Privacy</CardTitle>
                  <CardDescription>Control how your data is shared and used within the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Data Sharing Permissions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Energy Usage Data</Label>
                          <p className="text-sm text-muted-foreground">Share for community optimization</p>
                        </div>
                        <Switch 
                          checked={preferences.privacy.shareEnergyData}
                          onCheckedChange={(checked) => 
                            setPreferences({
                              ...preferences, 
                              privacy: {...preferences.privacy, shareEnergyData: checked}
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Financial Data</Label>
                          <p className="text-sm text-muted-foreground">Share for credit building and services</p>
                        </div>
                        <Switch 
                          checked={preferences.privacy.shareFinancialData}
                          onCheckedChange={(checked) => 
                            setPreferences({
                              ...preferences, 
                              privacy: {...preferences.privacy, shareFinancialData: checked}
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Housing Data</Label>
                          <p className="text-sm text-muted-foreground">Share for maintenance and planning</p>
                        </div>
                        <Switch 
                          checked={preferences.privacy.shareHousingData}
                          onCheckedChange={(checked) => 
                            setPreferences({
                              ...preferences, 
                              privacy: {...preferences.privacy, shareHousingData: checked}
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Profile Visibility</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Public Profile</Label>
                          <p className="text-sm text-muted-foreground">Make your profile visible to all community members</p>
                        </div>
                        <Switch 
                          checked={preferences.privacy.publicProfile}
                          onCheckedChange={(checked) => 
                            setPreferences({
                              ...preferences, 
                              privacy: {...preferences.privacy, publicProfile: checked}
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Analytics Participation</Label>
                          <p className="text-sm text-muted-foreground">Help improve the platform with anonymous usage data</p>
                        </div>
                        <Switch 
                          checked={preferences.privacy.allowDataAnalytics}
                          onCheckedChange={(checked) => 
                            setPreferences({
                              ...preferences, 
                              privacy: {...preferences.privacy, allowDataAnalytics: checked}
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => handleSave("Privacy")} className="mt-4">
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Export & Deletion</CardTitle>
                  <CardDescription>Manage your personal data and account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export My Data
                  </Button>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI & Automation */}
          <TabsContent value="ai">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>Configure your AI-powered community assistant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable AI Assistant</Label>
                      <p className="text-sm text-muted-foreground">Get personalized recommendations and help</p>
                    </div>
                    <Switch 
                      checked={preferences.ai.enableAssistant}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          ai: {...preferences.ai, enableAssistant: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automated Optimization</Label>
                      <p className="text-sm text-muted-foreground">Allow AI to optimize your energy and housing automatically</p>
                    </div>
                    <Switch 
                      checked={preferences.ai.automatedOptimization}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          ai: {...preferences.ai, automatedOptimization: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Personalized Recommendations</Label>
                      <p className="text-sm text-muted-foreground">Receive AI-generated suggestions for community participation</p>
                    </div>
                    <Switch 
                      checked={preferences.ai.personalizedRecommendations}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          ai: {...preferences.ai, personalizedRecommendations: checked}
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning & Adaptation</CardTitle>
                  <CardDescription>Help the AI learn your preferences and improve recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Behavioral Learning</Label>
                      <p className="text-sm text-muted-foreground">Allow AI to learn from your usage patterns</p>
                    </div>
                    <Switch 
                      checked={preferences.ai.dataSharing}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          ai: {...preferences.ai, dataSharing: checked}
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>AI Interaction Frequency</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal - Only when requested</SelectItem>
                        <SelectItem value="balanced">Balanced - Regular suggestions</SelectItem>
                        <SelectItem value="proactive">Proactive - Frequent optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => handleSave("AI")} className="mt-4">
                    Save AI Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Settings */}
          <TabsContent value="community">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Participation</CardTitle>
                  <CardDescription>Configure how you interact with other community members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-join Discussions</Label>
                      <p className="text-sm text-muted-foreground">Automatically join relevant community discussions</p>
                    </div>
                    <Switch 
                      checked={preferences.community.autoJoinDiscussions}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          community: {...preferences.community, autoJoinDiscussions: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Online Status</Label>
                      <p className="text-sm text-muted-foreground">Let others see when you're active</p>
                    </div>
                    <Switch 
                      checked={preferences.community.showOnlineStatus}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          community: {...preferences.community, showOnlineStatus: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Direct Messages</Label>
                      <p className="text-sm text-muted-foreground">Allow other members to message you directly</p>
                    </div>
                    <Switch 
                      checked={preferences.community.allowDirectMessages}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          community: {...preferences.community, allowDirectMessages: checked}
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Participate in Polls</Label>
                      <p className="text-sm text-muted-foreground">Automatically participate in community governance polls</p>
                    </div>
                    <Switch 
                      checked={preferences.community.participateInPolls}
                      onCheckedChange={(checked) => 
                        setPreferences({
                          ...preferences, 
                          community: {...preferences.community, participateInPolls: checked}
                        })
                      }
                    />
                  </div>
                  <Button onClick={() => handleSave("Community")} className="mt-4">
                    Save Community Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contribution Tracking</CardTitle>
                  <CardDescription>Monitor your community contributions and impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Energy Shared</span>
                      <span>1,247 kWh</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Governance Participation</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Community Events</span>
                      <span>12 attended</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>Advanced system configuration and diagnostics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Preference</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light Mode</SelectItem>
                        <SelectItem value="dark">Dark Mode</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Data Sync Frequency</Label>
                    <Select defaultValue="realtime">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="5min">Every 5 minutes</SelectItem>
                        <SelectItem value="15min">Every 15 minutes</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Developer Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable advanced debugging features</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage local data storage and synchronization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Offline Mode</Label>
                      <p className="text-sm text-muted-foreground">Cache data for offline access</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Database className="w-4 h-4" />
                    Sync Data Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diagnostics</CardTitle>
                  <CardDescription>System health and performance monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Connection Status</Label>
                      <Badge variant="secondary" className="gap-2">
                        <Wifi className="w-3 h-3" />
                        Connected
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Sync Status</Label>
                      <Badge variant="secondary" className="gap-2">
                        <RefreshCw className="w-3 h-3" />
                        Up to date
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Download Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};