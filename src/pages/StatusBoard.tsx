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
};

type Category = {
  name: string;
  icon: string;
  features: Feature[];
};

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
      },
      {
        name: "정산 상세",
        file: "SettlementDetail.tsx",
        route: "/settlement/detail",
        status: "done",
        priority: "P0",
        description: "일자별·매장별 적립/사용 정산 내역",
      },
      {
        name: "포인트 전환",
        file: "PointConversion.tsx",
        route: "/settlement/point-conversion",
        status: "done",
        priority: "P0",
        description: "포인트 유입·유출 전환 내역 (요약/일자별/건별)",
      },
      {
        name: "기프트포인트 정산",
        file: "GiftPointManagement.tsx",
        route: "/settlement/gift-point",
        status: "done",
        priority: "P0",
        description: "기프트포인트 발행·등록·소멸 정산 (요약/건별)",
      },
      {
        name: "기프트포인트 취소요청",
        file: "GiftPointCancelRequest.tsx",
        route: "/settlement/gift-point-cancel",
        status: "done",
        priority: "P0",
        description: "기프트포인트 취소 요청 내역 조회",
      },
      {
        name: "제휴카드 특별적립",
        file: "SpecialAccrualSettlement.tsx",
        route: "/settlement/special-accrual",
        status: "done",
        priority: "P1",
        description: "제휴카드 특별적립 정산 내역",
      },
      {
        name: "이중적립 정산",
        file: "DoubleAccrualSettlement.tsx",
        route: "/settlement/double-accrual",
        status: "planned",
        priority: "P1",
        description: "이중적립 정산 내역 조회",
      },
      {
        name: "직접사용 포인트 정산",
        file: "DirectUsePointSettlementDetail.tsx",
        route: "/settlement/direct-use-point",
        status: "planned",
        priority: "P1",
        description: "직접사용 포인트 정산 상세",
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
      },
      {
        name: "현대카드 정산 상세",
        file: "HyundaiCardSettlementDetail.tsx",
        route: "/hyundai-card/settlement-detail",
        status: "done",
        priority: "P1",
        description: "현대카드 월별 정산 상세",
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
      },
      {
        name: "정산 원장",
        file: "SettlementLedger.tsx",
        route: "/point-history/ledger",
        status: "planned",
        priority: "P1",
        description: "정산 마스터 원장 조회",
      },
      {
        name: "이용기준 회계",
        file: "UseBasisAccounting.tsx",
        route: "/point-history/use-basis",
        status: "planned",
        priority: "P1",
        description: "이용 기준 회계 정산 내역",
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
      },
      {
        name: "FAQ",
        file: "Faq.tsx",
        route: "/support/faq",
        status: "planned",
        priority: "P1",
        description: "자주 묻는 질문 목록",
      },
      {
        name: "1:1 문의",
        file: "Inquiry.tsx",
        route: "/support/inquiry",
        status: "done",
        priority: "P0",
        description: "정산·수수료·포인트 등 유형별 1:1 문의 등록",
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
      },
      {
        name: "권한 요청 관리",
        file: "PermissionRequestManagement.tsx",
        route: "/admin/permission-request",
        status: "planned",
        priority: "P1",
        description: "권한 요청 승인·반려 처리",
      },
      {
        name: "어드민",
        file: "Admin.tsx",
        route: "/admin",
        status: "planned",
        priority: "Later",
        description: "파트너센터 어드민 관리 화면",
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
                    <th className="px-5 py-2.5 text-left text-xs font-medium w-8" style={{ color: "#9D9D9D" }}>#</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium" style={{ color: "#9D9D9D" }}>기능명</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium" style={{ color: "#9D9D9D" }}>파일</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium w-24" style={{ color: "#9D9D9D" }}>설명</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium w-20" style={{ color: "#9D9D9D" }}>상태</th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium w-14" style={{ color: "#9D9D9D" }}>우선순위</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium w-20" style={{ color: "#9D9D9D" }}>바로가기</th>
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
                      <td className="px-5 py-3 text-xs" style={{ color: "#BFC5D2" }}>
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
                      <td className="px-5 py-3 text-right">
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
