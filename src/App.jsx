import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";

const rawPath = window.location.pathname;
const initialRoute = rawPath.startsWith("/admin")
  ? "admin"
  : rawPath.startsWith("/user")
  ? "client"
  : "default";

if (!rawPath.startsWith("/admin") && !rawPath.startsWith("/user") && !rawPath.startsWith("/vfitthub.github.io")) {
  window.history.replaceState(null, "", "/user");
}

const initialView = {
  admin: "meal",
  client: "meal",
  default: "meal"
}[initialRoute];

function App() {
  const [mode, setMode] = useState(initialRoute);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(initialView);

  useEffect(() => {
    if (!user) return;
    const pathRole = window.location.pathname.startsWith("/admin")
      ? "admin"
      : window.location.pathname.startsWith("/user")
      ? "client"
      : null;
    if (pathRole && pathRole !== mode) {
      setMode(pathRole);
    }
  }, [mode, user]);

  if (!user) {
    return <LandingPage mode={mode} setMode={setMode} />;
  }
}

export default App;
