import type { ComponentProps } from "react";
import { PeriodSelectOption2 } from "./PeriodSelectOption2";

type PeriodSelectOption3Props = ComponentProps<typeof PeriodSelectOption2>;

/** 기간 선택 모듈 ③ — 정산월 시작·종료 (내부는 `PeriodSelectOption2`와 동일) */
export function PeriodSelectOption3(props: PeriodSelectOption3Props) {
  return <PeriodSelectOption2 {...props} />;
}
