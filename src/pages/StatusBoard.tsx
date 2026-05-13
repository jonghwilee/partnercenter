import { useState } from "react";
import { Link } from "react-router-dom";

/* ───────────────────────────── Types ───────────────────────────── */

type FeatureStatus = "done" | "planned";
type Priority = "P0" | "P1" | "Later";
type SpecStatus = "시작전" | "진행중" | "완료";
type SpecPriority = 1 | 2 | 3; // 1=높음 2=중간 3=낮음

type SubFeature = {
  no: number;
  id: string;
  title: string;
  description: string;
};

type FeatureSpec = {
  id: string;
  status: SpecStatus;
  priority: SpecPriority;
  userRoles: string[];
  summary: string;
  subFeatures: SubFeature[];
};

type Feature = {
  name: string;
  file: string;
  route: string;
  status: FeatureStatus;
  priority: Priority;
  description: string;
  figmaNodeId: string;
  spec?: FeatureSpec;
};

type Category = {
  name: string;
  icon: string;
  wbs: string;
  features: Feature[];
};

/* ───────────────────────────── Figma ───────────────────────────── */

const FIGMA_BASE =
  "https://www.figma.com/design/8UxCwhtN5D2EYaPevafhL0/CJ-ONE-%ED%8C%8C%ED%8A%B8%EB%84%88%EC%84%BC%ED%84%B0?node-id=";

const F = {
  // ① 기초 설계
  GNB_SNB_GRID: "117-25832",
  COMMON_COMPONENTS: "117-22999",

  // ⑧ 대시보드
  DASHBOARD: "55-1571",
  CUSTOMER_ANALYTICS: "55-1577",

  // ① 공통 기반
  HOME: "55-1637",
  NOTICE: "55-1669",
  SUPPORT: "55-1901",

  // ② 로그인 · 접근 제어
  LOGIN: "1922-39789",
  MY_INFO: "55-1601",

  // ③ 시스템 관리
  USER_MANAGEMENT: "55-1693",
  AFFILIATE_MGMT: "55-1583",
  PERMISSION_MGMT: "55-1595",
  PERMISSION_REQUEST: "1464-100102",
  ACCESS_LOG: "55-1687",
  ADMIN: "55-1641",

  // ④ 포인트 관리
  GIFT_POINT: "55-1505",
  GIFT_POINT_CANCEL: "55-1511",

  // ⑤ 정산 관리
  SETTLEMENT: "55-1517",
  SETTLEMENT_FLOW: "665-20737",
  SETTLEMENT_PROCESS: "665-20893",
  PARTNER_SETTLEMENT: "281-10028",

  // ⑥ 올리브영 현대카드
  HYUNDAI_CARD: "55-1559",
  HYUNDAI_CARD_DETAIL: "55-1565",

  // ⑦ 회계 관리
  ACCOUNTING: "55-1681",
};

const figmaUrl = (nodeId: string) =>
  nodeId.startsWith("https://") ? nodeId : `${FIGMA_BASE}${nodeId}`;

/* ───────────────────────────── Data ───────────────────────────── */

