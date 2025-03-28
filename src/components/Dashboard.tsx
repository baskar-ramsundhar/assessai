
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CheckSquare, BarChart3, Plus, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssessmentCard from "./AssessmentCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recent");

  // Mock data for recent assessments
  const recentAssessments = [
    {
      id: 1,
      title: "Literary Analysis Essay",
      description: "English 101: Character Analysis of Atticus Finch",
      type: "essay" as const,
      status: "active" as const,
      progress: 0,
      date: "Created today",
      icon: <FileText size={18} />,
    },
    {
      id: 2,
      title: "Midterm Physics Quiz",
      description: "Physics 202: Mechanics and Thermodynamics",
      type: "quiz" as const,
      status: "draft" as const,
      progress: 60,
      date: "Last edited 2 days ago",
      icon: <CheckSquare size={18} />,
    },
    {
      id: 3,
      title: "World History Report",
      description: "History 301: Analysis of WW2 Events",
      type: "essay" as const,
      status: "graded" as const,
      progress: 100,
      date: "Graded on May 12, 2023",
      icon: <FileText size={18} />,
    },
    {
      id: 4,
      title: "Biology Quiz",
      description: "Biology 101: Cell Structure",
      type: "quiz" as const,
      status: "completed" as const,
      progress: 100,
      date: "Completed on May 5, 2023",
      icon: <CheckSquare size={18} />,
    },
  ];

  const handleCardClick = (assessment: any) => {
    if (assessment.type === "essay") {
      navigate("/essay-analyzer");
    } else if (assessment.type === "quiz") {
      navigate("/quiz-creator");
    }
  };

  // Stats data
  const stats = [
    {
      title: "Total Students",
      value: "124",
      change: "+12%",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Assessments Created",
      value: "38",
      change: "+24%",
      icon: <CheckSquare className="h-4 w-4" />,
    },
    {
      title: "Essays Graded",
      value: "187",
      change: "+41%",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Courses",
      value: "8",
      change: "+2",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 pb-12 pt-20 md:pt-24 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Hello, Professor</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your assessments
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate("/essay-analyzer")} 
            variant="outline" 
            className="hidden md:flex"
          >
            <FileText className="mr-2 h-4 w-4" />
            New Essay
          </Button>
          <Button 
            onClick={() => navigate("/quiz-creator")} 
            variant="outline" 
            className="hidden md:flex"
          >
            <CheckSquare className="mr-2 h-4 w-4" />
            New Quiz
          </Button>
          <Button onClick={() => navigate("/quiz-creator")}>
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Create Assessment</span>
            <span className="md:hidden">New</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 border shadow-sm assess-hover"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 text-xs font-medium text-green-600">
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Recent Assessments */}
      <div className="mb-8">
        <Tabs defaultValue="recent" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Your Assessments</h2>
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="graded">Graded</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recentAssessments.map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  title={assessment.title}
                  description={assessment.description}
                  type={assessment.type}
                  status={assessment.status}
                  progress={assessment.progress}
                  date={assessment.date}
                  icon={assessment.icon}
                  onClick={() => handleCardClick(assessment)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="draft" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recentAssessments
                .filter((a) => a.status === "draft")
                .map((assessment) => (
                  <AssessmentCard
                    key={assessment.id}
                    title={assessment.title}
                    description={assessment.description}
                    type={assessment.type}
                    status={assessment.status}
                    progress={assessment.progress}
                    date={assessment.date}
                    icon={assessment.icon}
                    onClick={() => handleCardClick(assessment)}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recentAssessments
                .filter((a) => a.status === "active")
                .map((assessment) => (
                  <AssessmentCard
                    key={assessment.id}
                    title={assessment.title}
                    description={assessment.description}
                    type={assessment.type}
                    status={assessment.status}
                    progress={assessment.progress}
                    date={assessment.date}
                    icon={assessment.icon}
                    onClick={() => handleCardClick(assessment)}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="graded" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recentAssessments
                .filter((a) => a.status === "graded" || a.status === "completed")
                .map((assessment) => (
                  <AssessmentCard
                    key={assessment.id}
                    title={assessment.title}
                    description={assessment.description}
                    type={assessment.type}
                    status={assessment.status}
                    progress={assessment.progress}
                    date={assessment.date}
                    icon={assessment.icon}
                    onClick={() => handleCardClick(assessment)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="flex justify-center items-center h-24 text-lg"
            onClick={() => navigate("/essay-analyzer")}
          >
            <div className="flex flex-col items-center">
              <FileText className="h-8 w-8 mb-2" />
              <span>Grade Essays</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="flex justify-center items-center h-24 text-lg"
            onClick={() => navigate("/quiz-creator")}
          >
            <div className="flex flex-col items-center">
              <CheckSquare className="h-8 w-8 mb-2" />
              <span>Create Quiz</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="flex justify-center items-center h-24 text-lg"
            onClick={() => navigate("/analytics")}
          >
            <div className="flex flex-col items-center">
              <BarChart3 className="h-8 w-8 mb-2" />
              <span>View Analytics</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
