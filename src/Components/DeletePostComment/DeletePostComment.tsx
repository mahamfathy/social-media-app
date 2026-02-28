import { Loader2, TriangleAlert, X } from "lucide-react";
interface DeletePostCommentProps {
  setShowDeleteModal: (show: boolean) => void;
  confirmDelete: () => void;
  isDeleting: boolean;
  type: "post" | "comment";
}
const DeletePostComment = ({
  setShowDeleteModal,
  confirmDelete,
  isDeleting,
  type,
}: DeletePostCommentProps) => {
  return (
    <>
      <div className="fixed inset-0 z-90 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-130 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h4 className="text-base font-extrabold text-slate-900">
              Confirm delete
            </h4>
            <button
              onClick={() => setShowDeleteModal(false)}
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-start gap-3 p-4">
            <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <TriangleAlert size={18} />
            </div>
            <div>
              <h5 className="text-sm font-extrabold text-slate-900">
                Delete this {type}?
              </h5>
              <p className="mt-1 text-sm text-slate-600">
                This {type} will be permanently removed from your profile and
                feed.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              type="button"
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 disabled:opacity-70 flex items-center gap-2"
            >
              {isDeleting && <Loader2 size={14} className="animate-spin" />}
              {isDeleting ? "Deleting..." : `Delete ${type}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePostComment;
