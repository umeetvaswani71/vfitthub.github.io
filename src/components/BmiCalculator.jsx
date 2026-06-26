import { useEffect, useMemo, useState } from "react";
import "./BmiCalculator.css";

const categoryMap = (bmi) => {
  if (bmi < 18.5) return { label: "Underweight", color: "#0f6b4b" };
  if (bmi < 25) return { label: "Healthy", color: "#0f6b4b" };
  if (bmi < 30) return { label: "Overweight", color: "#b35c0d" };
  return { label: "Obese", color: "#a13d2d" };
};

const kgToLb = (kg) => {
  if (kg === "" || kg == null || isNaN(kg)) return "";
  return Math.round(parseFloat(kg) * 2.20462).toString();
};
const lbToKg = (lb) => {
  if (lb === "" || lb == null || isNaN(lb)) return "";
  return Math.round(parseFloat(lb) / 2.20462).toString();
};

const cmToFeetInches = (cm) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return { feet, inches };
};

const feetInchesToCm = (feet, inches) => {
  return Math.round((feet * 12 + inches) * 2.54).toString();
};

export default function BmiCalculator() {
  const [unit, setUnit] = useState("metric");
  const [sex, setSex] = useState("M");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [metricWeight, setMetricWeight] = useState("70");
  const [displayWeight, setDisplayWeight] = useState("70");

  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(7);

  useEffect(() => {
    const converted = cmToFeetInches(height);
    setFeet(converted.feet);
    setInches(converted.inches);
  }, [height]);

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || h <= 0) return null;

    const heightMeters = h / 100;
    return w / (heightMeters * heightMeters);
  }, [weight, height]);

  const category = bmi ? categoryMap(bmi) : null;

  return (
    <div className="panel bmi-panel">
      <h2>BMI Calculator</h2>

      <div className="bmi-note">
        Enter your details and choose imperial or metric units.
      </div>

      <form className="bmi-form">
        <label>
          Unit System

          <div>
            <label className="radio-group">
              <input
                type="radio"
                name="unit"
                value="metric"
                checked={unit === "metric"}
                onChange={(e) => setUnit(e.target.value)}
              />
              Metric (kg / cm)
            </label>

            <label className="radio-group">
              <input
                type="radio"
                name="unit"
                value="imperial"
                checked={unit === "imperial"}
                onChange={(e) => setUnit(e.target.value)}
              />
              Imperial (lb / ft-in)
            </label>
          </div>
        </label>

        <label>
          Age
          <input
            type="number"
            min="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label>
          Weight ({unit === "metric" ? "kg" : "lb"})

          <input
            type="number"
            min="1"
            step="0.1"
            value={
                weight === ""
                    ? ""
                    : unit === "metric"
                    ? weight
                    : kgToLb(parseFloat(weight))
            }
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                  setWeight("");
                  return;
              }

              if (unit === "metric") {
                  setWeight(value);
              } else {
                  setWeight(lbToKg(parseFloat(value)).toString());
              }
            }}
          />
        </label>

        <label>
          Height

          {unit === "metric" ? (
            <input
              type="number"
              min="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          ) : (
            <div className="height-selector">
              <select id="feet"
                value={feet}
                onChange={(e) => {
                  const f = Number(e.target.value);

                  setFeet(f);
                  setHeight(feetInchesToCm(f, inches));
                }}
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((f) => (
                  <option key={f} value={f}>
                    {f} ft
                  </option>
                ))}
              </select>

              <select id="inches"
                value={inches}
                onChange={(e) => {
                  const i = Number(e.target.value);

                  setInches(i);
                  setHeight(feetInchesToCm(feet, i));
                }}
              >
                {Array.from({ length: 12 }, (_, i) => i).map((i) => (
                  <option key={i} value={i}>
                    {i} in
                  </option>
                ))}
              </select>
            </div>
          )}
        </label>

        <label>
          Sex

          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
      </form>

      <div className="bmi-output">
        {bmi ? (
          <>
            <span className="bmi-score">
              {bmi.toFixed(1)}
            </span>

            <p>
              Category:{" "}
              <strong style={{ color: category.color }}>
                {category.label}
              </strong>
            </p>

            <div className="bmi-range">
              Healthy range: <strong>18.5</strong> to{" "}
              <strong>24.9</strong>
            </div>

            <div className="bmi-legend">
              <div>Underweight: below 18.5</div>
              <div>Healthy: 18.5 to 24.9</div>
              <div>Overweight: 25.0 to 29.9</div>
              <div>Obese: 30 and above</div>
            </div>
          </>
        ) : (
          <p className="notice">
            Enter weight and height to calculate BMI.
          </p>
        )}
      </div>
    </div>
  );
}