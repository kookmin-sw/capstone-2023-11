import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../components/common/BackButton";
import Modal from "react-modal";
import { deleteExerciseList, getRecordExerciseList } from "../core/api";
import { BlueButton } from "../components/common/BlueButton";
import SeniorCalendar from "../components/common/SeniorCalendar";
import moment from "moment";

interface ExerciseForm {
  createdAt: string;
  eng: string;
  id: number;
  kcal: number;
  kor: string;
  type: string;
  hour: number;
}

function SeniorExerciseMainPage() {
  const [firstApi, setFirstApi] = useState(true);
  const [deleteId, setDeleteId] = useState<number>(999);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const { data } = useQuery("exerciseList", () => getRecordExerciseList(), {
    enabled: !!firstApi,
  });
  const selected = data?.data.filter((item: ExerciseForm) => item.createdAt.includes(selectedDate));
  const { mutate } = useMutation(deleteExerciseList);

  useEffect(() => {
    console.log(data?.data);
    setFirstApi(false);
  }, [data]);

  const navigate = useNavigate();

  const onAddClick = () => {
    navigate(`/senior/exercise/add`);
    window.location.reload();
  };
  const onDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const onDeleteConfirm = () => {
    mutate(deleteId, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setFirstApi(true);
      },
    });
  };
  return (
    <StContainer>
      <StHeader>
        <BackButton />
        <StTitle>운동 기록</StTitle>
      </StHeader>
      <SeniorCalendar setDate={setSelectedDate}></SeniorCalendar>
      <StContainer>
        {selected?.map((item: ExerciseForm) => (
          <StExercise>
            <img src={require(`../assets/images/exerciseImg/img_${item.eng}.png`)} />
            <StExercise className="content">
              <div className="title">{item.kor}</div>
              <div className="content">{item.kcal}Kcal 소모</div>
              <div className="content">{item.hour}시간</div>
            </StExercise>
            <img className="esc" onClick={() => onDeleteClick(item.id)} src={require(`../assets/images/img_esc.png`)} />
          </StExercise>
        ))}
      </StContainer>
      <FlexContainer>
        <StAddButton onClick={onAddClick}>+</StAddButton>
      </FlexContainer>
      <StModal isOpen={showDeleteModal}>
        <StPopContainer>
          <StTitle className="POP">정말로 삭제하시겠습니까?</StTitle>
          <BTNContainer>
            <BlueBTN onClick={onDeleteConfirm}>확인</BlueBTN>
            <BlueBTN onClick={() => setShowDeleteModal(false)}>취소</BlueBTN>
          </BTNContainer>
        </StPopContainer>
      </StModal>
    </StContainer>
  );
}

export default SeniorExerciseMainPage;

const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
`;

const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;
`;

const StHeader = styled.div`
  display: block;
  border-bottom: 0.1rem solid #006ffd;
  position: sticky;
  top: 0rem;
  background-color: white;
`;

const StExercise = styled.div`
  background-color: #eaf2ff;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 2rem;
  font-family: "Pretendard-Regular";
  display: flex;
  font-size: 1.7rem;
  img {
    margin-right: 1rem;
    width: 10rem;
    height: 10rem;
  }
  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .content {
    flex-direction: column;
  }
  .esc {
    margin-left: 2rem;
    margin-right: 0.1rem;
    width: 2rem;
    height: 2rem;
  }
`;

const FlexContainer = styled.div`
  position: fixed;
  bottom: 0rem;
  padding-top: 1rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: flex-end;
  right: 20%;
`;
const StAddButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 2.5rem;
  background-color: #006ffd;
  font-size: 6.5rem;
  color: white;
  text-align: center;
  align-items: center;
  display: flex;
  border: none;
`;

const StModal = styled(Modal)`
  padding: 5rem;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 5rem;
`;
const StPopContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin-top: 50%;
  background-color: #f8f9fe;
  border-radius: 1rem;
  width: 80%;
  .POP {
    padding: 2rem;
  }
`;
const BTNContainer = styled.div`
  justify-content: space-evenly;
  display: flex;
`;

const BlueBTN = styled(BlueButton)`
  width: 10rem;
  margin-right: 0.4rem;
`;
