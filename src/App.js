import { useState } from "react";

const nodes = {
  center: {
    id: "center",
    label: "Desarrollo\nSostenible",
    x: 500,
    y: 380,
    r: 70,
    color: "#2d6a4f",
    textColor: "#fff",
  },
  pillars: [
    { id: "social", label: "Dimensión\nSocial", x: 500, y: 160, r: 52, color: "#1b4332", textColor: "#95d5b2" },
    { id: "economico", label: "Dimensión\nEconómica", x: 750, y: 520, r: 52, color: "#1b4332", textColor: "#95d5b2" },
    { id: "ambiental", label: "Dimensión\nAmbiental", x: 250, y: 520, r: 52, color: "#1b4332", textColor: "#95d5b2" },
  ],
  children: [
    // Social
    { id: "equidad", label: "Equidad", x: 340, y: 70, px: 500, py: 160, color: "#52b788", textColor: "#fff" },
    { id: "educacion", label: "Educación\nde Calidad", x: 580, y: 55, px: 500, py: 160, color: "#52b788", textColor: "#fff" },
    { id: "salud", label: "Salud\nPública", x: 670, y: 150, px: 500, py: 160, color: "#52b788", textColor: "#fff" },
    // Económico
    { id: "innovacion", label: "Innovación\nVerde", x: 900, y: 430, px: 750, py: 520, color: "#52b788", textColor: "#fff" },
    { id: "empleoverde", label: "Empleo\nVerde", x: 930, y: 570, px: 750, py: 520, color: "#52b788", textColor: "#fff" },
    { id: "economia", label: "Economía\nCircular", x: 790, y: 680, px: 750, py: 520, color: "#52b788", textColor: "#fff" },
    // Ambiental
    { id: "biodiversidad", label: "Biodiversidad", x: 100, y: 430, px: 250, py: 520, color: "#52b788", textColor: "#fff" },
    { id: "clima", label: "Acción\nClimática", x: 70, y: 570, px: 250, py: 520, color: "#52b788", textColor: "#fff" },
    { id: "recursos", label: "Recursos\nNaturales", x: 210, y: 680, px: 250, py: 520, color: "#52b788", textColor: "#fff" },
  ],
  intersections: [
    { id: "vivible", label: "Vivible", x: 370, y: 290, color: "#74c69d", textColor: "#1b4332", between: ["social", "ambiental"] },
    { id: "equitativo", label: "Equitativo", x: 630, y: 290, color: "#74c69d", textColor: "#1b4332", between: ["social", "economico"] },
    { id: "viable", label: "Viable", x: 500, y: 580, color: "#74c69d", textColor: "#1b4332", between: ["ambiental", "economico"] },
  ],
};

const ods = [
  { num: 7, label: "Energía\nLimpia", color: "#f9c74f" },
  { num: 11, label: "Ciudades\nSostenibles", color: "#f8961e" },
  { num: 13, label: "Acción por\nel Clima", color: "#4cc9f0" },
  { num: 15, label: "Vida de\nEcosistemas", color: "#43aa8b" },
];

