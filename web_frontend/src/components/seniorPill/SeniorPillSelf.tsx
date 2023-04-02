import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPillInfo } from "../../core/api";

function SeniorPillSelf() {
  const [value, setValue] = useState("");
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };
  const pillData = useQuery<PillData>(["info", value], () => fetchPillInfo(value));
  const [name, setName] = useState<string[] | undefined>([]);
  const onClickButton = () => {
    console.log(pillData?.data?.body?.items?.map((item) => item.ITEM_NAME));
    if (pillData) {
      setName(pillData?.data?.body?.items?.map((item) => item.ITEM_NAME));
    }
  };
  return (
    <>
      <StHeader>
        <StSearch placeholder="약 이름을 입력해주세요." onChange={onChangeValue} />
        <StSearchButton onClick={onClickButton}>
          <StSearchBtnImg src={require("../../assets/images/search.png")} />
        </StSearchButton>
      </StHeader>
      <StBody>
        <StPillList>
          {name?.map((value) => (
            <StPillItem key={value.toString()}>{value}</StPillItem>
          ))}
        </StPillList>
      </StBody>
    </>
  );
}

interface PillData {
  header: {
    resultCode: string;
    resultMsg: string;
  };
  body: {
    numOfRows: string;
    pageNo: string;
    totalCount: string;
    items: [
      item: {
        ENTP_NO: string;
        MAKE_MATERIAL_FLAG: string;
        NEWDRUG_CLASS_NAME: string;
        INDUTY_TYPE: string;
        CANCEL_DATE: string;
        CANCEL_NAME: string;
        CHANGE_DATE: string;
        NARCOTIC_KIND_CODE: string;
        GBN_NAME: string;
        TOTAL_CONTENT: string;
        EE_DOC_DATA: string;
        UD_DOC_DATA: string;
        NB_DOC_DATA: string;
        PN_DOC_DATA: string;
        MAIN_ITEM_INGR: string;
        INGR_NAME: string;
        ATC_CODE: string;
        ITEM_ENG_NAME: string;
        ENTP_ENG_NAME: string;
        MAIN_INGR_ENG: string;
        ITEM_SEQ: string;
        ITEM_NAME: string;
        ENTP_NAME: string;
        ITEM_PERMIT_DATE: string;
        CNSGN_MANUF: string;
        ETC_OTC_CODE: string;
        CHART: string;
        BAR_CODE: string;
        MATERIAL_NAME: string;
        EE_DOC_ID: string;
        UD_DOC_ID: string;
        NB_DOC_ID: string;
        INSERT_FILE: string;
        STORAGE_METHOD: string;
        VALID_TERM: string;
        REEXAM_TARGET: string;
        REEXAM_DATE: string;
        PACK_UNIT: string;
        EDI_CODE: string;
        DOC_TEXT: string;
        PERMIT_KIND_NAME: string;
      },
    ];
  };
}

const StHeader = styled.header`
  padding: 5rem 5rem 0 5rem;
  display: flex;
  font-size: 2rem;
`;

const StSearch = styled.input`
  width: 100%;
  height: 4rem;
  border: 0.2rem solid gray;
  border-radius: 1rem;
  font-family: "Pretendard-Regular";
  padding-left: 2rem;
`;

const StSearchButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: 0;
`;

const StSearchBtnImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StBody = styled.div`
  padding: 1rem 5rem 5rem 5rem;
  font-size: 2rem;
`;

const StPillList = styled.ul`
  border: 0.1rem solid transparent;
  border-radius: 0.5rem;
`;

const StPillItem = styled.ul`
  padding: 1rem 3rem;
  border: 0.2rem solid #0066ff;
  border-radius: 1rem;
  line-height: 2rem;
  font-size: 1rem;
  margin: 1rem;
  background-color: white;
`;

export default SeniorPillSelf;
