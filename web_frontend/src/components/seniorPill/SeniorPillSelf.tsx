import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPillImg, fetchPillInfo, pillInfoData } from "../../core/api";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

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
  if (pillStatus == true && data !== undefined) {
    alert("등록되었습니다.");
    navigate("/senior/pill");
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const pillData = useQuery<PillData>(["info", value], () => fetchPillInfo(value));
  const imgData = useQuery<ImgData>(["img", value], () => fetchPillImg(value));
  const [name, setName] = useState<string[] | undefined>([]);
  const onClickButton = () => {
    if (pillData) {
      setName(pillData?.data?.body?.items?.map((item) => item.ITEM_NAME));
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
  return (
    <>
      <StHeader>
        <StSearch placeholder="🔎 약 이름을 입력해주세요." onChange={onChangeValue} />
        <StSearchButton onClick={onClickButton}>
          <StSearchBtnImg src={require("../../assets/images/search.png")} />
        </StSearchButton>
      </StHeader>
      <StBody>
        <StPillList>
          {name?.map((value) => (
            <StPillItem
              key={value.toString()}
              onClick={() => {
                handleOpenModal(value.toString());
                setValue(value.toString());
                onClickButton;
                setCompany(pillData?.data?.body?.items[0].ENTP_NAME);
                setDepositMethod(pillData?.data?.body?.items[0].STORAGE_METHOD.slice(0, 100));
                setEffect(pillData?.data?.body?.items[0].EE_DOC_DATA.slice(0, 100));
                setUseMethod(pillData?.data?.body?.items[0].UD_DOC_DATA.slice(0, 100));
                setCaution(pillData?.data?.body?.items[0].NB_DOC_DATA.slice(0, 100));
                setImgUrl(imgData.data?.body.items[0].ITEM_IMAGE);
              }}>
              {value.length < 20 ? value : value.slice(0, 20) + "..."}
            </StPillItem>
          ))}
        </StPillList>
        <StModal isOpen={isOpen} onRequestClose={handleCloseModal}>
          <StButtonList>
            <StTitle>{pillName}</StTitle>
            <StTitle>복용하는 일 수</StTitle>
            <StSearch placeholder="몇 일치?" onChange={onChangeDayValue} />
            <StTitle>복용하는 시간대</StTitle>
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
            <StTitle>등록하시겠습니까?</StTitle>
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
    </>
  );
}

interface PillData {
  header: {
    resultCode: string;
    resultMsg: string;
  };
  body: {
    numOfRows: string;
    pageNo: string;
    totalCount: string;
    items: [
      item: {
        ENTP_NO: string;
        MAKE_MATERIAL_FLAG: string;
        NEWDRUG_CLASS_NAME: string;
        INDUTY_TYPE: string;
        CANCEL_DATE: string;
        CANCEL_NAME: string;
        CHANGE_DATE: string;
        NARCOTIC_KIND_CODE: string;
        GBN_NAME: string;
        TOTAL_CONTENT: string;
        EE_DOC_DATA: string;
        UD_DOC_DATA: string;
        NB_DOC_DATA: string;
        PN_DOC_DATA: string;
        MAIN_ITEM_INGR: string;
        INGR_NAME: string;
        ATC_CODE: string;
        ITEM_ENG_NAME: string;
        ENTP_ENG_NAME: string;
        MAIN_INGR_ENG: string;
        ITEM_SEQ: string;
        ITEM_NAME: string;
        ENTP_NAME: string;
        ITEM_PERMIT_DATE: string;
        CNSGN_MANUF: string;
        ETC_OTC_CODE: string;
        CHART: string;
        BAR_CODE: string;
        MATERIAL_NAME: string;
        EE_DOC_ID: string;
        UD_DOC_ID: string;
        NB_DOC_ID: string;
        INSERT_FILE: string;
        STORAGE_METHOD: string;
        VALID_TERM: string;
        REEXAM_TARGET: string;
        REEXAM_DATE: string;
        PACK_UNIT: string;
        EDI_CODE: string;
        DOC_TEXT: string;
        PERMIT_KIND_NAME: string;
      },
    ];
  };
}

interface ImgData {
  header: { resultCode: string; resultMsg: string };
  body: {
    pageNo: number;
    totalCount: number;
    numOfRows: number;
    items: [
      {
        ITEM_SEQ: string;
        ITEM_NAME: string;
        ENTP_SEQ: string;
        ENTP_NAME: string;
        CHART: string;
        ITEM_IMAGE: string;
        PRINT_FRONT: string;
        PRINT_BACK: null;
        DRUG_SHAPE: string;
        COLOR_CLASS1: string;
        COLOR_CLASS2: null;
        LINE_FRONT: null;
        LINE_BACK: null;
        LENG_LONG: string;
        LENG_SHORT: string;
        THICK: string;
        IMG_REGIST_TS: string;
        CLASS_NO: string;
        CLASS_NAME: string;
        ETC_OTC_NAME: string;
        ITEM_PERMIT_DATE: string;
        FORM_CODE_NAME: string;
        MARK_CODE_FRONT_ANAL: string;
        MARK_CODE_BACK_ANAL: string;
        MARK_CODE_FRONT_IMG: string;
        MARK_CODE_BACK_IMG: string;
        ITEM_ENG_NAME: string;
        CHANGE_DATE: string;
        MARK_CODE_FRONT: null;
        MARK_CODE_BACK: null;
        EDI_CODE: string;
      },
    ];
  };
}

const StHeader = styled.header`
  padding: 5rem 5rem 0 5rem;
  display: flex;
  font-size: 2rem;
`;

const StSearch = styled.input`
  width: 80%;
  height: 4rem;
  border: 0.2rem solid gray;
  border-radius: 1rem;
  font-family: "Pretendard-Regular";
  padding-left: 2rem;
  margin: 0rem 2.5rem;
`;

const StSearchButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: 0;
`;

const StSearchBtnImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StBody = styled.div`
  padding: 1rem 5rem 5rem 5rem;
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
  font-size: 1rem;
  margin: 1rem;
  background-color: white;
`;

const StTitle = styled.h1`
  font-size: 1.7rem;
  font-family: "Pretendard-Bold";
  padding: 2rem 3rem;
  text-align: center;
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
