import { UserSidebar } from "@/components/user-sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <UserSidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b md:hidden">
          <div className="flex items-center px-4 md:px-6 py-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 h-full">
                <VisuallyHidden>
                  <SheetTitle>Sidebar Navigation</SheetTitle>
                </VisuallyHidden>
                <UserSidebar />
              </SheetContent>
            </Sheet>
            {/* You can add more header content here if needed */}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
} 