import { useRecoilValue } from "recoil";
import { nutText } from "../../constants/CommentTexts";
import { carboAtom, fatAtom, proteinAtom } from "../../core/atom";

export function NutComment() {
  const fatPercent = useRecoilValue(fatAtom);
  const proPercent = useRecoilValue(proteinAtom);
  const carPercent = useRecoilValue(carboAtom);
  const resultFat = fatPercent.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const resultPro = proPercent.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const resultCar = carPercent.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const averageFat = resultFat / 7;
  const averagePro = resultPro / 7;
  const averageCar = resultCar / 7;

  return (
    <>
      {averageFat > 100 ? (averageFat > 120 ? nutText[4] : nutText[10]) : averageFat < 80 ? nutText[10] : nutText[5]}
      {averagePro > 100 ? (averagePro > 120 ? nutText[0] : nutText[8]) : averagePro < 80 ? nutText[8] : nutText[1]}
      {averageCar > 100 ? (averageCar > 120 ? nutText[2] : nutText[9]) : averageCar < 80 ? nutText[9] : nutText[3]}
    </>
  );
}

export function SickComment() {
  return null;
}

export function Score() {
  return null;
}
