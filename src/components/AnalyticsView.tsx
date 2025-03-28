
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Download, Users, FileText, CheckSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useToast } from "@/components/ui/use-toast";

const AnalyticsView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeView, setActiveView] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  // Mock data for analytics
  const overviewData = [
    { name: "Week 1", essays: 12, quizzes: 8 },
    { name: "Week 2", essays: 18, quizzes: 15 },
    { name: "Week 3", essays: 24, quizzes: 18 },
    { name: "Week 4", essays: 27, quizzes: 22 },
  ];

  const gradeDistribution = [
    { name: "A", value: 35 },
    { name: "B", value: 40 },
    { name: "C", value: 15 },
    { name: "D", value: 7 },
    { name: "F", value: 3 },
  ];

  const studentPerformance = [
    { name: "Student 1", quiz: 85, essay: 78 },
    { name: "Student 2", quiz: 90, essay: 92 },
    { name: "Student 3", quiz: 75, essay: 82 },
    { name: "Student 4", quiz: 88, essay: 85 },
    { name: "Student 5", quiz: 82, essay: 79 },
  ];

  const subjectPerformance = [
    { name: "Math", average: 82 },
    { name: "Science", average: 85 },
    { name: "English", average: 78 },
    { name: "History", average: 81 },
  ];

  const questionAnalysis = [
    { name: "Q1", correct: 85, incorrect: 15 },
    { name: "Q2", correct: 62, incorrect: 38 },
    { name: "Q3", correct: 78, incorrect: 22 },
    { name: "Q4", correct: 45, incorrect: 55 },
    { name: "Q5", correct: 92, incorrect: 8 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Your analytics data is being prepared for export.",
    });
    // In a real app, this would trigger a data download
  };

  return (
    <div className="container mx-auto px-4 pb-12 pt-20 md:pt-24 animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="gap-2 mb-4 p-0 hover:bg-transparent"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics on student performance and assessment data
            </p>
          </div>
          <Button onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 rounded-full p-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <h4 className="text-2xl font-bold">124</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 rounded-full p-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quizzes Taken</p>
              <h4 className="text-2xl font-bold">87</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-purple-100 rounded-full p-2">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Essays Graded</p>
              <h4 className="text-2xl font-bold">56</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-amber-100 rounded-full p-2">
              <BarChart3 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Score</p>
              <h4 className="text-2xl font-bold">84%</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="bg-white border rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Course</label>
              <Select
                value={selectedCourse}
                onValueChange={setSelectedCourse}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="english101">English 101</SelectItem>
                  <SelectItem value="math202">Math 202</SelectItem>
                  <SelectItem value="history301">History 301</SelectItem>
                  <SelectItem value="science101">Science 101</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Time Range</label>
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Assessment Type</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quiz">Quizzes</SelectItem>
                  <SelectItem value="essay">Essays</SelectItem>
                  <SelectItem value="exam">Exams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="student">Student Performance</TabsTrigger>
            <TabsTrigger value="assessment">Assessment Analysis</TabsTrigger>
            <TabsTrigger value="subject">Subject Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Activity</CardTitle>
                  <CardDescription>
                    Number of essays and quizzes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={overviewData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="essays" fill="#8884d8" name="Essays" />
                        <Bar dataKey="quizzes" fill="#82ca9d" name="Quizzes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grade Distribution</CardTitle>
                  <CardDescription>
                    Overall distribution of grades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={gradeDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="student">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Student Performance</CardTitle>
                  <CardDescription>
                    Student scores across different assessment types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: "100%", height: 400 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={studentPerformance}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quiz" fill="#8884d8" name="Quiz Score" />
                        <Bar dataKey="essay" fill="#82ca9d" name="Essay Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessment">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Question Analysis</CardTitle>
                  <CardDescription>
                    Performance breakdown by question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: "100%", height: 400 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={questionAnalysis}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        barSize={35}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="correct" stackId="a" fill="#82ca9d" name="Correct %" />
                        <Bar dataKey="incorrect" stackId="a" fill="#ff8884" name="Incorrect %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-4 border rounded-md bg-amber-50">
                    <h4 className="font-medium mb-2">Key Insights</h4>
                    <ul className="text-sm space-y-1">
                      <li>Question 4 had the lowest correct response rate (45%)</li>
                      <li>Question 5 had the highest correct response rate (92%)</li>
                      <li>Overall average correct response: 72.4%</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subject">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subject Performance</CardTitle>
                  <CardDescription>
                    Average scores across different subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ width: "100%", height: 400 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={subjectPerformance}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        barSize={60}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" fill="#0088FE" name="Average Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-4 border rounded-md bg-blue-50">
                    <h4 className="font-medium mb-2">Subject Insights</h4>
                    <ul className="text-sm space-y-1">
                      <li>Science has the highest average performance (85%)</li>
                      <li>English has the lowest average performance (78%)</li>
                      <li>Overall subject average: 81.5%</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsView;
