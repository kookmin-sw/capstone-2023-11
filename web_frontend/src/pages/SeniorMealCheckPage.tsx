import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { checkMeal, uploadMeal } from "../core/api/index";
import { BlueStarIcn, CheckedIcn, FoodIcn, PhotoIcn } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { navigateIndex } from "../core/atom";
import { useSetRecoilState } from "recoil";

interface food {
  food_name: string;
}

function SeniorMealCheckPage() {
  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  const [finishDetect, SetFinishDetect] = useState(0);
  const [imageSrc, setImageSrc]: any = useState();
  const [index, setIndex] = useState(-1);
  const [currentSelect, setCurrentSelect] = useState(0);
  const [uploadSts, setUploadSts] = useState(false);
  const [formData] = useState<FormData>(new FormData());
  const [selectFoods] = useState<number[]>([]);
  const [image, setImage] = useState<any>();
  const [foodFormData] = useState<FormData>(new FormData());
  const setNameAtom = useSetRecoilState(navigateIndex);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const image = new Image();
      image.src = imageSrc;
      const inW = image.width;
      const inH = image.height;
      ctx.drawImage(image, 0, 0, 300, 150);
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        data?.data?.result[index].x * (300 / inW),
        data?.data?.result[index].y * (150 / inH),
        data?.data?.result[index].w * (300 / inW),
        data?.data?.result[index].h * (150 / inH),
      );
    }
  }, [canvasRef, imageSrc, index]);

  useEffect(() => {
    setNameAtom(2);
  }, []);
  const navigate = useNavigate();
  const foodUpload = () => {
    const foodBody = { food: [{}] };
    foodBody.food.pop();
    for (let i = 0; i < selectFoods.length; i++) {
      if (selectFoods[i] != -1) {
        foodBody.food.push({
          name:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_name === "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_name,
          servingSize:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["1회제공량(g/ml)"],
          calorie:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["열량(kcal)"],
          carbohyborateTotal:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["탄수화물"][
              "총량(g)"
            ] === "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["탄수화물"][
                  "총량(g)"
                ],
          carbohyborateSugar:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["탄수화물"][
              "당류(g)"
            ] === "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["탄수화물"][
                  "당류(g)"
                ],
          carbohyborateDietaryFiber:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["탄수화물"][
              "식이섬유(g)"
            ] === "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["탄수화물"][
                  "식이섬유(g)"
                ],
          protein:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["단백질(g)"] ===
            "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["단백질(g)"],
          fatTotal:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["지방"][
              "총량(g)"
            ] === "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["지방"][
                  "총량(g)"
                ],
          fatTransFat: "0",
          fatSaturatedfat:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["지방"][
              "포화지방(g)"
            ] === "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["지방"][
                  "포화지방(g)"
                ],
          cholesterol:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"][
              "콜레스테롤(mg)"
            ] === "-"
              ? 0
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"][
                  "콜레스테롤(mg)"
                ],
          natrium:
            data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["나트륨(mg)"] ===
            "-"
              ? "0"
              : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["나트륨(mg)"],
        });
      }
    }

    foodFormData.append("image", image);
    const blob = new Blob([JSON.stringify(foodBody)], {
      type: "application/json",
    });
    foodFormData.append("food_info", blob);
    foodmutation.mutate(foodFormData);
  };
  const foodmutation = useMutation(uploadMeal, {
    onError: () => {
      alert("오류가 발생하였습니다! 사진을 다시 업로드해주세요!");
      // error
    },
    onSuccess: () => {
      alert("등록이 완료되었습니다!");
      navigate("/senior/meal");
    },
  });

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      formData.append("image", file);
      reader.readAsDataURL(file);
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          if (reader.result != null) {
            setImageSrc(reader.result); // 파일의 컨텐츠
            resolve();
          }
        };
      });
    }
  };
  const uploadImage = () => {
    setUploadSts(true);
  };

  const { data } = useQuery("uploadImage", () => checkMeal(formData), {
    enabled: !!uploadSts,
  });

  useEffect(() => {
    if (data != undefined) {
      setIndex(0);
      if (!data.data?.result[0]?.class_info) {
        alert("사진에서 음식을 인식하지 못했습니다! 음식사진을 올려주세요!");
        window.location.replace("/senior/meal/add");
      }
    }
  }, [data]);
  const FoodDetect = () => {
    if (index + 1 == data?.data?.result.length) {
      selectFoods.push(currentSelect);
      SetFinishDetect(1);
      return <></>;
    }
    selectFoods.push(currentSelect);
    setIndex(index + 1);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StMealCheckPage>
        <StHeader>
          <StButtonBack
            src={require("../assets/images/img_left.png")}
            onClick={() => {
              setUploadSts(false);
              navigate(-1);
            }}></StButtonBack>
          <StTitle>식단 등록하기</StTitle>
        </StHeader>
        {index >= 0 && finishDetect == 0 && data?.data?.result[index]?.class_info && uploadSts ? (
          <StBackground>
            <StCheckModal>
              <StCheckTitle>
                🧐 당신이 먹은 음식을
                <br />
                골라주세요!
              </StCheckTitle>
              <StAiFoodContainer>
                {/* <StFoodImg width={"100%"} src={imageSrc}></StFoodImg> */}
                <canvas ref={canvasRef}></canvas>
                {/* <StWhereFood style={{ left: data?.data?.result[index]?.x + 57, top: data?.data?.result[index]?.y }} /> */}
              </StAiFoodContainer>
              {data?.data?.result[index]?.class_info?.map((food: food, index: number) => (
                <>
                  {currentSelect == index ? (
                    <StFoodSelected whileHover={{ scale: 1.1 }}>
                      {food.food_name}
                      <img src={CheckedIcn} />
                    </StFoodSelected>
                  ) : (
                    <StFoodUnselected
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentSelect(index)}>
                      {food.food_name}
                    </StFoodUnselected>
                  )}
                </>
              ))}
              {currentSelect == -1 ? (
                <StFoodSelected>
                  여기엔 없어요 ㅜㅜ
                  <img src={CheckedIcn} />
                </StFoodSelected>
              ) : (
                <StFoodUnselected
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentSelect(-1)}>
                  여기엔 없어요 ㅜㅜ
                </StFoodUnselected>
              )}
              <StNextButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  FoodDetect();
                  setCurrentSelect(0);
                }}>
                다음으로
              </StNextButton>
            </StCheckModal>
          </StBackground>
        ) : (
          <></>
        )}
        {finishDetect == 0 ? (
          <>
            <input accept="image/*" multiple type="file" onChange={(e) => onUpload(e)} ref={imageInput} />
            <StUploadButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClickImageUpload}>
              <img src={PhotoIcn} />
              사진 업로드
            </StUploadButton>
            <StFoodImg width={"100%"} src={imageSrc} />
            <StFoodText>🧐 위 사진이 내가 먹은 음식이 맞나요? </StFoodText>
            <StInfoContainer>
              <StMainInfo>위 사진은 다음의 확인 과정을 거치게 됩니다.</StMainInfo>
              <StSubInfo>
                <img src={BlueStarIcn} />
                복실이가 음식 인식을 제대로 했나요?
              </StSubInfo>
              <StSubInfo>
                <img src={BlueStarIcn} />
                혹시 잘못된 사진을 올리시지는 않으셨나요?
              </StSubInfo>
              <StSubInfo>
                <img src={BlueStarIcn} />
                분석된 음식의 검증을 거친 후 등록됩니다!
              </StSubInfo>
            </StInfoContainer>
            <StCheckButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => uploadImage()}>
              분석하기
            </StCheckButton>
          </>
        ) : (
          <div className="center">
            <StMotionContainer className="container" variants={container} initial="hidden" animate="visible">
              <StMotionlist className="item" variants={items}>
                <StFoodImg width={"100%"} src={imageSrc} />
              </StMotionlist>
              <StMotionlist className="item" variants={items}>
                <StTitleContainer>🧐 당신이 먹은 음식은...</StTitleContainer>
              </StMotionlist>
              <StBoxContainer>
                {selectFoods.map((numdex: number, index: number) => {
                  if (index != -1 && numdex != -1) {
                    if (index % 2 == 0) {
                      return (
                        <StMotionlist className="item" variants={items}>
                          <StFoodBox1>
                            <img src={FoodIcn}></img>
                            <div>
                              <StFoodName>{data?.data?.result[index]?.class_info[numdex]?.food_name}</StFoodName>
                              <StNutrient>
                                탄수화물:
                                {
                                  data?.data?.result[index]?.class_info[numdex]?.food_nutrients["1회제공량당_영양성분"][
                                    "탄수화물"
                                  ]["총량(g)"]
                                }
                                g 단백질:{" "}
                                {
                                  data?.data?.result[index]?.class_info[numdex]?.food_nutrients["1회제공량당_영양성분"][
                                    "단백질(g)"
                                  ]
                                }
                                g
                              </StNutrient>
                            </div>
                            <StKcal>
                              {Math.round(
                                data?.data?.result[index]?.class_info[numdex]?.food_nutrients["1회제공량당_영양성분"][
                                  "열량(kcal)"
                                ],
                              )}
                              kcal
                            </StKcal>
                          </StFoodBox1>
                        </StMotionlist>
                      );
                    } else {
                      return (
                        <StMotionlist className="item" variants={items}>
                          <StFoodBox2>
                            <img src={FoodIcn}></img>
                            <div>
                              <StFoodName>{data?.data?.result[index]?.class_info[numdex]?.food_name}</StFoodName>
                              <StNutrient>
                                탄수화물:
                                {
                                  data?.data?.result[index]?.class_info[numdex]?.food_nutrients["1회제공량당_영양성분"][
                                    "탄수화물"
                                  ]["총량(g)"]
                                }
                                g 단백질:{" "}
                                {
                                  data?.data?.result[index]?.class_info[numdex].food_nutrients["1회제공량당_영양성분"][
                                    "단백질(g)"
                                  ]
                                }
                                g
                              </StNutrient>
                            </div>
                            <StKcal>
                              {Math.round(
                                data?.data?.result[index]?.class_info[numdex]?.food_nutrients["1회제공량당_영양성분"][
                                  "열량(kcal)"
                                ],
                              )}
                              kcal
                            </StKcal>
                          </StFoodBox2>
                        </StMotionlist>
                      );
                    }
                  }
                })}
              </StBoxContainer>
              <StMotionlist className="item" variants={items}>
                <StButtonFooter>
                  <StReupload
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.location.replace("/senior/meal/add")}>
                    다시 사진 올리기
                  </StReupload>
                  <Stupload whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => foodUpload()}>
                    등록하기
                  </Stupload>
                </StButtonFooter>
              </StMotionlist>
            </StMotionContainer>
          </div>
        )}
      </StMealCheckPage>
    </motion.div>
  );
}
export default SeniorMealCheckPage;

const StMealCheckPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .center {
    justify-content: center;
    align-items: center;
    margin-left: 3rem;
  }

  input[type="file"] {
    display: none;
  }
`;
const StTitle = styled.p`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 3.5rem;
`;
const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
`;
const StUploadButton = styled(motion.button)`
  width: 25rem;
  height: 4rem;
  background-color: #006ffd;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border: 0;
  border-radius: 1.2rem;
  margin-top: 4.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 0.5rem;
    width: 2rem;
  }
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
  margin-bottom: 2rem;
`;
const StFoodImg = styled.img`
  max-width: 80%;
  max-height: 30rem;
  margin-top: 2.3rem;
  border-radius: 1.2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
`;
const StFoodText = styled.p`
  font-size: 2.3rem;
  font-family: "Pretendard-Bold";
  margin-top: 1.6rem;
  margin-bottom: 1.3rem;
`;
const StInfoContainer = styled.div`
  width: 33.2rem;
  height: 16.3rem;
  background: #f8f9fe;
  border-radius: 1.6rem;
  padding: 2.4rem;
  margin-bottom: 1.3rem;
`;
const StMainInfo = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.63rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.6rem;
`;
const StSubInfo = styled.p`
  img {
    margin-right: 1.2rem;
  }
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  width: 28.4rem;
  display: flex;

  margin-bottom: 1.6rem;
