import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { navigateIndex2 } from "../../core/atom";
import { motion } from "framer-motion";

const BottomNavGuardian = () => {
  const setNameAtom = useSetRecoilState(navigateIndex2);
  const index = useRecoilValue(navigateIndex2);
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      <Outlet />
      <StNavigation className="wrapper">
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            navigate("/guardian/main");
            setNameAtom(0);
          }}
          className={index === 0 ? "active" : "inactive"}>
          {index === 0 ? (
            <img src={require("../../assets/icons/icon_home_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_home_off.png")} />
          )}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            navigate(`/guardian/${String(params?.id)}/summary/day`);
            setNameAtom(1);
          }}
          className={index === 1 ? "active" : "inactive"}>
          {index === 1 ? (
            <img src={require("../../assets/icons/icon_report_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_report_off.png")} />
          )}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            navigate(`/guardian/${String(params?.id)}/meal`);
            setNameAtom(2);
          }}
          className={index === 2 ? "active" : "inactive"}>
          {index === 2 ? (
            <img src={require("../../assets/icons/icon_food_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_food_off.png")} />
          )}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            navigate(`/guardian/${String(params?.id)}/exercise`);
            setNameAtom(3);
          }}
          className={index === 3 ? "active" : "inactive"}>
          {index === 3 ? (
            <img src={require("../../assets/icons/icon_exercise_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_exercise_off.png")} />
          )}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            navigate(`/guardian/${String(params?.id)}/pill`);
            setNameAtom(4);
          }}
          className={index === 4 ? "active" : "inactive"}>
          {index === 4 ? (
            <img src={require("../../assets/icons/icon_pill_on.png")} />
          ) : (
            <img src={require("../../assets/icons/icon_pill_off.png")} />
          )}
        </motion.div>
      </StNavigation>
    </>
  );
};

export default BottomNavGuardian;

const StNavigation = styled.nav`
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7rem;
  border-top: 0.2rem solid #eaf2ff;
  background-color: #ffffff;
  z-index: 9999;
  div {
    text-align: center;
    float: left;
    width: 20%;
    height: 7rem;
    line-height: 6rem;
  }
  img {
    margin-top: 1.5rem;
    width: 3rem;
    height: 3rem;
  }
  .active {
    background-color: #eaf2ff;
  }
  .inactive {
  }
`;