export default function MapaConceptual() {
  const [hovered, setHovered] = useState(null);

  const allNodes = [nodes.center, ...nodes.pillars, ...nodes.children, ...nodes.intersections];
  const nodeMap = Object.fromEntries(allNodes.map((n) => [n.id, n]));

  const pillarIds = nodes.pillars.map((p) => p.id);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #081c15 0%, #1b4332 50%, #081c15 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ color: "#95d5b2", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 6 }}>
          Mapa Conceptual
        </div>
        <h1 style={{
          color: "#d8f3dc",
          fontSize: "clamp(22px, 4vw, 38px)",
          fontWeight: 700,
          margin: 0,
          letterSpacing: 2,
        }}>
          Desarrollo Sostenible - Fabian Noreña
        </h1>
        <div style={{ width: 60, height: 2, background: "#52b788", margin: "10px auto 0" }} />
      </div>

      {/* SVG Map */}
      <div style={{ width: "100%", maxWidth: 1000, overflowX: "auto" }}>
        <svg viewBox="0 0 1000 760" style={{ width: "100%", minWidth: 340 }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="shadow">
              <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Lines: pillars to center */}
          {nodes.pillars.map((p) => (
            <line key={p.id + "-line"} x1={nodes.center.x} y1={nodes.center.y} x2={p.x} y2={p.y}
              stroke="#52b788" strokeWidth={hovered === p.id ? 3 : 1.5} strokeDasharray="6,4" opacity={0.7} />
          ))}

          {/* Lines: children to pillars */}
          {nodes.children.map((c) => (
            <line key={c.id + "-line"} x1={c.px} y1={c.py} x2={c.x} y2={c.y}
              stroke="#74c69d" strokeWidth={1.2} strokeDasharray="4,4" opacity={0.5} />
          ))}

          {/* Lines: intersections to connected pillars */}
          {[
            { from: "vivible", to: "social" }, { from: "vivible", to: "ambiental" },
            { from: "equitativo", to: "social" }, { from: "equitativo", to: "economico" },
            { from: "viable", to: "ambiental" }, { from: "viable", to: "economico" },
          ].map(({ from, to }, i) => {
            const a = nodeMap[from], b = nodeMap[to];
            return (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="#b7e4c7" strokeWidth={1} strokeDasharray="3,5" opacity={0.35} />
            );
          })}

          {/* Children nodes */}
          {nodes.children.map((c) => (
            <g key={c.id} onMouseEnter={() => setHovered(c.id)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}>
              <ellipse cx={c.x} cy={c.y} rx={52} ry={28}
                fill={hovered === c.id ? "#40916c" : c.color}
                stroke="#b7e4c7" strokeWidth={hovered === c.id ? 2 : 1}
                filter="url(#shadow)"
                style={{ transition: "all 0.2s" }} />
              {c.label.split("\n").map((line, i) => (
                <text key={i} x={c.x} y={c.y + (c.label.includes("\n") ? -6 + i * 14 : 5)}
                  textAnchor="middle" fill={c.textColor} fontSize={10} fontWeight={600}>{line}</text>
              ))}
            </g>
          ))}

          {/* Intersection nodes */}
          {nodes.intersections.map((n) => (
            <g key={n.id} onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}>
              <ellipse cx={n.x} cy={n.y} rx={42} ry={24}
                fill={hovered === n.id ? "#52b788" : n.color}
                stroke="#fff" strokeWidth={1.5} strokeDasharray="4,2"
                filter="url(#shadow)"
                style={{ transition: "all 0.2s" }} />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fill={n.textColor} fontSize={11} fontWeight={700}>{n.label}</text>
            </g>
          ))}

          {/* Pillar nodes */}
          {nodes.pillars.map((p) => (
            <g key={p.id} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}>
              <circle cx={p.x} cy={p.y} r={hovered === p.id ? p.r + 4 : p.r}
                fill={p.color} stroke="#95d5b2" strokeWidth={2}
                filter={hovered === p.id ? "url(#glow)" : "url(#shadow)"}
                style={{ transition: "all 0.25s" }} />
              {p.label.split("\n").map((line, i) => (
                <text key={i} x={p.x} y={p.y + (p.label.includes("\n") ? -8 + i * 18 : 5)}
                  textAnchor="middle" fill={p.textColor} fontSize={12} fontWeight={700}>{line}</text>
              ))}
            </g>
          ))}

          {/* Center node */}
          <g onMouseEnter={() => setHovered("center")} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
            <circle cx={nodes.center.x} cy={nodes.center.y} r={hovered === "center" ? 76 : nodes.center.r}
              fill={nodes.center.color} stroke="#95d5b2" strokeWidth={3}
              filter="url(#glow)"
              style={{ transition: "all 0.25s" }} />
            {nodes.center.label.split("\n").map((line, i) => (
              <text key={i} x={nodes.center.x} y={nodes.center.y + (i === 0 ? -10 : 14)}
                textAnchor="middle" fill={nodes.center.textColor} fontSize={15} fontWeight={800}>{line}</text>
            ))}
          </g>

          {/* ODS badges */}
          {ods.map((o, i) => {
            const bx = 36 + i * 70, by = 730;
            return (
              <g key={o.num}>
                <rect x={bx - 26} y={by - 18} width={52} height={36} rx={8}
                  fill={o.color} opacity={0.9} />
                <text x={bx} y={by - 3} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800}>ODS {o.num}</text>
                {o.label.split("\n").map((l, li) => (
                  <text key={li} x={bx} y={by + 10 + li * 10} textAnchor="middle" fill="#fff" fontSize={7}>{l}</text>
                ))}
              </g>
            );
          })}
          <text x={20} y={726} fill="#74c69d" fontSize={9} fontStyle="italic">ODS relacionados:</text>
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center",
        marginTop: 16, padding: "12px 24px",
        background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid #2d6a4f"
      }}>
        {[
          { color: "#2d6a4f", label: "Concepto Central" },
          { color: "#1b4332", label: "Dimensiones" },
          { color: "#52b788", label: "Subdimensiones" },
          { color: "#74c69d", label: "Intersecciones" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: color, border: "1px solid #95d5b2" }} />
            <span style={{ color: "#95d5b2", fontSize: 12 }}>{label}</span>
          </div>
        ))}
      </div>

      <p style={{ color: "#52b788", fontSize: 11, marginTop: 14, opacity: 0.7, letterSpacing: 1 }}>
        Pasa el cursor sobre los nodos para interactuar
      </p>
    </div>
  );
}