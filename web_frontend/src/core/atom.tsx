import { atom } from "recoil";

export interface IUserData {
  name: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  medicalHistory: IMedical[];
  drinkings: number;
  smoke: number;
  weeklyFoodNutrientSum: IFoodNut[];
  weeklyExerciseInfo: IExerciseInfo[];
}

export interface IMedical {
  kor: string;
  eng: string;
  description: string;
}

export interface IFoodNut {
  date: string;
  calorie: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  cholesterol: number;
  natrium: number;
}

export interface IExerciseInfo {
  date: string;
  calorie: number;
  hour: number;
  count: number;
}

export const BMRAtom = atom({
  key: "getBMR",
  default: 0,
});

export const fatAtom = atom({
  key: "fatPercent",
  default: [0],
});
export const proteinAtom = atom({
  key: "proPercent",
  default: [0],
});
export const carboAtom = atom({
  key: "carPercent",
  default: [0],
});
export const dateAtom = atom({
  key: "date",
  default: ["3/10"],
});
