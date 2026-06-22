import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import ClientDashboardPage from "./pages/ClientDashboardPage.jsx";

const rawPath = window.location.pathname;
const initialRoute = rawPath.startsWith("/admin")
  ? "admin"
  : rawPath.startsWith("/user")
  ? "client"
  : "client";

if (!rawPath.startsWith("/admin") && !rawPath.startsWith("/user")) {
  window.history.replaceState(null, "", "/user");
}

const initialView = {
  admin: "meal",
  client: "meal",
}[initialRoute];

function App() {
  const [mode, setMode] = useState(initialRoute);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(initialView);
  const [mealPlan, setMealPlan] = useState(() => loadMealPlan());
  const [workoutPlan, setWorkoutPlan] = useState(() => loadWorkoutPlan());

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

  function handleLogin(userData) {
    setUser(userData);
    setMode(userData.role === "ADMIN" ? "admin" : "client");
    setView(userData.role === "ADMIN" ? "meal" : "meal");
    const targetPath = userData.role === "ADMIN" ? "/admin" : "/user";
    window.history.replaceState(null, "", targetPath);
  }

  if (!user) {
    return <LandingPage mode={mode} setMode={setMode} onLogin={handleLogin} />;
  }

  return user.role === "ADMIN" ? (
    <AdminDashboardPage
      user={user}
      onLogout={() => setUser(null)}
      mealPlan={mealPlan}
      setMealPlan={setMealPlan}
      workoutPlan={workoutPlan}
      setWorkoutPlan={setWorkoutPlan}
    />
  ) : (
    <ClientDashboardPage
      user={user}
      onLogout={() => setUser(null)}
      mealPlan={mealPlan}
      workoutPlan={workoutPlan}
    />
  );
}

function loadMealPlan() {
  try {
    const stored = localStorage.getItem("vfitt-mealplan");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function loadWorkoutPlan() {
  try {
    const stored = localStorage.getItem("vfitt-workout");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default App;
