import { useAuth } from "@/Utils/custom-hooks/useAuth/useAuth";
import {
  Bell,
  House,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  User,
  UserRound,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const Navbar = () => {
  const { setToken, userData } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/sign-in");
  };
  const baseLinkStyles =
    "relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5";

  const activeStyles = "bg-white text-[#1f6fe5] shadow-sm";

  const inactiveStyles =
    "text-slate-600 hover:bg-white/90 hover:text-slate-900";
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">
        <Logo
          textColor="text-[#1f6fe5]"
          bgColor="bg-[#1f6fe5]/10"
          borderColor="border-[#1f6fe5]/20"
        />

        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `${baseLinkStyles} ${isActive ? activeStyles : inactiveStyles}`
            }
          >
            <House size={20} />
            <span className="hidden sm:inline">Feed</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${baseLinkStyles} ${isActive ? activeStyles : inactiveStyles}`
            }
          >
            <User size={20} />
            <span className="hidden sm:inline">Profile</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `${baseLinkStyles} ${isActive ? activeStyles : inactiveStyles}`
            }
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Notifications</span>
          </NavLink>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100 outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    userData?.data?.user.photo ||
                    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                  }
                  alt={userData?.data?.user.name}
                />
                <AvatarFallback>MF</AvatarFallback>
              </Avatar>
              <span className="hidden max-w-35 truncate text-sm font-semibold text-slate-800 md:block">
                {userData?.data?.user.name}
              </span>
              <Menu size={15} className="text-slate-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer py-2 focus:bg-slate-50"
              >
                <Link to="/profile" className="flex items-center w-full">
                  <UserRound className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="font-medium">Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer py-2 focus:bg-slate-50"
              >
                <Link to="/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="font-medium">Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/notifications" className="flex items-center w-full">
                  <Bell className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="font-medium">Notifications</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
