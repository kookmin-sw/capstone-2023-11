import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPillImg, fetchPillInfo, pillInfoData } from "../core/api";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

function SeniorPillSelf() {
  const [value, setValue] = useState("");
  const [company, setCompany] = useState<string | undefined>("");
  const [depositMethod, setDepositMethod] = useState<string | undefined>("");
  const [effect, setEffect] = useState<string | undefined>("");
  const [useMethod, setUseMethod] = useState<string | undefined>("");
  const [caution, setCaution] = useState<string | undefined>("");
  const [imgUrl, setImgUrl] = useState<string | undefined>("");
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [dayValue, setDayValue] = useState(0);
  const [pillStatus, setPillStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setPillStatus(false);
  }, []);
  const pillInfo = () => {
    setPillStatus(true);
  };
  const { data } = useQuery(
    "pillInfo",
    () =>
      pillInfoData(
        value,
        company,
        depositMethod,
        effect,
        caution,
        useMethod,
        imgUrl,
        breakfast,
        lunch,
        dinner,
        dayValue,
      ),
    {
      enabled: !!pillStatus,
    },
  );
  useEffect(() => {
    if (data && pillStatus == true) {
      alert("등록되었습니다.");
      navigate("/senior/pill");
    }
  }, [data, navigate]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const { data: pillData } = useQuery<PillData>(["info", value], () => fetchPillInfo(value));
  const { data: imgData } = useQuery<ImgData>(["img", value], () => fetchPillImg(value));
  const [name, setName] = useState<string[] | undefined>([]);
  const onClickButton = () => {
    if (pillData) {
      setName(pillData?.data?.body?.items?.map((item) => (item.ITEM_NAME.match(/^([^(]+)/) || [])[1].trim()));
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [pillName, setPillName] = useState("");

  const handleOpenModal = (pill: string) => {
    setIsOpen(true);
    setPillName(pill);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onChangeDayValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayValue(parseInt(e.target.value));
  };

  const parser = new DOMParser();

  const effectParse = async (xmlString: string) => {
    const xml = parser.parseFromString(xmlString, "application/xml");
    const articles = Array.from(xml.getElementsByTagName("ARTICLE"));
    const result = [];
    for (const article of articles) {
      const title = article.getAttribute("title");
      const paragraph = article.getElementsByTagName("PARAGRAPH")[0];
      const text = paragraph?.textContent?.trim() || "";
      result.push({ title, text });
    }
    return JSON.stringify(result);
  };

  const useMethodParse = async (xmlString: string) => {
    const xml = parser.parseFromString(xmlString, "application/xml");
    const articles = Array.from(xml.getElementsByTagName("ARTICLE"));
    const result = [];
    for (const article of articles) {
      const title = article.getAttribute("title");
      const paragraph = article.getElementsByTagName("PARAGRAPH")[0];
      const text = paragraph?.textContent?.trim() || "";
      result.push({ title, text });
    }
    return JSON.stringify(result);
  };

  const cautionParse = async (xmlString: string) => {
    const xml = parser.parseFromString(xmlString, "application/xml");
    const articles = Array.from(xml.getElementsByTagName("ARTICLE"));
    const result = [];
    for (const article of articles) {
      const title = article.getAttribute("title");
      const paragraph = article.getElementsByTagName("PARAGRAPH")[0];
      const text = paragraph?.textContent?.trim() || "";
      result.push({ title, text });
    }
    return JSON.stringify(result);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StContainer>
        <StHeader>
          <StHederContent>
            <StLink to={`/senior/pill`}>
              <StBackBtn>
                <StBackBtnImg src={require("../assets/images/img_left.png")} />
              </StBackBtn>
            </StLink>
            <StTitle>직접 입력하기</StTitle>
          </StHederContent>
          <StHederContent>
            <StSearch placeholder="🔎 약 이름을 입력해주세요." onChange={onChangeValue} />
            <StSearchButton onClick={onClickButton}>
              <StSearchBtnImg src={require("../assets/images/search.png")} />
            </StSearchButton>
          </StHederContent>
        </StHeader>
        <StBody>
          <StPillList>
            {name?.map((value) => (
              <StPillItem
                key={value.toString()}
                onClick={async () => {
                  handleOpenModal(value.toString());
                  setValue(value.toString());
                  onClickButton();
                  setCompany(pillData?.data?.body?.items[0].ENTP_NAME);
                  setDepositMethod(pillData?.data?.body?.items[0].STORAGE_METHOD);
                  const eeDocData = String(pillData?.data?.body?.items[0].EE_DOC_DATA);
                  const nbDocData = String(pillData?.data?.body?.items[0].NB_DOC_DATA);
                  const udDocData = String(pillData?.data?.body?.items[0].UD_DOC_DATA);
                  const [effect, useMethod, caution] = await Promise.all([
                    effectParse(eeDocData),
                    useMethodParse(nbDocData),
                    cautionParse(udDocData),
                  ]);
                  setEffect(effect);
                  setUseMethod(useMethod);
                  setCaution(caution);
                  setImgUrl(
                    imgData?.data?.body.items
                      ? imgData?.data?.body.items[0].ITEM_IMAGE
                      : require(`../assets/images/pillPhoto.png`),
                  );
                }}>
                {value.length < 20 ? value : value.slice(0, 20) + "..."}
              </StPillItem>
            ))}
          </StPillList>
          <StModal isOpen={isOpen} onRequestClose={handleCloseModal}>
            <StButtonList>
              <StModalTitle>{pillName}</StModalTitle>
              <StModalTitle>복용하는 일 수</StModalTitle>
              <StModalSearch placeholder="몇 일치?" onChange={onChangeDayValue} />
              <StModalTitle>복용하는 시간대</StModalTitle>
              <StPillComponent>
                {breakfast == false ? (
                  <StSetPillButton onClick={() => setBreakfast(true)}>아침</StSetPillButton>
                ) : (
                  <StSetPillCheckButton onClick={() => setBreakfast(false)}>아침</StSetPillCheckButton>
                )}
                {lunch == false ? (
                  <StSetPillButton onClick={() => setLunch(true)}>점심</StSetPillButton>
                ) : (
                  <StSetPillCheckButton onClick={() => setLunch(false)}>점심</StSetPillCheckButton>
                )}
                {dinner == false ? (
                  <StSetPillButton onClick={() => setDinner(true)}>저녁</StSetPillButton>
                ) : (
                  <StSetPillCheckButton onClick={() => setDinner(false)}>저녁</StSetPillCheckButton>
                )}
              </StPillComponent>
              <StModalTitle>등록하시겠습니까?</StModalTitle>
              <StPillComponent2>
                <StSetPillCheckButton
                  onClick={() => {
                    handleCloseModal;
                    pillInfo();
                  }}>
                  네
                </StSetPillCheckButton>
                <StSetPillCheckButton onClick={handleCloseModal}>아니요</StSetPillCheckButton>
              </StPillComponent2>
            </StButtonList>
          </StModal>
        </StBody>
      </StContainer>
    </motion.div>
  );
}

interface PillData {
  data: {
    header: {
      resultCode: null;
      resultMsg: null;
    };
    body: {
      pageNo: number;
      totalCount: number;
      numOfRows: number;
      items: [
        {
          ITEM_SEQ: number;
          ITEM_NAME: string;
          ENTP_NAME: string;
          STORAGE_METHOD: string;
          EE_DOC_DATA: string;
          UD_DOC_DATA: string;
          NB_DOC_DATA: string;
        },
      ];
    };
  };
}

interface ImgData {
  data: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      pageNo: number;
      totalCount: number;
      numOfRows: number;
      items: [
        {
          ITEM_IMAGE: string;
        },
      ];
    };
  };
}

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
`;

const StHeader = styled.header`
  font-size: 2rem;
  border-bottom: 0.1rem solid #006ffd;
`;

const StHederContent = styled.div`
  display: flex;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
`;

const StBackBtnImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

const StSearch = styled.input`
  width: 80%;
  height: 4rem;
  border: 0.2rem solid gray;
  border-radius: 1rem;
  font-family: "Pretendard-Regular";
  margin: 2rem 1rem;
  padding: 2rem;
`;

const StSearchButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: 0;
  margin-top: 2.5rem;
`;

const StSearchBtnImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StBody = styled.div`
  font-size: 2rem;
`;

const StPillList = styled.ul`
  border: 0.1rem solid transparent;
  border-radius: 0.5rem;
`;

const StPillItem = styled.ul`
  padding: 1rem 3rem;
  border: 0.2rem solid #0066ff;
  border-radius: 1rem;
  line-height: 2rem;
  font-size: 1.2rem;
  font-family: "Pretendard-Bold";
  margin: 1rem;
  background-color: white;
`;

const StTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
`;

const StButtonList = styled.div`
  border: 0.2rem solid #0066ff;
  border-radius: 1rem;
  background-color: white;
  padding-bottom: 3rem;
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

const StModalTitle = styled.h1`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  width: 100%;
  margin: 2rem 0rem;
`;

const StModalSearch = styled.input`
  width: 80%;
  height: 4rem;
  border: 0.2rem solid gray;
  border-radius: 1rem;
  font-family: "Pretendard-Regular";
  margin: 0rem 10%;
  padding: 2rem;
`;

const StPillComponent = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
  padding: 0rem 3rem;
`;

const StPillComponent2 = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
  padding: 0rem 6rem;
`;

const StSetPillButton = styled.div`
  width: 6rem;
  height: 3.5rem;
  background: #eaf2ff;
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  color: #006ffd;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const StSetPillCheckButton = styled.div`
  width: 6rem;
  height: 3.5rem;
  background: #006ffd;
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default SeniorPillSelf;
