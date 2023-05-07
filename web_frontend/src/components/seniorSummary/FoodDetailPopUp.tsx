import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IMeal } from "../../core/atom";

interface IData {
  clickedMeal: number;
  clickedFood: number;
  data: IMeal[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function FoodDetailPopUp(prop: IData) {
  const index = prop.clickedMeal;
  const index2 = prop.clickedFood;
  return (
    <StContainer>
      <StButtonBack
        src={require("../../assets/images/img_esc.png")}
        onClick={() => prop.setIsOpen(false)}></StButtonBack>
      <StTitle>{prop?.data[index].detail[index2].name}</StTitle>
    </StContainer>
  );
}

export default FoodDetailPopUp;

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
  background-color: #f8f9fe;
  border-radius: 1rem;
`;
const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;
`;
