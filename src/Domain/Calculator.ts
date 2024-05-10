import { time } from "console";
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

    for (let timeline of input.timelines) {
      let annualPensionContribution = timeline.monthlyPensionContribution * 12;
      let annualIsaContribution = timeline.monthlyIsaContribution * 12;
      let timelineYearCount = 0;
      while (tempNetWorth < fireTarget && timelineYearCount < timeline.endYear) {
        let futurePensionValue = tempPension * Math.pow(1.07, 1);
        tempPension = futurePensionValue + annualPensionContribution;

        let futureIsaValue = tempIsa * Math.pow(1.07, 1);
        tempIsa = futureIsaValue + annualIsaContribution;

        tempNetWorth = tempPension + tempIsa;
        yearCount++;
        timelineYearCount++;
        tempAnnualFigures = [
          ...tempAnnualFigures,
          { year: currentYear + yearCount, pension: tempPension, isa: tempIsa }
        ];
      }
    }

    let fiDate = new Date(new Date().setFullYear(currentYear + yearCount));
    return {
      fireNumber: fireTarget,
      fireAge: input.age + yearCount,
      fireDate: fiDate.toLocaleString("default", { month: "long", year: "numeric" }),
      pension: tempPension,
      isa: tempIsa,
      annualFigures: tempAnnualFigures,
      fireAchieved : tempNetWorth < fireTarget ? false : true
    };
  }
}

export default Calculator;
