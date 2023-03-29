import axios from "axios";

function Preview() {
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append("files", uploadFile);

      axios({
        method: "post",
        url: "http://43.201.98.180:8080",
        data: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
    }
  };
  return (
    <form>
      <label htmlFor="profile-upload" />
      <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg} />
    </form>
  );
}

export default Preview;

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
