import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Practice() {
  const MySwal = withReactContent(
    Swal.mixin({
      customClass: {
        confirmButton: "d-none",
        cancelButton: "d-none",
        closeButton: "closeButton",
      },
      buttonsStyling: false,
      showCloseButton: true,
    }),
  );

  const handleClick = () => {
    MySwal.fire({
      title: "약 추가하기",
      text: "Modal Message",
      html: (
        <>
          <BtnWrapper>
            <StButton to={`/senior/pill/bill`} onClick={() => Swal.close()}>
              처방전 인식하기
            </StButton>
            <StButton to={`/senior/main`} onClick={() => Swal.close()}>
              직접 등록하기
            </StButton>
          </BtnWrapper>
        </>
      ),
      showCancelButton: false,
      showConfirmButton: false,
      buttonsStyling: false,
      customClass: {
        container: "my-container-class",
      },
    });
  };
  <StCloseButton className="closeButton">×</StCloseButton>;
  return (
    <StBody>
      <StAddButton onClick={handleClick}>약 추가하기</StAddButton>
    </StBody>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StButton = styled(Link)`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 2rem;
  font-size: 2rem;
  padding: 2rem;
  margin-top: 1.5rem;

  &:active {
    background-color: #0062cc;
    color: #fff;
  }
`;

const StCloseButton = styled.button`
  font-size: 5rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
`;

const StBody = styled.div`
  padding: 2rem;
`;

const StAddButton = styled.button`
  display: flex;
  padding: 3rem;
  align-items: center;
  width: 100%;
  height: 5rem;
  color: #006ffd;
  font-family: "Pretendard-Regular";
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  background-color: white;
`;

export default Practice;
