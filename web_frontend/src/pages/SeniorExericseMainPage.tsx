import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import { deleteExerciseList, getRecordExerciseList } from "../core/api";
import { BlueButton } from "../components/common/BlueButton";
import SeniorCalendar from "../components/common/SeniorCalendar";
import moment from "moment";
import { ExerciseForm, navigateIndex } from "../core/atom";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { Helmet } from "react-helmet-async";

function SeniorExerciseMainPage() {
  const [firstApi, setFirstApi] = useState(true);
  const [deleteId, setDeleteId] = useState<number>(999);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const today = selectedDate ? moment(new Date()).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD");
  const setNameAtom = useSetRecoilState(navigateIndex);
  const { data } = useQuery("exerciseHistoryList", () => getRecordExerciseList(), {
    enabled: !!firstApi,
  });
  const [selected, setSelected] = useState<ExerciseForm[]>([]);
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
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

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.data) {
        const newSelected = data.data.filter((item: ExerciseForm) => item.createdAt.includes(selectedDate));
        setSelected(newSelected);
      }
    };

    fetchData();
  }, [data, selectedDate]);
  const { mutate } = useMutation(deleteExerciseList);

  useEffect(() => {
    setNameAtom(3);
  }, []);
  useEffect(() => {
    setFirstApi(false);
  }, [data]);

  const navigate = useNavigate();

  const onAddClick = () => {
    navigate(`/senior/exercise/add`);
  };
  const onDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const onDeleteConfirm = () => {
    mutate(deleteId, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setFirstApi(true);
      },
    });
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>운동 기록</title>
      </Helmet>
      <motion.ul className="container" variants={container} initial="hidden" animate="visible">
        <StSeniorExerciseMain>
          <StHeader>
            <StButtonBack src={require("../assets/images/img_left.png")} onClick={() => navigate(`/senior/main`)} />
            <StTitle>운동 기록</StTitle>
          </StHeader>
          <motion.li className="item" variants={items}>
            <SeniorCalendar setDate={setSelectedDate}></SeniorCalendar>
          </motion.li>
          <motion.li className="item" variants={items}>
            <StDate className="date">{moment(selectedDate).format("YYYY년 MM월 DD일")}</StDate>
          </motion.li>
          <motion.li className="item" variants={items}>
            <StContainer>
              {!selectedDate ? (
                <div>Loading...</div>
              ) : (
                selected?.map((item: ExerciseForm) => (
                  <motion.li className="item" variants={items}>
                    <StExercise>
                      <img src={require(`../assets/images/exerciseImg/img_${item.eng}.png`)} />
                      <div className="col">
                        <div className="title">{item.kor}</div>
                        <div className="content" style={{ whiteSpace: "nowrap" }}>
                          {item.kcal}Kcal 소모
                        </div>
                        <div className="content">{item.hour}시간</div>
                      </div>
                      <img
                        className="esc"
                        onClick={() => onDeleteClick(item.id)}
                        src={require(`../assets/images/img_esc.png`)}
                      />
                    </StExercise>
                  </motion.li>
                ))
              )}
            </StContainer>
          </motion.li>
          <motion.li className="item" variants={items}>
            {today == selectedDate ? (
              <StCheckButton whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={onAddClick}>
                추가하기
              </StCheckButton>
            ) : (
              <GrayButton whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                추가하기
              </GrayButton>
            )}
          </motion.li>
          <StModal isOpen={showDeleteModal}>
            <StPopContainer>
              <StDate className="POP">정말로 삭제하시겠습니까?</StDate>
              <BTNContainer>
                <BlueBTN whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={onDeleteConfirm}>
                  확인
                </BlueBTN>
                <BlueBTN
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setShowDeleteModal(false)}>
                  취소
                </BlueBTN>
              </BTNContainer>
            </StPopContainer>
          </StModal>
        </StSeniorExerciseMain>
      </motion.ul>
    </motion.div>
  );
}

export default SeniorExerciseMainPage;

const StSeniorExerciseMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StContainer = styled.div`
  overflow: scroll;
  max-height: 30rem;
  margin-top: 1.6rem;
`;

const StTitle = styled.p`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 2.5rem;
`;

const StDate = styled.p`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border-bottom: 0rem solid #ffffff;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
`;

const StExercise = styled.div`
  background-color: #eaf2ff;
  padding: 1rem;
  margin-bottom: 1.5rem;
  width: 32rem;
  border-radius: 1.6rem;
  font-family: "Pretendard-Regular";
  display: flex;
  font-size: 1.7rem;
  img {
    margin-right: 1rem;
    width: 6rem;
    height: 6rem;
  }
  .title {
    font-size: 2rem;
    margin-bottom: 0.7rem;
    margin-top: 0.2rem;
    font-family: "Pretendard-Bold";
  }
  .col {
    flex-direction: column;
    width: 18rem;
  }
  .esc {
    margin-left: 2rem;
    margin-right: 0.1rem;
    width: 2rem;
    height: 2rem;
  }
  .content {
    color: #006ffd;
    font-size: 1.3rem;
    margin-top: 0.2rem;
    font-family: "Pretendard-Bold";
  }
`;

const StModal = styled(Modal)`
  padding: 5rem;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  margin-top: 25rem;
`;
const StPopContainer = styled.div`
  padding: 1rem 1rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 1rem;
  width: 30rem;
  .POP {
    padding: 2rem;
  }
`;
const BTNContainer = styled.div`
  justify-content: space-evenly;
  display: flex;
  gap: 1rem;
`;

const BlueBTN = styled(BlueButton)`
  width: 10rem;
  margin-right: 0.4rem;
  font-family: "Pretendard-Regular";
`;

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
const StCheckButton = styled(motion.button)`
  width: 32.7rem;
  height: 4.8rem;
  background-color: #006ffd;
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  position: relative;
  bottom: 0rem;
  margin-bottom: 1rem;
`;

const GrayButton = styled(StCheckButton)`
  background-color: #e8e9f1;
  border: none;
`;
