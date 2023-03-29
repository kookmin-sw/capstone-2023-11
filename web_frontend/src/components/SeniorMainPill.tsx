import styled from "styled-components";
import { Link } from "react-router-dom";

function Pill() {
  return (
    <StPill>
      <StPillHeader>
        <StPillName>복용하는 약</StPillName>
        <Link to={`/senior/pill`}>
          <StPillAddBtn>자세히 보기</StPillAddBtn>
        </Link>
      </StPillHeader>
      <StPillList>
        <StPillItem>
          <StPillImg></StPillImg>
          <StPillContent>아스피린</StPillContent>
        </StPillItem>
        <StPillItem>
          <StPillImg></StPillImg>
          <StPillContent>비타민 B</StPillContent>
        </StPillItem>
        <StPillItem>
          <StPillImg></StPillImg>
          <StPillContent>타이레놀</StPillContent>
        </StPillItem>
        <StPillItem>
          <StPillImg></StPillImg>
          <StPillContent>혈압약</StPillContent>
        </StPillItem>
      </StPillList>
    </StPill>
  );
}

const StPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const StPillHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0rem 0rem 0rem 1rem;
  width: 35rem;
  height: 2rem;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const StPillName = styled.h1`
  font-family: "retendard-Bold";
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  line-height: 2rem;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StPillAddBtn = styled.button`
  font-family: "retendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.5rem;
  color: #006ffd;
  flex: none;
  flex-grow: 0;
  border: 0;
  background-color: transparent;
`;

const StPillList = styled.div`
  font-family: "Pretendard-Bold";
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  width: 100%;
  height: 19rem;
  overflow-x: scroll;
  align-self: stretch;
  background-color: transparent;
  border: 0;
`;

const StPillItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  width: 20rem;
  height: 19rem;
  background: white;
  border-radius: 2rem;
  flex: none;
  flex-grow: 0;
  background-color: white;
  border: 0.15rem solid gray;
  border-radius: 1.2rem;
  font-size: 2rem;
`;

const StPillImg = styled.img`
  width: 20rem;
  height: 12rem;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  border-radius: 2rem;
  border: transparent;
`;

const StPillContent = styled.div`
  font-family: "retendard-Bold";
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  width: 20rem;
  height: 7rem;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

export default Pill;
