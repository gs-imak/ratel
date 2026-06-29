export default function Home() {
  return (
    <main className="stage">
      <div className="wrap">
        <span className="eyebrow">Launching soon</span>
        <h1 className="wordmark wordmark-sheen">RATEL</h1>
        <div className="rule" />
        <p className="tagline">
          Something fierce is on its way. The full experience arrives shortly.
        </p>
      </div>
      <footer className="foot">© {new Date().getFullYear()} Ratel</footer>
    </main>
  );
}
