import { useEffect, useState } from "react";
import { API_BASE } from "../lib/api.js";
import DashboardFrame from "../components/DashboardFrame.jsx";
import MealPlanBuilder from "../components/MealPlanBuilder.jsx";
import WorkoutPlanBuilder from "../components/WorkoutPlanBuilder.jsx";
import "./AdminDashboard.css";

export default function AdminDashboardPage({ user, onLogout, mealPlan, setMealPlan, workoutPlan, setWorkoutPlan }) {
  const [view, setView] = useState("meal");
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/admin/clients`)
      .then((response) => response.json())
      .then((clientsData) => {
        setClients(clientsData);
        setSelectedClientId(clientsData[0]?.id || null);
      });
  }, []);

  return (
    <DashboardFrame
      user={user}
      onLogout={onLogout}
      title="Admin Dashboard"
      menuOptions={[
        { id: "meal", label: "Create Meal Plan" },
        { id: "workout", label: "Create Workout Plan" },
      ]}
      activeView={view}
      setActiveView={setView}
    >
      <div className="dashboard-grid">
        {view === "meal" ? (
          <MealPlanBuilder
            clients={clients}
            selectedClientId={selectedClientId}
            setSelectedClientId={setSelectedClientId}
            mealPlan={mealPlan}
            setMealPlan={setMealPlan}
          />
        ) : (
          <WorkoutPlanBuilder workoutPlan={workoutPlan} setWorkoutPlan={setWorkoutPlan} clients={clients} />
        )}
      </div>
    </DashboardFrame>
  );
}
