import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPillImg, fetchPillInfo, pillImg } from "../core/api/index";
import Modal from "react-modal";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../components/common/BackButton";
import { BlueStarIcn, PhotoIcn, CheckedIcn } from "../assets/icons";
import { MedicineData } from "../core/atom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

Modal.setAppElement("#root");

function PillImgUpload() {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const onClickImageUpload = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  const [uploadSts, setUploadSts] = useState(false);
  const [formData] = useState<FormData>(new FormData());
  const [imgInput, setImgInput]: any = useState();
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      formData.append("image", file);
      reader.readAsDataURL(file);
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          if (reader.result != null) {
            setImgInput(reader.result);
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
  const [selectedValue, setSelectedValue] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const dropdownItems = [1, 3, 5, 7, 10, 14, 30];
  const [pillList, setPillList] = useState<MedicineData[]>([]);

  const isActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const selectItem = (prop: number) => {
    setSelectedValue(prop);
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    setRegiester(false);
  }, []);

  const [value, setValue] = useState("");
  const [pillName2, setPillName2] = useState("");
  const { data: pillData } = useQuery<PillData>(["info", value], () => fetchPillInfo(value));
  const { data: imgData } = useQuery<ImgData>(["img", value], () => fetchPillImg(value));

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
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

  const pillInfo = async () => {
    setPillName(pillData?.data?.body.items[0].ITEM_NAME);
    setCompany(pillData?.data?.body.items[0].ENTP_NAME);
    setDepositMethod(pillData?.data?.body?.items[0].STORAGE_METHOD);
    const eeDocData = String(pillData?.data?.body?.items[0].EE_DOC_DATA);
    const udDocData = String(pillData?.data?.body?.items[0].UD_DOC_DATA);
    const nbDocData = String(pillData?.data?.body?.items[0].NB_DOC_DATA);
    await effectParse(eeDocData).then((effectParseData) => setEffect(effectParseData));
    await useMethodParse(udDocData).then((useMethodParseData) => setUseMethod(useMethodParseData));
    await cautionParse(nbDocData).then((cautionParseData) => setCaution(cautionParseData));
    setImgUrl(
      imgData?.data?.body?.items ? imgData?.data?.body.items[0].ITEM_IMAGE : require(`../assets/images/pillPhoto.png`),
    );
  };

  const [setting, setSetting] = useState(false);

  useEffect(() => {
    if (setting) {
      setPillList((prev) => [
        ...prev,
        {
          name: String(pillName),
          companyName: String(company),
          depositMethod: String(depositMethod),
          effect: String(effect),
          useMethod: String(useMethod),
          caution: String(caution),
          imageUrl: String(imgUrl),
          breakfast: breakfast,
          lunch: lunch,
          dinner: dinner,
          daysToTake: dayValue,
        },
      ]);
    }
    setSetting(false);
  }, [setting]);

  const [isLoading, setIsLoading] = useState(false);

  const postPillInfo = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/medicine`, pillList, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
    const data = response.data;
    return data;
  };

  const RegisterData = () => {
    setRegiester(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (register == true) {
      postPillInfo().then(() => {
        alert("등록되었습니다.");
        navigate("/senior/pill");
        setIsLoading(false);
      });
      setRegiester(false);
    }
  }, [register]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Helmet>
        <title>약봉투 인식하기</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/senior/pill/bill" />
      </Helmet>
      <StContainer>
        <StHeader>
          <BackButton />
          <StTitle>약봉투 인식하기</StTitle>
        </StHeader>
        <StBody>
          {uploadSts ? (
            <>
              <StList>
                <StBillTitle>약을 선택해 등록해주세요</StBillTitle>
                {nameList?.data?.data?.map((name: string, index: number) =>
                  selected[index] ? (
                    <StItemChecked key={name.toString()}>
                      {name}
                      <img src={CheckedIcn} />
                    </StItemChecked>
                  ) : (
                    <StItem
                      key={name.toString()}
                      onClick={() => {
                        handleOpenModal();
                        setSelectedIndex(index);
                        setPillName2(name);
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
                <StModalContent>모든 약을 등록하셨습니까?</StModalContent>
                <StPillComponent2>
                  <StSetPillSubmitButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={RegisterData}>
                    네
                  </StSetPillSubmitButton>
                  <StSetPillSubmitButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={SetUploadReset}>
                    아니요
                  </StSetPillSubmitButton>
                </StPillComponent2>
              </StList>
              <StModal isOpen={isOpen} onRequestClose={handleCloseModal}>
                <StButtonList>
                  <StButtonBack
                    src={require("../assets/images/img_esc.png")}
                    onClick={() => setIsOpen(false)}></StButtonBack>
                  <StModalTitle>{pillName2}</StModalTitle>
                  <div className="line" />
                  <StPillComponent>
                    <StModalContent>복용 일 수</StModalContent>
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
                            <DropdownItemContainer
                              id="item"
                              key={item}
                              onClick={() => {
                                selectItem(item);
                                setDayValue(item);
                              }}>
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
                      onClick={async () => {
                        await pillInfo().then(() => {
                          setSetting(true);
                          handleCloseModal();
                        });
                        setBreakfast(false);
                        setLunch(false);
                        setDinner(false);
                        selectItem(0);
                        setDayValue(0);
                        setIsActive(false);
                        setSelected((prev: boolean[]) => {
                          const newSelected = [...prev];
                          newSelected[selectedIndex] = true;
                          return newSelected;
                        });
                      }}>
                      네
                    </StSetPillSubmitButton>
                    <StSetPillSubmitButton
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setBreakfast(false);
                        setLunch(false);
                        setDinner(false);
                        selectItem(0);
                        setDayValue(0);
                        handleCloseModal();
                      }}>
                      아니요
                    </StSetPillSubmitButton>
                  </StPillComponent2>
                </StButtonList>
              </StModal>
            </>
          ) : (
            <div className="center">
              <input multiple type="file" accept="image/*" onChange={(e) => uploadImg(e)} ref={imageInput} />
              <StUploadButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClickImageUpload}>
                <img src={PhotoIcn} />
                사진 업로드
              </StUploadButton>
              {imgInput ? (
                <StImg width={"100%"} src={imgInput} />
              ) : (
                <StImg width={"100%"} src={require("../assets/images/pillBillImg.jpeg")} />
              )}
              <StInfoTitle>🧐 복약봉투 인식하는 방법</StInfoTitle>
              <StInfoContainer>
                <StMainInfo>위 사진은 다음의 확인 과정을 거치게 됩니다.</StMainInfo>
                <StInfo>
                  <img src={BlueStarIcn} />
                  사진 업로드를 이용해서 사진을 올린다.
                </StInfo>
                <StInfo>
                  <img src={BlueStarIcn} />약 확인하기를 누른다.
                </StInfo>
                <StInfo>
                  <img src={BlueStarIcn} />
                  인식된 약을 눌러 추가 정보를 입력한다
                </StInfo>
              </StInfoContainer>
              <StCheckButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => uploadImage()}>
                약 확인하기
              </StCheckButton>
            </div>
          )}
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

export default PillImgUpload;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .center {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
  width: 100%;
`;
const StTitle = styled.h1`
  width: 100%;
  font-size: 3rem;
  font-family: "Pretendard-Bold";
  text-align: center;
  padding-right: 3.5rem;
`;

const StBody = styled.div`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
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
  margin-top: 1rem;
`;

const StItem = styled.li`
  display: flex;
  padding: 3rem;
  align-items: center;
  height: 5rem;
  margin: 1.2rem;
  color: #000000;
  font-family: "Pretendard-Bold";
  border: 0.15rem solid #eaf2ff;
  border-radius: 1.2rem;
  background-color: #ffffff;
  justify-content: space-between;
`;

const StItemChecked = styled.li`
  display: flex;
  padding: 3rem;
  align-items: center;
  height: 5rem;
  margin: 1.2rem;
  color: #006ffd;
  font-family: "Pretendard-Bold";
  border: 0.15rem solid #eaf2ff;
  justify-content: space-between;
  border-radius: 1.2rem;
  background-color: #eaf2ff;
`;

const StUploadButton = styled(motion.button)`
  width: 25rem;
  height: 4rem;
  background-color: #006ffd;
  color: white;
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border: 0;
  border-radius: 1.2rem;
  margin-top: 4.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 0.5rem;
    width: 2rem;
  }
`;

const StCheckButton = styled(motion.button)`
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
`;

const StImg = styled.img`
  border-radius: 2.5rem;
  padding: 2rem;
`;

const StInfoTitle = styled.div`
  font-size: 2.3rem;
  font-family: "Pretendard-Bold";
  margin-top: 1.6rem;
  margin-bottom: 1.3rem;
`;

const StMainInfo = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 1.63rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.6rem;
`;

const StInfo = styled.div`
  img {
    margin-right: 1.2rem;
  }
  font-family: "Pretendard-Regular";
  font-size: 1.5rem;
  width: 28.4rem;
  display: flex;
  margin-bottom: 1.6rem;
`;

const StInfoContainer = styled.div`
  width: 33.2rem;
  height: 16.3rem;
  background: #f8f9fe;
  border-radius: 1.6rem;
  padding: 2.4rem;
  margin-bottom: 1.3rem;
  text-align: center;
  justify-content: center;
  align-items: center;
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

const StBillTitle = styled(StModalTitle)`
  margin-top: 2rem;
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

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
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
