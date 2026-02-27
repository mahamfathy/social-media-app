import { Bookmark, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DropdownPost = ({ myPost }: { myPost: boolean }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 outline-none">
            <MoreHorizontal size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 rounded-xl shadow-lg border-slate-200"
        >
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer">
            <Bookmark size={15} />
            Save post
          </DropdownMenuItem>
          {myPost && (
            <>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-semibold text-slate-700 cursor-pointer">
                <Pencil size={15} />
                Edit post
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 font-semibold text-rose-600 cursor-pointer focus:text-rose-600 focus:bg-rose-50">
                <Trash2 size={15} className="text-rose-600" />
                Delete post
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownPost;
