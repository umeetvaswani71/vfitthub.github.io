export function loadMealPlan() {
  try {
    const stored = localStorage.getItem("vfitt-mealplan");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function loadWorkoutPlan() {
  try {
    const stored = localStorage.getItem("vfitt-workout");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function loadClientMealPlan(clientId, fallback) {
  try {
    const stored = localStorage.getItem(`vfitt-mealplan-${clientId}`);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function loadClientWorkout(clientId, fallback) {
  try {
    const stored = localStorage.getItem(`vfitt-workout-${clientId}`);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}
