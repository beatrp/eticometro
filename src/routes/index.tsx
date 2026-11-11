import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

const SCRIPTS = ["data", "glossary", "state", "appearance", "ui", "screens", "report"];
// Bump when public/legacy changes so browsers and the CDN don't serve stale scripts.
const VERSION = "3";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eticômetro — reflexão ética para TI" },
      { name: "description", content: "Atividade didática com 6 dilemas reais da profissão de TI e um relatório da sua participação." },
      { property: "og:title", content: "Eticômetro — reflexão ética para TI" },
      { property: "og:description", content: "Dilemas reais da profissão de TI. O XP conta a participação, não o veredito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Legacy = { S?: unknown; fresh: () => void; render: () => void; gl: () => void; tp: () => void; reset: () => void; started: () => boolean };
const W = () => window as unknown as Legacy & { __eticLoaded?: Promise<void> | undefined };

function loadScript(name: string) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = `/legacy/${name}.js?v=${VERSION}`;
    el.async = false;
    el.dataset["etic"] = name;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Falha ao carregar ${name}.js`));
    document.body.appendChild(el);
  });
}

// The original app is plain JS using globals and inline handlers; load its scripts in order, once.
function loadLegacy() {
  const w = W();
  if (!w.__eticLoaded) {
    w.__eticLoaded = (async () => {
      for (const n of SCRIPTS) await loadScript(n);
    })().catch((e) => {
      w.__eticLoaded = undefined;
      document.querySelectorAll("script[data-etic]").forEach((s) => s.remove());
      throw e;
    });
  }
  return w.__eticLoaded;
}

function Index() {
  const [error, setError] = useState(false);

  const start = useCallback(() => {
    setError(false);
    loadLegacy()
      .then(() => {
        const w = W();
        if (!w.S) w.fresh();
        // Always render into the freshly mounted #app (the element changes on remount).
        w.render();
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  useEffect(() => {
    start();
    const warn = (e: BeforeUnloadEvent) => {
      const w = W();
      if (w.S && w.started?.()) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [start]);

  return (
    <main>
      <div className="hud" id="hud" hidden>
        <div>
          <span id="lvl"></span>
          <span style={{ display: "flex", gap: 6 }}>
            <button type="button" className="hud-btn" onClick={() => W().gl()}>📖 Glossário</button>
            <button type="button" className="hud-btn" onClick={() => W().reset()}>↺ Recomeçar</button>
          </span>
          <b id="xp"></b>
        </div>
        <div className="bar">
          <i id="pb" style={{ width: 0 }}></i>
        </div>
      </div>
      {error ? (
        <div className="card load-err" role="alert">
          <h2>Não foi possível carregar o Eticômetro</h2>
          <p>Verifique sua conexão e tente de novo. Nenhuma resposta foi perdida porque nada foi iniciado.</p>
          <div className="row">
            <button type="button" className="btn" onClick={start}>Tentar novamente</button>
          </div>
        </div>
      ) : null}
      <div id="app" hidden={error}></div>
      <div id="live" className="sr-only" role="status" aria-live="polite"></div>
      <button id="fab" type="button" aria-label="Aparência e leitura" aria-expanded="false" aria-controls="panel" onClick={() => W().tp()}>
        Aa
      </button>
      <div id="panel" hidden role="dialog" aria-labelledby="panel-t"></div>
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
