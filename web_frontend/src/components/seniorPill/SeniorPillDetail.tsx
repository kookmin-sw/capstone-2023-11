import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPillInfo } from "../../core/api";

function PillDetail() {
  const [pillData, setPillData] = useState<IpillData>();

  useEffect(() => {
    async function fetchData() {
      const data = await getPillInfo();
      setPillData(data);
    }

    fetchData();
  }, [console.log(pillData)]);
  return (
    <>
      <StHeader>
        <StPillTitle>약 세부정보</StPillTitle>
      </StHeader>
      <StBody>
        <StContentList>
          <StImg src={require("../../assets/images/pillSample.jpg")} />
          <StContentItem>
            <StItemName>이름</StItemName>
            <StItemContent>무코스타정(레바미피드)</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>회사</StItemName>
            <StItemContent>한국오츠카제약(주)</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>보관 방법</StItemName>
            <StItemContent>"차광밀폐용기, 실온보관(1~30℃)"</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>효과 • 효능</StItemName>
            <StItemContent>
              위궤양, 다음 질환의 위점막병변(미란, 출혈, 발적, 부종)의 개선 : 급성위염, 만성위염의 급성악화기
            </StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>투여 방법</StItemName>
            <StItemContent>
              성인 : 레바미피드로서 1회 100 mg을 1일 3회 경구투여한다. 다만, 위궤양의 경우에는 아침, 저녁 및 취침전에
              투여한다.
            </StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>주의 사항</StItemName>
            <StItemContent>다음 환자에는 투여하지 말 것. 이 약 성분에 과민반응 병력 환자</StItemContent>
          </StContentItem>
          <StLink to={"/senior/pill"}>
            <BlueButton>돌아가기</BlueButton>
          </StLink>
        </StContentList>
      </StBody>
    </>
  );
}

interface IpillData {
  userToken: "string";
  medicalInfos: [
    {
      name: "string";
      companyName: "string";
      depositMethod: "string";
      effect: "string";
      useMethod: "string";
      caution: "string";
      imageUrl: "string";
    },
  ];
}

const StHeader = styled.header`
  padding-top: 5rem;
  padding-bottom: 5rem;
  font-size: 2rem;
`;

const StPillTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
`;

const StBody = styled.div`
  font-size: 2rem;
  padding: 0 2rem 0 2rem;
`;

const StImg = styled.img`
  width: 100%;
  height: 20rem;
  padding: 2rem;
  border-radius: 5rem;
`;

const StContentList = styled.ul`
  padding: 2rem;
  border: 0.2rem solid #006ffd;
  border-radius: 2rem;
`;

const StContentItem = styled.li`
  margin: 2rem;
`;

const StItemName = styled.div`
  font-family: "Pretendard-Bold";
  color: #006ffd;
  padding-bottom: 0.5rem;
`;

const StItemContent = styled.div`
  font-size: 1.4rem;
  font-family: "Pretendard-Regular";
`;

const BlueButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  color: white;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  background-color: #006ffd;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  margin-top: 3rem;
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

export default PillDetail;
