import { Link } from "react-router-dom";

type FeatureStatus = "done" | "planned";
type Priority = "P0" | "P1" | "Later";

type Feature = {
  name: string;
  file: string;
  route: string;
  status: FeatureStatus;
  priority: Priority;
  description: string;
  figmaNodeId: string;
};

type Category = {
  name: string;
  icon: string;
  features: Feature[];
};

const FIGMA_BASE =
  "https://www.figma.com/design/8UxCwhtN5D2EYaPevafhL0/CJ-ONE-%ED%8C%8C%ED%8A%B8%EB%84%88%EC%84%BC%ED%84%B0?node-id=";

// Figma node-id 상수
const F = {
  MENU: "1512-54265",             // 🔹멤버십 센터 > 메뉴 구조
  SETTLEMENT_FLOW: "665-20737",   // 🔹Flow > 포인트 정산 흐름도
  SETTLEMENT_PROCESS: "665-20893",// 🔹Flow > 기준정보 등록, 정산 프로세스
  PERMISSION_1: "1464-100102",    // 🔹멤버십 센터 > 권한 관리 (목록/요청)
  PERMISSION_2: "1464-100201",    // 🔹멤버십 센터 > 권한 관리 (상세)
  ADMIN: "1427-73370",            // 권한 관리 페이지 > 어드민 관리
};

const figmaUrl = (nodeId: string) => `${FIGMA_BASE}${nodeId}`;

