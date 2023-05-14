import styled from "styled-components";
import { Link } from "react-router-dom";
import PillAddModal from "../components/seniorPill/PillAddModal";
import { useCallback, useEffect, useState } from "react";
import { deletePillData, getPillInfo, modifyPillData } from "../core/api/index";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { BlueButton } from "../components/common/BlueButton";
import { navigateIndex } from "../core/atom";
import { useSetRecoilState } from "recoil";

Modal.setAppElement("#root");

function SeniorPillMain() {
  const [pillData, setPillData] = useState<pillInfo>();

  useEffect(() => {
    async function fetchData() {
      const data = await getPillInfo();
      setPillData(data);
    }

    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const setNameAtom = useSetRecoilState(navigateIndex);
  const dropdownItems = [1, 3, 5, 7, 10, 14, 30];

  useEffect(() => {
    setNameAtom(4);
  }, []);
  const isActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const selectItem = (prop: number) => {
    setSelectedValue(prop);
    setIsActive((prev) => !prev);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (prop: number) => {
    ModifyPillData(id, prop, breakfast, lunch, dinner);
    setIsOpen(false);
  };

  const handleOpenModal2 = () => {
    setIsOpen2(true);
  };

  const handleCloseModal2 = () => {
    setIsOpen2(false);
  };

  const ModifyPillData = async (id: number, dayToTake: number, breakfast: boolean, lunch: boolean, dinner: boolean) => {
    await modifyPillData(id, dayToTake, breakfast, lunch, dinner);
    alert("수정되었습니다.");

    window.location.reload();
  };

  const DeletePillData = async (id: number) => {
    await deletePillData(id);
    alert("삭제되었습니다.");
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.ul className="container" variants={container} initial="hidden" animate="visible">
        <StContainer>
          <StHeader>
            <StLink to={`/senior/main`}>
              <StBackBtn>
                <StBackBtnImg src={require("../assets/images/img_left.png")} />
              </StBackBtn>
            </StLink>
            <StTitle>복용하는 약 목록</StTitle>
          </StHeader>
          <StBody>
            <StPillList>
              {pillData?.medicines.map((value, index) => (
                <motion.li className="item" variants={items}>
                  <StItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={index}>
                    <StLink to={`/senior/pill/detail/${value.id}`}>
                      <StItemImgBox>
                        <StItemImg src={value.imageUrl} />
                      </StItemImgBox>
                      <StItemContent>
                        <StItemName>{value.name.length >= 8 ? value.name.slice(0, 7) + "..." : value.name}</StItemName>
                        <StItemRemainingDays>남은 복용 일자: {value.remainDay}</StItemRemainingDays>
                        <StDaySwapper>
                          {value.breakfast ? <StPillTake>아침</StPillTake> : <StPillNoTake>아침</StPillNoTake>}
                          {value.lunch ? <StPillTake>점심</StPillTake> : <StPillNoTake>점심</StPillNoTake>}
                          {value.dinner ? <StPillTake>저녁</StPillTake> : <StPillNoTake>저녁</StPillNoTake>}
                        </StDaySwapper>
                      </StItemContent>
                    </StLink>
                    <StSetComponent>
                      <StModifyButton
                        onClick={() => {
                          setID(value.id);
                          setName(value.name);
                          setBreakfast(value.breakfast);
                          setLunch(value.lunch);
                          setDinner(value.dinner);
                          // setDayValue(value.remainDay);
                          handleOpenModal();
                        }}>
                        <StModifyButtonImg src={require("../assets/images/edit.png")} />
                      </StModifyButton>
                      <StModal isOpen={isOpen}>
                        <StButtonList>
                          <StButtonBack
                            src={require("../assets/images/img_esc.png")}
                            onClick={() => {
                              setIsOpen(false);
                              setIsActive(false);
                              setSelectedValue(0);
                            }}></StButtonBack>
                          <StModalTitle>{name.length >= 10 ? name.slice(0, 10) + "..." : name}</StModalTitle>
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
                                    <DropdownItemContainer
                                      id="item"
                                      key={item}
                                      onClick={() => {
                                        selectItem(item);
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
                          <StModalContent>수정하시겠습니까?</StModalContent>
                          <StPillComponent2>
                            <StSetPillSubmitButton
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              onClick={() => {
                                handleCloseModal(selectedValue);
                              }}>
                              네
                            </StSetPillSubmitButton>
                            <StSetPillSubmitButton
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
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
                      <StDeleteButton
                        onClick={() => {
                          handleOpenModal2();
                          setID(value.id);
                        }}>
                        <StDeleteButtonImg src={require("../assets/images/delete.png")} />
                      </StDeleteButton>
                      <StPopModal isOpen={isOpen2} onRequestClose={handleCloseModal2}>
                        <StPopContainer>
                          <StPopTitle className="POP">이 약을 지우시겠습니까??</StPopTitle>
                          <BTNContainer>
                            <BlueBTN
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              onClick={async () => {
                                handleCloseModal2();
                                await DeletePillData(id);
                                window.location.replace("/senior/pill/");
                              }}>
                              네
                            </BlueBTN>
                            <BlueBTN whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={handleCloseModal2}>
                              아니요
                            </BlueBTN>
                          </BTNContainer>
                        </StPopContainer>
                      </StPopModal>
                    </StSetComponent>
                  </StItem>
                </motion.li>
              ))}
            </StPillList>
            <StBtnContainer className="item" variants={items}>
              <PillAddModal />
            </StBtnContainer>
          </StBody>
        </StContainer>
      </motion.ul>
    </motion.div>
  );
}

interface pillInfo {
  medicines: [
    {
      createdAt: string;
      modifiedAt: string;
      id: number;
      name: string;
      companyName: string;
      effect: string;
      useMethod: string;
      caution: string;
      depositMethod: string;
      imageUrl: string;
      dueAt: string;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      remainDay: number;
      userWard: {
        createdAt: string;
        modifiedAt: string;
        userId: number;
        kakaoAccountId: number;
        name: string;
        birthday: string;
        gender: string;
        weight: number;
        height: number;
        drinkings: number;
        smoke: number;
      };
    },
  ];
}
export default SeniorPillMain;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
  margin: 1rem;
`;

const StBackBtnImg = styled.img`
  width: 2rem;
  height: 2rem;
  padding: 0;
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
  padding: 2rem;
  font-family: "Pretendard-Regular";
`;

const StPillList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  border-radius: 1rem;
`;

const StItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #f8f9fe;
  border-radius: 1.6rem;
  padding: 1.4rem 2.4rem;
`;

const StItemImgBox = styled.div`
  width: 30%;
  height: 7rem;
  margin-right: 2rem;
`;

const StItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const StItemContent = styled.div`
  width: 55%;
`;

const StItemName = styled.p`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-family: "Pretendard-Bold";
`;

const StItemRemainingDays = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-family: "Pretendard-Regular";
`;

const StDaySwapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StPillNoTake = styled.div`
  width: 6rem;
  height: 2.7rem;
  background: #eaf2ff;
  border-radius: 0.8rem;
  font-family: "Pretendard-Bold";
  font-size: 1.5rem;
  color: #006ffd;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.4rem;
`;

const StPillTake = styled.div`
  width: 6rem;
  height: 2.7rem;
  background: #006ffd;
  border-radius: 0.8rem;
  font-family: "Pretendard-Bold";
  font-size: 1.5rem;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 0.4rem;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
`;

const StSetComponent = styled.div`
  width: 15%;
  height: 8rem;
`;

const StModifyButton = styled.div`
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const StModifyButtonImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StDeleteButton = styled.div`
  margin-left: 1rem;
`;

const StDeleteButtonImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
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

const StPopContainer = styled.div`
  padding: 1rem 1rem;
  justify-content: center;
  background-color: #f8f9fe;
  border-radius: 1rem;
  width: 30rem;
  .POP {
    padding: 2rem;
  }
`;

const StModal = styled(Modal)`
  padding: 3rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const StPopModal = styled(Modal)`
  padding: 5rem;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  margin-top: 25rem;
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
const StPopTitle = styled.p`
  font-size: 2rem;
  font-family: "Pretendard-Bold";
  border-bottom: 0rem solid #ffffff;
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

const BTNContainer = styled.div`
  justify-content: space-evenly;
  display: flex;
  gap: 1rem;
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
const BlueBTN = styled(BlueButton)`
  width: 10rem;
  margin-right: 0.4rem;
  font-family: "Pretendard-Regular";
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

const StBtnContainer = styled(motion.li)`
  display: flex;
  justify-content: center;
`;
