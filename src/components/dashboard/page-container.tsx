"use client";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function PageContainer({
  children,
  title,
  description,
}: PageContainerProps) {
  return (
    <div className="flex flex-col w-full h-full relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* Scrollable content area */}
      <div className="flex-1 overflow-auto relative">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          {title && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1 max-w-3xl">
                  {description}
                </p>
              )}
              <div className="h-1 w-20 bg-primary/20 mt-4 rounded-full" />
            </div>
          )}
          <div className="animate-in fade-in duration-500">{children}</div>
        </div>
      </div>
    </div>
  );
}
