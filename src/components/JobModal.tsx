
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] animate-scaleUp">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{job.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4 mt-2 text-gray-600">
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
            <DollarSign className="w-5 h-5 text-gray-500" />
            <span className="text-lg text-gray-700">{job.salary}</span>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => {
                  const hasSkill = userSkills.skills.includes(skill);
                  return (
                    <Badge
                      key={skill}
                      variant={hasSkill ? "default" : "secondary"}
                      className={`flex items-center gap-1 ${
                        hasSkill ? "bg-soft-green text-gray-900" : "bg-soft-orange text-gray-900"
                      }`}
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
              <h4 className="text-sm font-medium mb-2">Your Skills</h4>
              <div className="flex flex-wrap gap-2">
                {userSkills.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-gray-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative pt-2">
              <h4 className="text-sm font-medium mb-2">Match Score</h4>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    job.matchScore >= 80
                      ? "bg-soft-green"
                      : job.matchScore >= 50
                      ? "bg-soft-yellow"
                      : "bg-soft-orange"
                  }`}
                  style={{ width: `${job.matchScore}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 mt-1 block">
                {job.matchScore}% Match
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={handleApply}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
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