`;
const StBackground = styled.main`
  display: flex;
  align-items: space-between;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.2rem);
  z-index: 2;
`;
const StCheckModal = styled.section`
  width: 30rem;
  height: 85vh;
  padding: 1.6rem 2.5rem 1.1rem 2.5rem;
  border-radius: 1.4rem;
  background-color: white;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StCheckTitle = styled.p`
  width: 25.2rem;
  font-family: "Pretendard-Bold";
  font-size: 2.5rem;
  line-height: 3rem;
  text-align: center;
`;
const StNextButton = styled(motion.button)`
  font-family: "Pretendard-Bold";
  width: 20rem;
  height: 4.8rem;
  background-color: #006ffd;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  border-radius: 1.2rem;
  margin-top: 1rem;
`;
const StFoodSelected = styled(motion.button)`
  width: 25rem;
  height: 5.2rem;
  font-family: "Pretendard-Bold";
  margin-bottom: 1.2rem;
  background: #eaf2ff;
  border-radius: 12px;
  border: none;
  color: #006ffd;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1.6rem;
  padding-left: 2rem;
`;
const StFoodUnselected = styled(motion.button)`
  width: 25rem;
  height: 5.2rem;
  font-family: "Pretendard-Bold";
  margin-bottom: 1.2rem;
  border: 0.5px solid #c5c6cc;
  border-radius: 12px;
  border: none;
  color: black;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1.6rem;
  padding-left: 2rem;
`;
const StTitleContainer = styled.p`
  width: 30rem;
  font-family: "Pretendard-Bold";
  font-size: 2.2rem;
  line-height: 3rem;
  margin-left: 5rem;
  margin-top: 1.2rem;
`;
const StFoodBox1 = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  height: 6rem;
  background: #eaf2ff;
  border-radius: 1.6rem;
  padding: 1.5rem;
  img {
    width: 3rem;
  }
  div {
    width: 18rem;
    margin-left: 1rem;
  }
  margin-bottom: 1.5rem;
