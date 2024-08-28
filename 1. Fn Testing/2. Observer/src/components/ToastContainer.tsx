import { useEffect, useState } from "react";
import { Toast, ToastProps } from "./Toast";
import { toastObservable } from "../subscription";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export type Toast = Pick<ToastProps, "id" | "message" | "variant">;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const handleToast = (toast: Toast) => {
      if (toast.id === undefined) {
        setToasts([]);
      } else {
        setToasts((prevToasts) => [...prevToasts, toast]);
      }
    };
    
    // Subscribe function --> returns "unsubscribe" cleanup function
    const unsubscribe = toastObservable.subscribe(handleToast);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      ref={parent}
      className="absolute bottom-0 end-0 p-4 space-y-2 w-full h-full justify-end pointer-events-none flex flex-col max-w-xs "
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={() => {
            setToasts(toasts.filter((t) => t.id != toast.id));
          }}
        />
      ))}
    </div>
  );
}