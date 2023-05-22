import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { fetchPillImg, fetchPillInfo, pillInfoData } from "../core/api";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../components/common/BackButton";
import { Helmet } from "react-helmet-async";

Modal.setAppElement("#root");

function SeniorPillSelf() {
  const [search, setSearch] = useState("");
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
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const dropdownItems = [1, 3, 5, 7, 10, 14, 30];

  const isActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const selectItem = (prop: number) => {
    setSelectedValue(prop);
    setIsActive((prev) => !prev);
  };

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
  const { data: pillData } = useQuery<PillData>(["info", search], () => fetchPillInfo(search));
  const { mutate, isLoading } = useMutation(fetchPillInfo);
  const { data: imgData } = useQuery<ImgData>(["img", search], () => fetchPillImg(search));
  const [name, setName] = useState<string[] | undefined>([]);
  const onClickButton = () => {
    if (pillData) {
      setName(pillData?.data?.body?.items?.map((item) => (item.ITEM_NAME.match(/^([^(]+)/) || [])[1].trim()));
    }
  };
  const onSubmitClicked = () => {
    mutate(search, {
      onSuccess: (data) => {
        setName(data?.data?.body?.items?.map((item: any) => (item.ITEM_NAME.match(/^([^(]+)/) || [])[1].trim()));
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    });
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
      <Helmet>
        <title>직접 등록하기</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/senior/pill/self" />
      </Helmet>
      <StContainer>
        <StHeader>
          <StHederContent>
            <BackButton />
            <StTitle>직접 등록하기</StTitle>
          </StHederContent>
          <StHederContent>
            <StSearch placeholder="🔎 약 이름을 입력해주세요." onChange={(prop) => setSearch(prop.target.value)} />
            <StSearchButton onClick={onSubmitClicked}>
              <StSearchBtnImg src={require("../assets/images/search.png")} />
            </StSearchButton>
          </StHederContent>
        </StHeader>
        <StBody>
          {isLoading ? (
            <StLoadingContainer>
              <StLoadingText>잠시만 기다려주세요.</StLoadingText>
              <StLoadingImg src={require("../assets/images/spinner.gif")} />
            </StLoadingContainer>
          ) : (
            <StPillList>
              {name?.map((value) => (
                <StPillItem
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                  💊
                  <StPillText>{value.length < 20 ? value : value.slice(0, 20) + "..."}</StPillText>
                </StPillItem>
              ))}
            </StPillList>
          )}

          <StModal isOpen={isOpen}>
            <StButtonList>
              <StButtonBack
                src={require("../assets/images/img_esc.png")}
                onClick={() => {
                  setIsOpen(false);
                  setIsActive(false);
                  setSelectedValue(0);
                }}></StButtonBack>
              <StModalTitle>{pillName}</StModalTitle>
              <div className="line" />
              <StPillComponent>
                <StModalContent>복용 일수</StModalContent>
                <DropdownContainer>
                  <DropdownBody onClick={isActiveToggle}>
                    {selectedValue ? (
                      <>
                        <ItemName>{selectedValue}</ItemName>
                      </>
                    ) : (
                      <>
                        <DropdownSelect>선택해주세요.</DropdownSelect>
                      </>
                    )}
                  </DropdownBody>
                  {isActive ? (
                    <DropdownMenuActive>
                      {dropdownItems.map((item) => (
                        <DropdownItemContainer id="item" key={item} onClick={() => selectItem(item)}>
                          <ItemName id="item">{item} 일</ItemName>
                        </DropdownItemContainer>
                      ))}
                    </DropdownMenuActive>
                  ) : (
                    <></>
                  )}
                </DropdownContainer>
              </StPillComponent>
              <StPillComponent>
                <StModalContent>복용 시간</StModalContent>
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
              <StModalContent>등록하시겠습니까?</StModalContent>
              <StPillComponent2>
                <StSetPillSubmitButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setDayValue(selectedValue);
                    handleCloseModal;
                    pillInfo();
                  }}>
                  네
                </StSetPillSubmitButton>
                <StSetPillSubmitButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedValue(0);
                    setIsOpen(false);
                    setIsActive(false);
                  }}>
                  아니요
                </StSetPillSubmitButton>
              </StPillComponent2>
            </StButtonList>
          </StModal>
        </StBody>
      </StContainer>
    </motion.div>
  );
}
export default SeniorPillSelf;

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StHeader = styled.header`
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #006ffd;
  position: sticky;
  top: 0rem;
  background-color: white;
  .col {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.3rem;
  }
`;

