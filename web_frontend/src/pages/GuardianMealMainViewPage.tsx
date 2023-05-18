import styled from "styled-components";
import { useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { getGuardianMealList } from "../core/api";
import { useNavigate, useParams } from "react-router-dom";
import { IMeal, IMealDetail, navigateIndex } from "../core/atom";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import Modal from "react-modal";
import FoodDetailPopUp from "../components/seniorSummary/FoodDetailPopUp";
import GuardianCalendar from "../components/common/GuardianCalendar";
import { Helmet } from "react-helmet-async";

interface IMealData {
  id: number;
  dateTime: string;
  times: number;
  imageUrl: string;
  detail: IMealDetail[];
}

function GuardianMealMainViewPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [firstApi, setFirstApi] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedData, setClickedData] = useState<IMeal[]>([]);
  const [clickedMeal, setClickedMeal] = useState(0);
  const [clickedFood, setClickedFood] = useState(0);
  const setNameAtom = useSetRecoilState(navigateIndex);
  const { id } = useParams();
  const { data } = useQuery("guardianExerciseHistoryList", () => getGuardianMealList(Number(id)), {
    enabled: !!firstApi,
  });
  let mode = true;
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
  useEffect(() => {
    setFirstApi(false);
  }, [data]);

  useEffect(() => {
    setNameAtom(2);
  }, []);
  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  function foodClicked(index: number, index2: number) {
    setIsOpen(true);
    setClickedMeal(index);
    setClickedFood(index2);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>식단 기록</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/guardian/:id/meal" />
      </Helmet>
      <motion.ul className="container" variants={container} initial="hidden" animate="visible">
        <StSeniorMealMain>
          <StHeader>
            <StButtonBack
              src={require("../assets/images/img_left.png")}
              onClick={() => navigate(`/guardian/${Number(id)}/main`)}
            />
            <StTitle>식단 기록</StTitle>
          </StHeader>
          <motion.li className="item" variants={items}>
            <GuardianCalendar setDate={setSelectedDate} id={Number(id)}></GuardianCalendar>
          </motion.li>
          <motion.li className="item" variants={items}>
            <StDate className="date">{moment(selectedDate).format("YYYY년 MM월 DD일")}</StDate>
          </motion.li>
          <motion.li className="item" variants={items}>
            <StFoodContainer>
              {data?.data?.mealInfos == undefined ? (
                <></>
              ) : (
                data?.data?.mealInfos
                  .filter((mealCon: IMealData) => mealCon.dateTime.includes(selectedDate))
                  .map((mealCon: IMealData, index: number) => {
                    return mealCon?.detail.map((meal: IMealDetail, index2) => {
                      if (mode) {
                        mode = !mode;
                        return (
                          <motion.li className="item" variants={items}>
                            <StFoodBox1
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.8 }}
                              id={meal.name}
                              onClick={() => {
                                foodClicked(index, index2);
                                setClickedData(
                                  data?.data?.mealInfos.filter((mealCon: IMealData) =>
                                    mealCon.dateTime.includes(selectedDate),
                                  ),
                                );
                              }}>
                              <img src={mealCon.imageUrl}></img>
                              <div>
                                <StFoodName>{meal.name}</StFoodName>
                                <StNutrient>
                                  탄수화물: {meal.carbohyborateTotal}g, 지방:{meal.fatTotal}g
                                </StNutrient>
                              </div>
                              <StKcal>{meal.calorie} Kcal</StKcal>
                            </StFoodBox1>
                          </motion.li>
                        );
                      } else {
                        mode = !mode;
                        return (
                          <motion.li className="item" variants={items}>
                            <StFoodBox2
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.8 }}
                              id={meal.name}
                              onClick={() => foodClicked(index, index2)}>
                              <img src={mealCon.imageUrl}></img>
                              <div>
                                <StFoodName>{meal.name}</StFoodName>
                                <StNutrient>
                                  탄수화물: {Math.round(meal.carbohyborateTotal)}g, 지방:{Math.ceil(meal.fatTotal)}g
                                </StNutrient>
                              </div>
                              <StKcal>{Math.round(meal.calorie)} Kcal</StKcal>
                            </StFoodBox2>
                          </motion.li>
                        );
                      }
                    });
                  })
              )}
            </StFoodContainer>
          </motion.li>
          <StModal isOpen={isOpen}>
            <FoodDetailPopUp
              clickedMeal={clickedMeal}
              clickedFood={clickedFood}
              data={clickedData}
              setIsOpen={setIsOpen}
            />
          </StModal>
        </StSeniorMealMain>
      </motion.ul>
    </motion.div>
  );
}

export default GuardianMealMainViewPage;

const StSeniorMealMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StTitle = styled.p`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 2.5rem;
`;
const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
`;
const StDate = styled.p`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border-bottom: 0rem solid #ffffff;
`;
const StFoodContainer = styled.div`
  overflow: scroll;
  max-height: 30rem;
  margin-top: 1.6rem;
`;
const StFoodBox1 = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 32rem;
  height: 6rem;
  background: #eaf2ff;
  border-radius: 1.6rem;
  padding: 1.5rem;
  border: 0.3rem solid #eaf2ff;
  img {
    width: 4rem;
    height: 3.5rem;
    border-radius: 1rem;
  }
  div {
    width: 18rem;
    margin-left: 1rem;
  }
  margin-bottom: 1.5rem;
`;
const StFoodBox2 = styled(StFoodBox1)`
  background: #ffffff;
  border: 0.3rem solid #eaf2ff;
`;
const StKcal = styled.p`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  margin-left: 1.2rem;
  white-space: nowrap;
`;
const StFoodName = styled.p`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
`;
const StNutrient = styled.p`
  color: #006ffd;
  font-size: 1.2rem;
  margin-top: 0.4rem;
  font-family: "Pretendard-Bold";
`;

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;

const StModal = styled(Modal)`
  padding: 5rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;
