import { useEffect, useState } from "react";
import "./WorkoutPlanBuilder.css";

export default function WorkoutPlanBuilder({ workoutPlan, setWorkoutPlan, clients }) {
  const [plan, setPlan] = useState({
    title: "Full Body Strength",
    focus: "Building muscle",
    durationMinutes: 50,
    schedule: "Mon/Wed/Fri",
    clientId: clients[0]?.id || "",
    exercises: [
      { name: "Squat", type: "Strength", reps: "4x8" },
      { name: "Push-up", type: "Bodyweight", reps: "4x12" },
    ],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!plan.clientId && clients[0]) {
      setPlan((current) => ({ ...current, clientId: clients[0].id }));
    }
  }, [clients, plan.clientId]);

  function updateExercise(index, field, value) {
    setPlan((current) => ({
      ...current,
      exercises: current.exercises.map((exercise, exerciseIndex) =>
        exerciseIndex === index ? { ...exercise, [field]: value } : exercise
      ),
    }));
  }

  function addExercise() {
    setPlan((current) => ({
      ...current,
      exercises: [...current.exercises, { name: "", type: "", reps: "" }],
    }));
  }

  function saveWorkout(event) {
    event.preventDefault();
    if (!plan.clientId) return;
    const key = `vfitt-workout-${plan.clientId}`;
    localStorage.setItem(key, JSON.stringify(plan));
    setWorkoutPlan(plan);
    setMessage("Workout routine saved for client.");
  }

  return (
    <div className="panel">
      <h2>Create Workout Plan</h2>
      <form className="meal-form" onSubmit={saveWorkout}>
        <label>
          Plan Title
          <input value={plan.title} onChange={(e) => setPlan({ ...plan, title: e.target.value })} />
        </label>
        <label>
          Focus
          <input value={plan.focus} onChange={(e) => setPlan({ ...plan, focus: e.target.value })} />
        </label>
        <label>
          Duration
          <input
            value={plan.durationMinutes}
            onChange={(e) => setPlan({ ...plan, durationMinutes: Number(e.target.value) })}
            type="number"
          />
        </label>
        <label>
          Schedule
          <input value={plan.schedule} onChange={(e) => setPlan({ ...plan, schedule: e.target.value })} />
        </label>
        <label>
          Select Client
          <select value={plan.clientId} onChange={(e) => setPlan({ ...plan, clientId: Number(e.target.value) })}>
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>

        <div className="exercise-panel">
          {plan.exercises.map((exercise, index) => (
            <div className="exercise-row" key={index}>
              <input
                placeholder="Exercise"
                value={exercise.name}
                onChange={(e) => updateExercise(index, "name", e.target.value)}
              />
              <input
                placeholder="Type"
                value={exercise.type}
                onChange={(e) => updateExercise(index, "type", e.target.value)}
              />
              <input
                placeholder="Sets/Reps"
                value={exercise.reps}
                onChange={(e) => updateExercise(index, "reps", e.target.value)}
              />
            </div>
          ))}
        </div>

        <button type="button" className="secondary-button" onClick={addExercise}>
          Add Exercise
        </button>
        <button className="primary-button" type="submit">
          Save Workout Plan
        </button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}
