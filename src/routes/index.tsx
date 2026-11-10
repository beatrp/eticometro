import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const SCRIPTS = ["data", "glossary", "state", "appearance", "ui", "screens", "report", "main"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eticômetro — reflexão ética para TI" },
      { name: "description", content: "Complete 6 fases com dilemas reais da profissão de TI e receba um relatório do seu raciocínio ético." },
      { property: "og:title", content: "Eticômetro — reflexão ética para TI" },
      { property: "og:description", content: "Dilemas reais da profissão de TI, com XP pelo raciocínio, não pelo veredito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The original app is plain JS using globals and inline onclick handlers; load its scripts in order after mount.
async function loadLegacy() {
  const w = window as unknown as { __etic?: boolean };
  if (w.__etic) return;
  w.__etic = true;
  for (const name of SCRIPTS) {
    await new Promise<void>((resolve, reject) => {
      const el = document.createElement("script");
      el.src = `/legacy/${name}.js`;
      el.async = false;
      el.onload = () => resolve();
      el.onerror = () => reject(new Error(`Failed to load ${name}.js`));
      document.body.appendChild(el);
    });
  }
}

function Index() {
  useEffect(() => {
    loadLegacy();
  }, []);
  return (
    <main>
      <div className="hud" id="hud" hidden>
        <div>
          <span id="lvl"></span>
          <button
            onClick={() => (window as unknown as { gl: () => void }).gl()}
            style={{ background: "none", border: "1px solid var(--line)", padding: "2px 10px", fontSize: ".8rem" }}
          >
            📖 Glossário
          </button>
          <b id="xp"></b>
        </div>
        <div className="bar">
          <i id="pb" style={{ width: 0 }}></i>
        </div>
      </div>
      <div id="app"></div>
      <button
        id="fab"
        aria-label="Aparência e leitura"
        aria-expanded="false"
        onClick={() => (window as unknown as { tp: () => void }).tp()}
      >
        Aa
      </button>
      <div id="panel" hidden role="dialog" aria-label="Aparência e leitura"></div>
      <footer className="site-footer" style={{ textAlign: "center", padding: "1rem 0 1.5rem", fontSize: ".9rem", color: "var(--mut)" }}>
        <p>
          Trabalho acadêmico — projeto desenvolvido por{" "}
          <a href="https://github.com/beatrp" target="_blank" rel="noopener">beatrp</a>,{" "}
          <a href="https://github.com/mavelynleme" target="_blank" rel="noopener">mavelynleme</a> e{" "}
          <a href="https://github.com/marcellegg" target="_blank" rel="noopener">marcellegg</a>
        </p>
      </footer>
    </main>
  );
}
