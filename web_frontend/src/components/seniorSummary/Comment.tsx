import { calText } from "./CommentTexts";

export interface IUserData {
  isMale: boolean;
  age: number;
  weight: number;
  height: number;
  sick: string[];
  isSmoke: boolean;
  exercise: number;
  calories: number[];
  nutrient: {
    protein: number[];
    carbohydrate: number[];
    fat: number[];
    cholesterol: number[];
    sodium: number[];
  };
}

export function CalComment(prop: IUserData) {
  const preBMR = 10 * prop.weight + 6.25 * prop.height - 5 * prop.age;
  const BMR = Math.round(prop.isMale ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
  const BMI = Math.round(prop.weight / (prop.height / 100) ** 2);
  const score: number[] = [];
  prop.calories.map((calorie) => score.push(calorie - BMR));
  console.log(score);
  console.log(BMR);
  console.log(BMI);
  const sum = score.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const avg = sum / 7;
  console.log(avg);
  return avg < 0 ? (avg < -200 ? calText[1] : calText[5]) : avg < 200 ? calText[4] : calText[8];
}

export function NutComment(prop: IUserData) {
  const preBMR = 10 * prop.weight + 6.25 * prop.height - 5 * prop.age;
  const BMR = Math.round(prop.isMale ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
  const goals = {
    protein: prop.weight * 0.8,
    carbohydrate: (BMR * 0.55) / 4,
    fat: (BMR * 0.25) / 9,
    cholesterol: 200,
    sodium: 2000,
  };
  console.log(goals);
  return null;
}

export function SickComment() {
  return null;
}

export function Score() {
  return null;
}
