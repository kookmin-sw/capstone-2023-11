import { atom } from "recoil";

export interface IUserData {
  name: string;
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
