import { ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  closeButton?: boolean;
  title?: string;
  text?: string;
  children?: ReactNode;
};

export const Modal = ({
  open,
  onClose,
  closeButton,
  title,
  text,
  children,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-30 flex items-center justify-center bg-white/30 px-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl border border-[#C9D8EA] bg-white p-6 shadow-lg"
      >
        {closeButton && (
          <button onClick={onClose} className="absolute right-5 top-4 text-black">
            <X size={18} />
          </button>
        )}

        {title && (
          <div className="text-center">
            <h2 className="font-bold text-[#244870]">{title}</h2>
            {text && <p className="mt-2 font-semibold text-[#4A6A91]">{text}</p>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};