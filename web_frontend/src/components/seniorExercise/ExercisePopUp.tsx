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

function ExercisePopUp(prop: IData) {
  const [time, setTime] = useState(0);
  const discription = prop.getData.find((item) => item.kor === prop.selectedData)?.description;
  const kcalPerHour = prop.getData.find((item) => item.kor === prop.selectedData)?.kcalPerHour;
  const eng = prop.getData.find((item) => item.kor === prop.selectedData)?.eng;
  return (
    <StContainer>
      <StButtonBack
        src={require("../../assets/images/img_esc.png")}
        onClick={() => prop.setIsOpen(false)}></StButtonBack>
      <StImage src={require(`../../assets/images/exerciseImg/img_${eng}.png`)} />
      <StTitle>{prop.selectedData}</StTitle>
      <WhiteContainer>
        <StContent>{discription}</StContent>
      </WhiteContainer>
      <StContainer>
        <StContent className="cal">{kcalPerHour == null ? 0 : time * kcalPerHour} Kcal 소모</StContent>
      </StContainer>
      {time == 1 ? (
        <StIllContainer>
          <StButtonClicked onClick={() => setTime(0)}>1시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 2 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(0)}>2시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 3 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(0)}>3시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 4 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(0)}>4시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 5 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(0)}>5시간</StButtonClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      ) : time == 6 ? (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonClicked onClick={() => setTime(0)}>6시간</StButtonClicked>
        </StIllContainer>
      ) : (
        <StIllContainer>
          <StButtonUnClicked onClick={() => setTime(1)}>1시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(2)}>2시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(3)}>3시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(4)}>4시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(5)}>5시간</StButtonUnClicked>
          <StButtonUnClicked onClick={() => setTime(6)}>6시간</StButtonUnClicked>
        </StIllContainer>
      )}

      {time != 0 ? (
        <BlueBTN
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            const name = prop.selectedData;
            const newData = { name, time };
            prop.setFixedData((prevData) => [newData, ...prevData]);
            prop.setIsOpen(false);
          }}>
          운동 선택
        </BlueBTN>
      ) : (
        <GrayBtn whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          운동 선택
        </GrayBtn>
      )}
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
    text-align: center;
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
  width: 10rem;
  height: 10rem;
`;

const BlueBTN = styled(BlueButton)`
  display: block;
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

const GrayBtn = styled(BlueBTN)`
  background-color: #e8e9f1;
  border: none;
`;

const StContent = styled.div`
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  padding: 0.3rem;
  white-space: pre-line;
  letter-spacing: 0.1rem;
  line-height: 1.5;
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
  margin-bottom: 3rem;
`;
