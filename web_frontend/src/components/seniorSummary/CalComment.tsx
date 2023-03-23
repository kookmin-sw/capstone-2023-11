import { useRecoilValue } from "recoil";
import { calText } from "../../constants/CommentTexts";
import { BMRAtom, IUserData } from "../../core/atom";

export function CalComment(prop: IUserData) {
  const BMR = useRecoilValue(BMRAtom);
  const score: number[] = [];
  prop.calories.map((calorie) => score.push(calorie - BMR));
  const sum = score.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  const avg = sum / 7;
  return avg < 0 ? (avg < -200 ? calText[1] : calText[5]) : avg < 200 ? calText[4] : calText[8];
}
