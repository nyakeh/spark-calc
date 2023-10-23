import { useState } from "react";
import "./App.css";
import CalculateSaving from "./CalculateSaving";

const reCalculate = (event: any) => {
	event.preventDefault();
};

function Saving() {
	const [salary, setSalary] = useState(30000);
	const [pensionContribution, setPensionContribution] = useState(10);
	const [monthlySavings, setMonthlySavings] = useState(300);

	return (
		<div>
			<section className="App-main">
				<h2>Saving Rate &#128183; Calculator</h2>
				<CalculateSaving salary={salary} pensionContribution={pensionContribution} monthlySavings={monthlySavings} />
			</section>

			<section className="App-main">
				<div className="Coast-circle">
					<form onSubmit={reCalculate} className="Coast-form">
						<label>
							Salary:
							<input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
						</label>
						<label>
							Pension Contribution %:
							<input type="number" value={pensionContribution} onChange={(e) => setPensionContribution(Number(e.target.value))} />
						</label>
						<label>
							Monthly Savings £:
							<input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(Number(e.target.value))} />
						</label>
						{/* <input type="submit" value='Calculate' /> */}
					</form>
				</div>
			</section>
		</div>
	);
}

export default Saving;
