import styled from "styled-components";
import { Link } from "react-router-dom";

function NoPill() {
  return (
    <StPill>
      <StLink to={`/senior/pill`}>
        <StNoPill>
          <StContent1>현재 복용중인 약이 없습니다</StContent1>
          <StImgBox>
            <StPlusImg src={require(`../assets/icons/add.png`)} />
          </StImgBox>
          <StContent2>약 등록하기</StContent2>
        </StNoPill>
      </StLink>
    </StPill>
  );
}

const StPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const StNoPill = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  width: 100%;
  height: 18rem;
  background: #eaf2ff;
  flex: none;
  flex-grow: 0;
  background-color: #eaf2ff;
  border: 0;
  border-radius: 1.6rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  width: 100%;
`;

const StContent1 = styled.div`
  font-size: 1.5rem;
  font-family: "Pretendard-Regular";
  text-align: center;
  width: 100%;
  margin-top: 2.5rem;
`;

const StImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const StPlusImg = styled.img`
  width: 7rem;
  height: 7rem;
  align-items: center;
  margin: 1rem;
`;

const StContent2 = styled.div`
  font-size: 2.5rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  margin-bottom: 2.5rem;
`;

export default NoPill;
