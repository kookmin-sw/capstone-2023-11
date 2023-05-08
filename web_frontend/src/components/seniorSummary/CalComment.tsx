import { calText2 } from "../../constants/CommentTexts";
import { IWeeklyData } from "../../core/atom";

export function CalComment(prop: IWeeklyData, BMR: number) {
  const score: number[] = [];
  const calories = [];
  if (prop) {
    for (let i = 0; i < 7; i++) {
      const calData = prop.weeklyFoodNutrientSum[i].calorie;
      calories.push(calData);
    }
  }
  calories.map((calorie) => score.push(calorie - BMR));
  const sum = score.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const avg = sum / 7;
  let index;

  if (avg <= -200) {
    index = Math.floor(Math.random() * 4);
  } else if (avg >= 200) {
    index = Math.floor(Math.random() * 4) + 6;
  } else {
    index = Math.floor(Math.random() * 2) + 4;
  }

  return <>{calText2[index]}</>;
}
