
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { userSkills } from "@/services/jobService";
import { toast } from "@/hooks/use-toast";
import { MapPin, Building2, DollarSign, CheckCircle2, XCircle } from 'lucide-react';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobModal = ({ job, isOpen, onClose }: JobModalProps) => {
  if (!job) return null;

  const missingSkills = job.requiredSkills.filter(
    (skill) => !userSkills.skills.includes(skill)
  );

  const handleApply = () => {
    if (missingSkills.length > 0) {
      toast({
        title: "Missing Required Skills",
        description: `Consider learning: ${missingSkills.join(", ")}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted!",
      });
      onClose();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-soft-green dark:bg-emerald-800/30';
    if (score >= 50) return 'bg-soft-yellow dark:bg-amber-800/30';
    return 'bg-soft-orange dark:bg-red-800/30';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] animate-scaleUp bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-card-foreground">
            {job.title}
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg text-card-foreground">{job.salary}</span>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2 text-card-foreground">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => {
                  const hasSkill = userSkills.skills.includes(skill);
                  return (
                    <Badge
                      key={skill}
                      variant={hasSkill ? "default" : "secondary"}
                      className={`flex items-center gap-1 ${
                        hasSkill ? "bg-soft-green dark:bg-emerald-800/30" : "bg-soft-orange dark:bg-red-800/30"
                      } text-foreground transition-colors duration-200`}
                    >
                      {hasSkill ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {skill}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 text-card-foreground">Your Skills</h4>
              <div className="flex flex-wrap gap-2">
                {userSkills.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline" 
                    className="bg-background/50 dark:bg-background/10"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative pt-2">
              <h4 className="text-sm font-medium mb-2 text-card-foreground">Match Score</h4>
              <div className="w-full bg-accent rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getScoreColor(job.matchScore)}`}
                  style={{ width: `${job.matchScore}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground mt-1 block">
                {job.matchScore}% Match
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={handleApply}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
