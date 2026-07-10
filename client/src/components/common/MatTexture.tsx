/* 40px grid, 1px lines at 40% — line color themes via --mat-line */
const MatTexture = () => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgb(var(--mat-line)) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(var(--mat-line)) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
      backgroundPosition: "center",
    }}
  />
);

export default MatTexture;
