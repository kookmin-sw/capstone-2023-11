import styled from "styled-components";

function SeniorPillMain() {
  return (
    <>
      <StHeader>
        <StBackBtn>{"<"}</StBackBtn>
        <StPillTitle>복용하는 약 목록</StPillTitle>
      </StHeader>
      <StBody>
        <StPillList>
          <StPillAdd>약 추가하기</StPillAdd>
          <StPillItem>아스피린</StPillItem>
          <StPillItem></StPillItem>
          <StPillItem></StPillItem>
          <StPillItem></StPillItem>
          <StPillItem></StPillItem>
          <StPillItem></StPillItem>
          <StPillItem></StPillItem>
        </StPillList>
      </StBody>
    </>
  );
}

const StHeader = styled.header`
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  font-size: 2rem;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
`;

const StPillTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
`;

const StBody = styled.div`
  font-size: 2rem;
`;

const StPillList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 2rem;
  padding: 2rem;
`;

const StPillItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: #f8f9fe;
  border-radius: 2rem;
  align-self: stretch;
  font-family: "Pretendard-Bold";
`;

const StPillAdd = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: #006ffd;
  border-radius: 2rem;
  align-self: stretch;
  text-align: center;
  font-family: "Pretendard-Bold";
`;

export default SeniorPillMain;
