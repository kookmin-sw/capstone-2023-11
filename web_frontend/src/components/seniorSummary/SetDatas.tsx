import { useSetRecoilState } from "recoil";
import { BMRAtom, carboAtom, dateAtom, fatAtom, IUserData, proteinAtom } from "../../core/atom";

export function setDatas(prop: IUserData) {
  const preBMR = 10 * prop.weight + 6.25 * prop.height - 5 * prop.age;
  const BMR = Math.round(prop.gender == "male" ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
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
    const fat = Math.round((prop.weeklyFoodNutrientSum[i].fat / goals.fat) * 100);
    const protein = Math.round((prop.weeklyFoodNutrientSum[i].protein / goals.protein) * 100);
    const carbohydrate = Math.round((prop.weeklyFoodNutrientSum[i].carbohydrate / goals.carbohydrate) * 100);
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
