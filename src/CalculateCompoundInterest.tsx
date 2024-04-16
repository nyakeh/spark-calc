import "./App.css";
import { Pound } from "./Pound";

function CalculateCompoundInterest(props: {
  invested: number;
  monthlyContribution: number;
  interestRate: number;
  years: number;
}) {
  let rate = props.interestRate / 100 + 1;
  let annualContribution = props.monthlyContribution * 12;

  let futureValue = 0;
  let tempYearValue = props.invested;
  for (let i = 0; i < props.years; i++) {
    futureValue = tempYearValue * Math.pow(rate, 1);
    tempYearValue = futureValue + annualContribution;
  }

  let initialSumCompounded = props.invested * Math.pow(rate, props.years);
  let futureInvestmentValue = tempYearValue;
  let additionalContributions = annualContribution * props.years;
  let totalInterestEarned = futureInvestmentValue - (props.invested + additionalContributions);

  return (
    <section className="App-main">
      <h3>Projection for {props.years} years</h3>
      <p>Future investment value</p>
      <span>{Pound.format(futureInvestmentValue)}</span>
      <p>Additional deposits</p>
      <span>{Pound.format(additionalContributions)}</span>
      <p>Total interest earned</p>
      <span>{Pound.format(totalInterestEarned)}</span>
    </section>
  );
}

export default CalculateCompoundInterest;
