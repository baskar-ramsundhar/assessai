
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Assess<span className="text-primary">AI</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-4 mr-4">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              to="/essay-analyzer"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              Essay Analyzer
            </Link>
            <Link
              to="/quiz-creator"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              Quiz Creator
            </Link>
            <Link
              to="/analytics"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              Analytics
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-white w-full`}
      >
        <ul className="flex flex-col mt-4 font-medium">
          <li>
            <Link
              to="/"
              className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/essay-analyzer"
              className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Essay Analyzer
            </Link>
          </li>
          <li>
            <Link
              to="/quiz-creator"
              className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quiz Creator
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
          </li>
          <li className="mt-2">
            <Link
              to="/profile"
              className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </li>
          <li className="border-t border-gray-200 mt-2 pt-2">
            <button
              className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 rounded w-full text-left"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
