import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getGuardianExerciseList } from "../core/api";
import GuardianCalendar from "../components/common/GuardianCalendar";
import moment from "moment";
import { ExerciseForm, navigateIndex } from "../core/atom";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { Helmet } from "react-helmet-async";

function GuardianExerciseViewPage() {
  const [firstApi, setFirstApi] = useState(true);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const setNameAtom = useSetRecoilState(navigateIndex);
  const { id } = useParams();
  const { data } = useQuery("guardianExerciseHistoryList", () => getGuardianExerciseList(Number(id)), {
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

  useEffect(() => {
    setNameAtom(3);
  }, []);
  useEffect(() => {
    setFirstApi(false);
  }, [data]);

  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>운동 기록</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/guardian/:id/exercise" />
      </Helmet>
      <motion.ul className="container" variants={container} initial="hidden" animate="visible">
        <StSeniorExerciseMain>
          <StHeader>
            <StButtonBack
              src={require("../assets/images/img_left.png")}
              onClick={() => navigate(`/guardian/${Number(id)}/main`)}
            />
            <StTitle>운동 기록</StTitle>
          </StHeader>
          <motion.li className="item" variants={items}>
            <GuardianCalendar setDate={setSelectedDate} id={Number(id)}></GuardianCalendar>
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
                    </StExercise>
                  </motion.li>
                ))
              )}
            </StContainer>
          </motion.li>
        </StSeniorExerciseMain>
      </motion.ul>
    </motion.div>
  );
}

export default GuardianExerciseViewPage;

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
const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
