import { useEffect, useState } from "react";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import { BlueButton } from "../components/common/BlueButton";
import ExerciseList from "../components/seniorExercise/ExerciseList";
import Modal from "react-modal";
import ExercisePopUp from "../components/seniorExercise/ExercisePopUp";
import { useQuery } from "react-query";
import { getExerciseList, postExerciseList } from "../core/api";
import { useNavigate } from "react-router-dom";
import { ExerciseFixedData, GetExerciseData } from "../core/atom";
import { motion } from "framer-motion";

function SeniorExercise() {
  const [userInput, setUserInput] = useState("");
  const [exerciseName, setExerciseName] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const [fixedData, setFixedData] = useState<ExerciseFixedData[]>([]);
  const [firstApi, setFirstApi] = useState(true);
  const navigate = useNavigate();

  const searched = exerciseName.filter((item) => item.includes(userInput));
  const onRemove = (id: string) => {
    setFixedData((prevData) => prevData.filter((fixedData) => fixedData.name !== id));
  };

  const { data } = useQuery("exerciseList", () => getExerciseList(), {
    enabled: !!firstApi,
  });

  useEffect(() => {
    setExerciseName([]);
  }, []);
  useEffect(() => {
    data?.data.map((item: GetExerciseData) => {
      setExerciseName((prevData) => [...prevData, item.kor]);
    });
    setFirstApi(false);
  }, [data]);

  const submitClicked = async () => {
    for (const { name, time } of fixedData) {
      const postData = data?.data.find((item: GetExerciseData) => item.kor === name)?.type;
      const postTime = time;
      try {
        await postExerciseList(postData, postTime);
      } catch (error) {
        console.error(error);
      }
    }
    navigate(`/senior/exercise`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StContainer>
        <StHeader>
          <BackButton />
          <StTitle>운동 추가</StTitle>
          <StCenterContainer>
            <StInput onChange={(prop) => setUserInput(prop.target.value)} placeholder="운동을 입력해주세요" />
          </StCenterContainer>
        </StHeader>
        <ExerciseList selectedData={searched} setSelected={setIsSelected} getData={data?.data} />
        <STButtonContainer>
          {fixedData[0] == null ? (
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
                  {fixedData.map(({ name, time }) => (
                    <FlexContainer key={name}>
                      <StButtonBack
                        src={require("../assets/images/img_esc.png")}
                        onClick={() => {
                          onRemove(name);
                        }}
                      />
                      <CalList>
                        {name}로 {time * data?.data.find((item: GetExerciseData) => item.kor === name)?.kcalPerHour}{" "}
                        Kcal 소모
                      </CalList>
                    </FlexContainer>
                  ))}
                </FlexContainer>
              </CalContainer>
              <FlexContainer>
                <GrayBTN disabled={true}>운동 추가</GrayBTN>
                <BlueBTN>확인</BlueBTN>
              </FlexContainer>
            </>
          ) : (
            <>
              <CalContainer>
                <StTitle className="title">선택한 운동</StTitle>
                <FlexContainer>
                  {fixedData.map(({ name, time }) => (
                    <FlexContainer key={name}>
                      <StButtonBack
                        src={require("../assets/images/img_esc.png")}
                        onClick={() => {
                          onRemove(name);
                        }}
                      />
                      <CalList>
                        {name}로 {time * data?.data.find((item: GetExerciseData) => item.kor === name)?.kcalPerHour}{" "}
                        Kcal 소모
                      </CalList>
                    </FlexContainer>
                  ))}
                </FlexContainer>
              </CalContainer>
              <FlexContainer>
                <BlueBTN onClick={() => setIsOpen(true)}>운동 추가</BlueBTN>
                <BlueBTN onClick={() => submitClicked()}>확인</BlueBTN>
              </FlexContainer>
            </>
          )}
        </STButtonContainer>
        <StModal isOpen={isOpen}>
          <ExercisePopUp
            selectedData={isSelected}
            setIsOpen={setIsOpen}
            setFixedData={setFixedData}
            getData={data?.data}
          />
        </StModal>
      </StContainer>
    </motion.div>
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
    background-image: url(https://cdn1.iconfinder.com/fixedData/icons/hawcons/32/698627-icon-111-search-256.png);
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
  padding: 2rem;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;

const CalContainer = styled.div`
  border-radius: 1rem;
  outline: 0.2rem solid #006ffd;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 33rem;
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

const GrayBTN = styled(BlueBTN)`
  background-color: #e8e9f1;
  border: none;
`;