const StHederContent = styled.div`
  display: flex;
`;
const StSearch = styled.input`
  width: 80%;
  height: 4rem;
  color: rgba(0, 0, 0, 0.8);
  border-color: #0066ff;
  border-radius: 1rem;
  font-family: "Pretendard-Regular";
  margin: 2rem 1rem;
  padding: 2rem;
  letter-spacing: 0.3rem;

  ::placeholder {
    font-family: "Pretendard-Bold";
    background-size: contain;
    background-position: 0.1rem center;
    background-repeat: no-repeat;
  }
`;

const StSearchButton = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: transparent;
  border: 0;
  margin-top: 2.5rem;
`;

const StSearchBtnImg = styled.img`
  width: 3rem;
  height: 3rem;
  padding: 0.3rem;
`;

const StBody = styled.div`
  font-size: 2rem;
`;

const StPillList = styled.ul`
  border: 0.1rem solid transparent;
  border-radius: 0.5rem;
  margin-bottom: 7rem;
`;

const StPillItem = styled(motion.ul)`
  padding: 1rem 1rem;
  border: 0.2rem solid #6abaff;
  width: 30rem;
  border-radius: 1rem;
  margin: 1.5rem;
  background-color: #f8f9fe;
  display: flex;
  flex-direction: row;
`;

const StPillText = styled.div`
  line-height: 2rem;
  font-size: 1.3rem;
  font-family: "Pretendard-Bold";
  margin-left: 1rem;
`;

const StTitle = styled.h1`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 2.5rem;
  margin-top: 0.5rem;
`;

const StButtonList = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
  background-color: #f8f9fe;
  border-radius: 1rem;
  align-items: center;
  .line {
    border-bottom: 0.2rem solid #d4d6dd;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  .right {
    text-align: end;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const StModal = styled(Modal)`
  padding: 3rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const StModalTitle = styled.h1`
  font-family: "Pretendard-Bold";
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 3rem;
  align-self: center;
`;

const StModalContent = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin: 2rem;
  align-self: center;
`;

const StPillComponent = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const StPillComponent2 = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  gap: 3rem;
  padding: 0rem 6rem;
`;

const StSetPillButton = styled.div`
  width: 5rem;
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

const StSetPillCheckButton = styled(StSetPillButton)`
  color: white;
  background: #006ffd;
`;

const StSetPillSubmitButton = styled(motion.div)`
  width: 8rem;
  height: 4rem;
  background: #006ffd;
  border-radius: 1rem;
  font-family: "Pretendard-Bold";
  font-size: 1.8rem;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1rem;
`;

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;

const DropdownContainer = styled.div`
  width: fit-content;
  margin-top: 0.5rem;
`;

const DropdownBody = styled.div`
  display: flex;
  width: 15rem;
  justify-content: center;
  align-items: center;
  padding: 9px 14px;
  background: white;
  border-radius: 1rem;
  border: 0.2rem solid #d4d6dd;
`;

const DropdownSelect = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.3rem;
  text-align: center;
`;

const DropdownMenuActive = styled.ul`
  display: block;
  width: 15rem;
  background-color: white;
  position: absolute;
  border: 0.2rem solid #d4d6dd;
  border-radius: 1rem;
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 14px;
  border-bottom: 0.2rem solid #d4d6dd;
  border-top: none;
  border-radius: 0.1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.p`
  display: flex;
  align-self: center;
  justify-content: center;
  text-align: center;
  font-family: "Pretendard-Bold";
  font-size: 1.3rem;
`;

const StLoadingText = styled.div`
  text-align: center;
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  margin-top: 3rem;
`;

const StLoadingImg = styled.img`
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

const StLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