const categories: Category[] = [
  {
    name: "기초 설계",
    icon: "🎨",
    wbs: "①",
    features: [
      {
        name: "디자인 시스템",
        file: "cj-one-design-system/",
        route: "",
        status: "planned",
        priority: "P0",
        description: "컬러·타이포그래피·스페이싱·아이콘 토큰 정의",
        figmaNodeId: "https://www.figma.com/design/eSnbIS4Se7bvgZZIHHcvdQ/-PC--B2B-Design-System-v1.1.1?t=PypqEkGj3KgGad9J-0",
      },
      {
        name: "사이트 그리드",
        file: "—",
        route: "",
        status: "planned",
        priority: "P0",
        description: "컬럼·거터·마진 레이아웃 그리드 스펙",
        figmaNodeId: F.GNB_SNB_GRID,
      },
      {
        name: "GNB",
        file: "layout/Header.tsx",
        route: "/status-board",
        status: "done",
        priority: "P0",
        description: "글로벌 네비게이션 바 (상단 헤더)",
        figmaNodeId: F.GNB_SNB_GRID,
        spec: {
          id: "F-GNB001",
          status: "완료",
          priority: 1,
          userRoles: ["전체"],
          summary:
            "파트너센터 상단에 고정되는 글로벌 네비게이션 바로, CJ ONE 로고·서비스명·버전 배지·계정 정보를 표시한다.",
          subFeatures: [
            {
              no: 1,
              id: "S-GNB01",
              title: "로고 및 서비스명 표시",
              description:
                "CJ ONE 로고(그라디언트)와 '파트너센터' 서비스명을 좌측에 표시한다.",
            },
            {
              no: 2,
              id: "S-GNB02",
              title: "버전 배지 및 계정 정보",
              description:
                "우측에 목업 버전(v0.2.9)과 테스트 계정 배지를 표시한다.",
            },
          ],
        },
      },
      {
        name: "SNB",
        file: "layout/Sidebar.tsx",
        route: "/status-board",
        status: "done",
        priority: "P0",
        description: "사이드 네비게이션 바 (좌측 사이드바)",
        figmaNodeId: F.GNB_SNB_GRID,
        spec: {
          id: "F-SNB001",
          status: "완료",
          priority: 1,
          userRoles: ["전체"],
          summary:
            "좌측에 고정되는 사이드 네비게이션 바로, WBS 카테고리별 메뉴 그룹과 NavLink 활성 하이라이트를 제공한다.",
          subFeatures: [
            {
              no: 1,
              id: "S-SNB01",
              title: "카테고리별 메뉴 그룹",
              description:
                "WBS ①~⑧ 번호 배지와 함께 카테고리별로 메뉴 항목을 그룹화하여 표시한다.",
            },
            {
              no: 2,
              id: "S-SNB02",
              title: "활성 메뉴 하이라이트",
              description:
                "현재 경로와 일치하는 메뉴 항목에 핑크(#ED27CF) 텍스트와 연핑크 배경을 적용한다.",
            },
          ],
        },
      },
      {
        name: "공통 컴포넌트",
        file: "components/ui/",
        route: "",
        status: "planned",
        priority: "P0",
        description: "버튼·인풋·테이블·모달 등 UI 컴포넌트 라이브러리",
        figmaNodeId: F.COMMON_COMPONENTS,
      },
    ],
  },
  {
    name: "대시보드",
    icon: "📊",
    wbs: "⑧",
    features: [
      {
        name: "대시보드",
        file: "Dashboard.tsx",
        route: "/dashboard",
        status: "planned",
        priority: "P0",
        description: "집계 지표·차트 KPI 카드",
        figmaNodeId: F.DASHBOARD,
      },
      {
        name: "고객 분석",
        file: "CustomerAnalytics.tsx",
        route: "/customer-analytics",
        status: "planned",
        priority: "P1",
        description: "제휴사별 고객 적립·이용 분석 (본사 담당자 전용)",
        figmaNodeId: F.CUSTOMER_ANALYTICS,
      },
    ],
  },
  {
    name: "공통 기반",
    icon: "🏠",
    wbs: "①",
    features: [
      {
        name: "홈 화면",
        file: "Home.tsx",
        route: "/home",
        status: "planned",
        priority: "P0",
        description: "파트너센터 메인 홈·랜딩 페이지",
        figmaNodeId: F.HOME,
      },
      {
        name: "공지사항",
        file: "Notice.tsx",
        route: "/support/notice",
        status: "planned",
        priority: "P0",
        description: "파트너센터 공지사항 목록·상세",
        figmaNodeId: F.NOTICE,
      },
      {
        name: "FAQ",
        file: "Faq.tsx",
        route: "/support/faq",
        status: "planned",
        priority: "P1",
        description: "자주 묻는 질문 목록",
        figmaNodeId: F.SUPPORT,
      },
      {
        name: "1:1 문의",
        file: "Inquiry.tsx",
        route: "/support/inquiry",
        status: "done",
        priority: "P0",
        description: "정산·수수료·포인트 등 유형별 1:1 문의 등록",
        figmaNodeId: F.SUPPORT,
        spec: {
          id: "F-INQ001",
          status: "완료",
          priority: 1,
          userRoles: ["제휴사 본사 담당자", "제휴사 매장 담당자"],
          summary:
            "정산·수수료·포인트 등 유형별로 1:1 문의를 등록하고 처리 현황을 조회한다.",
          subFeatures: [
            {
              no: 1,
              id: "S-INQ01",
              title: "문의 유형 선택",
              description:
                "정산·수수료·포인트·기타 중 문의 유형을 선택하여 문의를 등록한다.",
            },
            {
              no: 2,
              id: "S-INQ02",
              title: "문의 내역 조회",
              description:
                "등록한 문의의 처리 상태(접수/처리중/완료)를 목록으로 조회한다.",
            },
          ],
        },
      },
    ],
  },
  {
    name: "로그인 · 접근 제어",
    icon: "🔐",
    wbs: "②",
    features: [
      {
        name: "로그인",
        file: "Login.tsx",
        route: "/login",
        status: "planned",
        priority: "P0",
        description: "CJ ONE 로그인 / CJONE SSO 연동",
        figmaNodeId: F.LOGIN,
      },
      {
        name: "약관동의",
        file: "TermsAgreement.tsx",
        route: "/login/terms",
        status: "planned",
        priority: "P0",
        description: "서비스 이용약관 동의",
        figmaNodeId: F.LOGIN,
      },
      {
        name: "권한 요청",
        file: "AccessPermissionRequest.tsx",
        route: "/login/permission-request",
        status: "planned",
        priority: "P1",
        description: "최초 로그인 시 접근 권한 요청",
        figmaNodeId: F.LOGIN,
      },
      {
        name: "내 정보",
        file: "MyInfo.tsx",
        route: "/myinfo",
        status: "planned",
        priority: "P1",
        description: "내 계정 정보 조회·수정",
        figmaNodeId: F.MY_INFO,
      },
    ],
  },
  {
    name: "시스템 관리",
    icon: "⚙️",
    wbs: "③",
    features: [
      {
        name: "사용자 관리",
        file: "UserManagement.tsx",
        route: "/admin/users",
        status: "planned",
        priority: "P0",
        description: "사용자 조회·초대·권한 수정",
        figmaNodeId: F.USER_MANAGEMENT,
      },
      {
        name: "제휴사·브랜드·매장 관리",
        file: "AffiliateManagement.tsx",
        route: "/admin/affiliates",
        status: "planned",
        priority: "P0",
        description: "제휴사·브랜드·매장 등록 및 변경",
        figmaNodeId: F.AFFILIATE_MGMT,
      },
      {
        name: "권한 관리",
        file: "PermissionManagement.tsx",
        route: "/admin/permission",
        status: "planned",
        priority: "P0",
        description: "서비스별·그룹별·사용자별 권한 설정",
        figmaNodeId: F.PERMISSION_MGMT,
      },
      {
        name: "권한 요청 관리",
        file: "PermissionRequestManagement.tsx",
        route: "/admin/permission-request",
        status: "planned",
        priority: "P1",
        description: "권한 요청 승인·반려 처리",
        figmaNodeId: F.PERMISSION_REQUEST,
      },
      {
        name: "접속 조회",
        file: "AccessLog.tsx",
        route: "/admin/access-log",
        status: "planned",
        priority: "P1",
        description: "서비스별·그룹별·사용자별 접속 이력",
        figmaNodeId: F.ACCESS_LOG,
      },
      {
        name: "어드민",
        file: "Admin.tsx",
        route: "/admin",
        status: "planned",
        priority: "Later",
        description: "파트너센터 어드민 관리 화면",
        figmaNodeId: F.ADMIN,
      },
    ],
  },
  {
    name: "포인트 관리",
    icon: "🎁",
    wbs: "④",
    features: [
      {
        name: "기프트포인트 정산",
        file: "GiftPointManagement.tsx",
        route: "/settlement/gift-point",
        status: "done",
        priority: "P0",
        description: "기프트포인트 발행·등록·소멸 정산 (요약/건별)",
        figmaNodeId: F.GIFT_POINT,
        spec: {
          id: "F-GIFT01",
          status: "완료",
          priority: 1,
          userRoles: ["제휴사 본사 담당자"],
          summary:
            "기프트포인트 발행·등록·소멸 내역을 요약 및 건별로 조회하고 정산 내역을 확인한다.",
          subFeatures: [
            {
              no: 1,
              id: "S-GIFT01",
              title: "요약 조회",
              description:
                "기간별 기프트포인트 발행·등록·소멸 합계를 요약 카드로 표시한다.",
            },
            {
              no: 2,
              id: "S-GIFT02",
              title: "건별 조회",
              description:
                "기프트포인트 개별 거래 건을 일자·유형별로 목록 조회한다.",
            },
          ],
        },
      },
      {
        name: "기프트포인트 취소요청",
        file: "GiftPointCancelRequest.tsx",
        route: "/settlement/gift-point-cancel",
        status: "done",
        priority: "P0",
        description: "기프트포인트 취소 요청 내역 조회",
        figmaNodeId: F.GIFT_POINT_CANCEL,
        spec: {
          id: "F-GIFT02",
          status: "완료",
          priority: 1,
          userRoles: ["제휴사 본사 담당자"],
          summary:
            "기프트포인트 취소 요청 내역을 조회하고 요청 상태를 확인한다.",
          subFeatures: [
            {
              no: 1,
              id: "S-GIFT03",
              title: "취소 요청 목록 조회",
              description:
                "기프트포인트 취소 요청 건을 상태(접수/처리중/완료)별로 조회한다.",
            },
          ],
        },
      },
    ],
  },
  {
    name: "정산 관리",
    icon: "💳",
    wbs: "⑤",
    features: [
      {
        name: "정산 요약",
        file: "SettlementSummary.tsx",
        route: "/settlement/summary",
        status: "planned",
        priority: "P0",
        description: "월별 정산 합계 요약",
        figmaNodeId: F.SETTLEMENT,
      },
      {
        name: "정산 상세",
        file: "SettlementDetail.tsx",
        route: "/settlement/detail",
        status: "done",
        priority: "P0",
        description: "일자별·매장별 적립/사용 정산 내역",
        figmaNodeId: F.SETTLEMENT_FLOW,
        spec: {
          id: "F-SETL01",
          status: "완료",
          priority: 1,
          userRoles: ["제휴사 본사 담당자", "제휴사 매장 담당자"],
          summary:
            "기간·브랜드·매장 기준으로 포인트 적립·사용·취소 정산 내역을 일자별·매장별로 조회하고 엑셀로 다운로드한다.",
          subFeatures: [
            {
              no: 1,
              id: "S-SETL01",
              title: "기간·필터 조건 설정",
              description:
                "조회 기간(전월/3개월/6개월/당해년도)과 브랜드·매장·거래유형을 선택하여 조건을 설정한다.",
            },
            {
              no: 2,
              id: "S-SETL02",
              title: "정산 내역 목록 조회",
              description:
                "설정한 조건에 따라 일자별·매장별 적립/사용/취소 건수·포인트·수수료를 테이블로 표시한다.",
            },
            {
              no: 3,
              id: "S-SETL03",
              title: "합계 행 표시",
              description:
                "조회된 내역의 건수·포인트·수수료 합계를 테이블 하단에 고정 표시한다.",
            },
            {
              no: 4,
              id: "S-SETL04",
              title: "엑셀 다운로드",
              description:
                "조회된 정산 내역을 xlsx 파일로 다운로드하고 다운로드 이력을 기록한다.",
            },
          ],
        },
      },
      {
        name: "포인트 내역",
        file: "PointHistory.tsx",
        route: "/point-history/history",
        status: "planned",
        priority: "P1",
        description: "포인트 적립·사용·소멸 건별 내역 (대사 관리)",
        figmaNodeId: F.SETTLEMENT_PROCESS,
      },
      {
        name: "정산 원장",
        file: "SettlementLedger.tsx",
        route: "/point-history/ledger",
        status: "planned",
        priority: "P1",
        description: "정산 마스터 원장 조회",
        figmaNodeId: F.SETTLEMENT_PROCESS,
      },
      {
        name: "이중적립 정산",
        file: "DoubleAccrualSettlement.tsx",
        route: "/settlement/double-accrual",
        status: "planned",
        priority: "P1",
        description: "제휴카드 더블적립 정산 내역",
        figmaNodeId: F.PARTNER_SETTLEMENT,
      },
      {
        name: "제휴카드 특별적립",
        file: "SpecialAccrualSettlement.tsx",
        route: "/settlement/special-accrual",
        status: "done",
        priority: "P1",
        description: "제휴카드 특별적립 정산 내역",
        figmaNodeId: F.PARTNER_SETTLEMENT,
      },
      {
        name: "포인트 전환",
        file: "PointConversion.tsx",
        route: "/settlement/point-conversion",
        status: "done",
        priority: "P0",
        description: "포인트 유입·유출 전환 내역 (요약/일자별/건별)",
        figmaNodeId: F.PARTNER_SETTLEMENT,
      },
      {
        name: "직접사용 포인트 정산",
        file: "DirectUsePointSettlementDetail.tsx",
        route: "/settlement/direct-use-point",
        status: "planned",
        priority: "P1",
        description: "바로사용 포인트 정산 상세",
        figmaNodeId: F.PARTNER_SETTLEMENT,
      },
    ],
  },
  {
    name: "올리브영 현대카드",
    icon: "🏦",
    wbs: "⑥",
    features: [
      {
        name: "현대카드 이용내역",
        file: "HyundaiCardUseHistory.tsx",
        route: "/hyundai-card/use-history",
        status: "done",
        priority: "P1",
        description: "리워드 발행·소멸·수수료 이용 건별 내역",
        figmaNodeId: F.HYUNDAI_CARD,
      },
      {
        name: "현대카드 정산 상세",
        file: "HyundaiCardSettlementDetail.tsx",
        route: "/hyundai-card/settlement-detail",
        status: "done",
        priority: "P1",
        description: "리워드 월별 정산 상세",
        figmaNodeId: F.HYUNDAI_CARD_DETAIL,
      },
    ],
  },
  {
    name: "회계 관리",
    icon: "📒",
    wbs: "⑦",
    features: [
      {
        name: "이용기준 회계",
        file: "UseBasisAccounting.tsx",
        route: "/point-history/use-basis",
        status: "planned",
        priority: "P1",
        description: "포인트 수불·적립·사용 기준 회계 처리",
        figmaNodeId: F.ACCOUNTING,
      },
    ],
  },
];

