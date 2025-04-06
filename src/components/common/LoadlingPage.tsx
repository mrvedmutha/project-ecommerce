import React from "react";
import { Progress } from "@/components/ui/progress";

const Loading = () => {
  const [progress, setProgress] = React.useState(40);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <Progress value={progress} className="w-96" />
    </div>
  );
};

export default Loading;
