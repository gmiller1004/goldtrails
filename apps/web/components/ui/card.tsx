import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-secondary/80 bg-white text-foreground shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("space-y-1.5 p-6 pb-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={cn("text-lg font-semibold leading-tight", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
