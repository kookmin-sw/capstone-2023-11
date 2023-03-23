import styled from "styled-components";
import CalChart from "../components/seniorSummary/CalChart";
import BackButton from "../components/common/BackButton";
import NutrientChart from "../components/seniorSummary/NutrientChart";
import ScoreChart from "../components/seniorSummary/ScoreChart";
import { BlueButton } from "../components/common/BlueButton";
import { CalComment, IUserData } from "../components/seniorSummary/Comment";
// import { CalComment } from "../components/seniorSummary/Comment";

const StHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 0.1rem solid #f8f9fe;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const HeaderText = styled.div`
  font-size: 1.8rem;
  text-align: center;
  font-family: "Pretendard-Regular";
  align-self: center;
  color: #71727a;
  flex: 1 1 0;
`;

const ChartContainer = styled.div`
  padding: 2rem 2rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 2rem;
  margin-bottom: 3rem;
`;

const CommentContainer = styled(ChartContainer)`
  margin-top: 2rem;
  background-color: #ffffff;
  font-size: 1.3rem;
  font-family: "Pretendard-Regular";
  white-space: pre-line;
  letter-spacing: 0.1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  padding: 1rem 2rem;
  text-align: center;
  margin-top: 1rem;
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

const nutrientText = {
  0: `이번주에는 지방과 탄수화물은 적당하지만\n단백질이 부족합니다\n고기나 계란류를 더 먹으면 좋을 것 같습니다`,
  1: `한끼를 거르게 되면 식단이 불균형해지니\n되도록 매끼니를 챙겨드시는 편이 좋습니다. \n 많게 먹는 것이 적게 먹는 것보다 낫습니다`,
};
function SeniorSummaryPage() {
  return (
    <>
      <StHeader>
        <BackButton to={`/addschedule`} />
        <HeaderText>주간 보고서</HeaderText>
      </StHeader>
      <STContainer>
        <StTitle>김딸기님의 건강 점수는?? 😃</StTitle>
        <ScoreChart />
        <StText>주간 영양소 분석</StText>
        <ChartContainer>
          {NutrientChart(dummyData)}
          <CommentContainer>{nutrientText[0]}</CommentContainer>
        </ChartContainer>
        <StText>주간 칼로리 분석</StText>
        <ChartContainer>
          {CalChart(dummyData)}
          <CommentContainer>{CalComment(dummyData)}</CommentContainer>
        </ChartContainer>
        <BlueButton>먹은 음식 기록 보기</BlueButton>
      </STContainer>
    </>
  );
}

export default SeniorSummaryPage;

const dummyData: IUserData = {
  isMale: true,
  age: 25,
  weight: 72,
  height: 170,
  sick: ["flu"],
  isSmoke: false,
  exercise: 3,
  calories: [2057, 1673, 1912, 1786, 2098, 1561, 2245],
  nutrient: {
    protein: [85, 68, 78, 73, 86, 64, 92],
    carbohydrate: [329, 268, 306, 286, 336, 249, 360],
    fat: [83, 70, 100, 62, 96, 87, 71],
    cholesterol: [77, 54, 93, 63, 60, 44, 92],
    sodium: [2071, 1632, 1864, 1754, 2054, 1524, 2209],
  },
};
