import { Card } from "@/components/ui/card";

const SkeletonCard = () => {
  return (
    <Card className="p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3 sm:mb-4">
        <div className="flex-1 w-full">
          <div className="h-6 bg-muted rounded w-32 mb-2"></div>
          <div className="h-10 bg-muted rounded w-40"></div>
        </div>
        <div className="h-10 bg-muted rounded w-24"></div>
      </div>

      <div className="space-y-1.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 px-2.5 py-3 rounded-md border border-border/40"
          >
            <div className="h-4 bg-muted rounded flex-1"></div>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="h-6 bg-muted rounded w-12"></div>
              <div className="h-6 bg-muted rounded w-10"></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkeletonCard;
