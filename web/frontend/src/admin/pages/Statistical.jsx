import AdminHeader from "../components/AdminHeader";

export default function Statistical() {
  const topCakes = [
    { name: "Chocolate Mousse", sales: 185, percent: 85, color: "#d4845a" },
    { name: "Butter Croissant", sales: 142, percent: 65, color: "#3b82f6" },
    { name: "Matcha Latte Cake", sales: 98, percent: 45, color: "#10b981" },
    { name: "Peach Tea", sales: 86, percent: 40, color: "#f59e0b" },
  ];

  return (
    <>
      <AdminHeader title="Báo cáo thống kê" />
      <div className="admin-page-container">
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          
          <div className="admin-card">
            <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>
              Bánh bán chạy nhất trong tháng
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {topCakes.map((c, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "14px" }}>
                    <span style={{ fontWeight: "600", color: "#334155" }}>{c.name}</span>
                    <span style={{ color: "#64748b" }}>{c.sales} phần ({c.percent}%)</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${c.percent}%`, height: "100%", background: c.color, borderRadius: "4px" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>
              Doanh thu theo tuần
            </h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "15px", height: "160px", paddingTop: "20px" }}>
              {[
                { day: "T2", h: 40, rev: "1.2tr" },
                { day: "T3", h: 60, rev: "2.1tr" },
                { day: "T4", h: 50, rev: "1.8tr" },
                { day: "T5", h: 75, rev: "2.8tr" },
                { day: "T6", h: 90, rev: "3.5tr" },
                { day: "T7", h: 100, rev: "4.2tr" },
                { day: "CN", h: 95, rev: "3.9tr" },
              ].map((b, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px" }}>{b.rev}</span>
                  <div style={{ width: "100%", height: `${b.h}%`, background: "linear-gradient(to top, #d4845a, #f97316)", borderRadius: "6px 6px 0 0" }}></div>
                  <span style={{ fontSize: "12px", color: "#475569", marginTop: "6px", fontWeight: "600" }}>{b.day}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