/* ───────────────────────── Computed ───────────────────────────── */

const allFeatures = categories.flatMap((c) => c.features);
const doneCount = allFeatures.filter((f) => f.status === "done").length;
const totalCount = allFeatures.length;
const progressPct = Math.round((doneCount / totalCount) * 100);

/* ───────────────────────── Sub-components ─────────────────────── */

function StatusBadge({ status }: { status: FeatureStatus }) {
  if (status === "done") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ backgroundColor: "#DDF6EA", color: "#00A862" }}
      >
        <span>✓</span> 구현완료
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: "#EDF0F5", color: "#676E82" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#BFC5D2] inline-block" />
      예정
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === "P0")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#FDE9FA", color: "#C71BAF" }}>P0</span>
    );
  if (priority === "P1")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "#E5E9FF", color: "#2142FF" }}>P1</span>
    );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: "#EDF0F5", color: "#676E82" }}>Later</span>
  );
}

function FigmaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5C19 25.98 20 23.56 21.78 21.78C23.56 20 25.98 19 28.5 19C31.02 19 33.44 20 35.22 21.78C37 23.56 38 25.98 38 28.5C38 31.02 37 33.44 35.22 35.22C33.44 37 31.02 38 28.5 38C25.98 38 23.56 37 21.78 35.22C20 33.44 19 31.02 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 44.98 1 42.56 2.78 40.78C4.56 39 6.98 38 9.5 38H19V47.5C19 50.02 18 52.44 16.22 54.22C14.44 56 12.02 57 9.5 57C6.98 57 4.56 56 2.78 54.22C1 52.44 0 50.02 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C31.02 19 33.44 18 35.22 16.22C37 14.44 38 12.02 38 9.5C38 6.98 37 4.56 35.22 2.78C33.44 1 31.02 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 12.02 1 14.44 2.78 16.22C4.56 18 6.98 19 9.5 19H19V0H9.5C6.98 0 4.56 1 2.78 2.78C1 4.56 0 6.98 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 31.02 1 33.44 2.78 35.22C4.56 37 6.98 38 9.5 38H19V19H9.5C6.98 19 4.56 20 2.78 21.78C1 23.56 0 25.98 0 28.5Z" fill="#A259FF"/>
    </svg>
  );
}

