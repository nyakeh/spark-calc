import { useState } from "react";
import "./App.css";
import CalculateCompoundInterest from "./CalculateCompoundInterest";

function Compound() {
	const [investedAssets, setInvestedAssets] = useState(0);
	const [monthlyContribution, setMonthlyContribution] = useState(500);
	const [years, setYears] = useState(10);
	const [interestRate, setInterestRate] = useState(7);

	return (
		<div>
			<section className="App-main">
				<h2>Compound Interest &#128200; Calculator</h2>
			</section>

			<section className="App-main">
				<div className="Coast-circle">
					<form className="Coast-form">
						<label>
							Invested Assets:
							<input type="number" value={investedAssets} onChange={(e) => setInvestedAssets(Number(e.target.value))} />
						</label>
						<label>
							Monthly Contribution:
							<input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
						</label>
						<label>
							Interest Rate:
							<input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
						</label>
						<label>
							Years:
							<input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
						</label>
					</form>
				</div>
			</section>

      		<CalculateCompoundInterest invested = {investedAssets} monthlyContribution = {monthlyContribution} interestRate = {interestRate} years = {years} />
		</div>
	);
}

export default Compound;
