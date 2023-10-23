import { useState } from "react";
import './App.css';

function Saving() {
	const [salary, setSalary] = useState(500);
	const [pensionContribution, setPensionContribution] = useState(10);
	const [monthlySavings, setMonthlySavings] = useState(7);

  return (
    <div>
      <section className='App-main'>
        <h2>Saving Rate &#128183; Calculator</h2>
        {/* Output section */}
      </section>      

			<section className="App-main">
				<div className="Coast-circle">
					<form className="Coast-form">
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
					</form>
				</div>
			</section>
    </div>
  );
}

export default Saving;
