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
  servingSize: number; //1회 섭취량
  calorie: number; // 칼로리
  carbohyborateTotal: number; // 총 탄수화물
  carbohyborateSugar: number; // 당류
  carbohyborateDietaryFiber: number; // 식이섬유
  protein: number; // 단백질
  fatTotal: number; // 총 지방량
  fatTransFat: number; // 트랜스지방
  fatSaturatedfat: number; // 포화지방
  cholesterol: number; //콜레스테롤
  natrium: number; // 나트륨
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

export interface IpillData {
  medicines: [
    {
      id: number;
      name: string;
      companyName: string;
      effect: string;
      useMethod: string;
      caution: string;
      depositMethod: string;
      imageUrl: string;
      createdAt: string;
      dueAt: string;
      remainDay: number;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
    },
  ];
}

export interface MainInfo {
  userCode: number;
  userName: string;
  height: number;
  weight: number;
  gender: string;
  age: number;
  medicineInfoList: [
    {
      id: number;
      name: string;
      companyName: string;
      effect: string;
      useMethod: string;
      caution: string;
      depositMethod: string;
      imageUrl: string;
      createdAt: string;
      dueAt: string;
      remainDay: number;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
    },
  ];
  monthRecordCount: number;
  todayMealCount: number;
  todayWorkOutCount: number;
}

export const exampleData: IWeeklyData = {
  name: "홍길동",
  gender: "male",
  age: 25,
  weight: 72,
  height: 178,
  drinkings: 0,
  smoke: 0,
  medicalHistory: [
    {
      kor: "간염",
      eng: "dsadsadas",
      description: "sddfdsgsdff",
    },
  ],
  weeklyFoodNutrientSum: [
    {
      date: "2023-04-27",
      calorie: 2057,
      carbohydrate: 329,
      protein: 85,
      fat: 83,
      cholesterol: 77,
      natrium: 2071,
    },
    {
      date: "2023-04-28",
      calorie: 1673,
      carbohydrate: 268,
      protein: 68,
      fat: 70,
      cholesterol: 54,
      natrium: 1632,
    },
    {
      date: "2023-04-29",
      calorie: 1912,
      carbohydrate: 306,
      protein: 78,
      fat: 100,
      cholesterol: 93,
      natrium: 1864,
    },
    {
      date: "2023-04-30",
      calorie: 1786,
      carbohydrate: 231,
      protein: 73,
      fat: 62,
      cholesterol: 63,
      natrium: 1754,
    },
    {
      date: "2023-05-01",
      calorie: 2098,
      carbohydrate: 336,
      protein: 86,
      fat: 96,
      cholesterol: 60,
      natrium: 2054,
    },
    {
      date: "2023-05-02",
      calorie: 1561,
      carbohydrate: 249,
      protein: 64,
      fat: 87,
      cholesterol: 44,
      natrium: 1524,
    },
    {
      date: "2023-05-03",
      calorie: 2245,
      carbohydrate: 360,
      protein: 92,
      fat: 71,
      cholesterol: 92,
      natrium: 2209,
    },
  ],
  weeklyExerciseInfo: [
    {
      date: "2023-04-27",
      calorie: 266,
      hour: 1,
      count: 1,
    },
    {
      date: "2023-04-28",
      calorie: 415,
      hour: 2,
      count: 1,
    },
    {
      date: "2023-04-29",
      calorie: 187,
      hour: 1,
      count: 1,
    },
    {
      date: "2023-04-30",
      calorie: 670,
      hour: 4,
      count: 1,
    },
    {
      date: "2023-05-01",
      calorie: 458,
      hour: 1,
      count: 1,
    },
    {
      date: "2023-05-02",
      calorie: 312,
      hour: 2,
      count: 1,
    },
    {
      date: "2023-05-03",
      calorie: 349,
      hour: 3,
      count: 1,
    },
  ],
};
