import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { BlueButton } from "../common/BlueButton";

type ExerciseData = { name: string; time: number };

interface GetData {
  eng: string;
  kor: string;
  type: string;
  kcalPerHour: number;
  description: string;
}

interface IData {
  selectedData: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setFixedData: React.Dispatch<React.SetStateAction<ExerciseData[]>>;
  getData: GetData[];
}

const kal = [100, 150, 200, 250, 300, 400];

function ExercisePopUp(prop: IData) {
  const [time, setTime] = useState(0);
  const discription = prop.getData.find((item) => item.kor === prop.selectedData)?.description;
  return (
    <StContainer>
      <StButtonBack
        src={require("../../assets/images/img_esc.png")}
        onClick={() => prop.setIsOpen(false)}></StButtonBack>
      <StImage src={require("../../assets/images/img_kakao.png")} />
      <StTitle>{prop.selectedData}</StTitle>
      <WhiteContainer>
        <StContent>{discription}</StContent>
      </WhiteContainer>
      <StContainer>
        <StContent className="cal">{kal[time]} Kcal 소모</StContent>
      </StContainer>
      {time == 0 ? (
        <StIllContainer>
          <StButtonClicked onClick={() => setTime(1)}>1시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 1 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(0)}>1시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(2)}>2시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 2 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(3)}>3시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 3 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(4)}>4시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 4 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(5)}>5시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(6)}>6시간</StButtonClicked>
        </StIllContainer>
      )}

      <BlueBTN
        onClick={() => {
          const name = prop.selectedData;
          const newData = { name, time };
          prop.setFixedData((prevData) => [newData, ...prevData]);
          prop.setIsOpen(false);
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
  width: 10rem;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-bottom: 5rem;
`;
