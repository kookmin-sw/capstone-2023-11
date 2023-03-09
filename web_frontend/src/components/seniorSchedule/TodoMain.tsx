import React from "react";
import styled from "styled-components";

const STToDoMainContainer = styled.div`
  padding-top: 4rem;
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid #f6e58d;
  h1 {
    margin: 0;
    font-size: 3.5rem;
    color: #343a40;
  }
  .day {
    margin-top: 2rem;
    font-size: 2rem;
    color: #868e96;
  }
  .left {
    margin-top: 4rem;
    font-size: 2rem;
    color: #f6e58d;
  }
`;

function ToDoMain() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <STToDoMainContainer>
      <h1>오늘</h1>
      <div className="day">{year + "년 " + month + "월 " + date + "일 " + week[now.getDay()] + "요일"}</div>
      <div className="left">할 일 ##개 남음</div>
    </STToDoMainContainer>
  );
}

export default ToDoMain;
