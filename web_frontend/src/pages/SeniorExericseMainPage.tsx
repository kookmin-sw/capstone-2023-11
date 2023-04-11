import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import { getRecordExerciseList } from "../core/api";

interface ExerciseForm {
  createdAt: string;
  eng: string;
  id: number;
  kcal: number;
  kor: string;
  type: string;
}

function SeniorExerciseMainPage() {
  const { data } = useQuery("exerciseList", () => getRecordExerciseList());
  useEffect(() => {
    console.log(data?.data);
  }, []);

  return (
    <StContainer>
      <StHeader>
        <BackButton />
        <StTitle>운동 기록</StTitle>
      </StHeader>
      <StContainer>
        {data?.data.map((item: ExerciseForm) => (
          <StExercise>
            <img src={require("../assets/images/img_kakao.png")} />
            <StExercise className="content">
              <div className="title">{item.kor}</div>
              <div className="content">{item.kcal}Kcal 소모</div>
              <div className="content">{item.id}시간</div>
            </StExercise>
          </StExercise>
        ))}
      </StContainer>
    </StContainer>
  );
}

export default SeniorExerciseMainPage;

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;
`;

const StHeader = styled.div`
  display: block;
  border-bottom: 0.1rem solid #006ffd;
  position: sticky;
  top: 0rem;
  background-color: white;
`;

const StExercise = styled.div`
  background-color: #eaf2ff;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 2rem;
  font-family: "Pretendard-Regular";
  display: flex;
  font-size: 1.7rem;
  img {
    margin-right: 1rem;
  }
  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .content {
    flex-direction: column;
    /* margin-bottom: 0.2rem; */
  }
`;
