import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchPillImg, fetchPillInfo, pillImg } from "../core/api/index";
import Modal from "react-modal";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../components/common/BackButton";
import { BlueStarIcn, PhotoIcn } from "../assets/icons";

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
  const { data: pillData } = useQuery<PillData>(["info", value], () => fetchPillInfo(value));
  const { data: imgData } = useQuery<ImgData>(["img", value], () => fetchPillImg(value));

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
    await setPillName(pillData?.data?.body.items[0].ITEM_NAME);
    await setCompany(pillData?.data?.body.items[0].ENTP_NAME);
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
    await setImgUrl(
      imgData?.data?.body?.items ? imgData?.data?.body.items[0].ITEM_IMAGE : require(`../assets/images/pillPhoto.png`),
    );
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StContainer>
        <StHeader>
          <BackButton />
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
                  <StModalTitle>{pillData?.data?.body.items[0].ITEM_NAME.match(/^([^(]+)/)?.[1]}</StModalTitle>
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
            <div className="center">
              <input multiple type="file" accept="image/*" onChange={(e) => uploadImg(e)} ref={imageInput} />
              <StUploadButton onClick={onClickImageUpload}>
                <img src={PhotoIcn} />
                사진 업로드
              </StUploadButton>
              <StImg width={"100%"} src={require("../assets/images/pillBillImg.jpeg")} />
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
              <StCheckButton onClick={() => uploadImage()}>약 확인하기</StCheckButton>
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
  margin: 2rem;
  color: #000000;
  font-family: "Pretendard-Bold";
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
  font-family: "Pretendard-Bold";
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
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 0.5rem;
    width: 2rem;
  }
`;

const StCheckButton = styled.button`
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
