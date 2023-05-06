export interface IWeeklyData {
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

export interface IDailyData {
  meal: IMeal[];
  exercise: IExercise[];
}
export interface IMeal {
  id: number;
  createdAt: string;
  times: number;
  imageUrl: string;
  detail: IMealDetail[];
}
export interface IMealDetail {
  name: string;
  calorie: number;
  carbohyborateTotal: number;
  protein: number;
  fatTotal: number;
}
export interface IExercise {
  id: number;
  type: string;
  kcal: number;
  createdAt: string;
  kor: string;
  eng: string;
  hour: number;
}

export interface ExerciseFixedData {
  name: string;
  time: number;
}

export interface GetExerciseData {
  eng: string;
  kor: string;
  type: string;
  kcalPerHour: number;
  description: string;
}

export interface ExerciseForm {
  createdAt: string;
  eng: string;
  id: number;
  kcal: number;
  kor: string;
  type: string;
  hour: number;
}
