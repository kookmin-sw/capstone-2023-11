import { exerciseText } from "../../constants/CommentTexts";
import { IWeeklyData } from "../../core/atom";

export function ExerciseComment(prop: IWeeklyData) {
  const calories = [];
  if (prop) {
    for (let i = 0; i < 7; i++) {
      const calData = prop.weeklyExerciseInfo[i].calorie;
      calories.push(calData);
    }
  }
  const countOfZero = calories.filter((num) => num === 0).length;
  let index;
  if (countOfZero == 0) {
    index = Math.floor(Math.random() * 2);
  } else if (countOfZero <= 3) {
    index = Math.floor(Math.random() * 2) + 2;
  } else if (countOfZero <= 6) {
    index = Math.floor(Math.random() * 2) + 4;
  } else {
    index = Math.floor(Math.random() * 2) + 6;
  }

  return <>{exerciseText[index]}</>;
}
