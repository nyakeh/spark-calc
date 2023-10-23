import "./App.css";

function CalculateSaving(props: { salary: number; pensionContribution: number; monthlySavings: number }) {
	let pensionCash = props.salary * (props.pensionContribution / 100);
	let annualSaving = props.monthlySavings * 12;
	let totalSaved = pensionCash + annualSaving;
	let grossSavedPercentage = (totalSaved / props.salary) * 100;
	let tax = props.salary * 0.2;
	let netSavedPercentage = (totalSaved / (props.salary - tax)) * 100;

	return (
		<div>
			<p>
				Your saving <span>{grossSavedPercentage.toFixed(0)}%</span> of gross income
			</p>
			<p>
				Alternatively <span>{netSavedPercentage.toFixed(0)}%</span> of net income
			</p>
			<p>
				<span>£{pensionCash.toFixed(0)}</span> Added to your pension pot
			</p>
		</div>
	);
}

export default CalculateSaving;
