import { NavLink } from "react-router-dom";

type MenuItem = {
  label: string;
  to: string;
};

type MenuGroup = {
  group: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    group: "목업 현황",
    items: [{ label: "현황판", to: "/status-board" }],
  },
  {
    group: "대시보드",
    items: [{ label: "대시보드", to: "/dashboard" }],
  },
  {
    group: "정산",
    items: [
      { label: "정산 요약", to: "/settlement/summary" },
      { label: "정산 상세", to: "/settlement/detail" },
      { label: "포인트 전환", to: "/settlement/point-conversion" },
      { label: "기프트포인트 정산", to: "/settlement/gift-point" },
      { label: "기프트포인트 취소요청", to: "/settlement/gift-point-cancel" },
      { label: "제휴카드 특별적립", to: "/settlement/special-accrual" },
      { label: "이중적립 정산", to: "/settlement/double-accrual" },
      { label: "직접사용 포인트 정산", to: "/settlement/direct-use-point" },
    ],
  },
  {
    group: "현대카드",
    items: [
      { label: "현대카드 이용내역", to: "/hyundai-card/use-history" },
      { label: "현대카드 정산 상세", to: "/hyundai-card/settlement-detail" },
    ],
  },
  {
    group: "포인트 내역",
    items: [
      { label: "포인트 내역", to: "/point-history/history" },
      { label: "정산 원장", to: "/point-history/ledger" },
      { label: "이용기준 회계", to: "/point-history/use-basis" },
    ],
  },
  {
    group: "고객 분석",
    items: [{ label: "고객 분석", to: "/customer-analytics" }],
  },
  {
    group: "고객지원",
    items: [
      { label: "공지사항", to: "/support/notice" },
      { label: "FAQ", to: "/support/faq" },
      { label: "1:1 문의", to: "/support/inquiry" },
    ],
  },
  {
    group: "관리",
    items: [
      { label: "권한 관리", to: "/admin/permission" },
      { label: "권한 요청 관리", to: "/admin/permission-request" },
      { label: "어드민", to: "/admin" },
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
              className="px-4 pt-4 pb-1 text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#9D9D9D" }}
            >
              {group.group}
            </div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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
