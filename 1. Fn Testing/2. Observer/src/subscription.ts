import { Toast } from "./components/ToastContainer";

type Observer<TData> = (data: TData) => void;

class Observable<TData> {
  observers: Observer<TData>[] = [];

  subscribe(observer: Observer<TData>) {
    this.observers.push(observer);

    // Unsubscribe Method B
    return () => {
      this.observers = this.observers.filter((obs) => obs != observer);
    };
  }

  // Unsubscribe Method A
  // usubscribe(observer: Observer<TData>) {
  //   this.observers = this.observers.filter((obs) => obs != observer);
  // }

  notify(data: TData) {
    this.observers.forEach((observer) => observer(data));
  }

  dismiss() {
    this.observers.forEach((observer) => observer({} as TData));
  }
}

export const toastObservable = new Observable<Toast>();

export function toast(message: string) {
  toastObservable.notify({
    id: Date.now(),
    message,
    variant: "default",
  });
}

toast.success = function (message: string) {
  toastObservable.notify({
    id: Date.now(),
    message,
    variant: "success",
  });
};

toast.error = function (message: string) {
  toastObservable.notify({
    id: Date.now(),
    message,
    variant: "error",
  });
};

toast.dismissAll = function () {
  toastObservable.notify({
    id: Date.now(),
    message: "",
    variant: "dismissAll",
  });
};

toast.dismissAll = function () {
  toastObservable.dismiss();
};
