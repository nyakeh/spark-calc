import { useState } from "react";
import "./App.css";

function Fire() {
	const [investedAssets, setInvestedAssets] = useState(15000);
	const [monthlyInvestment, setMonthlyInvestment] = useState(500);
	const [monthlySpend, setMonthlySpend] = useState(1500);
	const [yearsUntilFire, setYearsUntilFire] = useState(25);

	const reCalculate = (event: any) => {
		event.preventDefault();

		let fireNumber = monthlySpend * 12 * 25;
		let annualContribution = monthlyInvestment * 12;
		let tempNetWorth = investedAssets;
		let count = 0;

		while (tempNetWorth < fireNumber) {
			let futureValue = tempNetWorth * Math.pow(1.07, 1);
			tempNetWorth = futureValue + annualContribution;
			count++;
		}

		setYearsUntilFire(count);
	};

	return (
		<div>
			<section className="App-main">
				<h2>Financial Independence &#128293; Calculator</h2>
			</section>

			<section className="App-main">
				<form onSubmit={reCalculate}>
					<label>
						Invested Assets:
						<input type="number" value={investedAssets} onChange={(e) => setInvestedAssets(Number(e.target.value))} min={0} max={9999999} />
					</label>
					<label>
						Monthly Investment:
						<input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} min={1} max={50000} />
					</label>
					<label>
						Monthly Spend:
						<input type="number" value={monthlySpend} onChange={(e) => setMonthlySpend(Number(e.target.value))} min={1} max={50000} />
					</label>
					<input type="submit" value="Calculate" />
				</form>
			</section>

			<section className="App-main">
				<p>
					You'll be FI in <span>{yearsUntilFire}</span> years!
				</p>
			</section>
		</div>
	);
}

export default Fire;
