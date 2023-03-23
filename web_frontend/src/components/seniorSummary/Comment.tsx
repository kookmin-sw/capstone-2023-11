import { useSetRecoilState } from "recoil";
import { BMRAtom, carboAtom, dateAtom, fatAtom, proteinAtom } from "../../core/atom";
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

export function getDatas(prop: IUserData) {
  const preBMR = 10 * prop.weight + 6.25 * prop.height - 5 * prop.age;
  const BMR = Math.round(prop.isMale ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
  const setBMR = useSetRecoilState(BMRAtom);
  const setFat = useSetRecoilState(fatAtom);
  const setPro = useSetRecoilState(proteinAtom);
  const setCar = useSetRecoilState(carboAtom);
  const setDate = useSetRecoilState(dateAtom);

  setBMR(BMR);
  const goals = {
    protein: prop.weight * 0.8,
    carbohydrate: (BMR * 0.55) / 4,
    fat: (BMR * 0.25) / 9,
    cholesterol: 200,
    sodium: 2000,
  };
  const fatPercent = [];
  const proPercent = [];
  const carPercent = [];
  for (let i = 0; i < 7; i++) {
    const fat = Math.round((prop.nutrient.fat[i] / goals.fat) * 100);
    const protein = Math.round((prop.nutrient.protein[i] / goals.protein) * 100);
    const carbohydrate = Math.round((prop.nutrient.carbohydrate[i] / goals.carbohydrate) * 100);
    fatPercent.push(fat);
    proPercent.push(protein);
    carPercent.push(carbohydrate);
  }
  setFat(fatPercent);
  setPro(proPercent);
  setCar(carPercent);
  const dateStrings = [];
  for (let i = 7; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${month}/${day}`;
    dateStrings.push(dateString);
  }
  setDate(dateStrings);
}
