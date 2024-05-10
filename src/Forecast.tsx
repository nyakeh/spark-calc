import { useState } from "react";
import "./App.css";
import { Pound } from "./Pound";
import Calculator from "./Domain/Calculator";

export type InputAnnualFigure = {
  year: number;
  pension: number;
  isa: number;
};

export type InputForecastTimeline = {
  startYear: number;
  endYear: number;
  monthlyPensionContribution: number;
  monthlyIsaContribution: number;
};

export type InputForecast = {
  pensionPot: number;
  isaPot: number;
  timelines: InputForecastTimeline[];
  age: number;
  annualSpend: number;
};

export type OutputForecast = {
  fireNumber: number;
  fireAge: number;
  fireDate: string;
  pension: number;
  isa: number;
  annualFigures: InputAnnualFigure[];
};

function Forecast() {
  const [calculator] = useState(() => new Calculator());

  const [pensionPot, setPensionPot] = useState(25000);
  const [isaPot, setIsaPot] = useState(15000);
  const [age, setAge] = useState(30);
  const [annualSpend, setAnnualSpend] = useState(24000);
  const [timelines, setTimelines] = useState<InputForecastTimeline[]>([
    {
      startYear: 0,
      endYear: 49,
      monthlyPensionContribution: 600,
      monthlyIsaContribution: 400
    }
  ]);

  const [fireNumber, setFireNumber] = useState(600000);
  const [fireAge, setFireAge] = useState(50);
  const [fiDate, setFiDate] = useState("April 2044");
  const [endPension, setEndPension] = useState(342715);
  const [endIsa, setEndIsa] = useState(304018);
  const [annualFigures, setAnnualFigures] = useState<InputAnnualFigure[]>([]);

  const reCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let output = calculator.CalculateForecast({
      pensionPot: pensionPot,
      isaPot: isaPot,
      timelines: timelines,
      age: age,
      annualSpend: annualSpend
    });

    setFireNumber(output.fireNumber);
    setAnnualFigures(output.annualFigures);
    setFireAge(output.fireAge);
    setEndPension(output.pension);
    setEndIsa(output.isa);
    setFiDate(output.fireDate);
  };

  function getTableContent() {
    const iterateItem = (item: InputAnnualFigure) => {
      return (
        <tr key={item.year}>
          <td>{item.year}</td>
          <td>{Pound.format(item.pension)}</td>
          <td>{Pound.format(item.isa)}</td>
          <td>{Pound.format(item.pension + item.isa)}</td>
        </tr>
      );
    };

    return (
      <table key="annual figures">
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Pension</th>
            <th scope="col">Isa</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{annualFigures.map((item) => iterateItem(item))}</tbody>
      </table>
    );
  }

  const handlePensionChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedTimelines = [...timelines];
    updatedTimelines[index].monthlyPensionContribution = parseInt(element.target.value);
    setTimelines(updatedTimelines);
  };

  const handleIsaChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedTimelines = [...timelines];
    updatedTimelines[index].monthlyIsaContribution = parseInt(element.target.value);
    setTimelines(updatedTimelines);
  };

  const handleStartYearChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedTimelines = [...timelines];
    updatedTimelines[index].startYear = parseInt(element.target.value);
    setTimelines(updatedTimelines);
  };

  const handleEndYearChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedTimelines = [...timelines];
    updatedTimelines[index].endYear = parseInt(element.target.value);
    setTimelines(updatedTimelines);
  };

  function addTimeline() {
    const updatedTimelines = [...timelines];
    updatedTimelines.push({
      startYear: 50,
      endYear: 100,
      monthlyPensionContribution: 500,
      monthlyIsaContribution: 500
    });
    setTimelines(updatedTimelines);
  }

  return (
    <div>
      <section className="App-main">
        <h2>Forecasting F.I. &#127793; Scenarios</h2>
      </section>

      <section className="App-main">
        <form onSubmit={reCalculate}>

          <label>
            Pension pot:
            <input
              type="number"
              value={pensionPot}
              onChange={(e) => setPensionPot(Number(e.target.value))}
              min={0}
              max={9999999}
            />
          </label>
          <label>
            ISA pot:
            <input
              type="number"
              value={isaPot}
              onChange={(e) => setIsaPot(Number(e.target.value))}
              min={0}
              max={9999999}
            />
          </label>
          { timelines.map((obj, index) => (<div>            
            <br />
            <div className="form-row">
              <label>
                Start Year :
                <input
                  key={"start_year_"+index}
                  type="number"
                  value={obj.startYear}
                  onChange={(event) => handleStartYearChange(event, index)}
                  min={0}
                  max={99}
                />
              </label>
              <label>
                End Year :
                <input
                  key={"end_year_"+index}
                  type="number"
                  value={obj.endYear}
                  onChange={(event) => handleEndYearChange(event, index)}
                  min={1}
                  max={100}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Monthly Pension:
                <input
                  key={"pension_"+index}
                  type="number"
                  value={obj.monthlyPensionContribution}
                  onChange={(event) => handlePensionChange(event, index)}
                  min={0}
                  max={9999999}
                />
              </label>
              <label>
                Monthly ISA:
                <input
                  key={"isa_"+index}
                  type="number"
                  value={obj.monthlyIsaContribution}
                  onChange={(event) => handleIsaChange(event, index)}
                  min={0}
                  max={9999999}
                />
              </label>
            </div>
            </div>)) 
          }
          <br />
          <button onClick={() => addTimeline()} type="button">Add Timeline</button>
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={1} max={100} />
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
          Total: <span>{Pound.format(endPension + endIsa)}</span> | Pension: {Pound.format(endPension)} | ISA:{" "}
          {Pound.format(endIsa)}
        </p>
        <div>{getTableContent()}</div>
      </section>
    </div>
  );
}

export default Forecast;
