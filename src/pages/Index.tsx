
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/services/jobService";
import { Job } from "@/types/job";
import JobCard from "@/components/JobCard";
import JobModal from "@/components/JobModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const Index = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDark, setIsDark] = useState(false);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 bg-background hover:bg-accent transition-colors duration-200"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </Button>
        </div>

        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Job Matches
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities that match your skills and experience. Our AI-powered system
            finds the best jobs for you.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card rounded-xl p-6 shadow-sm border border-border">
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
