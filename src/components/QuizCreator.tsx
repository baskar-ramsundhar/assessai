
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckSquare, 
  Plus, 
  Trash, 
  Edit, 
  MoveUp,
  MoveDown,
  Layers, 
  Copy,
  FileText,
  Save,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "short_answer" | "essay";
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}

const QuizCreator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizTitle, setQuizTitle] = useState("New Quiz");
  const [quizDescription, setQuizDescription] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "q1",
      type: "multiple_choice",
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
      points: 10,
    },
    {
      id: "q2",
      type: "true_false",
      question: "The Earth revolves around the Sun.",
      options: ["True", "False"],
      correctAnswer: "True",
      points: 5,
    },
    {
      id: "q3",
      type: "short_answer",
      question: "What does DNA stand for?",
      correctAnswer: "Deoxyribonucleic Acid",
      points: 15,
    },
  ]);

  const [newQuestion, setNewQuestion] = useState<Partial<QuizQuestion>>({
    type: "multiple_choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 10,
  });

  const addQuestion = () => {
    if (!newQuestion.question) {
      toast({
        title: "Missing Information",
        description: "Please enter a question.",
        variant: "destructive",
      });
      return;
    }

    if (
      newQuestion.type === "multiple_choice" &&
      (!newQuestion.options || newQuestion.options.some((opt) => !opt))
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all answer options.",
        variant: "destructive",
      });
      return;
    }

    if (!newQuestion.correctAnswer && newQuestion.type !== "essay") {
      toast({
        title: "Missing Information",
        description: "Please select a correct answer.",
        variant: "destructive",
      });
      return;
    }

    const newId = `q${Date.now()}`;
    setQuestions([
      ...questions,
      {
        ...newQuestion as QuizQuestion,
        id: newId,
      },
    ]);

    setSelectedQuestion(newId);
    
    // Reset new question form
    setNewQuestion({
      type: "multiple_choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 10,
    });

    toast({
      title: "Question Added",
      description: "Your question has been added to the quiz.",
    });
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    if (selectedQuestion === id) {
      setSelectedQuestion(null);
    }
    toast({
      title: "Question Deleted",
      description: "The question has been removed from the quiz.",
    });
  };

  const duplicateQuestion = (question: QuizQuestion) => {
    const newId = `q${Date.now()}`;
    const duplicatedQuestion = {
      ...question,
      id: newId,
      question: `${question.question} (Copy)`,
    };
    setQuestions([...questions, duplicatedQuestion]);
    setSelectedQuestion(newId);
    toast({
      title: "Question Duplicated",
      description: "A copy of the question has been added to the quiz.",
    });
  };

  const moveQuestion = (id: string, direction: "up" | "down") => {
    const index = questions.findIndex((q) => q.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...questions];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newQuestions[index], newQuestions[newIndex]] = [
      newQuestions[newIndex],
      newQuestions[index],
    ];
    setQuestions(newQuestions);
  };

  const updateQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!newQuestion.options) return;
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setNewQuestion({ ...newQuestion, correctAnswer: value });
  };

  const handleMultipleCorrectAnswers = (value: string, checked: boolean) => {
    const currentAnswers = (newQuestion.correctAnswer as string[]) || [];
    let newAnswers: string[];

    if (checked) {
      newAnswers = [...currentAnswers, value];
    } else {
      newAnswers = currentAnswers.filter((a) => a !== value);
    }

    setNewQuestion({ ...newQuestion, correctAnswer: newAnswers });
  };

  const handleTypeChange = (type: string) => {
    let options;
    let correctAnswer;

    switch (type) {
      case "multiple_choice":
        options = ["", "", "", ""];
        correctAnswer = "";
        break;
      case "true_false":
        options = ["True", "False"];
        correctAnswer = "True";
        break;
      case "short_answer":
      case "essay":
        options = undefined;
        correctAnswer = type === "essay" ? undefined : "";
        break;
      default:
        options = ["", "", "", ""];
        correctAnswer = "";
    }

    setNewQuestion({
      ...newQuestion,
      type: type as QuizQuestion["type"],
      options,
      correctAnswer,
    });
  };

  const saveQuiz = () => {
    if (!quizTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for this quiz.",
        variant: "destructive",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please add at least one question to the quiz.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Quiz Saved",
      description: "Your quiz has been saved successfully.",
    });

    // Here we would typically save to a database
    // For now, we'll just redirect to the dashboard
    setTimeout(() => navigate("/"), 1500);
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
        <h1 className="text-2xl md:text-3xl font-bold">Quiz Creator</h1>
        <p className="text-muted-foreground">
          Create and manage automatically graded quizzes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input
                  id="quiz-title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Enter quiz title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quiz-description">Description</Label>
                <Textarea
                  id="quiz-description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Enter quiz description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select defaultValue="general">
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                <Input id="time-limit" type="number" defaultValue={30} min={1} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="randomize-questions">Randomize Questions</Label>
                <Switch id="randomize-questions" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-answers">Show Answers After Submission</Label>
                <Switch id="show-answers" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveQuiz} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Quiz
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Question Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedQuestion === question.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedQuestion(question.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2">
                          {index + 1}
                        </span>
                        <div className="overflow-hidden">
                          <p className="font-medium text-sm truncate max-w-[180px]">
                            {question.question}
                          </p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs">
                              {question.type.replace("_", " ")}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-2">
                              {question.points} pts
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteQuestion(question.id);
                          }}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {questions.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No questions added yet
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Implement import functionality
                  toast({
                    title: "Coming Soon",
                    description: "Import functionality will be available soon.",
                  });
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Import
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedQuestion(null);
                  document.getElementById("new-question-tab")?.click();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Question Editor */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <Tabs defaultValue="new" className="h-full flex flex-col">
              <div className="px-6 pt-6">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="new" id="new-question-tab">New Question</TabsTrigger>
                  <TabsTrigger 
                    value="edit" 
                    disabled={!selectedQuestion}
                  >
                    Edit Question
                  </TabsTrigger>
                  <TabsTrigger value="preview">Preview Quiz</TabsTrigger>
                </TabsList>
              </div>

              <CardContent className="flex-grow overflow-auto pt-0">
                <TabsContent value="new" className="h-full">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="question-type">Question Type</Label>
                      <Select 
                        value={newQuestion.type} 
                        onValueChange={handleTypeChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                          <SelectItem value="true_false">True/False</SelectItem>
                          <SelectItem value="short_answer">Short Answer</SelectItem>
                          <SelectItem value="essay">Essay Question</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="question-text">Question</Label>
                      <Textarea
                        id="question-text"
                        placeholder="Enter your question here"
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="question-points">Points</Label>
                      <Input
                        id="question-points"
                        type="number"
                        value={newQuestion.points}
                        onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 0 })}
                        min={1}
                        max={100}
                      />
                    </div>
                    
                    {(newQuestion.type === "multiple_choice" || newQuestion.type === "true_false") && (
                      <div className="space-y-4">
                        <Label>Answer Options</Label>
                        {newQuestion.type === "multiple_choice" ? (
                          <RadioGroup 
                            value={newQuestion.correctAnswer as string} 
                            onValueChange={handleCorrectAnswerChange}
                          >
                            {newQuestion.options?.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value={option || `option-${index}`} id={`option-${index}`} disabled={!option} />
                                <Input
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                  placeholder={`Option ${index + 1}`}
                                  className="flex-1"
                                />
                                {index > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      const newOptions = [...(newQuestion.options || [])];
                                      newOptions.splice(index, 1);
                                      setNewQuestion({ ...newQuestion, options: newOptions });
                                    }}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <RadioGroup 
                            value={newQuestion.correctAnswer as string}
                            onValueChange={handleCorrectAnswerChange}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value="True" id="true" />
                              <Label htmlFor="true">True</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="False" id="false" />
                              <Label htmlFor="false">False</Label>
                            </div>
                          </RadioGroup>
                        )}
                        
                        {newQuestion.type === "multiple_choice" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!newQuestion.options) return;
                              setNewQuestion({
                                ...newQuestion,
                                options: [...newQuestion.options, ""],
                              });
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Option
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {newQuestion.type === "short_answer" && (
                      <div className="space-y-2">
                        <Label htmlFor="correct-answer">Correct Answer</Label>
                        <Input
                          id="correct-answer"
                          placeholder="Enter the correct answer"
                          value={newQuestion.correctAnswer as string}
                          onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Students will need to enter this exact answer to be marked correct.
                        </p>
                      </div>
                    )}
                    
                    {newQuestion.type === "essay" && (
                      <div className="rounded-md border p-4 bg-amber-50 text-amber-800">
                        <p className="text-sm">
                          Essay questions will be marked manually or using AI assistance. 
                          Students will see a text area to enter their response.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="edit" className="h-full">
                  {selectedQuestion ? (
                    <div className="space-y-4">
                      {(() => {
                        const question = questions.find((q) => q.id === selectedQuestion);
                        if (!question) return null;
                        
                        return (
                          <>
                            <div className="flex justify-between">
                              <Badge>
                                {question.type.replace("_", " ")}
                              </Badge>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => moveQuestion(question.id, "up")}
                                >
                                  <MoveUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => moveQuestion(question.id, "down")}
                                >
                                  <MoveDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => duplicateQuestion(question)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteQuestion(question.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-question">Question</Label>
                              <Textarea
                                id="edit-question"
                                value={question.question}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    question: e.target.value,
                                  })
                                }
                                rows={3}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-points">Points</Label>
                              <Input
                                id="edit-points"
                                type="number"
                                value={question.points}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    points: parseInt(e.target.value) || 0,
                                  })
                                }
                                min={1}
                                max={100}
                              />
                            </div>
                            
                            {(question.type === "multiple_choice" ||
                              question.type === "true_false") && (
                              <div className="space-y-2">
                                <Label>Answer Options</Label>
                                <RadioGroup
                                  value={question.correctAnswer as string}
                                  onValueChange={(value) =>
                                    updateQuestion(question.id, {
                                      correctAnswer: value,
                                    })
                                  }
                                >
                                  {question.options?.map((option, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-2 mb-2"
                                    >
                                      <RadioGroupItem
                                        value={option}
                                        id={`edit-option-${index}`}
                                      />
                                      <Input
                                        value={option}
                                        onChange={(e) => {
                                          const newOptions = [...(question.options || [])];
                                          newOptions[index] = e.target.value;
                                          updateQuestion(question.id, {
                                            options: newOptions,
                                          });
                                        }}
                                        className="flex-1"
                                      />
                                      {question.type === "multiple_choice" &&
                                        question.options!.length > 2 && (
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => {
                                              const newOptions = [...(question.options || [])];
                                              newOptions.splice(index, 1);
                                              updateQuestion(question.id, {
                                                options: newOptions,
                                              });
                                            }}
                                          >
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        )}
                                    </div>
                                  ))}
                                </RadioGroup>
                                
                                {question.type === "multiple_choice" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      updateQuestion(question.id, {
                                        options: [...(question.options || []), ""],
                                      });
                                    }}
                                  >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Option
                                  </Button>
                                )}
                              </div>
                            )}
                            
                            {question.type === "short_answer" && (
                              <div className="space-y-2">
                                <Label htmlFor="edit-correct-answer">
                                  Correct Answer
                                </Label>
                                <Input
                                  id="edit-correct-answer"
                                  value={question.correctAnswer as string}
                                  onChange={(e) =>
                                    updateQuestion(question.id, {
                                      correctAnswer: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-8">
                      <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Question Selected</h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        Select a question from the list to edit it, or create a new question.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="preview" className="h-full">
                  <div className="rounded-lg border p-4 mb-4">
                    <h2 className="text-xl font-bold mb-1">{quizTitle}</h2>
                    {quizDescription && <p className="text-muted-foreground mb-4">{quizDescription}</p>}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-4">Total Questions: {questions.length}</span>
                      <span>Total Points: {questions.reduce((sum, q) => sum + q.points, 0)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <div key={question.id} className="rounded-lg border p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium">
                            Question {index + 1}: <span>{question.question}</span>
                          </h3>
                          <Badge>{question.points} pts</Badge>
                        </div>
                        
                        {(question.type === "multiple_choice" || question.type === "true_false") && (
                          <div className="space-y-2 ml-4">
                            {question.options?.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={option}
                                  id={`preview-${question.id}-${optIndex}`}
                                  disabled
                                  checked={option === question.correctAnswer}
                                />
                                <Label htmlFor={`preview-${question.id}-${optIndex}`}>{option}</Label>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {question.type === "short_answer" && (
                          <div className="ml-4">
                            <Input disabled placeholder="Student answer" className="mb-2" />
                            <div className="text-sm">
                              <span className="font-medium">Correct Answer: </span>
                              {question.correctAnswer as string}
                            </div>
                          </div>
                        )}
                        
                        {question.type === "essay" && (
                          <div className="ml-4">
                            <Textarea disabled placeholder="Student will write their essay here..." rows={3} />
                            <div className="text-sm mt-2 text-muted-foreground">
                              This question will be graded manually or with AI assistance.
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {questions.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <h3 className="text-lg font-medium mb-2">No Questions Added</h3>
                        <p>Add questions to preview your quiz.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </CardContent>
              
              <CardFooter className="border-t flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Reset current form
                    if (document.getElementById("new-question-tab")?.getAttribute("data-state") === "active") {
                      setNewQuestion({
                        type: "multiple_choice",
                        question: "",
                        options: ["", "", "", ""],
                        correctAnswer: "",
                        points: 10,
                      });
                    } else {
                      setSelectedQuestion(null);
                    }
                  }}
                >
                  Clear
                </Button>
                
                {document.getElementById("new-question-tab")?.getAttribute("data-state") === "active" ? (
                  <Button onClick={addQuestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                ) : (
                  <Button onClick={saveQuiz}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Quiz
                  </Button>
                )}
              </CardFooter>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator;
