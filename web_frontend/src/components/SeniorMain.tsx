import styled from "styled-components";
import Pill from "./Pill";

function SeniorMai() {
  return (
    <>
      <StHeader>
        <StUser>아이콘</StUser>
      </StHeader>
      <MenuList>
        <StMainItem>
          <Pill />
        </StMainItem>
        <StTodo>할일</StTodo>
        <StAIDoc>AI</StAIDoc>
        <StFood>음식</StFood>
        <StExercise>운동</StExercise>
      </MenuList>
    </>
  );
}

const StHeader = styled.header`
  font-size: 2rem;
  display: flex;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const StUser = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
  display: flex;
  &:hover {
    color: gray;
  }
`;

//const TopItem = styled.div``;

const MenuList = styled.ul``;

// const MenuItem = styled.li`
//   background-color: white;
//   width: 100%;
//   color: black;
//   display: inline-flex;
//   margin-left: 1rem;
//   margin-bottom: 3rem;
//   margin-top: 3rem;
//   border-radius: 0.5rem;
//   font-size: 2rem;
//   &:hover {
//     color: gray;
//   }
// `;

const StMainItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.4rem 1.6rem;
  gap: 4rem;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const StTodo = styled.div``;

const StAIDoc = styled.div``;

const StFood = styled.div``;

const StExercise = styled.div``;

export default SeniorMai;
