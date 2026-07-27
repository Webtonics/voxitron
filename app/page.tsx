export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "var(--space-3)",
          }}
        >
          Phase 0: Scaffold
        </p>
        <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 600 }}>
          Voxitron Next.js app
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "var(--space-3)" }}>
          Design tokens and fonts are wired up. Homepage content lands in Phase 1.
        </p>
      </div>
    </main>
  );
}
