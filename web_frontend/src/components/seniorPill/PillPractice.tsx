import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { pillImg } from "../../core/api/index";

function PillImgUpload() {
  const [imageSrc, setImageSrc]: any = useState();
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
            setImageSrc(reader.result);
            resolve();
          }
        };
      });
    }
  };
  const uploadImage = () => {
    setUploadSts(true);
  };
  const { data } = useQuery("uploadImage", () => pillImg(formData), {
    enabled: !!uploadSts,
  });
  console.log(data);
  return (
    <>
      <input multiple type="file" id="profile-upload" accept="image/*" onChange={(e) => uploadImg(e)} />
      <img width={"100%"} src={imageSrc} />
      <StCheckButton onClick={() => uploadImage()}>check</StCheckButton>
    </>
  );
}

const StCheckButton = styled.button``;

export default PillImgUpload;

// import React, { useState } from "react";
// import { useQuery } from "react-query";

// const Preview = () => {
//   const [imageSrc, setImageSrc]: any = useState(null);

//   const onUpload = (e: any) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     return new Promise<void>((resolve) => {
//       reader.onload = () => {
//         setImageSrc(reader.result || null); // 파일의 컨텐츠
//         resolve();
//       };
//     });
//   };

//   const uploadImage = () => {
//     const { data } = useQuery("Image");

//     console.log(data);
//   };
//   return (
//     <>
//       <input accept="image/*" multiple type="file" onChange={(e) => onUpload(e)} />
//       <img width={"100%"} src={imageSrc} />
//       <button onClick={() => uploadImage()}>check</button>
//     </>
//   );
// };

// export default Preview;
