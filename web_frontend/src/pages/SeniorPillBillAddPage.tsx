import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchPillImg, fetchPillInfo, pillImg } from "../core/api/index";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

function PillImgUpload() {
  const imageInput = useRef<any>(null);
  const onClickImageUpload = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  const [uploadSts, setUploadSts] = useState(false);
  const [formData] = useState<FormData>(new FormData());
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      formData.append("image", file);
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          if (reader.result != null) {
            resolve();
          }
        };
      });
    }
  };
  const uploadImage = () => {
    setUploadSts(true);
  };

  const SetUploadReset = () => {
    setUploadSts(false);
  };
  const nameList = useQuery("uploadImage", () => pillImg(formData), {
    enabled: !!uploadSts,
  });

  const [selected, setSelected] = useState<boolean[]>(
    Array.from({ length: nameList?.data?.data?.length || 0 }, () => false),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [register, setRegiester] = useState(false);
  const [pillName, setPillName] = useState<string | undefined>("");
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

  useEffect(() => {
    setRegiester(false);
  }, []);

  const [value, setValue] = useState("");
  const pillData = useQuery<PillData>(["info", value], () => fetchPillInfo(value));
  const imgData = useQuery<ImgData>(["img", value], () => fetchPillImg(value));

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
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

  const pillInfo = async () => {
    await setPillName(pillData.data?.body.items[0].ITEM_NAME);
    await setCompany(pillData.data?.body.items[0].ENTP_NAME);
    await setDepositMethod(pillData?.data?.body?.items[0].STORAGE_METHOD);
    const eeDocData = String(pillData?.data?.body?.items[0].EE_DOC_DATA);
    const udDocData = String(pillData?.data?.body?.items[0].UD_DOC_DATA);
    const nbDocData = String(pillData?.data?.body?.items[0].NB_DOC_DATA);
    const [effect, useMethod, caution] = await Promise.all([
      effectParse(eeDocData),
      useMethodParse(udDocData),
      cautionParse(nbDocData),
    ]);
    await setEffect(effect);
    await setUseMethod(useMethod);
    await setCaution(caution);
    await setImgUrl(imgData.data?.body.items[0].ITEM_IMAGE);
    setRegiester(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  const postPillInfo = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/medicine`,
      [
        {
          name: pillName,
          companyName: company,
          depositMethod: depositMethod,
          effect: effect,
          useMethod: useMethod,
          caution: caution,
          imageUrl: imgUrl,
          breakfast: breakfast,
          lunch: lunch,
          dinner: dinner,
          daysToTake: dayValue,
        },
      ],
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      },
    );
    const data = response.data;
    return data;
  };

  useEffect(() => {
    if (register == true) {
      postPillInfo().then(() => {
        alert("등록되었습니다.");
        setIsLoading(false);
      });
      setRegiester(false);
    }
  }, [register]);

  return (
    <StContainer>
      <StHeader>
        <Link to={`/senior/pill`}>
          <StBackBtn>
            <StBackBtnImg src={require("../assets/images/img_left.png")} />
          </StBackBtn>
        </Link>
        <StTitle>약봉투 인식하기</StTitle>
      </StHeader>
      <StBody>
        {uploadSts ? (
          <>
            <StList>
              {nameList?.data?.data?.map((name: string, index: number) =>
                selected[index] ? (
                  <StItemChecked
                    key={name.toString()}
                    onClick={() => {
                      handleOpenModal();
                      setSelectedIndex(index);
                      setValue(
                        name
                          .toString()
                          .replace(/[^0-9ㄱ-ㅎㅏ-ㅣ가-힣]+/g, "")
                          .trim(),
                      );
                    }}>
                    {name}
                  </StItemChecked>
                ) : (
                  <StItem
                    key={name.toString()}
                    onClick={() => {
                      handleOpenModal();
                      setSelectedIndex(index);
                      setValue(
                        name
                          .toString()
                          .replace(/[^0-9ㄱ-ㅎㅏ-ㅣ가-힣]+/g, "")
                          .trim(),
                      );
                    }}>
                    {name}
                  </StItem>
                ),
              )}
              모든 약을 등록하셨습니까?
              <BtnWrapper>
                <Link to={"/senior/pill"}>
                  <StButton>네</StButton>
                </Link>
                <StButton onClick={SetUploadReset}>아니요</StButton>
              </BtnWrapper>
            </StList>
            <StModal isOpen={isOpen} onRequestClose={handleCloseModal}>
              <StButtonList>
                <StModalTitle>{pillData.data?.body.items[0].ITEM_NAME}</StModalTitle>
                <StModalTitle>복용하는 일 수</StModalTitle>
                <StSearch placeholder="몇 일치?" onChange={onChangeDayValue} />
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
                      handleCloseModal();
                      pillInfo();
                      setSelected((prev: boolean[]) => {
                        const newSelected = [...prev];
                        newSelected[selectedIndex] = true;
                        return newSelected;
                      });
                    }}>
                    네
                  </StSetPillCheckButton>
                  <StSetPillCheckButton onClick={handleCloseModal}>아니요</StSetPillCheckButton>
                </StPillComponent2>
              </StButtonList>
            </StModal>
          </>
        ) : (
          <>
            <input multiple type="file" accept="image/*" onChange={(e) => uploadImg(e)} ref={imageInput} />
            <StUploadButton onClick={onClickImageUpload}>사진 올리기</StUploadButton>
            <StImg width={"100%"} src={require("../assets/images/pillBillImg.jpeg")} />
            <StInfoTitle>• 복약봉투 인식하는 방법은 다음과 같습니다.</StInfoTitle>
            <StInfoContainer>
              <StInfo>1. 사진 올리기를 이용해서 사진을 올린다.</StInfo>
              <StInfo>2. 약 확인하기를 누른 후, 약을 확인한다.</StInfo>
              <StInfo>3. 각각의 약을 눌러서 복용일자, 복용시간을 확인한다.</StInfo>
            </StInfoContainer>
            <StCheckButton onClick={() => uploadImage()}>약 확인하기</StCheckButton>
          </>
        )}
      </StBody>
    </StContainer>
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

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const StHeader = styled.header`
  padding-bottom: 2rem;
  display: flex;
  font-size: 2rem;
  border-bottom: 0.1rem solid #006ffd;
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

const StTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
`;

const StBody = styled.div`
  font-size: 2rem;
  font-family: "Pretendard-Regular";
  width: 100%;
  align-items: center;
  text-align: center;
  input[type="file"] {
    display: none;
  }
`;

const StList = styled.ul`
  padding: 0.5rem;
  border: 0.2rem solid #f8f9fe;
  background-color: #f8f9fe;
  border-radius: 2rem;
  text-align: center;
`;

const StItem = styled.li`
  display: flex;
  padding: 3rem;
  align-items: center;
  height: 5rem;
  margin: 2rem;
  color: #000000;
  font-family: "Pretendard-Regular";
  border: 0.15rem solid #eaf2ff;
  border-radius: 1.2rem;
  background-color: #ffffff;
`;

const StItemChecked = styled.li`
  display: flex;
  padding: 3rem;
  align-items: center;
  height: 5rem;
  margin: 2rem;
  color: #000000;
  font-family: "Pretendard-Regular";
  border: 0.15rem solid #eaf2ff;
  border-radius: 1.2rem;
  background-color: #eaf2ff;
`;

const BtnWrapper = styled.div`
  margin-bottom: 3rem;
`;

const StButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 2rem;
  font-size: 2rem;
  padding: 2rem;
  width: 10rem;
  margin: 2rem 1rem 0 1rem;

  &:active {
    background-color: #0062cc;
    color: #fff;
  }
`;

const StUploadButton = styled.button`
  width: 25rem;
  height: 4rem;
  background-color: #006ffd;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border: 0;
  border-radius: 1.2rem;
  margin-top: 4.3rem;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 0.5rem;
    width: 2rem;
  }
`;

const StCheckButton = styled.button`
  width: 100%;
  height: 4.8rem;
  background-color: #006ffd;
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  position: relative;
  bottom: 0rem;
`;

const StImg = styled.img`
  border-radius: 2.5rem;
  padding: 2rem;
`;

const StInfoTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem 3rem;
`;

const StInfo = styled.div`
  font-family: "Pretendard-Regular";
  font-size: 1.4rem;
  text-align: left;
  padding: 1rem 3rem;
  line-height: 1.8rem;
`;

const StInfoContainer = styled.div`
  background: #f8f9fe;
  border-radius: 1.6rem;
  padding: 2.4rem;
  margin-bottom: 1.3rem;
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

const StModalTitle = styled.h1`
  font-size: 1.7rem;
  font-family: "Pretendard-Bold";
  padding: 2rem 3rem;
  text-align: center;
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

export default PillImgUpload;
