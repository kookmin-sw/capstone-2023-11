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
          <StTitle>약 추가하기</StTitle>
          <div className="line" />
          <div className="col">
            <Link to={"/senior/pill/bill"}>
              <StButton>💊 약봉투 인식하기</StButton>
            </Link>
            <Link to={"/senior/pill/self"}>
              <StButton>📝 직접 입력하기</StButton>
            </Link>
            <StButton onClick={handleCloseModal}>⬅️ 돌아가기</StButton>
          </div>
        </StButtonList>
      </StModal>
    </>
  );
}

const StButtonList = styled.div`
  padding: 1rem 1rem;
  border: 0.2rem solid #0066ff;
  border-radius: 1rem;
  justify-content: center;
  background-color: #ffffff;
  margin-top: 10rem;
  .line {
    border-bottom: 0.2rem solid #d4d6dd;
    padding: 0.5rem;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const StButton = styled.button`
  width: 100%;
  height: 4.8rem;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  background-color: white;
  color: #006ffd;
  font-size: 1.6rem;
  font-family: "Pretendard-Bold";
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const StModal = styled(Modal)`
  padding: 5rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
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

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
  align-self: center;
  justify-content: center;
`;

export default PillAddModal;
