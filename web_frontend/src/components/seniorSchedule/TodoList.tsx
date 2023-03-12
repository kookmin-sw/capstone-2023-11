import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const STTodoContainer = styled.div`
  flex: 1;
  padding: 4rem 3rem;
  padding-bottom: 4rem;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <STTodoContainer>
      <TodoItem text="병원가기" done={true} />
      <TodoItem text="학교가기" done={true} />
      <TodoItem text="전화하기" done={false} />
      <TodoItem text="과제하기" done={false} />
      <TodoItem text="당근 사오기" done={false} />
    </STTodoContainer>
  );
}

export default TodoList;
