
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  title: string;
  description: string;
  type: "essay" | "quiz" | "report";
  status: "draft" | "active" | "graded" | "completed";
  progress?: number;
  date?: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

const AssessmentCard = ({
  title,
  description,
  type,
  status,
  progress = 0,
  date,
  icon,
  onClick,
  className,
}: AssessmentCardProps) => {
  const statusColors = {
    draft: "bg-gray-200 text-gray-800",
    active: "bg-blue-100 text-blue-800",
    graded: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
  };

  const typeColors = {
    essay: "bg-secondary bg-opacity-10 text-secondary",
    quiz: "bg-accent bg-opacity-10 text-accent",
    report: "bg-primary bg-opacity-10 text-primary",
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden assess-hover cursor-pointer border",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className={cn("p-2 rounded-md", typeColors[type])}>
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-sm mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {progress > 0 && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Progress</span>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
      {date && (
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">
            {date}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default AssessmentCard;
