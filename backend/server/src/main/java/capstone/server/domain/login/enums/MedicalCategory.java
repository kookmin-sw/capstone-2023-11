package capstone.server.domain.login.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public enum MedicalCategory {
  HIGH_BLOOD_PRESSURE("highBloodPressure", "고혈압"),
  DIABETES("diabetes", "당뇨"),
  ARTHRITIS("arthritis", "관절염"),
  HIGH_CHOLESTEROL("highCholesterol", "고지혈증"),
  LOW_BLOOD_PRESSURE("lowBloodPressure", "저혈압"),
  CORONARY_ARTERY_DISEASE("coronaryArteryDisease", "관상동맥질환"),
  STROKE("stroke", "뇌졸중"),
  CHRONIC_OBSTRUCTIVE_PULMONARY_DISEASE("chronicObstructivePulmonaryDisease", "만성폐쇄성폐질환"),
  CANCER("cancer", "암"),
  DEPRESSION("depression", "우울증"),
  LIVER_DISEASE("liverDisease", "간질환"),
  CIRRHOSIS("cirrhosis", "간경변증"),
  KIDNEY_DISEASE("kidneyDisease", "신장질환"),
  THYROID_DISEASE("thyroidDisease", "갑상선 질환"),
  HEARING_LOSS("hearingLoss", "난청"),
  OSTEOPOROSIS("osteoporosis", "골다공증");

  private String eng;
  private String kor;

  MedicalCategory(String eng, String kor) {
    this.eng = eng;
    this.kor = kor;
  }


}

/**
 * 고혈압 - High blood pressure
 * 당뇨 - Diabetes
 * 관절염 - Arthritis
 * 고지혈증 - High cholesterol
 * 저혈압 - Low blood pressure
 * 관상동맥질환 - Coronary artery disease
 * 뇌졸중 - Stroke
 * 만성폐쇄성폐질환 - Chronic obstructive pulmonary disease (COPD)
 * 암 - Cancer
 * 우울증 - Depression
 * 간질환 - Liver disease
 * 간경변증 - Cirrhosis
 * 신장질환 - Kidney disease
 * 갑상선 질환 - Thyroid disease
 * 난청 - Hearing loss
 * 골다공증 - Osteoporosis
 */
