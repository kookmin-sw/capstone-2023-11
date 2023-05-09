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
      <StCheckButton onClick={handleOpenModal}>추가하기</StCheckButton>
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
  left: 25%;
  right: auto;
  width: 25rem;
  height: 50rem;
  font-family: "Pretendard-Regular";
`;

const StCheckButton = styled.button`
  width: 32.7rem;
  height: 4.8rem;
  background-color: #006ffd;
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  position: relative;
  bottom: 0rem;
  margin-bottom: 1rem;
`;

export default PillAddModal;
