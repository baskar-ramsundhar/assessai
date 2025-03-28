
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, User, Settings, FileText, Bell, Shield, HelpCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Teacher",
    bio: "Mathematics teacher with 8 years of experience specializing in advanced algebra and calculus. Passionate about using technology to improve student outcomes.",
    school: "Lincoln High School",
    department: "Mathematics",
    notifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const recentActivity = [
    { id: 1, type: "essay", title: "Literary Analysis Essay", date: "Today, 2:45 PM", status: "graded" },
    { id: 2, type: "quiz", title: "Calculus Quiz #3", date: "Yesterday, 10:20 AM", status: "active" },
    { id: 3, type: "report", title: "Class Performance Analysis", date: "Oct 15, 2023", status: "completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-xl">JS</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <CardTitle className="text-xl">{formData.name}</CardTitle>
                    <CardDescription>{formData.email}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    {formData.role}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <User size={18} />
                    <span className="text-sm font-medium">Profile</span>
                  </div>
                  <div className="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <FileText size={18} />
                    <span className="text-sm font-medium">My Assessments</span>
                  </div>
                  <div className="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <BookOpen size={18} />
                    <span className="text-sm font-medium">Courses</span>
                  </div>
                  <div className="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <Bell size={18} />
                    <span className="text-sm font-medium">Notifications</span>
                  </div>
                  <div className="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <Settings size={18} />
                    <span className="text-sm font-medium">Settings</span>
                  </div>
                  <div className="flex items-center space-x-3 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <HelpCircle size={18} />
                    <span className="text-sm font-medium">Help & Support</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-destructive">
                  Log Out
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information and settings</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <Button variant="default" onClick={handleSave}>
                        Save Changes
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{formData.name}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{formData.email}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="school">School/Institution</Label>
                        {isEditing ? (
                          <Input 
                            id="school" 
                            name="school" 
                            value={formData.school} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{formData.school}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        {isEditing ? (
                          <Input 
                            id="department" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{formData.department}</div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea 
                          id="bio" 
                          name="bio" 
                          value={formData.bio} 
                          onChange={handleChange} 
                          rows={4} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50 min-h-[100px]">{formData.bio}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest assessments and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((item) => (
                        <div key={item.id} className="flex items-start border-b last:border-0 pb-4 last:pb-0">
                          <div className={`p-2 rounded-md mr-3 ${
                            item.type === "essay" ? "bg-secondary bg-opacity-10 text-secondary" :
                            item.type === "quiz" ? "bg-accent bg-opacity-10 text-accent" : 
                            "bg-primary bg-opacity-10 text-primary"
                          }`}>
                            {item.type === "essay" ? <FileText size={20} /> : 
                             item.type === "quiz" ? <BookOpen size={20} /> : 
                             <Shield size={20} />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                              </div>
                              <Badge className={
                                item.status === "graded" ? "bg-green-100 text-green-800" :
                                item.status === "active" ? "bg-blue-100 text-blue-800" :
                                "bg-purple-100 text-purple-800"
                              }>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Activity</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                    <CardDescription>Manage your account settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">Email Notifications</h4>
                        <p className="text-xs text-muted-foreground">Receive email updates about your assessments</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={formData.notifications ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, notifications: true }))}
                        >
                          On
                        </Button>
                        <Button 
                          variant={!formData.notifications ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, notifications: false }))}
                        >
                          Off
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Connected Accounts</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">G</div>
                            <div>
                              <p className="text-sm font-medium">Google</p>
                              <p className="text-xs text-muted-foreground">Connect to your Google account</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">M</div>
                            <div>
                              <p className="text-sm font-medium">Microsoft</p>
                              <p className="text-xs text-muted-foreground">Connect to your Microsoft account</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Account Security</h4>
                      <div className="space-y-3">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Shield className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          Two-Factor Authentication
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
