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
  const food = prop?.data[index].detail[index2];
  return (
    <StContainer>
      <StButtonBack
        src={require("../../assets/images/img_esc.png")}
        onClick={() => prop.setIsOpen(false)}></StButtonBack>
      <StTitle>{food.name}</StTitle>
      <div className="row">
        <StText>1회 제공량 ({food.servingSize} g)</StText>

        <StText>{food.calorie} kcal</StText>
      </div>
      <div className="line" />
      <div className="row">
        <StText>총 탄수화물 : </StText>
        <StText>{food.carbohyborateTotal} g</StText>
      </div>
      <div className="row">
        <StText>당류 : </StText>
        <StText>{food.carbohyborateSugar} g</StText>
      </div>
      <div className="row">
        <StText>식이섬유 : </StText>
        <StText>{food.carbohyborateDietaryFiber} g</StText>
      </div>
      <div className="row">
        <StText>단백질 : </StText>
        <StText>{food.protein} g</StText>
      </div>
      <div className="row">
        <StText>총 지방량 : </StText>
        <StText>{food.fatTotal} g</StText>
      </div>
      <div className="row">
        <StText>트랜스지방 : </StText>
        <StText>{food.fatTransFat} g</StText>
      </div>
      <div className="row">
        <StText>포화지방 : </StText>
        <StText>{food.fatSaturatedfat} g</StText>
      </div>
      <div className="row">
        <StText>콜레스테롤 : </StText>
        <StText>{food.cholesterol} mg</StText>
      </div>
      <div className="row">
        <StText>나트륨 : </StText>
        <StText>{food.natrium} mg</StText>
      </div>
    </StContainer>
  );
}

export default FoodDetailPopUp;

const StContainer = styled.div`
  padding: 1rem 1rem;
  justify-content: center;
  margin: auto;
  background-color: #f8f9fe;
  border-radius: 1rem;
  .line {
    border-bottom: 0.2rem solid #d4d6dd;
    padding: 0.5rem;
  }
  .right {
    text-align: end;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;
const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;
`;
const StText = styled.div`
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  padding: 1rem 1rem;
  margin-top: 0.8rem;
`;
