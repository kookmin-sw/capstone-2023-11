import styled from "styled-components";
import { Link } from "react-router-dom";
import PillAddModal from "../components/seniorPill/PillAddModal";
import { useEffect, useState } from "react";
import { deletePillData, getPillInfo, modifyPillData } from "../core/api/index";
import Modal from "react-modal";

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
  const [dayValue, setDayValue] = useState(0);

  const onChangeDayValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayValue(parseInt(e.target.value));
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
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
  };

  const DeletePillData = async (id: number) => {
    await deletePillData(id);
    alert("삭제되었습니다.");
  };

  return (
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
        <PillAddModal />
        <StPillList>
          {pillData?.medicines.map((value, index) => (
            <>
              <StItem key={index}>
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
                      {value.dinner ? <StPillTake>저녁</StPillTake> : <StPillNoTake>아침</StPillNoTake>}
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
                      setDayValue(value.remainDay);
                      handleOpenModal();
                    }}>
                    <StModifyButtonImg src={require("../assets/images/edit.png")} />
                  </StModifyButton>
                  <StModal isOpen={isOpen} onRequestClose={handleCloseModal}>
                    <StButtonList>
                      <StModalTitle>{name.length >= 10 ? name.slice(0, 10) + "..." : name}</StModalTitle>
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
                      <StModalTitle>수정하시겠습니까?</StModalTitle>
                      <StPillComponent2>
                        <StSetPillCheckButton
                          onClick={async () => {
                            handleCloseModal();
                            await ModifyPillData(id, dayValue, breakfast, lunch, dinner);
                            window.location.reload();
                          }}>
                          네
                        </StSetPillCheckButton>
                        <StSetPillCheckButton onClick={handleCloseModal}>아니요</StSetPillCheckButton>
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
                  <StModal isOpen={isOpen2} onRequestClose={handleCloseModal2}>
                    <StButtonList>
                      <StModalTitle>이 약을 지우시겠습니까??</StModalTitle>
                      <StPillComponent2>
                        <StSetPillCheckButton
                          onClick={async () => {
                            handleCloseModal2();
                            await DeletePillData(id);
                            window.location.replace("/senior/pill/");
                          }}>
                          네
                        </StSetPillCheckButton>
                        <StSetPillCheckButton onClick={handleCloseModal2}>아니요</StSetPillCheckButton>
                      </StPillComponent2>
                    </StButtonList>
                  </StModal>
                </StSetComponent>
              </StItem>
            </>
          ))}
        </StPillList>
      </StBody>
    </StContainer>
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
  padding: 0;
`;

const StBackBtnImg = styled.img`
  width: 2rem;
  height: 2rem;
  padding: 0;
`;

const StTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
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

const StItem = styled.div`
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
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.6rem;
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
  border-radius: 1.2rem;
  font-family: "Pretendard-Bold";
  font-size: 1.6rem;
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

export default SeniorPillMain;
