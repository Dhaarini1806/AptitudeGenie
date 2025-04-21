
import { ThemeToggle } from "../shared/ThemeToggle";

export function Footer() {
  return (
    <footer className="w-full py-4 px-6 border-t">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aptitude Genie - Improve Your Aptitude Skills
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">Toggle theme:</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
