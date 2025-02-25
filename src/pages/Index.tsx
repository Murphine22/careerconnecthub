
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/services/jobService";
import { Job } from "@/types/job";
import JobCard from "@/components/JobCard";
import JobModal from "@/components/JobModal";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">Job Matches</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover opportunities that match your skills and experience. Our AI-powered system
            finds the best jobs for you.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl p-6 shadow-sm">
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-2 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs?.map((job) => (
              <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}

        <JobModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Index;
