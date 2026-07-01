import { Activity, ArrowRightCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "../lib/api.js";
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BmiCalculator from "../components/BmiCalculator.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const demoCredentials = {
  admin: { email: "admin@vfitt.com", password: "admin123" },
  client: { email: "client@vfitt.com", password: "client123" },
};

const brandBackgrounds = [
  "linear-gradient(rgba(18, 42, 34, 0.76), rgba(18, 42, 34, 0.66)), url('/src/img/fitness.gif')",
  "linear-gradient(rgba(16, 31, 46, 0.78), rgba(16, 31, 46, 0.62)), url('/src/img/gif2.gif')",
  "linear-gradient(rgba(44, 26, 20, 0.74), rgba(44, 26, 20, 0.6)), url('/src/img/gif3.gif')",
  "linear-gradient(rgba(44, 26, 20, 0.74), rgba(44, 26, 20, 0.6)), url('/src/img/gif4.gif')",
];

export default function LandingPage({ mode, setMode, onLogin }) {
  const [form, setForm] = useState(demoCredentials[mode]);
  const [key, setKey] = useState('bmicalculator');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: mode,
  });

  useEffect(() => {
    setForm(demoCredentials[mode]);
    setRegisterForm((current) => ({ ...current, role: mode }));
    setShowRegister(false);
    setError("");
  }, [mode]);

  return (
    <main className="login-shell">
      <section className="brand-panel">
        <Carousel className="brand-carousel" interval={4000} controls={true} 
        prevIcon={null}
        nextIcon={null}
        indicators={true} 
        pause="hover" slide={true} touch={true}>
          {brandBackgrounds.map((background, index) => (
            <Carousel.Item key={index}>
              <div
                className="brand-slide-content"
                style={{ backgroundImage: background }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="brand-content">
          <div className="brand-mark">
            <Activity size={34} />
          </div>
          <h1>VFitt Hub</h1>
          <p>Access personalized nutrition and workout management for clients.</p>
          <div className="stats-row">
            <span>Exercises:</span>
            <strong>800+</strong>
            <span>Transformed Clients:</span>
            <strong>90+</strong>
          </div>
        </div>
      </section>

      <section className="login-panel">
      <div className="auth-panel">
        <Tabs
          defaultActiveKey="bmicalculator"
          id="fill-tab-example"
          className=""
          fill
        >
          <Tab eventKey="bmicalculator" title="BMI Calculator">
            <BmiCalculator />
          </Tab>
          <Tab eventKey="bodyfatpercentage" title="Body Fat Percentage">
             <div className="panel bmi-panel">
              Tab content for Body Fat Percentage
             </div>
          </Tab>
        </Tabs>
        </div>
      </section>
    </main>
  );
}
