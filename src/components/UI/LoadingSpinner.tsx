export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-[3px] border-border-light border-t-primary animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-[3px] border-transparent border-b-accent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <p className="text-text-secondary text-sm font-medium">{message}</p>
    </div>
  );
}

