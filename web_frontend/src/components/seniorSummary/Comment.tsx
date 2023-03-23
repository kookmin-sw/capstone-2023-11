interface IUserData {
  isMale: boolean;
  age: number;
  weight: number;
  height: number;
  sick: {
    name: string;
  };
  isSmoke: boolean;
  exercise: number;
  calories: number[];
}

export function CalComment(prop: IUserData) {
  const preBMR = 10 * prop.weight + 6.25 * prop.height - 5 * prop.age;
  const BMR = Math.round(prop.weight ? preBMR + 5 * 1.375 : preBMR - 161 * 1.375);
  return prop.calories.map((calorie, index) => (
    <div key={index}>
      모자란 칼로리 {index}일 : {BMR - calorie}
    </div>
  ));
}

export function NutComment() {
  return null;
}

export function SickCommnet() {
  return null;
}

export function Score() {
  return null;
}
