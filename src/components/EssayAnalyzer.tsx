
import { useState } from "react";
import { FileText, AlertCircle, CheckCircle, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const EssayAnalyzer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [essayText, setEssayText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(85);

  // Mock analysis results
  const analysisResults = {
    score: 87,
    grammar: 92,
    content: 85,
    organization: 84,
    feedback: [
      { type: "strength", text: "Strong thesis statement that clearly outlines the essay's purpose." },
      { type: "strength", text: "Good use of evidence to support main arguments." },
      { type: "improvement", text: "Consider adding more transitional phrases between paragraphs." },
      { type: "improvement", text: "The conclusion could be stronger by restating key points." },
      { type: "grammar", text: "Several comma splices found throughout the essay." },
    ],
    suggestionHighlights: [
      { start: 50, end: 65, type: "grammar", suggestion: "Consider restructuring this sentence for clarity." },
      { start: 120, end: 160, type: "content", suggestion: "This claim requires additional evidence or examples." },
    ],
  };

  const handleAnalyze = () => {
    if (!title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for this assessment.",
        variant: "destructive",
      });
      return;
    }

    if (!essayText.trim()) {
      toast({
        title: "Missing Content",
        description: "Please enter the essay text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "The essay has been analyzed successfully.",
      });
    }, 3000);
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your feedback has been saved and is ready to return to the student.",
    });
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setEssayText("");
    setPrompt("");
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
        <h1 className="text-2xl md:text-3xl font-bold">Essay Analyzer</h1>
        <p className="text-muted-foreground">
          Use AI to analyze and provide feedback on student essays
        </p>
      </div>

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assessment Details</CardTitle>
                <CardDescription>
                  Set up the basic information for this essay assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Essay Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Select defaultValue="english">
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="social_studies">Social Studies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="grade" className="text-sm font-medium">
                    Grade Level
                  </label>
                  <Select defaultValue="high_school">
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">Elementary</SelectItem>
                      <SelectItem value="middle_school">Middle School</SelectItem>
                      <SelectItem value="high_school">High School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium">
                    Essay Prompt (Optional)
                  </label>
                  <Textarea
                    id="prompt"
                    placeholder="Enter the prompt given to students..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Settings</CardTitle>
                <CardDescription>
                  Customize how the AI analyzes the essay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Focus Areas</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Grammar
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Structure
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Content
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Citations
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Style</label>
                  <Select defaultValue="detailed">
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="instructional">Instructional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Strictness Level</label>
                    <span className="text-xs text-muted-foreground">Medium</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Essay Content</CardTitle>
                <CardDescription>
                  Enter or paste the student's essay to analyze
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste student essay here..."
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetAnalysis}>Clear</Button>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !essayText.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <span className="mr-2">Analyzing</span>
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    </>
                  ) : (
                    "Analyze Essay"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Results</CardTitle>
                <CardDescription>
                  AI-generated assessment of the essay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-gray-50">
                  <div className="text-3xl font-bold text-primary">
                    {analysisResults.score}/100
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Overall Score</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Grammar & Spelling</span>
                      <span className="text-sm font-medium">{analysisResults.grammar}%</span>
                    </div>
                    <Progress value={analysisResults.grammar} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Content Quality</span>
                      <span className="text-sm font-medium">{analysisResults.content}%</span>
                    </div>
                    <Progress value={analysisResults.content} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Organization</span>
                      <span className="text-sm font-medium">{analysisResults.organization}%</span>
                    </div>
                    <Progress value={analysisResults.organization} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">AI Confidence</label>
                    <span className="text-xs text-muted-foreground">{confidenceScore}%</span>
                  </div>
                  <Slider 
                    defaultValue={[confidenceScore]} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => setConfidenceScore(value[0])}
                  />
                </div>
                
                <div className="pt-2">
                  <Button className="w-full" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                  <Button variant="outline" className="w-full mt-2" onClick={resetAnalysis}>
                    Start New Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="feedback">
              <TabsList className="mb-4">
                <TabsTrigger value="feedback">Key Feedback</TabsTrigger>
                <TabsTrigger value="annotated">Annotated Essay</TabsTrigger>
                <TabsTrigger value="resources">Learning Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feedback" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Feedback Details</CardTitle>
                    <CardDescription>
                      Key strengths and areas for improvement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Strengths
                      </h3>
                      {analysisResults.feedback
                        .filter((item) => item.type === "strength")
                        .map((item, index) => (
                          <div key={index} className="pl-6 border-l-2 border-green-500">
                            <p>{item.text}</p>
                          </div>
                        ))}
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                        Areas for Improvement
                      </h3>
                      {analysisResults.feedback
                        .filter((item) => item.type === "improvement")
                        .map((item, index) => (
                          <div key={index} className="pl-6 border-l-2 border-amber-500">
                            <p>{item.text}</p>
                          </div>
                        ))}
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center">
                        <HelpCircle className="mr-2 h-4 w-4 text-blue-500" />
                        Grammar & Style Notes
                      </h3>
                      {analysisResults.feedback
                        .filter((item) => item.type === "grammar")
                        .map((item, index) => (
                          <div key={index} className="pl-6 border-l-2 border-blue-500">
                            <p>{item.text}</p>
                          </div>
                        ))}
                    </div>
                    
                    <div className="mt-4">
                      <Textarea 
                        placeholder="Add your own feedback here..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="annotated" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Annotated Essay</CardTitle>
                    <CardDescription>
                      Essay with highlighted feedback and suggestions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md p-4 bg-white min-h-[400px]">
                      <div className="mb-4 flex gap-2">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          Content Issue
                        </Badge>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          Grammar Issue
                        </Badge>
                      </div>
                      <p className="whitespace-pre-line">
                        {essayText}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Resources</CardTitle>
                    <CardDescription>
                      Recommended resources based on the essay analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 bg-white">
                        <h3 className="font-medium text-lg">Grammar & Punctuation</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start">
                            <FileText className="mr-2 h-4 w-4 mt-0.5 text-primary" />
                            <span>
                              <a href="#" className="text-primary hover:underline">Avoiding Comma Splices</a>
                              <p className="text-sm text-muted-foreground">Learn how to properly join independent clauses</p>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <FileText className="mr-2 h-4 w-4 mt-0.5 text-primary" />
                            <span>
                              <a href="#" className="text-primary hover:underline">Proper Citation Formatting</a>
                              <p className="text-sm text-muted-foreground">MLA and APA citation guides</p>
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-white">
                        <h3 className="font-medium text-lg">Essay Structure</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start">
                            <FileText className="mr-2 h-4 w-4 mt-0.5 text-primary" />
                            <span>
                              <a href="#" className="text-primary hover:underline">Writing Strong Conclusions</a>
                              <p className="text-sm text-muted-foreground">Techniques for effective essay conclusions</p>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <FileText className="mr-2 h-4 w-4 mt-0.5 text-primary" />
                            <span>
                              <a href="#" className="text-primary hover:underline">Transitional Phrases</a>
                              <p className="text-sm text-muted-foreground">Improving paragraph flow with transitions</p>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayAnalyzer;
