import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SignupForm from "./SignupForm.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SignupForm />
  </StrictMode>
);
