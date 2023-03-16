import styled from "styled-components";
import CalChart from "../components/seniorSummary/CalChart";
// import BackButton from "../components/common/BackButton";
import NutrientChart from "../components/seniorSummary/NutrientChart";

const StHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 0.1rem solid #f8f9fe;
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;
const HeaderText = styled.div`
  font-size: 1.8rem;
  text-align: center;
  font-family: "Pretendard-Regular";
  align-self: center;
  color: #71727a;
`;

const ChartContainer = styled.div`
  padding: 2rem 2rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 2rem;
  margin-bottom: 2rem;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  padding: 2rem 2rem;
  text-align: center;
`;

const StText = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Bold";
  padding: 1rem 1rem;
`;

const STContainer = styled.div`
  padding: 3rem 2rem;
  justify-content: center;
  margin: 1rem auto;
`;
function SeniorSummaryPage() {
  return (
    <>
      <StHeader>
        {/* <BackButton to={`/addschedule`} /> */}
        <HeaderText>주간 보고서</HeaderText>
      </StHeader>
      <STContainer>
        <StTitle>김딸기님의 건강 점수는 80점! 😃</StTitle>
        <StText>주간 영양소 분석</StText>
        <ChartContainer>
          <NutrientChart />
        </ChartContainer>
        <StText>주간 칼로리 분석</StText>
        <ChartContainer>
          <CalChart />
        </ChartContainer>
      </STContainer>
    </>
  );
}

export default SeniorSummaryPage;
