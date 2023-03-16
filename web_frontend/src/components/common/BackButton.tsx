import { Link } from "react-router-dom";
import styled from "styled-components";

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
const BackButton = (props: { to: string }) => {
  return (
    <>
      <StButtonBack src={require("../../assets/images/img_left.png")}></StButtonBack>
      <Link to={props.to}></Link>
    </>
  );
};

export default BackButton;
