import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { BlueButton } from "../common/BlueButton";

interface IData {
  data: string;
  setIsOpen: (v: boolean) => void;
  setCalories: Dispatch<SetStateAction<number>>;
  fixedExercise: Dispatch<SetStateAction<string>>;
}

const discription =
  "미안하다 이거 보여주려고 어그로끌었다.. 나루토 사스케 싸움수준 ㄹㅇ실화냐? 진짜 세계관최강자들의 싸움이다.. 그찐따같던 나루토가 맞나? 진짜 나루토는 전설이다..진짜옛날에 맨날나루토봘는데 왕같은존재인 호카게 되서 세계최강 전설적인 영웅이된나루토보면 진짜내가다 감격스럽고 나루토 노래부터 명장면까지 가슴울리는장면들이 뇌리에 스치면서 가슴이 웅장해진다.. ";

const kal = [100, 150, 200];

function ExercisePopUp(prop: IData) {
  const [time, setTime] = useState(0);
  let result = "";
  return (
    <StContainer>
      <StButtonBack
        src={require("../../assets/images/img_esc.png")}
        onClick={() => prop.setIsOpen(false)}></StButtonBack>
      <StImage src={require("../../assets/images/img_kakao.png")} />
      <StTitle>{prop.data}</StTitle>
      <WhiteContainer>
        <StContent>{discription}</StContent>
      </WhiteContainer>
      <StContainer>
        <StContent className="cal">{kal[time]} Kcal 소모</StContent>
      </StContainer>
      {time == 0 ? (
        <StIllContainer>
          <StButtonClicked onClick={() => setTime(0)}>30분</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>1시간 반</StButtonUnClicked>
        </StIllContainer>
      ) : time == 1 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(0)}>30분</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(1)}>1시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>1시간 반</StButtonUnClicked>
        </StIllContainer>
      ) : (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(0)}>30분</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(2)}>1시간 반</StButtonClicked>
        </StIllContainer>
      )}

      <BlueBTN
        onClick={() => {
          prop.setCalories(kal[time]);
          prop.setIsOpen(false);
          result = prop.data + " ";
          time == 0 ? (result += "30분") : time == 1 ? (result += "1시간") : (result += "1시간 30분");
          prop.fixedExercise(result);
        }}>
        운동 선택
      </BlueBTN>
    </StContainer>
  );
}

export default ExercisePopUp;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;
`;

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
  background-color: #f8f9fe;
  border-radius: 1rem;
  .cal {
    font-family: "Pretendard-Bold";
    font-size: 1.7rem;
  }
`;
const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;

const StImage = styled.img`
  margin: auto;
  display: block;
  margin-bottom: 3rem;
`;

const BlueBTN = styled(BlueButton)`
  display: block;
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

const StContent = styled.div`
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  padding: 1rem;
  text-align: center;
`;

const WhiteContainer = styled(StContainer)`
  margin: 1rem;
  background-color: #ffffff;
  padding: 2rem;
`;

const StButtonClicked = styled.button`
  height: 3rem;
  font-size: 1.8rem;
  font-family: "Pretendard-Bold";
  color: #eaf2ff;
  border-radius: 1.2rem;
  border: none;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  background: #006ffd;
  margin-right: 1rem;
  margin-top: 2rem;
`;

const StButtonUnClicked = styled(StButtonClicked)`
  background: #eaf2ff;
  color: #006ffd;
`;

const StIllContainer = styled.div`
  text-align: center;
  width: 90%;
  margin-bottom: 5rem;
`;
