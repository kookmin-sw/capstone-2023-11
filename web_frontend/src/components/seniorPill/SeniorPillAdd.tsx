// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
// https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService03/getDrugPrdtPrmsnDtlInq02?serviceKey=zKSH%2F9jINWNjCG3mSkBuStun63jSwB2Ydqc3KY68unj1wo50jqvFuJBtVSv3ZIt1F12IZh9aJyXSgUzN%2BY8Y9Q%3D%3D&type=json&item_name=무코스타
// http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=zKSH%2F9jINWNjCG3mSkBuStun63jSwB2Ydqc3KY68unj1wo50jqvFuJBtVSv3ZIt1F12IZh9aJyXSgUzN%2BY8Y9Q%3D%3D&itemName=타이레놀&type=json
function SeniorPillAdd() {
  const [info, setInfo] = useState<PillData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(
          `https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService03/getDrugPrdtPrmsnDtlInq02?serviceKey=zKSH%2F9jINWNjCG3mSkBuStun63jSwB2Ydqc3KY68unj1wo50jqvFuJBtVSv3ZIt1F12IZh9aJyXSgUzN%2BY8Y9Q%3D%3D&type=json&item_name=무코스타`,
        )
      ).json();
      console.log(infoData);
      setInfo(infoData);
    })();
  }, []);
  return (
    <>
      <StHeader>
        <StBackBtn>{"<"}</StBackBtn>
        <StPillTitle>약 추가하기</StPillTitle>
      </StHeader>
      <StBody>
        <StAddList>
          <StAddResult>{info?.name}</StAddResult>
          <StAddItem>처방전 인식하기</StAddItem>
          <StAddItem>바코드 인식하기</StAddItem>
          <StAddItem>직접 입력하기</StAddItem>
        </StAddList>
      </StBody>
    </>
  );
}

interface PillData {
  name: string;
}

const StHeader = styled.header`
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  font-size: 2rem;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
`;

const StPillTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
`;

const StBody = styled.div`
  font-size: 2rem;
`;

const StAddList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 2rem;
  padding: 2rem;
`;

const StAddItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: #f8f9fe;
  border-radius: 2rem;
  align-self: stretch;
  font-family: "Pretendard-Bold";
  padding: 3rem;
  border: 0;
  font-size: 2rem;
`;
const StAddResult = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: #f8f9fe;
  border-radius: 2rem;
  align-self: stretch;
  font-family: "Pretendard-Bold";
  padding: 3rem;
`;

export default SeniorPillAdd;
