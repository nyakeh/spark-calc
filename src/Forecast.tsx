import { useState } from "react";
import { Pound } from "./Pound";
import "./App.css";

function Forecast() {
  const [pensionPot, setPensionPot] = useState(25000);
  const [isaPot, setIsaPot] = useState(15000);
  const [monthlyPensionContribution, setMonthlyPensionContribution] = useState(500);
  const [monthlyIsaContribution, setMonthlyIsaContribution] = useState(500);
  const [age, setAge] = useState(30);
  const [annualSpend, setAnnualSpend] = useState(24000);

  const [fireNumber, setFireNumber] = useState(600000);
  const [fireAge, setFireAge] = useState(50);
  const [fiDate, setFiDate] = useState("April 2044");
  const [endPension, setEndPension] = useState(342715);
  const [endIsa, setEndIsa] = useState(304018);

  const reCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let fireTarget = annualSpend * 25;
    setFireNumber(fireTarget);
    let annualPensionContribution = monthlyPensionContribution * 12;
    let annualIsaContribution = monthlyIsaContribution * 12;
    let tempNetWorth = pensionPot+isaPot;
    let tempPension = pensionPot;
    let tempIsa = isaPot;
    let yearCount = 0;

    while (tempNetWorth < fireTarget) {
      let futurePensionValue = tempPension * Math.pow(1.07, 1);
      tempPension = futurePensionValue + annualPensionContribution;

      let futureIsaValue = tempIsa * Math.pow(1.07, 1);
      tempIsa = futureIsaValue + annualIsaContribution;

      tempNetWorth = tempPension + tempIsa;
      yearCount++;
    }
    
    setFireAge(age+yearCount);
    setEndPension(tempPension);
    setEndIsa(tempIsa);
    let fiDate = new Date(new Date().setFullYear(new Date().getFullYear() + yearCount));
    setFiDate(fiDate.toLocaleString("default", { month: "long", year: "numeric" }));
  };

  return (
    <div>
      <section className="App-main">
        <h2>Forecasting F.I. &#127793; Scenarios</h2>
      </section>

      <section className="App-main">
        <form onSubmit={reCalculate}>
          <label>
            Pension pots:
            <input
              type="number"
              value={pensionPot}
              onChange={(e) => setPensionPot(Number(e.target.value))}
              min={0}
              max={9999999}
            />
          </label>
          <label>
            Monthly Pension:
            <input
              type="number"
              value={monthlyPensionContribution}
              onChange={(e) => setMonthlyPensionContribution(Number(e.target.value))}
              min={0}
              max={10000}
            />
          </label>
          <br/>
          <label>
            ISA pots:
            <input
              type="number"
              value={isaPot}
              onChange={(e) => setIsaPot(Number(e.target.value))}
              min={0}
              max={9999999}
            />
          </label>
          <label>
            Monthly ISA:
            <input
              type="number"
              value={monthlyIsaContribution}
              onChange={(e) => setMonthlyIsaContribution(Number(e.target.value))}
              min={0}
              max={10000}
            />
          </label>
          <br/>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={1}
              max={100}
            />
          </label>
          <label>
            Retirement Spending:
            <input
              type="number"
              value={annualSpend}
              onChange={(e) => setAnnualSpend(Number(e.target.value))}
              min={1}
              max={50000}
            />
          </label>
          <input type="submit" value="Calculate" />
        </form>
      </section>

      <section className="App-main">
        <p>
          <span>{Pound.format(fireNumber)}</span> FIRE number
        </p>
        <p>
          You"ll be FI in <span>{fiDate}</span>, aged {fireAge}
        </p>
        <p>
          Total: <span>{Pound.format(endPension+endIsa)}</span> | Pension: {Pound.format(endPension)} | ISA: {Pound.format(endIsa)}
        </p>
      </section>
    </div>
  );
}

export default Forecast;
