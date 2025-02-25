
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCard = ({ job, onViewDetails }: JobCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-soft-green';
    if (score >= 50) return 'bg-soft-yellow';
    return 'bg-soft-orange';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 animate-scaleUp">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{job.location}</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className={`${getScoreColor(job.matchScore)} text-gray-900`}>
          {job.matchScore}% Match
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{job.salary}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.requiredSkills.map((skill) => (
          <Badge key={skill} variant="outline" className="bg-gray-50">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="relative pt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getScoreColor(job.matchScore)}`}
            style={{ width: `${job.matchScore}%` }}
          />
        </div>
      </div>

      <div className="mt-4">
        <Button 
          onClick={() => onViewDetails(job)}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
