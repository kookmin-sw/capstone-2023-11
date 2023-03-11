import styled from "styled-components";
import {
  AiOutlineCarryOut,
  AiOutlineMedicineBox,
  AiOutlineRadarChart,
  AiOutlineCalendar,
  AiTwotoneVideoCamera,
  AiOutlineUser,
} from "react-icons/ai";
import { useEffect, useState } from "react";

const StSeniorMain = styled.div`
  padding: 0rem 2rem;
  margin: 0;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 15rem;
`;

const User = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
  display: flex;
  &:hover {
    color: gray;
  }
`;

//const TopItem = styled.div``;

const MenuList = styled.ul``;

const MenuItem = styled.li`
  background-color: white;
  width: 100%;
  color: black;
  display: inline-flex;
  margin-left: 1rem;
  margin-bottom: 3rem;
  margin-top: 3rem;
  border-radius: 0.5rem;
  font-size: 3rem;
  &:hover {
    color: gray;
  }
`;

const Arrow = styled.div`
  width: 3rem;
  height: 3rem;
  margin-left: auto;
`;

function SeniorMain() {
  const [isRecoding, setRecoding] = useState(true);
  useEffect(() => {
    setRecoding(true);
  }, []);
  return (
    <StSeniorMain>
      <Header>
        <User>
          {isRecoding ? (
            <AiTwotoneVideoCamera color="lightgreen" size="4rem" />
          ) : (
            <AiTwotoneVideoCamera color="red" size="4rem" />
          )}
          <AiOutlineUser size="4rem" />
        </User>
      </Header>
      <MenuList>
        <MenuItem>
          <AiOutlineMedicineBox size="3rem" />
          복용중인 약<Arrow>{">"}</Arrow>
        </MenuItem>
        <MenuItem>
          <AiOutlineCarryOut size="3rem" />
          일정 관리<Arrow>{">"}</Arrow>
        </MenuItem>
        <MenuItem>
          <AiOutlineCalendar size="3rem" />
          캘린더<Arrow>{">"}</Arrow>
        </MenuItem>
        <MenuItem>
          <AiOutlineRadarChart size="3rem" />
          운동 및 식사 기록<Arrow>{">"}</Arrow>
        </MenuItem>
      </MenuList>
    </StSeniorMain>
  );
}

export default SeniorMain;