`;
const StFoodBox2 = styled.div`
  display: flex;
  align-items: center;
  width: 32rem;
  height: 6rem;
  background: #ffffff;
  border: 0.3rem solid #eaf2ff;
  border-radius: 1.6rem;
  padding: 1.5rem;
  img {
    width: 3rem;
  }
  div {
    width: 18rem;
    margin-left: 1rem;
  }
  margin-bottom: 1.5rem;
`;
const StKcal = styled.p`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  margin-left: 1.2rem;
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
const StButtonFooter = styled.footer`
  width: 32rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-top: 1rem;
  padding-bottom: 2vh;
  padding-top: 0.8rem;
  margin-bottom: 7rem;
`;
const StReupload = styled(motion.button)`
  width: 15rem;
  height: 4.8rem;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  background-color: white;
  color: #006ffd;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
`;
const Stupload = styled(motion.button)`
  width: 15rem;
  height: 4.8rem;
  border-radius: 1.2rem;
  background-color: #006ffd;
  color: white;
  border: none;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
`;
const StBoxContainer = styled.div`
  height: 45vh;
  overflow: scroll;
  margin-top: 2rem;
  max-height: 30rem;
`;
const StMotionContainer = styled(motion.ul)`
  align-items: center;
  justify-content: center;
`;
const StMotionlist = styled(motion.li)`
  align-items: center;
  justify-content: center;
`;
const StAiFoodContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28rem;

  canvas {
    max-width: 100%;
    border-radius: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    height: 20vh;
  }
`;
const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