const categories: Category[] = [
  {
    name: "대시보드",
    icon: "📊",
    features: [
      {
        name: "대시보드",
        file: "Dashboard.tsx",
        route: "/dashboard",
        status: "planned",
        priority: "P0",
        description: "정산 현황 요약, 주요 지표 KPI 카드",
        figmaNodeId: F.MENU,
      },
    ],
  },
  {
    name: "정산",
    icon: "💳",
    features: [
      {
        name: "정산 요약",
        file: "SettlementSummary.tsx",
        route: "/settlement/summary",
        status: "planned",
        priority: "P0",
        description: "월별 정산 합계 요약",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "정산 상세",
        file: "SettlementDetail.tsx",
        route: "/settlement/detail",
        status: "done",
        priority: "P0",
        description: "일자별·매장별 적립/사용 정산 내역",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "포인트 전환",
        file: "PointConversion.tsx",
        route: "/settlement/point-conversion",
        status: "done",
        priority: "P0",
        description: "포인트 유입·유출 전환 내역 (요약/일자별/건별)",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "기프트포인트 정산",
        file: "GiftPointManagement.tsx",
        route: "/settlement/gift-point",
        status: "done",
        priority: "P0",
        description: "기프트포인트 발행·등록·소멸 정산 (요약/건별)",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "기프트포인트 취소요청",
        file: "GiftPointCancelRequest.tsx",
        route: "/settlement/gift-point-cancel",
        status: "done",
        priority: "P0",
        description: "기프트포인트 취소 요청 내역 조회",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "제휴카드 특별적립",
        file: "SpecialAccrualSettlement.tsx",
        route: "/settlement/special-accrual",
        status: "done",
        priority: "P1",
        description: "제휴카드 특별적립 정산 내역",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "이중적립 정산",
        file: "DoubleAccrualSettlement.tsx",
        route: "/settlement/double-accrual",
        status: "planned",
        priority: "P1",
        description: "이중적립 정산 내역 조회",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "직접사용 포인트 정산",
        file: "DirectUsePointSettlementDetail.tsx",
        route: "/settlement/direct-use-point",
        status: "planned",
        priority: "P1",
        description: "직접사용 포인트 정산 상세",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
    ],
  },
  {
    name: "현대카드",
    icon: "🏦",
    features: [
      {
        name: "현대카드 이용내역",
        file: "HyundaiCardUseHistory.tsx",
        route: "/hyundai-card/use-history",
        status: "done",
        priority: "P1",
        description: "현대카드 이용 건별 내역 조회",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
      {
        name: "현대카드 정산 상세",
        file: "HyundaiCardSettlementDetail.tsx",
        route: "/hyundai-card/settlement-detail",
        status: "done",
        priority: "P1",
        description: "현대카드 월별 정산 상세",
        figmaNodeId: F.SETTLEMENT_FLOW,
      },
    ],
  },
  {
    name: "포인트 내역",
    icon: "📋",
    features: [
      {
        name: "포인트 내역",
        file: "PointHistory.tsx",
        route: "/point-history/history",
        status: "planned",
        priority: "P1",
        description: "포인트 적립·사용 건별 내역",
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
        name: "이용기준 회계",
        file: "UseBasisAccounting.tsx",
        route: "/point-history/use-basis",
        status: "planned",
        priority: "P1",
        description: "이용 기준 회계 정산 내역",
        figmaNodeId: F.SETTLEMENT_PROCESS,
      },
    ],
  },
  {
    name: "고객 분석",
    icon: "📈",
    features: [
      {
        name: "고객 분석",
        file: "CustomerAnalytics.tsx",
        route: "/customer-analytics",
        status: "planned",
        priority: "P1",
        description: "제휴사별 고객 적립·이용 분석 (제휴사 본사 담당자 전용)",
        figmaNodeId: F.MENU,
      },
    ],
  },
  {
    name: "고객지원",
    icon: "💬",
    features: [
      {
        name: "공지사항",
        file: "Notice.tsx",
        route: "/support/notice",
        status: "planned",
        priority: "P0",
        description: "파트너센터 공지사항 목록·상세",
        figmaNodeId: F.MENU,
      },
      {
        name: "FAQ",
        file: "Faq.tsx",
        route: "/support/faq",
        status: "planned",
        priority: "P1",
        description: "자주 묻는 질문 목록",
        figmaNodeId: F.MENU,
      },
      {
        name: "1:1 문의",
        file: "Inquiry.tsx",
        route: "/support/inquiry",
        status: "done",
        priority: "P0",
        description: "정산·수수료·포인트 등 유형별 1:1 문의 등록",
        figmaNodeId: F.MENU,
      },
    ],
  },
  {
    name: "관리",
    icon: "⚙️",
    features: [
      {
        name: "권한 관리",
        file: "PermissionManagement.tsx",
        route: "/admin/permission",
        status: "planned",
        priority: "P0",
        description: "사용자·역할·스코프 권한 관리",
        figmaNodeId: F.PERMISSION_1,
      },
      {
        name: "권한 요청 관리",
        file: "PermissionRequestManagement.tsx",
        route: "/admin/permission-request",
        status: "planned",
        priority: "P1",
        description: "권한 요청 승인·반려 처리",
        figmaNodeId: F.PERMISSION_2,
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
];

const allFeatures = categories.flatMap((c) => c.features);
const doneCount = allFeatures.filter((f) => f.status === "done").length;
const totalCount = allFeatures.length;
const progressPct = Math.round((doneCount / totalCount) * 100);

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
  if (priority === "P0") {
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold"
        style={{ backgroundColor: "#FDE9FA", color: "#C71BAF" }}
      >
        P0
      </span>
    );
  }
  if (priority === "P1") {
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold"
        style={{ backgroundColor: "#E5E9FF", color: "#2142FF" }}
      >
        P1
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: "#EDF0F5", color: "#676E82" }}
    >
      Later
    </span>
  );
}

function FigmaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
    </svg>
  );
}

function CategoryProgressBar({ category }: { category: Category }) {
  const done = category.features.filter((f) => f.status === "done").length;
  const total = category.features.length;
  const pct = Math.round((done / total) * 100);
  const isComplete = done === total;

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-right text-sm shrink-0" style={{ color: "#434343" }}>
        {category.icon} {category.name}
      </span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#EDF0F5" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: isComplete ? "#00A862" : "#ED27CF",
          }}
        />
      </div>
      <span className="w-16 text-xs shrink-0" style={{ color: "#676E82" }}>
        {done}/{total} ({pct}%)
      </span>
    </div>
  );
}

