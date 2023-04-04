import { useEffect, useState } from "react";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import { BlueButton } from "../components/common/BlueButton";
import ExerciseList from "../components/seniorExercise/ExerciseList";
import Modal from "react-modal";
import ExercisePopUp from "../components/seniorExercise/ExercisePopUp";

interface ExerciseData {
  name: string;
  time: number;
}

const items = [
  "걷기",
  "달리기",
  "요가",
  "필라테스",
  "게이트볼",
  "자전거",
  "등산",
  "골프",
  "댄스 스포츠",
  "웨이트",
  "테니스",
  "배드민턴",
  "스쿼시",
  "복싱",
  "스트레칭",
  "에어로빅",
  "레크리에이션",
  "서핑",
];

function SeniorExercise() {
  const [userInput, setUserInput] = useState("");
  const [exerciseName, setExerciseName] = useState([""]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  // const [fixedExercise, setFixedExercise] = useState([""]);
  // const [time, setTime] = useState([0]);
  const [data, setData] = useState<ExerciseData[]>([]);
  useEffect(() => {
    setExerciseName(items);

    console.log(data);
  });
  const searched = exerciseName.filter((item) => item.includes(userInput));

  return (
    <StContainer>
      <StHeader>
        <BackButton />
        <StTitle>운동 추가</StTitle>
        <StCenterContainer>
          <StInput onChange={(prop) => setUserInput(prop.target.value)} placeholder="운동을 입력해주세요" />
        </StCenterContainer>
      </StHeader>
      <ExerciseList selectedData={searched} setSelected={setIsSelected} />
      <STButtonContainer>
        {data[0] == null ? (
          isSelected == "" ? (
            <GrayButton disabled={true}>운동 선택</GrayButton>
          ) : (
            <BlueButton onClick={() => setIsOpen(true)}>운동 선택</BlueButton>
          )
        ) : isSelected == "" ? (
          <>
            <CalContainer>
              <StTitle className="title">선택한 운동</StTitle>
              <FlexContainer>
                {data.map(({ name, time }) => (
                  <FlexContainer key={name}>
                    <CalList>
                      {name}으로 {time} Kcal 소모
                    </CalList>
                    <StButtonBack src={require("../assets/images/img_esc.png")} />
                  </FlexContainer>
                ))}
              </FlexContainer>
            </CalContainer>
            <FlexContainer>
              <GrayButton disabled={true}>운동 추가</GrayButton>
              <BlueButton>확인</BlueButton>
            </FlexContainer>
          </>
        ) : (
          <>
            <CalContainer>
              <StTitle className="title">선택한 운동</StTitle>
              <FlexContainer>
                {data.map(({ name, time }) => (
                  <FlexContainer key={name}>
                    <CalList>
                      {name}으로 {time} Kcal 소모
                    </CalList>
                    <StButtonBack src={require("../assets/images/img_esc.png")} />
                  </FlexContainer>
                ))}
              </FlexContainer>
            </CalContainer>
            <FlexContainer>
              <BlueBTN onClick={() => setIsOpen(true)}>운동 추가</BlueBTN>
              <BlueBTN>확인</BlueBTN>
            </FlexContainer>
          </>
        )}
      </STButtonContainer>
      <StModal isOpen={isOpen}>
        <ExercisePopUp selectedData={isSelected} setIsOpen={setIsOpen} setData={setData} />
      </StModal>
    </StContainer>
  );
}

export default SeniorExercise;

const StInput = styled.input`
  background: white;
  border-radius: 1rem;
  border-color: #0066ff;
  color: rgba(0, 0, 0, 0.8);
  height: 4rem;
  width: 90%;
  letter-spacing: 0.3rem;
  text-indent: 2rem;
  font-family: "Pretendard-Regular";
  margin-bottom: 2rem;
  align-self: center;

  ::placeholder {
    background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);
    background-size: contain;
    background-position: 0.1rem center;
    background-repeat: no-repeat;
  }
`;

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;
`;

const StHeader = styled.div`
  display: block;
  border-bottom: 0.1rem solid #006ffd;
  position: sticky;
  top: 0rem;
  background-color: white;
`;

const StCenterContainer = styled.div`
  text-align: center;
`;

const STButtonContainer = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0rem;
  padding-top: 1rem;
  padding-bottom: 3rem;
`;

const GrayButton = styled(BlueButton)`
  background-color: #e8e9f1;
  border: none;
`;

const StModal = styled(Modal)`
  padding: 5rem;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`;

const CalContainer = styled.div`
  border-radius: 1rem;
  outline: 0.2rem solid #006ffd;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 34rem;
  .title {
    border-bottom: 0.1rem solid #006ffd;
    padding-bottom: 1rem;
  }
`;

const CalList = styled.li`
  font-family: "Pretendard-Regular";
  font-size: 1.7rem;
  margin-bottom: 1rem;
  list-style: none;
  margin-left: 2rem;
`;

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
`;

const FlexContainer = styled.div`
  justify-content: space-between;
  display: fixed;
  flex-wrap: wrap;
`;

const BlueBTN = styled(BlueButton)`
  width: 16rem;
  margin-right: 0.4rem;
`;
