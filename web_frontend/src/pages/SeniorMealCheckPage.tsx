import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { checkMeal, uploadMeal } from "../core/api/index";
import BackButton from "../components/common/BackButton";
import { BlueStarIcn, CheckedIcn, FoodIcn, PhotoIcn } from "../assets/icons";

interface food {
  food_name: string;
}

function SeniorMealCheckPage() {
  const imageInput = useRef<any>(null);
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
  const foodUpload = () => {
    const foodBody = { food: [{}] };
    foodBody.food.pop();
    for (let i = 0; i < selectFoods.length; i++) {
      foodBody.food.push({
        name:
          data?.data?.result[i]?.class_info[selectFoods[i]].food_name === "-"
            ? "0"
            : data?.data?.result[i]?.class_info[selectFoods[i]].food_name,
        servingSize:
          data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["1회제공량(g/ml)"],
        calorie: data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["열량(kcal)"],
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
          data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["단백질(g)"] === "-"
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
          data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["콜레스테롤(mg)"] ===
          "-"
            ? 0
            : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"][
                "콜레스테롤(mg)"
              ],
        natrium:
          data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["나트륨(mg)"] === "-"
            ? "0"
            : data?.data?.result[i]?.class_info[selectFoods[i]].food_nutrients["1회제공량당_영양성분"]["나트륨(mg)"],
      });
    }

    foodFormData.append("image", image);
    const blob = new Blob([JSON.stringify(foodBody)], {
      type: "application/json",
    });
    console.log(foodBody);
    foodFormData.append("food_info", blob);
    foodmutation.mutate(foodFormData);
  };
  const foodmutation = useMutation(uploadMeal, {
    onMutate: (variable) => {
      console.log("onMutate", variable);
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onError: () => {
      alert("오류가 발생하였습니다! 사진을 다시 업로드해주세요!");
      // error
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
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

  // console.log(data?.data?.result[index]?.class_info[0].food_nutrients);
  useEffect(() => {
    if (data != undefined) {
      setIndex(0);
      if (!data.data?.result[0]?.class_info) {
        alert("사진에서 음식을 인식하지 못했습니다! 음식사진을 올려주세요!");
        window.location.replace("/senior/mealCheck");
      }
    }
  }, [data]);
  const FoodDetect = () => {
    if (index + 1 == data?.data?.result.length) {
      selectFoods.push(currentSelect);
      console.log(selectFoods);
      SetFinishDetect(1);
      return <></>;
    }
    selectFoods.push(currentSelect);
    setIndex(index + 1);
  };
  return (
    <StMealCheckPage>
      <StHeader>
        <BackButton />
        <StTitle>식단 등록하기</StTitle>
      </StHeader>

      {index >= 0 && finishDetect == 0 && data?.data?.result[index]?.class_info ? (
        <StBackground>
          <StCheckModal>
            <StCheckTitle>
              🧐 당신이 먹은 음식을
              <br />
              골라주세요!
            </StCheckTitle>
            {data?.data?.result[index]?.class_info?.map((food: food, index: number) => (
              <>
                {currentSelect == index ? (
                  <StFoodSelected>
                    {food.food_name}
                    <img src={CheckedIcn} />
                  </StFoodSelected>
                ) : (
                  <StFoodUnselected onClick={() => setCurrentSelect(index)}>{food.food_name}</StFoodUnselected>
                )}
              </>
            ))}
            {currentSelect == -1 ? (
              <StFoodSelected>
                여기엔 없어요 ㅜㅜ
                <img src={CheckedIcn} />
              </StFoodSelected>
            ) : (
              <StFoodUnselected onClick={() => setCurrentSelect(-1)}>여기엔 없어요 ㅜㅜ</StFoodUnselected>
            )}

            <StNextButton onClick={() => FoodDetect()}>다음으로</StNextButton>
          </StCheckModal>
        </StBackground>
      ) : (
        <></>
      )}
      {finishDetect == 0 ? (
        <>
          <input accept="image/*" multiple type="file" onChange={(e) => onUpload(e)} ref={imageInput} />
          <StUploadButton onClick={onClickImageUpload}>
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
          <StCheckButton onClick={() => uploadImage()}>분석하기</StCheckButton>
        </>
      ) : (
        <></>
      )}
      {finishDetect == 1 ? (
        <>
          <StFoodImg width={"100%"} src={imageSrc} />
          <StTitleContainer>🧐 당신이 먹은 음식은...</StTitleContainer>
          <StBoxContainer>
            {selectFoods.map((numdex: number, index: number) => {
              if (index % 2 == 0) {
                return (
                  <StFoodBox1>
                    <img src={FoodIcn}></img>
                    <div>
                      <StFoodName>{data?.data?.result[index]?.class_info[numdex]?.food_name}</StFoodName>
                      <StNutrient>
                        탄수화물:
                        {
                          data?.data?.result[index]?.class_info[numdex].food_nutrients["1회제공량당_영양성분"][
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
                        data?.data?.result[index]?.class_info[numdex].food_nutrients["1회제공량당_영양성분"][
                          "열량(kcal)"
                        ],
                      )}
                      kcal
                    </StKcal>
                  </StFoodBox1>
                );
              } else {
                return (
                  <StFoodBox2>
                    <img src={FoodIcn}></img>
                    <div>
                      <StFoodName>{data?.data?.result[index]?.class_info[numdex]?.food_name}</StFoodName>
                      <StNutrient>
                        탄수화물:
                        {
                          data?.data?.result[index]?.class_info[numdex].food_nutrients["1회제공량당_영양성분"][
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
                        data?.data?.result[index]?.class_info[numdex].food_nutrients["1회제공량당_영양성분"][
                          "열량(kcal)"
                        ],
                      )}
                      kcal
                    </StKcal>
                  </StFoodBox2>
                );
              }
            })}
          </StBoxContainer>
          <StButtonFooter>
            <StReupload onClick={() => window.location.replace("/senior/mealCheck")}>다시 사진 올리기</StReupload>
            <Stupload onClick={() => foodUpload()}>등록하기</Stupload>
          </StButtonFooter>
        </>
      ) : (
        <></>
      )}
    </StMealCheckPage>
  );
}
export default SeniorMealCheckPage;

const StMealCheckPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
const StUploadButton = styled.button`
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
const StCheckButton = styled.button`
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
`;
const StFoodImg = styled.img`
  max-width: 80%;
  max-height: 30rem;
  margin-top: 2.3rem;
  border-radius: 1.2rem;
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
  height: 55rem;
  padding: 1.6rem 2.5rem 4.1rem 2.5rem;
  border-radius: 1.4rem;
  background-color: white;
  margin-top: 5rem;
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
  margin-bottom: 2.7rem;
`;
const StNextButton = styled.button`
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
const StFoodSelected = styled.button`
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
const StFoodUnselected = styled.button`
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
  margin-top: 1.5rem;
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
  margin-top: 1.5rem;
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
`;
const StButtonFooter = styled.footer`
  width: 32rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-top: 3rem;
  position: fixed;
  bottom: 2vh;
`;
const StReupload = styled.button`
  width: 15rem;
  height: 4.8rem;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  background-color: white;
  color: #006ffd;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
`;
const Stupload = styled.button`
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
`;