function DocIcon({ active }: { active: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke={active ? "#2142FF" : "#BFC5D2"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? "#E5E9FF" : "none"}
      />
      <path d="M14 2V8H20" stroke={active ? "#2142FF" : "#BFC5D2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8" stroke={active ? "#2142FF" : "#BFC5D2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17H8" stroke={active ? "#2142FF" : "#BFC5D2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9H9H8" stroke={active ? "#2142FF" : "#BFC5D2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SpecStatusBadge({ status }: { status: SpecStatus }) {
  const styles: Record<SpecStatus, { bg: string; color: string }> = {
    시작전: { bg: "#EDF0F5", color: "#676E82" },
    진행중: { bg: "#FFF4E5", color: "#B45309" },
    완료: { bg: "#DDF6EA", color: "#00A862" },
  };
  const s = styles[status];
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

function PriorityBars({ priority }: { priority: SpecPriority }) {
  return (
    <span className="inline-flex items-end gap-0.5 ml-1">
      {([1, 2, 3] as SpecPriority[]).map((i) => (
        <span
          key={i}
          className="inline-block rounded-sm"
          style={{
            width: 5,
            height: i === 1 ? 8 : i === 2 ? 12 : 16,
            backgroundColor: i <= priority ? "#ED27CF" : "#EDF0F5",
          }}
        />
      ))}
    </span>
  );
}

/* ─────────────────── Spec Panel (right slide-in) ─────────────── */

type CommentItem = {
  id: number;
  text: string;
  time: string;
  resolved: boolean;
};

function SpecPanel({
  feature,
  onClose,
}: {
  feature: Feature;
  onClose: () => void;
}) {
  const spec = feature.spec!;
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [showResolved, setShowResolved] = useState(false);

  const handleAddComment = () => {
    const trimmed = commentInput.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = now.toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setComments((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, time, resolved: false },
    ]);
    setCommentInput("");
  };

  const handleResolve = (id: number) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, resolved: true } : c))
    );
  };

  const resolvedCount = comments.filter((c) => c.resolved).length;
  const visibleComments = showResolved
    ? comments
    : comments.filter((c) => !c.resolved);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0,0,0,0.18)" }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full z-50 flex flex-col"
        style={{
          width: 480,
          backgroundColor: "#FFFFFF",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.14)",
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center gap-2 px-5 py-3 shrink-0"
          style={{ borderBottom: "1px solid #EDF0F5" }}
        >
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-lg leading-none hover:bg-[#F5F6FA] transition-colors"
            style={{ color: "#676E82" }}
          >
            ×
          </button>
          <span className="text-xs" style={{ color: "#9D9D9D" }}>
            기능명세서&nbsp;/&nbsp;
            <span style={{ color: "#434343" }}>{feature.name}</span>
          </span>
          <div className="ml-auto flex gap-2">
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-medium border"
              style={{ borderColor: "#D8DCE5", color: "#676E82" }}
            >
              거절
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ backgroundColor: "#1E192A", color: "#FFFFFF" }}
            >
              승인
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Title */}
          <h2 className="text-2xl font-bold leading-snug" style={{ color: "#000000" }}>
            {feature.name}
          </h2>

          {/* Meta row */}
          <div className="flex items-center gap-3 flex-wrap text-xs" style={{ color: "#676E82" }}>
            <span>
              ID&nbsp;
              <span className="font-mono font-semibold" style={{ color: "#434343" }}>
                {spec.id}
              </span>
            </span>
            <span style={{ color: "#D8DCE5" }}>|</span>
            <span className="flex items-center gap-1.5">
              상태&nbsp;<SpecStatusBadge status={spec.status} />
            </span>
            <span style={{ color: "#D8DCE5" }}>|</span>
            <span className="flex items-center">
              중요도<PriorityBars priority={spec.priority} />
            </span>
          </div>

          {/* User roles */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs shrink-0" style={{ color: "#676E82" }}>
              사용자 역할
            </span>
            {spec.userRoles.map((role) => (
              <span
                key={role}
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#EDF0F5", color: "#434343" }}
              >
                {role}
              </span>
            ))}
          </div>

          {/* Summary */}
          <div
            className="rounded-xl p-4 text-sm leading-relaxed"
            style={{ backgroundColor: "#F5F6FA", color: "#434343" }}
          >
            {spec.summary}
          </div>

          {/* Sub features */}
          {spec.subFeatures.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "#000000" }}>
                연결된 상세 기능
              </h3>
              <div className="space-y-2">
                {spec.subFeatures.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-xl p-4"
                    style={{ border: "1px solid #EDF0F5" }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold" style={{ color: "#000000" }}>
                        {sub.no}.&nbsp;&nbsp;{sub.title}
                      </span>
                      <span
                        className="text-[11px] font-mono"
                        style={{ color: "#9D9D9D" }}
                      >
                        {sub.id}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#676E82" }}>
                      {sub.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comment section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold" style={{ color: "#000000" }}>
                코멘트
                {comments.length > 0 && (
                  <span className="ml-1.5 text-xs font-normal" style={{ color: "#9D9D9D" }}>
                    ({comments.length})
                  </span>
                )}
              </h3>
              {resolvedCount > 0 && (
                <button
                  className="text-xs"
                  style={{ color: "#9D9D9D" }}
                  onClick={() => setShowResolved((v) => !v)}
                >
                  {showResolved
                    ? "해결된 코멘트 숨기기"
                    : `해결된 코멘트 보기 (${resolvedCount})`}
                </button>
              )}
            </div>

            {/* Comment list */}
            {visibleComments.length > 0 && (
              <div className="space-y-3 mb-4">
                {visibleComments.map((comment) => (
                  <div key={comment.id} className="flex gap-2.5">
                    {/* Avatar */}
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#E5E9FF", color: "#2142FF" }}
                    >
                      나
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold" style={{ color: "#434343" }}>
                          나
                        </span>
                        <span className="text-xs" style={{ color: "#BFC5D2" }}>
                          {comment.time}
                        </span>
                        {comment.resolved && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: "#E6F7EF", color: "#00A862" }}
                          >
                            해결됨
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: comment.resolved ? "#BFC5D2" : "#434343" }}
                      >
                        {comment.text}
                      </p>
                    </div>
                    {!comment.resolved && (
                      <button
                        onClick={() => handleResolve(comment.id)}
                        title="해결로 표시"
                        className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-xs hover:bg-[#F5F6FA] transition-colors"
                        style={{ color: "#9D9D9D" }}
                      >
                        ✓
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Input row */}
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-colors"
              style={{
                border: `1px solid ${commentInput ? "#2142FF" : "#EDF0F5"}`,
              }}
            >
              <input
                type="text"
                placeholder="코멘트를 입력하세요..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "#434343" }}
              />
              <button
                onClick={handleAddComment}
                disabled={!commentInput.trim()}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors"
                style={{
                  backgroundColor: commentInput.trim() ? "#1E192A" : "#EDF0F5",
                  color: commentInput.trim() ? "#FFFFFF" : "#676E82",
                  cursor: commentInput.trim() ? "pointer" : "default",
                }}
              >
                등록
              </button>
            </div>

            {comments.length === 0 && (
              <p className="text-xs text-center mt-5" style={{ color: "#BFC5D2" }}>
                코멘트가 없습니다.
              </p>
            )}
          </div>

          <div className="h-6" />
        </div>
      </div>
    </>
  );
}

/* ─────────────── Category progress bar ───────────────────────── */

function CategoryProgressBar({ category }: { category: Category }) {
  const done = category.features.filter((f) => f.status === "done").length;
  const total = category.features.length;
  const pct = Math.round((done / total) * 100);
  const isComplete = done === total;

  return (
    <div className="flex items-center gap-3">
      <span className="w-36 text-right text-sm shrink-0" style={{ color: "#434343" }}>
        {category.icon} {category.name}
      </span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#EDF0F5" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: isComplete ? "#00A862" : "#ED27CF" }}
        />
      </div>
      <span className="w-20 text-xs shrink-0" style={{ color: "#676E82" }}>
        {done}/{total} ({pct}%)
      </span>
    </div>
  );
}

/* ───────────────────── Main Page ──────────────────────────────── */

export default function StatusBoard() {
  const [openSpec, setOpenSpec] = useState<Feature | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#000000" }}>현황판</h1>
        <p className="text-sm mt-1" style={{ color: "#676E82" }}>
          파트너센터 목업 구현 진행 현황 — WBS 기준
        </p>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "전체 화면", value: totalCount, sub: "목업 대상 페이지", color: "#000000" },
          { label: "구현 완료", value: doneCount, sub: "화면 완성", color: "#00A862" },
          { label: "구현 예정", value: totalCount - doneCount, sub: "플레이스홀더", color: "#9D9D9D" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "#676E82" }}>{card.label}</p>
            <p className="text-3xl font-bold" style={{ color: card.color }}>{card.value}</p>
            <p className="text-xs mt-1" style={{ color: "#9D9D9D" }}>{card.sub}</p>
          </div>
        ))}
        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}>
          <p className="text-xs font-medium mb-2" style={{ color: "#676E82" }}>전체 진행률</p>
          <p className="text-3xl font-bold" style={{ color: "#ED27CF" }}>{progressPct}%</p>
          <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#EDF0F5" }}>
            <div className="h-full rounded-full" style={{ width: `${progressPct}%`, backgroundColor: "#ED27CF" }} />
          </div>
        </div>
      </div>

      {/* 카테고리별 진행률 */}
      <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "#000000" }}>카테고리별 진행률</h2>
        {categories.map((cat) => (
          <CategoryProgressBar key={cat.name} category={cat} />
        ))}
      </div>

      {/* 기능별 산출물 링크 */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#000000" }}>기능별 산출물 링크</h2>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.name} className="rounded-xl overflow-hidden" style={{ border: "1px solid #EDF0F5" }}>
              {/* 카테고리 헤더 */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ backgroundColor: "#F5F6FA", borderBottom: "1px solid #EDF0F5" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: "#E5E9FF", color: "#2142FF" }}>
                    {cat.wbs}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#262626" }}>
                    {cat.icon} {cat.name}
                  </span>
                </div>
                <span className="text-xs" style={{ color: "#676E82" }}>
                  {cat.features.filter((f) => f.status === "done").length} / {cat.features.length} 완료
                </span>
              </div>

              {/* 테이블 */}
              <table className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #EDF0F5" }}>
                    <th className="px-4 py-2.5 text-left text-xs font-medium w-6" style={{ color: "#9D9D9D" }}>#</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium" style={{ color: "#9D9D9D" }}>기능명</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium" style={{ color: "#9D9D9D" }}>파일</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium" style={{ color: "#9D9D9D" }}>설명</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium w-20" style={{ color: "#9D9D9D" }}>상태</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium w-12" style={{ color: "#9D9D9D" }}>우선순위</th>
                    <th className="px-3 py-2.5 text-center text-xs font-medium w-16" style={{ color: "#9D9D9D" }}>기능명세</th>
                    <th className="px-3 py-2.5 text-center text-xs font-medium w-16" style={{ color: "#9D9D9D" }}>기획서</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium w-20" style={{ color: "#9D9D9D" }}>바로가기</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.features.map((feature, idx) => (
                    <tr
                      key={feature.file}
                      style={{ borderBottom: idx < cat.features.length - 1 ? "1px solid #F5F6FA" : "none" }}
                    >
                      <td className="px-4 py-3 text-xs" style={{ color: "#BFC5D2" }}>{idx + 1}</td>
                      <td className="px-3 py-3">
                        <span className="text-sm font-medium" style={{ color: "#000000" }}>{feature.name}</span>
                      </td>
                      <td className="px-3 py-3">
                        <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F5F6FA", color: "#434343", fontFamily: "monospace" }}>
                          {feature.file}
                        </code>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-xs" style={{ color: "#676E82" }}>{feature.description}</span>
                      </td>
                      <td className="px-3 py-3"><StatusBadge status={feature.status} /></td>
                      <td className="px-3 py-3"><PriorityBadge priority={feature.priority} /></td>

                      {/* 기능명세서 */}
                      <td className="px-3 py-3 text-center">
                        {feature.spec ? (
                          <button
                            onClick={() => setOpenSpec(feature)}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-[#E5E9FF]"
                            title="기능명세서 보기"
                          >
                            <DocIcon active={true} />
                          </button>
                        ) : (
                          <span
                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg cursor-not-allowed"
                            title="기능명세서 없음"
                          >
                            <DocIcon active={false} />
                          </span>
                        )}
                      </td>

                      {/* 기획서 */}
                      <td className="px-3 py-3 text-center">
                        <a
                          href={figmaUrl(feature.figmaNodeId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-[#F5F6FA]"
                          title="Figma 기획서 열기"
                        >
                          <FigmaIcon />
                        </a>
                      </td>

                      {/* 바로가기 */}
                      <td className="px-4 py-3 text-right">
                        {feature.status === "done" && feature.route ? (
                          <Link
                            to={feature.route}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-80"
                            style={{ backgroundColor: "#FDE9FA", color: "#C71BAF" }}
                          >
                            열기 →
                          </Link>
                        ) : (
                          <span
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium cursor-not-allowed"
                            style={{ backgroundColor: "#F5F6FA", color: "#BFC5D2" }}
                          >
                            준비중
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8" />

      {/* 기능명세서 패널 */}
      {openSpec && openSpec.spec && (
        <SpecPanel feature={openSpec} onClose={() => setOpenSpec(null)} />
      )}
    </div>
  );
}
