import { toastObservable, toast } from "./subscription";

/* ---------------------------- Observable Class ---------------------------- */
describe("Observable class", () => {
  // Testing --> subscribe and notify observers
  test("subscribe and notify observers", () => {
    const mockFn = jest.fn();

    toastObservable.subscribe(mockFn);
    toastObservable.notify({
      // id: Date.now(),
      id: 1,
      message: "Hello Eng. Mo'men 😀",
      variant: "default",
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({
      // id: Date.now(),
      // Using Date.now() failed because time has changed upon the second function call :(
      // I replaced it with id: 1 :)
      id: 1,
      message: "Hello Eng. Mo'men 😀",
      variant: "default",
    });
  });

  /* -------------------------------------------------------------------------- */
  // Testing --> unsubscribe observers
  test("unsubscribe observers", () => {
    const mockFn = jest.fn();

    const unsubscribe = toastObservable.subscribe(mockFn);
    unsubscribe();

    toastObservable.notify({
      id: Date.now(),
      message: "Goodbye Eng. Mo'men 😢",
      variant: "default",
    });

    expect(mockFn).not.toHaveBeenCalled();

    // OR
    // expect(mockFn).toHaveBeenCalledTimes(0);
  });
});

/* ----------------------------- Toast Function ----------------------------- */
describe("toast function", () => {
  test("notify observers with default toast variant", () => {
    const mockFn = jest.fn();

    toastObservable.subscribe(mockFn);
    toast("Something something something");

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn.mock.calls[0][0]).toMatchObject({
      message: expect.any(String),
      variant: "default",
    });
  });

  /* -------------------------------------------------------------------------- */
  test("notify observers with success toast variant", () => {
    const mockFn = jest.fn();

    toastObservable.subscribe(mockFn);
    toast.success("Something something :D");

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn.mock.calls[0][0]).toMatchObject({
      message: expect.any(String),
      variant: "success",
    });
  });

  /* -------------------------------------------------------------------------- */
  test("notify observers with error toast variant", () => {
    const mockFn = jest.fn();

    toastObservable.subscribe(mockFn);
    toast.error("Something something :(");

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn.mock.calls[0][0]).toMatchObject({
      message: expect.any(String),
      variant: "error",
    });
  });
});
