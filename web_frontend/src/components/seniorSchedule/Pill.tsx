import styled from "styled-components";

function Pill() {
  return (
    <StPill>
      <StPillHeader>
        <StPillName>복용하는 약</StPillName>
        <StPillAddBtn>약 추가하기</StPillAddBtn>
      </StPillHeader>
      <StPillList>
        <StPillItem>
          <StPillImg></StPillImg>
          <StPillContent></StPillContent>
        </StPillItem>
        <StPillItem></StPillItem>
        <StPillItem></StPillItem>
        <StPillItem></StPillItem>
      </StPillList>
    </StPill>
  );
}

const StPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.6rem;
  width: 35rem;
  height: 23rem;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const StPillHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0rem 0rem 0rem 1rem;
  gap: 14rem;
  width: 35rem;
  height: 2rem;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const StPillName = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StPillAddBtn = styled.button`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: #006ffd;
  flex: none;
  order: 1;
  flex-grow: 0;
  border: 0;
  background-color: transparent;
`;

const StPillList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.2rem;
  width: 100%;
  height: 19rem;
  overflow-x: scroll;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const StPillItem = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  width: 20rem;
  height: 19rem;
  background: #f8f9fe;
  border-radius: 2rem;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StPillImg = styled.li`
  width: 20rem;
  height: 12rem;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const StPillContent = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  width: 20rem;
  height: 7rem;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export default Pill;
