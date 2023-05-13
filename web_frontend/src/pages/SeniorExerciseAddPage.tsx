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
import { ExerciseFixedData, GetExerciseData, navigateIndex } from "../core/atom";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";

function SeniorExercise() {
  const [userInput, setUserInput] = useState("");
  const [exerciseName, setExerciseName] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const [fixedData, setFixedData] = useState<ExerciseFixedData[]>([]);
  const [firstApi, setFirstApi] = useState(true);
  const setNameAtom = useSetRecoilState(navigateIndex);
  const navigate = useNavigate();

  const searched = exerciseName.filter((item) => item.includes(userInput));
  const onRemove = (id: string) => {
    setFixedData((prevData) => prevData.filter((fixedData) => fixedData.name !== id));
  };

  const { data } = useQuery("exerciseList", () => getExerciseList(), {
    cacheTime: 0,
    enabled: !!firstApi,
  });

  useEffect(() => {
    setNameAtom(3);
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
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.ul className="container" variants={container} initial="hidden" animate="visible">
      <StContainer>
        <StHeader>
          <div className="col">
            <div className="row">
              <BackButton />
              <StTitle>운동 추가</StTitle>
            </div>
            <StCenterContainer>
              <StInput onChange={(prop) => setUserInput(prop.target.value)} placeholder="🔎 운동을 입력해주세요" />
            </StCenterContainer>
          </div>
        </StHeader>
        <motion.li className="item" variants={items}>
          <ExerciseList selectedData={searched} setSelected={setIsSelected} getData={data?.data} />
        </motion.li>
        <STButtonContainer>
          {fixedData[0] == null ? (
            isSelected == "" ? (
              <motion.li className="item" variants={items}>
                <GrayButton disabled={true}>운동 선택</GrayButton>
              </motion.li>
            ) : (
              <motion.li className="item" variants={items}>
                <BlueButton onClick={() => setIsOpen(true)}>운동 선택</BlueButton>
              </motion.li>
            )
          ) : isSelected == "" ? (
            <motion.li className="item" variants={items}>
              <CalContainer>
                <StText className="title">선택한 운동</StText>
                <FlexContainer>
                  <div className="col">
                    {fixedData.map(({ name, time }) => (
                      <StListContainer key={name}>
                        <CalList>
                          {name}로 {time * data?.data.find((item: GetExerciseData) => item.kor === name)?.kcalPerHour}{" "}
                          Kcal 소모
                        </CalList>
                        <StButtonBack
                          src={require("../assets/images/img_esc.png")}
                          onClick={() => {
                            onRemove(name);
                          }}
                        />
                      </StListContainer>
                    ))}
                  </div>
                </FlexContainer>
              </CalContainer>
              <FlexContainer>
                <GrayBTN disabled={true}>운동 추가</GrayBTN>
                <BlueBTN>확인</BlueBTN>
              </FlexContainer>
            </motion.li>
          ) : (
            <motion.li className="item" variants={items}>
              <CalContainer>
                <StText className="title">선택한 운동</StText>
                <FlexContainer>
                  <div className="col">
                    {fixedData.map(({ name, time }) => (
                      <StListContainer key={name}>
                        <CalList>
                          {name}로 {time * data?.data.find((item: GetExerciseData) => item.kor === name)?.kcalPerHour}{" "}
                          Kcal 소모
                        </CalList>
                        <StButtonBack
                          src={require("../assets/images/img_esc.png")}
                          onClick={() => {
                            onRemove(name);
                          }}
                        />
                      </StListContainer>
                    ))}
                  </div>
                </FlexContainer>
              </CalContainer>
              <FlexContainer>
                <BlueBTN onClick={() => setIsOpen(true)}>운동 추가</BlueBTN>
                <BlueBTN onClick={() => submitClicked()}>확인</BlueBTN>
              </FlexContainer>
            </motion.li>
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
    </motion.ul>
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
    background-size: contain;
    background-position: 0.1rem center;
    background-repeat: no-repeat;
  }
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StTitle = styled.div`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 2.5rem;
  margin-top: 0.5rem;
`;

const StText = styled.div`
  font-size: 2.5rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  margin-top: 0.5rem;
`;

const StHeader = styled.header`
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #006ffd;
  position: sticky;
  top: 0rem;
  background-color: white;
  .col {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.3rem;
  }
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
  margin-bottom: 6rem;
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
  margin-bottom: 0.5rem;
  list-style: none;
  margin-left: 2rem;
  margin-top: 0.2rem;
`;

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
`;

const FlexContainer = styled.div`
  justify-content: space-between;
  display: fixed;
  flex-wrap: wrap;
  .col {
    display: flex;
    flex-direction: column;
  }
`;

const StListContainer = styled.div`
  display: flex;
  width: 30rem;
  justify-content: space-between;
  margin-top: 1rem;
  .col {
    display: flex;
    flex-direction: column;
  }
`;

const BlueBTN = styled(BlueButton)`
  width: 16rem;
  margin-right: 0.4rem;
`;

const GrayBTN = styled(BlueBTN)`
  background-color: #e8e9f1;
  border: none;
`;
