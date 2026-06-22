import { useEffect, useMemo, useState } from "react";
import "./BmiCalculator.css";

const categoryMap = (bmi) => {
  if (bmi < 18.5) return { label: "Underweight", color: "#0f6b4b" };
  if (bmi < 25) return { label: "Healthy", color: "#0f6b4b" };
  if (bmi < 30) return { label: "Overweight", color: "#b35c0d" };
  return { label: "Obese", color: "#a13d2d" };
};

export default function BmiCalculator() {
  const [unit, setUnit] = useState("metric");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [sex, setSex] = useState("M");

  const bmi = useMemo(() => {
    if (!weight || !height) return null;
    if (unit === "metric") {
      const heightMeters = height / 100;
      return weight / (heightMeters * heightMeters);
    }
    return (weight / (height * height)) * 703;
  }, [unit, weight, height]);

  const category = bmi ? categoryMap(bmi) : null;

  useEffect(() => {
    if (unit === "metric") {
      setWeight((current) => (current <= 0 ? 70 : current));
      setHeight((current) => (current <= 0 ? 170 : current));
    } else {
      setWeight((current) => (current <= 0 ? 154 : current));
      setHeight((current) => (current <= 0 ? 67 : current));
    }
  }, [unit]);

  return (
    <div className="panel bmi-panel">
      <h2>BMI Calculator</h2>
      <div className="bmi-note">
        Enter your details and choose imperial or metric units. BMI is calculated with standard formulas and ranges.
      </div>
      <form className="bmi-form">
        <label>
          Unit System
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="metric">Metric (kg / cm)</option>
            <option value="imperial">Imperial (lb / in)</option>
          </select>
        </label>
        <label>
          Age
          <input
            type="number"
            min="1"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <label>
          Weight ({unit === "metric" ? "kg" : "lb"})
          <input
            type="number"
            min="1"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </label>
        <label>
          Height ({unit === "metric" ? "cm" : "in"})
          <input
            type="number"
            min="1"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
        <label>
          Sex
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
      </form>

      <div className="bmi-output">
        {bmi ? (
          <>
            <span className="bmi-score">{bmi.toFixed(1)}</span>
            <p>
              Category: <strong style={{ color: category.color }}>{category.label}</strong>
            </p>
            <div className="bmi-range">
              Healthy range: <strong>18.5</strong> to <strong>24.9</strong>
            </div>
            <div className="bmi-legend">
              <div>Underweight: below 18.5</div>
              <div>Overweight: 25.0 to 29.9</div>
              <div>Obese: 30 and above</div>
            </div>
          </>
        ) : (
          <p className="notice">Enter weight and height to calculate BMI.</p>
        )}
      </div>
    </div>
  );
}
