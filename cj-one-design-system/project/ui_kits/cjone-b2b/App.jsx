/* CJ ONE Business Admin — single-file React kit */
const { useState } = React;

/* ------------------------------------------------------------------ */
/* Logo lockup                                                         */
function Lockup({ withTag = true }) {
  return (
    <div className="lockup">
      <img src="../../assets/logos/cjone-symbol.svg" alt="CJ ONE" />
      <span>CJ <span className="b">ONE</span></span>
      {withTag ? <span className="sub">Business</span> : null}
    </div>
  );
}

/* GNB ---------------------------------------------------------------- */
function GNB({ tab, onTab, onLogout }) {
  const tabs = [
    ["dashboard", "대시보드"],
    ["settlement", "정산"],
    ["partners", "파트너"],
    ["notice", "공지"],
  ];
  return (
    <header className="gnb">
      <Lockup />
      <nav>
        {tabs.map(([k, l]) => (
          <a key={k} className={tab === k ? "active" : ""} onClick={() => onTab(k)}>{l}</a>
        ))}
      </nav>
      <div className="right">
        <span className="who">김운영자 · CJ Operations</span>
        <div className="av">김</div>
        <button className="btn btn-ghost btn-sm" onClick={onLogout}>로그아웃</button>
      </div>
    </header>
  );
}

