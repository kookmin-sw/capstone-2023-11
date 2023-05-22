import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPillInfo } from "../core/api";
import { IPillData } from "../core/atom";
import { motion } from "framer-motion";
import BackButton from "../components/common/BackButton";
import { Helmet } from "react-helmet-async";

function GuardianPillDetailViewPage() {
  const [pillData, setPillData] = useState<IPillData>();

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getPillInfo();
      setPillData(data);
    }

    fetchData();
  }, []);

  const selectPill = pillData?.medicines.find((pill) => pill.id === Number(id));
  const navigate = useNavigate();
  const effectContent = selectPill?.effect ? JSON.parse(selectPill.effect) : [];
  const useMethodContent = selectPill?.useMethod ? JSON.parse(selectPill.useMethod) : [];
  const cautionContent = selectPill?.caution ? JSON.parse(selectPill.caution) : [];
  const resultEffect = effectContent
    .map((item: IcontentText, index: number, arr: IcontentText[]) => {
      if (item.title === "") {
        return item.text;
      } else {
        return `${item.title}<br>&nbsp;${item.text}${index === arr.length - 1 ? "" : "<br>"}`;
      }
    })
    .join("<br>");
  const resultUseMethod = useMethodContent
    .map((item: IcontentText, index: number, arr: IcontentText[]) => {
      if (item.title === "") {
        return item.text;
      } else {
        return `${item.title}<br>&nbsp;${item.text}${index === arr.length - 1 ? "" : "<br>"}`;
      }
    })
    .join("<br>");
  const resultCaution = cautionContent
    .map((item: IcontentText, index: number, arr: IcontentText[]) => {
      if (item.title === "") {
        return item.text;
      } else {
        return `${item.title}<br>&nbsp;${item.text}${index === arr.length - 1 ? "" : "<br>"}`;
      }
    })
    .join("<br>");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>약 세부정보</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/guardian/:id/pill/detail" />
      </Helmet>
      <StHeader>
        <BackButton />
        <StTitle>약 세부정보</StTitle>
      </StHeader>
      <StBody>
        <StContentList>
          <StImg src={selectPill?.imageUrl} />
          <StContentItem>
            <StItemName>이름</StItemName>
            <StItemContent>{selectPill?.name}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>회사</StItemName>
            <StItemContent>{selectPill?.companyName}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>보관 방법</StItemName>
            <StItemContent>{selectPill?.depositMethod}</StItemContent>
          </StContentItem>
          <StContentItem>
            <StItemName>효과 • 효능</StItemName>
            <StItemContent dangerouslySetInnerHTML={{ __html: resultEffect }} />
          </StContentItem>
          <StContentItem>
            <StItemName>투여 방법</StItemName>
            <StItemContent dangerouslySetInnerHTML={{ __html: resultUseMethod }} />
          </StContentItem>
          <StContentItem>
            <StItemName>주의 사항</StItemName>
            <StItemContent dangerouslySetInnerHTML={{ __html: resultCaution }} />
          </StContentItem>
          <BlueButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }} onClick={() => navigate(-1)}>
            돌아가기
          </BlueButton>
        </StContentList>
      </StBody>
    </motion.div>
  );
}

interface IcontentText {
  title: string;
  text: string;
}

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const StTitle = styled.h1`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 2.5rem;
`;

const StBody = styled.div`
  font-size: 2rem;
  padding: 0 2rem 0 2rem;
  margin: 3rem 0rem;
  padding-bottom: 7rem;
`;

const StImg = styled.img`
  width: 100%;
  height: 20rem;
  padding: 2rem;
  border-radius: 5rem;
`;

const StContentList = styled.ul`
  padding: 1rem;
  border: 0.2rem solid #006ffd;
  border-radius: 2rem;
  margin-bottom: 3rem;
`;

const StContentItem = styled.li`
  margin: 2rem;
`;

const StItemName = styled.div`
  font-family: "Pretendard-Bold";
  color: #006ffd;
  padding-bottom: 0.5rem;
`;

const StItemContent = styled.div`
  font-size: 1.8rem !important;
  font-family: "Pretendard-Regular";
`;

const BlueButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.8rem;
  color: white;
  font-family: "Pretendard-Regular";
  font-size: 2rem;
  background-color: #006ffd;
  border: 0.15rem solid #006ffd;
  border-radius: 1.2rem;
  margin-top: 3rem;
`;

export default GuardianPillDetailViewPage;
