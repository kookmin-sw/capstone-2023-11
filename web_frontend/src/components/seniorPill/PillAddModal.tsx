import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import styled from "styled-components";

Modal.setAppElement("#root");

function PillAddModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <FlexContainer>
        <StModalButton onClick={handleOpenModal}>+</StModalButton>
      </FlexContainer>
      <StModal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <StButtonList>
          <Link to={"/senior/pill/bill"}>
            <StButton>💊 약봉투 인식하기</StButton>
          </Link>
          <Link to={"/senior/pill/self"}>
            <StButton>📝 직접 입력하기</StButton>
          </Link>
          <StButton onClick={handleCloseModal}>⬅️ 돌아가기</StButton>
        </StButtonList>
      </StModal>
    </>
  );
}

const StModalButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 2.5rem;
  background-color: #006ffd;
  font-size: 6.5rem;
  color: white;
  text-align: center;
  align-items: center;
  display: flex;
  border: none;
`;

const StButtonList = styled.div`
  border: 0.2rem solid #0066ff;
  border-radius: 1rem;
  background-color: white;
`;

const StButton = styled.button`
  padding: 1rem 2rem;
  margin: 1rem;
  width: 100%;
  font-size: 2rem;
  text-align: left;
  background-color: transparent;
  color: #0066ff;
  border: 0;
`;

const FlexContainer = styled.div`
  position: fixed;
  bottom: 0rem;
  padding-top: 1rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: flex-end;
  right: 20%;
`;

const StModal = styled(Modal)`
  position: relative;
  top: 30%;
  bottom: auto;
  left: 18%;
  right: auto;
  width: 25rem;
  height: 50rem;
  font-family: "Pretendard-Regular";
`;

export default PillAddModal;
