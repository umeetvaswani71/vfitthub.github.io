import { useEffect, useState } from "react";
import "./MealPlanBuilder.css";

export default function MealPlanBuilder({ clients, selectedClientId, setSelectedClientId, mealPlan, setMealPlan }) {
  const [planName, setPlanName] = useState("Weekly Meal Plan");
  const [weekData, setWeekData] = useState(() =>
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => ({
      day,
      calories: 2000,
      protein: 120,
      carbs: 250,
      fat: 70,
      fiber: 30,
      micros: "B12, Vitamin C, Iron",
      rdaNotes: "Standard adult intake",
    }))
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedClientId && clients[0]) {
      setSelectedClientId(clients[0].id);
    }
  }, [clients, selectedClientId, setSelectedClientId]);

  function updateRow(index, field, value) {
    setWeekData((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)));
  }

  function savePlan(event) {
    event.preventDefault();
    if (!selectedClientId) return;
    const stored = {
      clientId: selectedClientId,
      planName,
      weekData,
    };
    const key = `vfitt-mealplan-${selectedClientId}`;
    localStorage.setItem(key, JSON.stringify(stored));
    setMealPlan(stored);
    setMessage("Meal plan saved for client.");
  }

  return (
    <div className="panel">
      <h2>Create 7-Day Meal Plan</h2>
      <form className="meal-form" onSubmit={savePlan}>
        <label>
          Plan Name
          <input value={planName} onChange={(e) => setPlanName(e.target.value)} />
        </label>
        <label>
          Select Client
          <select value={selectedClientId || ""} onChange={(e) => setSelectedClientId(Number(e.target.value))}>
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>

        <div className="meal-plan-table-wrapper">
          <table className="meal-plan-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th>Fiber</th>
                <th>Micros / RDA</th>
              </tr>
            </thead>
            <tbody>
              {weekData.map((row, index) => (
                <tr key={row.day}>
                  <td>{row.day}</td>
                  <td>
                    <input
                      type="number"
                      value={row.calories}
                      onChange={(e) => updateRow(index, "calories", Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.protein}
                      onChange={(e) => updateRow(index, "protein", Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.carbs}
                      onChange={(e) => updateRow(index, "carbs", Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.fat}
                      onChange={(e) => updateRow(index, "fat", Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.fiber}
                      onChange={(e) => updateRow(index, "fiber", Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input value={row.micros} onChange={(e) => updateRow(index, "micros", e.target.value)} />
                    <input
                      className="small-input"
                      value={row.rdaNotes}
                      onChange={(e) => updateRow(index, "rdaNotes", e.target.value)}
                      placeholder="RDA note"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="primary-button" type="submit">
          Save Meal Plan
        </button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}