/* SNB ---------------------------------------------------------------- */
function SNB({ section, onSection }) {
  const items = [
    { group: "운영", links: [
      ["overview", "개요"],
      ["sales",    "매출"],
      ["settle",   "정산 내역"],
      ["refund",   "환불"],
    ]},
    { group: "관리", links: [
      ["partners", "파트너"],
      ["users",    "사용자"],
      ["roles",    "권한"],
    ]},
    { group: "시스템", links: [
      ["audit",    "감사 로그"],
      ["api",      "API 키"],
    ]},
  ];
  return (
    <aside className="snb">
      {items.map(({ group, links }) => (
        <React.Fragment key={group}>
          <h6>{group}</h6>
          {links.map(([k, l]) => (
            <a key={k} className={section === k ? "active" : ""} onClick={() => onSection(k)}>
              <span className="ico" style={{ background: section === k ? "var(--pink-400)" : "var(--gray-400)" }} />
              {l}
            </a>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
}

/* Login --------------------------------------------------------------- */
function Login({ onLogin }) {
  const [id, setId] = useState("admin@cjone.kr");
  const [pw, setPw] = useState("••••••••");
  return (
    <div className="login">
      <div className="panel">
        <Lockup />
        <h1>관리자 로그인</h1>
        <p>CJ ONE Business 운영 콘솔에 로그인합니다.</p>
        <div className="field">
          <label className="label">아이디</label>
          <input className="input" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">비밀번호</label>
          <input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={onLogin}>로그인</button>
        <p style={{ marginTop: 16, fontSize: 12, textAlign: "center" }} className="muted">
          접근 권한 문의는 운영팀에 요청해 주세요.
        </p>
      </div>
    </div>
  );
}

/* KPI ---------------------------------------------------------------- */
function Kpi({ label, value, delta, up }) {
  return (
    <div className="card kpi">
      <h6>{label}</h6>
      <div className="v">{value}</div>
      <div className={"delta " + (up ? "up" : "down")}>{up ? "▲" : "▼"} {delta}</div>
    </div>
  );
}

/* Faux chart -- gentle pink/navy line */
function Chart() {
  const pts = [40, 55, 48, 62, 70, 68, 80, 76, 90, 85, 102, 110];
  const max = 120;
  const w = 720, h = 200, pad = 24;
  const stepX = (w - pad * 2) / (pts.length - 1);
  const path = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${pad + i * stepX} ${h - pad - (v / max) * (h - pad * 2)}`).join(" ");
  const area = `${path} L ${pad + (pts.length - 1) * stepX} ${h - pad} L ${pad} ${h - pad} Z`;
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ED27CF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ED27CF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={pad} x2={w - pad} y1={pad + i * 50} y2={pad + i * 50} stroke="#EDF0F5" />
        ))}
        <path d={area} fill="url(#g)" />
        <path d={path} fill="none" stroke="#ED27CF" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((v, i) => (
          <circle key={i} cx={pad + i * stepX} cy={h - pad - (v / max) * (h - pad * 2)} r="3" fill="#fff" stroke="#ED27CF" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

/* Dashboard ---------------------------------------------------------- */
function Dashboard() {
  return (
    <>
      <div className="page-h">
        <div>
          <h1>대시보드</h1>
          <p>최근 12개월 운영 지표 요약입니다.</p>
        </div>
        <div className="row">
          <button className="btn btn-quat">CSV 내보내기</button>
          <button className="btn btn-primary">리포트 생성</button>
        </div>
      </div>
      <div className="grid-4" style={{ marginBottom: 20 }}>
        <Kpi label="총 매출" value="₩4,820M" delta="+8.2%" up />
        <Kpi label="정산 대기" value="184건" delta="-12건" up />
        <Kpi label="활성 파트너" value="62" delta="+3" up />
        <Kpi label="반려 / 오류" value="7" delta="+2" up={false} />
      </div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
          <h3 style={{ margin: 0, font: "700 18px/1 var(--font-sans)" }}>월별 매출 추이</h3>
          <div className="row">
            <span className="chip on">월별</span>
            <span className="chip">주별</span>
            <span className="chip">일별</span>
          </div>
        </div>
        <Chart />
      </div>
      <div className="card">
        <h3 style={{ margin: "0 0 12px", font: "700 18px/1 var(--font-sans)" }}>최근 정산 활동</h3>
        <SettlementTable rows={3} compact />
      </div>
    </>
  );
}

/* Settlement table --------------------------------------------------- */
const ROWS = [
  ["CJN-202410-00821", "Olive Young",      "₩142,800", "ok",   "2024.10.18 14:22"],
  ["CJN-202410-00820", "VIPS",             "₩89,000",  "pend", "2024.10.18 14:08"],
  ["CJN-202410-00819", "Tous Les Jours",   "₩12,500",  "ok",   "2024.10.18 13:51"],
  ["CJN-202410-00818", "The Place Dining", "₩—",       "err",  "2024.10.18 13:40"],
  ["CJN-202410-00817", "CJ The Market",    "₩76,200",  "ok",   "2024.10.18 13:22"],
  ["CJN-202410-00816", "Megacoffee",       "₩4,800",   "ok",   "2024.10.18 13:11"],
  ["CJN-202410-00815", "Photoism",         "₩28,000",  "pend", "2024.10.18 12:58"],
];
function SettlementTable({ rows = ROWS.length, compact, onRow }) {
  const data = ROWS.slice(0, rows);
  const lab = { ok: "완료", pend: "정산 대기", err: "반려" };
  return (
    <table>
      <thead>
        <tr>
          <th>주문 번호</th><th>파트너</th><th>금액</th><th>상태</th><th>일시</th>
          {!compact && <th></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r[0]} onClick={() => onRow && onRow(r)} style={{ cursor: onRow ? "pointer" : "default" }}>
            <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{r[0]}</td>
            <td style={{ fontWeight: 600, color: "#000" }}>{r[1]}</td>
            <td>{r[2]}</td>
            <td><span className={"badge b-" + r[3]}>{lab[r[3]]}</span></td>
            <td className="muted">{r[4]}</td>
            {!compact && <td><button className="btn btn-quat btn-sm">상세</button></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* Settlement page ---------------------------------------------------- */
function Settlement({ onRow }) {
  const [filter, setFilter] = useState("all");
  return (
    <>
      <div className="page-h">
        <div><h1>정산 내역</h1><p>파트너 단위 정산 트랜잭션을 조회합니다.</p></div>
        <div className="row">
          <button className="btn btn-quat">필터</button>
          <button className="btn btn-primary">정산 실행</button>
        </div>
      </div>
      <div className="card">
        <div className="filters">
          {[["all","전체"],["ok","완료"],["pend","정산 대기"],["err","반려"]].map(([k,l]) => (
            <span key={k} className={"chip " + (filter === k ? "on" : "")} onClick={() => setFilter(k)}>{l}</span>
          ))}
          <span style={{ marginLeft: "auto" }} className="muted" >총 184건</span>
          <input className="input" placeholder="주문번호 / 파트너명" style={{ width: 240, height: 32, fontSize: 13 }} />
        </div>
        <SettlementTable onRow={onRow} />
        <div className="pagination">
          <button>‹</button>
          <button className="on">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>›</button>
        </div>
      </div>
    </>
  );
}

/* Partner drawer ----------------------------------------------------- */
function Drawer({ row, onClose, onDelete }) {
  if (!row) return null;
  const lab = { ok: "완료", pend: "정산 대기", err: "반려" };
  return (
    <aside className="drawer">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ margin: 0, font: "700 22px/1 var(--font-sans)" }}>{row[0]}</h2>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>닫기</button>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <h6 className="muted" style={{ margin: 0, font: "500 12px/1 var(--font-sans)" }}>파트너</h6>
        <div style={{ font: "700 18px/1 var(--font-sans)", margin: "8px 0 16px" }}>{row[1]}</div>
        <div className="row" style={{ gap: 24 }}>
          <div><h6 className="muted" style={{ margin: 0, font: "500 12px/1 var(--font-sans)" }}>금액</h6><div style={{ font: "700 16px/1 var(--font-sans)", marginTop: 6 }}>{row[2]}</div></div>
          <div><h6 className="muted" style={{ margin: 0, font: "500 12px/1 var(--font-sans)" }}>상태</h6><div style={{ marginTop: 6 }}><span className={"badge b-" + row[3]}>{lab[row[3]]}</span></div></div>
          <div><h6 className="muted" style={{ margin: 0, font: "500 12px/1 var(--font-sans)" }}>일시</h6><div style={{ marginTop: 6, fontSize: 14 }} className="muted">{row[4]}</div></div>
        </div>
      </div>
      <div className="card">
        <h3 style={{ margin: "0 0 12px", font: "700 16px/1 var(--font-sans)" }}>처리 이력</h3>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {[
            ["요청 접수", "14:22"],
            ["검증 통과", "14:23"],
            ["정산 처리", "14:24"],
          ].map(([t, ts]) => (
            <li key={t} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--gray-100)" }}>
              <span style={{ width: 60, color: "var(--gray-600)", fontSize: 12 }}>{ts}</span>
              <span style={{ fontSize: 14 }}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="row" style={{ marginTop: 24, justifyContent: "flex-end", gap: 8 }}>
        <button className="btn btn-quat" onClick={onClose}>취소</button>
        <button className="btn btn-primary" onClick={onDelete}>정산 취소</button>
      </div>
    </aside>
  );
}

/* Confirm modal ------------------------------------------------------ */
function Confirm({ onCancel, onConfirm }) {
  return (
    <div className="scrim" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>정산을 취소하시겠습니까?</h3>
        <p>취소된 정산은 복구할 수 없으며, 파트너에게 알림이 전송됩니다.</p>
        <div className="actions">
          <button className="btn btn-ghost" onClick={onCancel}>닫기</button>
          <button className="btn btn-primary" style={{ background: "var(--error)" }} onClick={onConfirm}>정산 취소</button>
        </div>
      </div>
    </div>
  );
}

/* App shell ---------------------------------------------------------- */
function App() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [section, setSection] = useState("overview");
  const [drawerRow, setDrawerRow] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [snack, setSnack] = useState(null);

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <div className="app">
      <GNB tab={tab} onTab={(t) => { setTab(t); setSection(t === "dashboard" ? "overview" : "settle"); }} onLogout={() => setAuthed(false)} />
      <div className="body">
        <SNB section={section} onSection={setSection} />
        <main className="main">
          {tab === "dashboard"
            ? <Dashboard />
            : <Settlement onRow={setDrawerRow} />}
        </main>
      </div>
      {drawerRow && <Drawer row={drawerRow} onClose={() => setDrawerRow(null)} onDelete={() => setConfirm(true)} />}
      {confirm && <Confirm onCancel={() => setConfirm(false)} onConfirm={() => {
        setConfirm(false); setDrawerRow(null);
        setSnack("정산이 취소되었습니다.");
        setTimeout(() => setSnack(null), 2400);
      }} />}
      {snack && (
        <div className="snack">
          <span><b>처리 완료</b> · {snack}</span>
          <button className="btn btn-sm" style={{ background: "transparent", color: "#fff", height: 24, padding: "0 6px" }} onClick={() => setSnack(null)}>닫기</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
