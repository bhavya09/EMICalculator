import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [principale, setPrincipale] = useState();
  const [interest, setInterest] = useState();
  const [years, setYears] = useState();
  const [emi, setEMI] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [principale, interest, years]);

  const calculateEMI = () => {
    let r = interest;
    if (principale && r && years) {
      r = r / 12 / 100;
      const calcPow = Math.pow(1 + r, years * 12);
      const amount = principale * ((r * calcPow) / (calcPow - 1));
      setEMI(Math.round(amount));
    }
  };

  const handleChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === "principale") {
      setPrincipale(value);
    } else if (id === "interest") {
      setInterest(value);
    } else {
      setYears(value);
    }
  };

  return (
    <div className="loan-calc">
      <h1>Mortgage Calculator</h1>

      <div className="inputes">
        <p>Priciple:</p>
        <input type="number" id="principale" onChange={handleChange} />

        <p>Interest:</p>
        <input type="number" id="interest" onChange={handleChange} />

        <p>Years:</p>
        <input type="number" id="year" onChange={handleChange} />
      </div>

      <div className="output">Your EMI is {emi}</div>
    </div>
  );
}
