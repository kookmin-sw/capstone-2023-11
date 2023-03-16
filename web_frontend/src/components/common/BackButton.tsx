import { Link } from "react-router-dom";
import styled from "styled-components";

const StButtonBack = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
function handleClick(props: string) {
  console.log(props);
  return <Link to={`/addschedule`}></Link>;
}

const BackButton = (props: { to: string }) => {
  return (
    <>
      <StButtonBack
        src={require("../../assets/images/img_left.png")}
        onClick={() => handleClick(props.to)}></StButtonBack>
    </>
  );
};

export default BackButton;
