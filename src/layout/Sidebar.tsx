import { NavLink } from "react-router-dom";

type MenuItem = {
  label: string;
  to: string;
};

type MenuGroup = {
  group: string;
  wbs: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    group: "목업 현황",
    wbs: "",
    items: [{ label: "현황판", to: "/status-board" }],
  },
  {
    group: "기초 설계",
    wbs: "①",
    items: [
      { label: "GNB", to: "/status-board" },
      { label: "SNB", to: "/status-board" },
    ],
  },
  {
    group: "대시보드",
    wbs: "⑧",
    items: [
      { label: "대시보드", to: "/dashboard" },
      { label: "고객 분석", to: "/customer-analytics" },
    ],
  },
  {
    group: "공통 기반",
    wbs: "①",
    items: [
      { label: "홈 화면", to: "/home" },
      { label: "공지사항", to: "/support/notice" },
      { label: "FAQ", to: "/support/faq" },
      { label: "1:1 문의", to: "/support/inquiry" },
    ],
  },
  {
    group: "로그인 · 접근 제어",
    wbs: "②",
    items: [
      { label: "로그인", to: "/login" },
      { label: "약관동의", to: "/login/terms" },
      { label: "권한 요청", to: "/login/permission-request" },
      { label: "내 정보", to: "/myinfo" },
    ],
  },
  {
    group: "시스템 관리",
    wbs: "③",
    items: [
      { label: "사용자 관리", to: "/admin/users" },
      { label: "제휴사·브랜드·매장 관리", to: "/admin/affiliates" },
      { label: "권한 관리", to: "/admin/permission" },
      { label: "권한 요청 관리", to: "/admin/permission-request" },
      { label: "접속 조회", to: "/admin/access-log" },
      { label: "어드민", to: "/admin" },
    ],
  },
  {
    group: "포인트 관리",
    wbs: "④",
    items: [
      { label: "기프트포인트 정산", to: "/settlement/gift-point" },
      { label: "기프트포인트 취소요청", to: "/settlement/gift-point-cancel" },
    ],
  },
  {
    group: "정산 관리",
    wbs: "⑤",
    items: [
      { label: "정산 요약", to: "/settlement/summary" },
      { label: "정산 상세", to: "/settlement/detail" },
      { label: "포인트 내역", to: "/point-history/history" },
      { label: "정산 원장", to: "/point-history/ledger" },
      { label: "이중적립 정산", to: "/settlement/double-accrual" },
      { label: "제휴카드 특별적립", to: "/settlement/special-accrual" },
      { label: "포인트 전환", to: "/settlement/point-conversion" },
      { label: "직접사용 포인트 정산", to: "/settlement/direct-use-point" },
    ],
  },
  {
    group: "올리브영 현대카드",
    wbs: "⑥",
    items: [
      { label: "현대카드 이용내역", to: "/hyundai-card/use-history" },
      { label: "현대카드 정산 상세", to: "/hyundai-card/settlement-detail" },
    ],
  },
  {
    group: "회계 관리",
    wbs: "⑦",
    items: [
      { label: "이용기준 회계", to: "/point-history/use-basis" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside
      className="shrink-0 overflow-y-auto scroll-area flex flex-col"
      style={{
        width: 240,
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #D8DCE5",
      }}
    >
      <nav className="py-3">
        {menuGroups.map((group) => (
          <div key={group.group} className="mb-1">
            <div
              className="px-4 pt-4 pb-1 flex items-center gap-1.5"
            >
              {group.wbs && (
                <span
                  className="text-[9px] font-bold px-1 py-0.5 rounded"
                  style={{ backgroundColor: "#E5E9FF", color: "#2142FF" }}
                >
                  {group.wbs}
                </span>
              )}
              <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#9D9D9D" }}>
                {group.group}
              </span>
            </div>
            {group.items.map((item, itemIdx) => (
              <NavLink
                key={`${group.group}__${itemIdx}`}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  [
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md mx-2 transition-colors",
                    isActive
                      ? "text-[#ED27CF] bg-[#FDE9FA]"
                      : "text-[#434343] hover:bg-[#F5F6FA] hover:text-[#000000]",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
