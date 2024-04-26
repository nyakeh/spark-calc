import { InputForecast, InputForecastTimeline, InputAnnualFigure, OutputForecast } from "../Forecast";

class Calculator {
    
  public CalculateForecast(input: InputForecast): OutputForecast {
    const currentYear = new Date().getFullYear();
    let yearCount = 0;
    let fireTarget = input.annualSpend * 25;
    let tempAnnualFigures: InputAnnualFigure[] = [{ year: currentYear, pension: input.pensionPot, isa: input.isaPot }];
    let tempNetWorth = input.pensionPot + input.isaPot;
    let tempPension = input.pensionPot;
    let tempIsa = input.isaPot;
    
    let timelineOne = input.timelines[0];
    let annualPensionContribution = timelineOne.monthlyPensionContribution * 12;
    let annualIsaContribution = timelineOne.monthlyIsaContribution * 12;

    while (tempNetWorth < fireTarget) {
      let futurePensionValue = tempPension * Math.pow(1.07, 1);
      tempPension = futurePensionValue + annualPensionContribution;

      let futureIsaValue = tempIsa * Math.pow(1.07, 1);
      tempIsa = futureIsaValue + annualIsaContribution;

      tempNetWorth = tempPension + tempIsa;
      yearCount++;
      tempAnnualFigures = [...tempAnnualFigures, { year: currentYear + yearCount, pension: tempPension, isa: tempIsa }];
    }

    let fiDate = new Date(new Date().setFullYear(currentYear + yearCount));
    return {
      fireNumber: fireTarget,
      fireAge: input.age + yearCount,
      fireDate: fiDate.toLocaleString("default", { month: "long", year: "numeric" }),
      pension: tempPension,
      isa: tempIsa,
      annualFigures: tempAnnualFigures
    };
  }
}

export default Calculator;
