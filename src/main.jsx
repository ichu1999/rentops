import React from "react";
import { createRoot } from "react-dom/client";
import RentalManagerWebsite from "../rental_manager_product_website.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RentalManagerWebsite />
  </React.StrictMode>,
);
