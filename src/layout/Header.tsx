export default function Header() {
  return (
    <header
      className="flex items-center px-6 shrink-0 z-30"
      style={{ height: 56, backgroundColor: "#1E192A" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded font-bold text-xs tracking-wider"
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #ED27CF 0%, #C71BAF 100%)",
            color: "#fff",
          }}
        >
          CJ
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-medium tracking-widest" style={{ color: "#9D9D9D" }}>
            CJ ONE
          </span>
          <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
            멤버십센터
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span className="text-xs" style={{ color: "#676E82" }}>
          목업 v0.2.9
        </span>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: "#2C1054", color: "#F9B4EE" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#ED27CF" }}
          />
          테스트 계정
        </div>
      </div>
    </header>
  );
}
