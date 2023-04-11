import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { checkMeal } from "../core/api/index";
import BackButton from "../components/common/BackButton";
import { BlueStarIcn, CheckedIcn, PhotoIcn } from "../assets/icons";

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
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
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
  // console.log(data?.data?.result[index]?.class_info[0]);
  useEffect(() => {
    if (data != undefined) {
      setIndex(0);
    }
  }, [data]);
  const FoodDetect = () => {
    if (index + 1 == data?.data?.result.length) {
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
      {index >= 0 && finishDetect == 0 ? (
        <StBackground>
          <StCheckModal>
            <StCheckTitle>
              🧐 당신이 먹은 음식을
              <br />
              골라주세요!
            </StCheckTitle>
            {data?.data?.result[index].class_info.map((food: food, index: number) => (
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
              혹시 사진 올리기를 깜박하셨나요?
            </StSubInfo>
          </StInfoContainer>
          <StCheckButton onClick={() => uploadImage()}>분석하기</StCheckButton>
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
