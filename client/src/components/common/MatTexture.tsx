const MatTexture = ({ isDark }: { isDark: boolean }) => (
  <div
    className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    style={{
      backgroundImage: isDark
        ? `
        linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px),
        linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px),
        linear-gradient(
          45deg,
          transparent 0,
          transparent calc(50% - 0.5px),
          rgb(255 255 255 / 0.08) calc(50% - 0.5px),
          rgb(255 255 255 / 0.08) calc(50% + 0.5px),
          transparent calc(50% + 0.5px),
          transparent 100%
        ),
        linear-gradient(
          -45deg,
          transparent 0,
          transparent calc(50% - 0.5px),
          rgb(255 255 255 / 0.08) calc(50% - 0.5px),
          rgb(255 255 255 / 0.08) calc(50% + 0.5px),
          transparent calc(50% + 0.5px),
          transparent 100%
        )
      `
        : `
        linear-gradient(to right, rgb(0 0 0 / 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(0 0 0 / 0.06) 1px, transparent 1px),
        linear-gradient(to right, rgb(0 0 0 / 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(0 0 0 / 0.1) 1px, transparent 1px),
        linear-gradient(
          45deg,
          transparent 0,
          transparent calc(50% - 0.5px),
          rgb(0 0 0 / 0.08) calc(50% - 0.5px),
          rgb(0 0 0 / 0.08) calc(50% + 0.5px),
          transparent calc(50% + 0.5px),
          transparent 100%
        ),
        linear-gradient(
          -45deg,
          transparent 0,
          transparent calc(50% - 0.5px),
          rgb(0 0 0 / 0.08) calc(50% - 0.5px),
          rgb(0 0 0 / 0.08) calc(50% + 0.5px),
          transparent calc(50% + 0.5px),
          transparent 100%
        )
      `,
      backgroundSize:
        "16px 16px, 16px 16px, 80px 80px, 80px 80px, 80px 80px, 80px 80px",
      backgroundPosition: "0 0, 0 0, 0 0, 0 0, 0 0, 0 0",
    }}
  />
);

export default MatTexture;
