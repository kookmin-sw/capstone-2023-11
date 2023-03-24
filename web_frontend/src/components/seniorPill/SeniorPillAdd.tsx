// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPillImg, fetchPillInfo } from "../../core/api";
function SeniorPillAdd() {
  const pillData = useQuery<PillData>([], () => fetchPillInfo());
  const ImgData = useQuery<ImgData>([], () => fetchPillImg());
  console.log(ImgData?.data?.body?.items[0]);
  return (
    <>
      <StHeader>
        <StBackBtn>{"<"}</StBackBtn>
        <StPillTitle>약 추가하기</StPillTitle>
      </StHeader>
      <StBody>
        <StAddList>
          <StAddResult>
            <StAddImg src={ImgData?.data?.body.items[0].ITEM_IMAGE} />
          </StAddResult>
          <StAddResult>{pillData?.data?.body?.items[0].ITEM_NAME}</StAddResult>
          <StAddResult>며칠분 / 하루 몇번</StAddResult>
          <StAddItem>처방전 인식하기</StAddItem>
          <StAddItem>바코드 인식하기</StAddItem>
          <StAddItem>직접 입력하기</StAddItem>
        </StAddList>
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

interface ImgData {
  header: { resultCode: string; resultMsg: string };
  body: {
    pageNo: number;
    totalCount: number;
    numOfRows: number;
    items: [
      {
        ITEM_SEQ: string;
        ITEM_NAME: string;
        ENTP_SEQ: string;
        ENTP_NAME: string;
        CHART: string;
        ITEM_IMAGE: string;
        PRINT_FRONT: string;
        PRINT_BACK: null;
        DRUG_SHAPE: string;
        COLOR_CLASS1: string;
        COLOR_CLASS2: null;
        LINE_FRONT: null;
        LINE_BACK: null;
        LENG_LONG: string;
        LENG_SHORT: string;
        THICK: string;
        IMG_REGIST_TS: string;
        CLASS_NO: string;
        CLASS_NAME: string;
        ETC_OTC_NAME: string;
        ITEM_PERMIT_DATE: string;
        FORM_CODE_NAME: string;
        MARK_CODE_FRONT_ANAL: string;
        MARK_CODE_BACK_ANAL: string;
        MARK_CODE_FRONT_IMG: string;
        MARK_CODE_BACK_IMG: string;
        ITEM_ENG_NAME: string;
        CHANGE_DATE: string;
        MARK_CODE_FRONT: null;
        MARK_CODE_BACK: null;
        EDI_CODE: string;
      },
    ];
  };
}

const StHeader = styled.header`
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  font-size: 2rem;
`;

const StBackBtn = styled.button`
  background-color: transparent;
  border: transparent;
  font-family: "Pretendard-Bold";
  width: 5%;
`;

const StPillTitle = styled.h1`
  font-family: "Pretendard-Bold";
  text-align: center;
  width: 100%;
  padding-right: 5%;
`;

const StBody = styled.div`
  font-size: 2rem;
`;

const StAddList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 2rem;
  padding: 2rem;
`;

const StAddItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: #f8f9fe;
  border-radius: 2rem;
  align-self: stretch;
  font-family: "Pretendard-Bold";
  padding: 3rem;
  border: 0;
  font-size: 2rem;
`;
const StAddResult = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: #f8f9fe;
  border-radius: 2rem;
  align-self: stretch;
  font-family: "Pretendard-Bold";
  padding: 3rem;
`;

const StAddImg = styled.img``;

export default SeniorPillAdd;
