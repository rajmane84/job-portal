import Link from "next/link";
import { FileQuestion, Home, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Visual Element */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full" />
            <div className="relative bg-background border rounded-3xl p-8 shadow-sm">
              <FileQuestion className="h-12 w-12 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="text-muted-foreground text-md">
            The page you are looking for doesn&apos;t exist or has been moved to another URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild className="w-full sm:w-auto">
            <Link href="/jobs">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Browse Jobs
            </Link>
          </Button>
        </div>

        {/* Support Link */}
        <p className="text-sm text-muted-foreground">
          Think this is a mistake?{" "}
          <Link href="/contact" className="text-primary hover:underline font-medium">
            Contact Support
          </Link>
        </p>
      </div>
    </main>
  );
}