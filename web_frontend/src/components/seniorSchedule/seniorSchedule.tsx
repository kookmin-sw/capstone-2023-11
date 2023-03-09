import { Link } from "react-router-dom";
import styled from "styled-components";
import TodoList from "./TodoList";
import TodoHead from "./TodoMain";

function SeniorSchedule() {
  const STSchedules = styled.li`
    background-color: #c7ecee;
    border-radius: 1rem;
    margin: 4rem 2rem;
    list-style: none;
    a {
      display: block;
      padding: 6rem;
      font-size: 2rem;
      text-decoration: none;
      color: inherit;
    }
  `;
  const STAddButton = styled(STSchedules)`
    background-color: #f6e58d;
    width: auto;
    height: auto;
    text-align: center;
    margin: 1rem 4rem;
    a {
      padding: 1.5rem;
    }
  `;
  const STContainer = styled.div`
    padding: 1rem 2rem;
    max-width: 240rem;
    max-height: 240rem;
    justify-content: center;
    margin: 1rem auto;
  `;

  return (
    <STContainer>
      <TodoHead />
      <TodoList />
      <STAddButton>
        <Link to={`/addschedule`}>일정 추가</Link>
      </STAddButton>
    </STContainer>
  );
}

export default SeniorSchedule;
