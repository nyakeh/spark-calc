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
	let totalInvested = pensionCash + annualSaving;
	let grossSavedPercentage = (totalInvested / props.salary) * 100;

	let taxableIncome = props.salary - pensionCash;
	let incomeTax = CalculateIncomeTax(taxableIncome);
	let nationalInsurance = CalculateNationalInsurance(taxableIncome);
	let tax = incomeTax + nationalInsurance;

	let netSavedPercentage = (totalInvested / (props.salary - tax)) * 100;
  	let yearsToFI = roughYearsToFI(netSavedPercentage/100);

	return (
		<div>
			<p>
				Your saving <span>{grossSavedPercentage.toFixed(0)}%</span> of gross income, <span>{netSavedPercentage.toFixed(0)}%</span> of net income
			</p>
			<p>
				<span>£{totalInvested.toFixed(0)}</span> per year total saved
			</p>
			<p>
				Split: <span>£{pensionCash.toFixed(0)}</span> pension | <span>£{annualSaving.toFixed(0)}</span> ISA
			</p>
      		<p>Years till FI from zero <span>{yearsToFI.toFixed(1)}</span></p>
		</div>
	);
}

export default CalculateSaving;
