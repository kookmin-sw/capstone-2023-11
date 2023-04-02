import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const ModalPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);

  const path = ["처방전 인식하기", "직접 입력하기", "돌아가기"];

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "inital";
  }, [showModal]);

  const handleOptionClick = (option: SetStateAction<string>) => {
    setSelectedOption(option);
    setShowModal(false);
  };

  return (
    <>
      <StBtn onClick={() => setShowModal(true)}>{selectedOption ? selectedOption : "약 추가하기"}</StBtn>
      {showModal && (
        <StModal>
          <StList>
            {path.map((option) => (
              <StItem onClick={() => handleOptionClick(option)} key={option}>
                {option}
              </StItem>
            ))}
          </StList>
        </StModal>
      )}
    </>
  );
};

const StBtn = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 2rem;
  font-size: 2rem;
  padding: 2rem;
  width: 94%;
  margin: 1rem;

  &:active {
    background-color: #0062cc;
    color: #fff;
  }
`;

const StModal = styled.div`
  width: 94%;
  background-color: white;
  border: 0.2rem solid #006ffd;
  border-radius: 2rem;
  padding: 2rem;
  margin: 0 1rem;
`;

const StList = styled.ul``;

const StItem = styled.li``;

export default ModalPage;
