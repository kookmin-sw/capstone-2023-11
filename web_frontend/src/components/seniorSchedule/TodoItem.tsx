import React from "react";
import styled, { css } from "styled-components";

interface ITodo {
  text: string;
  done: boolean;
}

interface IDone {
  done: boolean;
}

const STDeleteTodo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b5b6bc;
  font-size: 3rem;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;

const STTodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const STCheckCircle = styled.div<IDone>`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  border: 0.1rem solid #f6e58d;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
  cursor: pointer;
`;

const STCheckInside = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: #f6e58d;
`;
const STToDoText = styled.div<IDone>`
  flex: 2;
  font-size: 3rem;
  color: black;
  ${(props) =>
    props.done &&
    css`
      color: #dcdde1;
    `}
`;

function TodoItem({ text, done }: ITodo) {
  return (
    <STTodoItemBlock>
      <STCheckCircle done={done}>{done && <STCheckInside />}</STCheckCircle>
      <STToDoText done={done}>{text}</STToDoText>
      <STDeleteTodo>삭제</STDeleteTodo>
    </STTodoItemBlock>
  );
}

export default TodoItem;
