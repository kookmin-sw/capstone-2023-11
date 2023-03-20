import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
function SeniorMealCheckPage() {
  const [imageSrc, setImageSrc]: any = useState();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<void>((resolve) => {
        reader.onload = () => {
          if (reader.result != null) {
            setImageSrc(reader.result); // 파일의 컨텐츠
            resolve();
          }
        };
      });
    }
  };

  const uploadImage = () => {
    const { data } = useQuery("uploadImage");

    console.log(data);
  };
  return (
    <>
      <input accept="image/*" multiple type="file" onChange={(e) => onUpload(e)} />
      <img width={"100%"} src={imageSrc} />
      <StCheckButton onClick={() => uploadImage()}>체크버튼</StCheckButton>
    </>
  );
}
export default SeniorMealCheckPage;

const StCheckButton = styled.button``;
