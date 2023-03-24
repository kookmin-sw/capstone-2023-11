import styled from "styled-components";

function PillDetail() {
  return (
    <>
      <StHeader>
        <StPillTitle>"무코스타정(레바미피드)"</StPillTitle>
      </StHeader>
      <StBody>
        <StImg src={require("../../assets/images/pillSample.jpg")} />
        <StContent>
          <StPillName>무코스타정(레바미피드)</StPillName>
          <StPillName>한국오츠카제약(주)</StPillName>
          <StPillName>"차광밀폐용기, 실온보관(1~30℃)"</StPillName>
          <StPillName>
            위궤양, 다음 질환의 위점막병변(미란, 출혈, 발적, 부종)의 개선 : 급성위염, 만성위염의 급성악화기
          </StPillName>
          <StPillName>
            성인 : 레바미피드로서 1회 100 mg을 1일 3회 경구투여한다. 다만, 위궤양의 경우에는 아침, 저녁 및 취침전에
            투여한다.
          </StPillName>
          <StPillName>다음 환자에는 투여하지 말 것. 이 약 성분에 과민반응 병력 환자</StPillName>
          <BlueButton>돌아가기</BlueButton>
        </StContent>
      </StBody>
    </>
  );
}
/*
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
*/

const StHeader = styled.header`
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  font-size: 2rem;
`;

const StPillTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
`;

const StBody = styled.div`
  font-size: 2rem;
`;

const StImg = styled.img`
  width: 100%;
  height: 20rem;
  padding: 2rem;
  border-radius: 5rem;
`;

const StContent = styled.ul`
  padding: 2rem;
`;

const StPillName = styled.li``;

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
`;

export default PillDetail;
