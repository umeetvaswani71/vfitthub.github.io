import "./MealPlanTable.css";

export default function MealPlanTable({ mealPlan }) {
  if (!mealPlan?.weekData?.length) {
    return <p className="notice">No meal plan available yet.</p>;
  }

  return (
    <div className="panel">
      <h2>{mealPlan.planName}</h2>
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
          {mealPlan.weekData.map((row) => (
            <tr key={row.day}>
              <td>{row.day}</td>
              <td>{row.calories}</td>
              <td>{row.protein}</td>
              <td>{row.carbs}</td>
              <td>{row.fat}</td>
              <td>{row.fiber}</td>
              <td>
                <strong>{row.micros}</strong>
                <div>{row.rdaNotes}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
