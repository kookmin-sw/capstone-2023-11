import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import styled from "styled-components";

Modal.setAppElement("#root");

function PillSetModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <StModalButton onClick={handleOpenModal}>➕ 약 추가하기</StModalButton>
      <StModal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <StTitle>{}</StTitle>
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

const StTitle = styled.h1`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
`;

const StModalButton = styled.button`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  border: 0;
  color: #0066ff;
  background-color: white;
  padding: 0 3rem;
  width: 100%;
  text-align: left;
  margin: 1.5rem 0;
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

const StModal = styled(Modal)`
  position: relative;
  top: 30%;
  bottom: auto;
  left: 18%;
  right: auto;
  width: 40rem;
  height: 100rem;
  font-family: "Pretendard-Regular";
`;

export default PillSetModal;
