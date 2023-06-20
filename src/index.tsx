import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportAccessibility from "./utilities/reportAccessibility";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportAccessibility(React);
