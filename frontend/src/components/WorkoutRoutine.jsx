import "./WorkoutRoutine.css";

export default function WorkoutRoutine({ workoutPlan }) {
  if (!workoutPlan?.exercises?.length) {
    return <p className="notice">No workout routine available yet.</p>;
  }

  return (
    <div className="panel">
      <h2>{workoutPlan.title}</h2>
      <p>{workoutPlan.focus}</p>
      <div className="routine-summary">
        <span>Schedule: {workoutPlan.schedule}</span>
        <span>Duration: {workoutPlan.durationMinutes} min</span>
      </div>
      <div className="exercise-list">
        {workoutPlan.exercises.map((exercise, index) => (
          <div className="exercise-item" key={index}>
            <div>
              <strong>{exercise.name}</strong>
              <p>{exercise.type}</p>
            </div>
            <span>{exercise.reps}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
