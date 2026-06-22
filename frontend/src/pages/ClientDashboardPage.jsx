import { useMemo, useState } from "react";
import DashboardFrame from "../components/DashboardFrame.jsx";
import MealPlanTable from "../components/MealPlanTable.jsx";
import WorkoutRoutine from "../components/WorkoutRoutine.jsx";
import { loadClientMealPlan, loadClientWorkout } from "../lib/storage.js";
import BmiCalculator from "../components/BmiCalculator.jsx";
import "./ClientDashboard.css";

export default function ClientDashboardPage({ user, onLogout, mealPlan, workoutPlan }) {
  const [view, setView] = useState("bmi");

  const clientMealPlan = useMemo(() => loadClientMealPlan(user.id, mealPlan), [user.id, mealPlan]);
  const clientWorkout = useMemo(() => loadClientWorkout(user.id, workoutPlan), [user.id, workoutPlan]);

  return (
    <DashboardFrame
      user={user}
      onLogout={onLogout}
      title="Client Dashboard"
      menuOptions={[
        { id: "bmi", label: "BMI Calculator" },
        { id: "meal", label: "View Meal Plan" },
        { id: "workout", label: "Workout Routine" },
      ]}
      activeView={view}
      setActiveView={setView}
    >
      <div className="dashboard-grid">
        {view === "bmi" ? (
          <BmiCalculator />
        ) : view === "meal" ? (
          <MealPlanTable mealPlan={clientMealPlan} />
        ) : (
          <WorkoutRoutine workoutPlan={clientWorkout} />
        )}
      </div>
    </DashboardFrame>
  );
}
