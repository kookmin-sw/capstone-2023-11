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
