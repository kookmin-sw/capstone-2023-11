import styled from "styled-components";

function ExerciseList() {
  const items = [
    "걷기",
    "달리기",
    "게이트볼",
    "배드민턴",
    "수영",
    "등산",
    "골프",
    "야구",
    "축구",
    "농구",
    "당구",
    "볼링",
    "헬스",
    "낚시",
    "럭비",
    "서핑",
  ];
  return (
    <StContainer>
      {items.map((item, key) => (
        <StExercise key={key}>
          <img src={require("../../assets/images/img_kakao.png")} />
          {item}
        </StExercise>
      ))}
    </StContainer>
  );
}

export default ExerciseList;

const StContainer = styled.div`
  padding: 3rem 2rem;
  justify-content: center;
  margin: 1rem auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const StExercise = styled.div`
  background-color: #e8e9f1;
  margin: 1rem;
  height: auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  padding-bottom: 0.5rem;
  img {
    padding: 1.5rem;
  }
`;
