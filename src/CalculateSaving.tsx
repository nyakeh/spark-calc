import "./App.css";

function CalculateIncomeTax(salary: number) {
	if (salary <= 12570) {
		return 0;
	}
	let remainingSalary = salary - 12570;
	if (remainingSalary <= 37699) {
		return remainingSalary * 0.2;
	}
	remainingSalary = remainingSalary - 37699;
	let twentyPercentBand = 37699 * 0.2;
	if (remainingSalary <= 87439) {
		return twentyPercentBand + remainingSalary * 0.4;
	}
	remainingSalary = remainingSalary - 87439;
	let fortyPercentBand = 87439 * 0.4;
	return twentyPercentBand + fortyPercentBand + remainingSalary * 0.45;
}

function CalculateNationalInsurance(salary: number) {
	if (salary <= 12570) {
		return 0;
	}
	let remainingSalary = salary - 12570;
	if (remainingSalary <= 37699) {
		return remainingSalary * 0.12;
	}
	remainingSalary = remainingSalary - 37699;
	let twentyPercentBand = 37699 * 0.12;
	return twentyPercentBand + remainingSalary * 0.02;
}

function roughYearsToFI(percentageSaved: number) {
  let percentageSpent = 1-percentageSaved;
  return Math.log((percentageSpent*.05)/(0.04*percentageSaved) + 1) / Math.log(1.05);
}

function CalculateSaving(props: { salary: number; pensionContribution: number; monthlySavings: number }) {
	let pensionCash = props.salary * (props.pensionContribution / 100);
	let annualSaving = props.monthlySavings * 12;
	let totalSaved = pensionCash + annualSaving;
	let grossSavedPercentage = (totalSaved / props.salary) * 100;

	let taxableIncome = props.salary - pensionCash;
	let incomeTax = CalculateIncomeTax(taxableIncome);
	let nationalInsurance = CalculateNationalInsurance(taxableIncome);
	console.log("incomeTax: " + incomeTax);
	console.log("nationalInsurance: " + nationalInsurance);
	let tax = incomeTax + nationalInsurance;

	let netSavedPercentage = (totalSaved / (props.salary - tax)) * 100;
  let yearsToFI = roughYearsToFI(netSavedPercentage/100);

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
      <p>Years till FI from zero <span>{yearsToFI}</span></p>
		</div>
	);
}

export default CalculateSaving;
