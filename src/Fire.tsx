import { useState } from "react";
import "./App.css";

function Fire() {
	const [investedAssets, setInvestedAssets] = useState(15000);
	const [monthlyInvestment, setMonthlyInvestment] = useState(500);
	const [monthlySpend, setMonthlySpend] = useState(1500);
	const [yearsUntilFire, setYearsUntilFire] = useState(25);
	const [fireNumber, setFireNumber] = useState(450000);
	const [interestEarned, setInterestEarned] = useState(295905);

	const reCalculate = (event: any) => {
		event.preventDefault();

		let fireTarget = monthlySpend * 12 * 25;
		let annualContribution = monthlyInvestment * 12;
		let tempNetWorth = investedAssets;
		let yearCount = 0;

		while (tempNetWorth < fireTarget) {
			let futureValue = tempNetWorth * Math.pow(1.07, 1);
			tempNetWorth = futureValue + annualContribution;
			yearCount++;
		}

    setFireNumber(fireTarget);
		setYearsUntilFire(yearCount);
    setInterestEarned(tempNetWorth - (investedAssets + (annualContribution*yearCount)));
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
				<p>
					<span>£{fireNumber}</span> FIRE number
				</p>
				<p>
					Earning <span>£{interestEarned.toFixed(0)}</span> investment gains
				</p>
			</section>
		</div>
	);
}

export default Fire;