export default function StatusBoard() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#000000" }}>
          현황판
        </h1>
        <p className="text-sm mt-1" style={{ color: "#676E82" }}>
          파트너센터 목업 구현 진행 현황 — FRD v0.2.9 기준
        </p>
      </div>

      {/* KPI 카드 4개 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "#676E82" }}>전체 화면</p>
          <p className="text-3xl font-bold" style={{ color: "#000000" }}>{totalCount}</p>
          <p className="text-xs mt-1" style={{ color: "#9D9D9D" }}>목업 대상 페이지</p>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "#676E82" }}>구현 완료</p>
          <p className="text-3xl font-bold" style={{ color: "#00A862" }}>{doneCount}</p>
          <p className="text-xs mt-1" style={{ color: "#9D9D9D" }}>화면 완성</p>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "#676E82" }}>구현 예정</p>
          <p className="text-3xl font-bold" style={{ color: "#9D9D9D" }}>{totalCount - doneCount}</p>
          <p className="text-xs mt-1" style={{ color: "#9D9D9D" }}>플레이스홀더</p>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}>
          <p className="text-xs font-medium mb-2" style={{ color: "#676E82" }}>전체 진행률</p>
          <p className="text-3xl font-bold" style={{ color: "#ED27CF" }}>{progressPct}%</p>
          <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#EDF0F5" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${progressPct}%`, backgroundColor: "#ED27CF" }}
            />
          </div>
        </div>
      </div>

      {/* 카테고리별 진행률 */}
      <div
        className="rounded-xl p-5 space-y-3"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #EDF0F5" }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: "#000000" }}>
          카테고리별 진행률
        </h2>
        {categories.map((cat) => (
          <CategoryProgressBar key={cat.name} category={cat} />
        ))}
      </div>

      {/* 기능별 산출물 링크 */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#000000" }}>
          기능별 산출물 링크
        </h2>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid #EDF0F5" }}
            >
              {/* 카테고리 헤더 */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ backgroundColor: "#F5F6FA", borderBottom: "1px solid #EDF0F5" }}
              >
                <span className="text-sm font-semibold" style={{ color: "#262626" }}>
                  {cat.icon} {cat.name}
                </span>
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
                    <th className="px-3 py-2.5 text-center text-xs font-medium w-16" style={{ color: "#9D9D9D" }}>기획서</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium w-20" style={{ color: "#9D9D9D" }}>바로가기</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.features.map((feature, idx) => (
                    <tr
                      key={feature.file}
                      style={{
                        borderBottom: idx < cat.features.length - 1 ? "1px solid #F5F6FA" : "none",
                      }}
                    >
                      <td className="px-4 py-3 text-xs" style={{ color: "#BFC5D2" }}>
                        {idx + 1}
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-sm font-medium" style={{ color: "#000000" }}>
                          {feature.name}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <code
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: "#F5F6FA",
                            color: "#434343",
                            fontFamily: "monospace",
                          }}
                        >
                          {feature.file}
                        </code>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-xs" style={{ color: "#676E82" }}>
                          {feature.description}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={feature.status} />
                      </td>
                      <td className="px-3 py-3">
                        <PriorityBadge priority={feature.priority} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <a
                          href={figmaUrl(feature.figmaNodeId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-[#F5F6FA]"
                          title={`Figma 기획서 열기`}
                        >
                          <FigmaIcon />
                        </a>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {feature.status === "done" ? (
                          <Link
                            to={feature.route}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-80"
                            style={{
                              backgroundColor: "#FDE9FA",
                              color: "#C71BAF",
                            }}
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

      {/* 하단 여백 */}
      <div className="h-8" />
    </div>
  );
}
