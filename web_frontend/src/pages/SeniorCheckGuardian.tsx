import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGuardianData } from "../core/api";
import { IGuardianList } from "../core/atom";
import { Helmet } from "react-helmet-async";

function SeniorCheckGuardian() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstApi, setFirstApi] = useState(true);
  const { data } = useQuery("getGuardian", () => getGuardianData(), {
    enabled: !!firstApi,
  });
  useEffect(() => {
    setFirstApi(false);
  }, [data]);
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Helmet>
        <title>등록되어 있는 보호자</title>
        <link rel="canonical" href="https://capstone-2023-11.vercel.app/guardian/:id/exercise" />
      </Helmet>
      <StButtonContainer whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleModal}>
        <StButtonInfo>등록되어 있는 보호자</StButtonInfo>
        <StButtonIcon src={require("../assets/images/img_right.png")} />
      </StButtonContainer>
      <StModal isOpen={isOpen}>
        <StContainer>
          <StButtonBack src={require("../assets/images/img_esc.png")} onClick={() => setIsOpen(false)}></StButtonBack>
          <StTitle>등록되어 있는 보호자</StTitle>
          {data?.data.length == 0 ? (
            <StTitle>등록되어 있는 보호자가 없습니다.</StTitle>
          ) : (
            data?.data.map((item: IGuardianList, index: number) => (
              <>
                <StName>{index + 1}번째 보호자</StName>
                <WhiteContainer>
                  <StProfilePhoto src={require("../assets/images/img_avatar.png")} />
                  <div className="col">
                    <div className="row">
                      <StName>{item.name}</StName>
                    </div>
                    <div className="row">
                      <StName>{item.email}</StName>
                    </div>
                  </div>
                </WhiteContainer>
              </>
            ))
          )}
        </StContainer>
      </StModal>
    </>
  );
}

export default SeniorCheckGuardian;

const StButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-left: 2.3rem;
  margin-right: 2.3rem;
  cursor: pointer;
`;
const StButtonInfo = styled.span`
  font-size: 2rem;
  font-family: "Pretendard-Regular";
  padding: 1.6rem;
`;
const StButtonIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 1.7rem;
  margin-right: 1.6rem;
`;
const StModal = styled(Modal)`
  padding: 2rem;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;
const StContainer = styled.div`
  padding: 1rem 2rem;
  justify-content: center;
  margin: auto;
  background-color: #f8f9fe;
  border-radius: 1rem;
  .cal {
    font-family: "Pretendard-Bold";
    font-size: 1.7rem;
    text-align: center;
  }
`;
const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
const StTitle = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 3rem;
  align-self: center;
`;
const WhiteContainer = styled(StContainer)`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 3.3rem;
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 1rem;
  flex-direction: row;
  justify-content: space-between;
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
    background-color: #f8f9fe;
    border-radius: 2rem;
    padding: 0.5rem;
    margin-right: 1rem;
  }
  .row {
    display: flex;
    width: 20rem;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 1rem;
    margin-left: 1rem;
  }
`;
const StProfilePhoto = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
`;
const StName = styled.span`
  font-family: "Pretendard-Bold";
  font-size: 1.7rem;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
`;
