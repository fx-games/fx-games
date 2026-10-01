// F1 help overlay for the play pages. Keys come from data-keys on this script tag:
// "Key — action" entries separated by "|". F1 (or the ? button) toggles, Esc closes.
// Listens in the capture phase and stops the event, so the game never sees F1/Esc while it is open.
(() => {
  const rows = document.currentScript.dataset.keys.split("|").map(r => r.split(" — "));
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:#000c;z-index:30;font:14px monospace;color:#ccc";
  box.innerHTML = '<div style="background:#111;border:1px solid #ffb000;padding:16px 24px;max-width:90vw;max-height:85vh;overflow:auto">'
    + '<div style="color:#ffb000;margin-bottom:10px">CONTROLS <span style="color:#666">· F1 / Esc to close</span></div><table></table></div>';
  const table = box.querySelector("table");
  for (const [k, a] of rows) {
    const tr = table.insertRow();
    tr.insertCell().textContent = k;
    tr.insertCell().textContent = a ?? "";
    tr.cells[0].style.cssText = "color:#fff;padding:2px 16px 2px 0;white-space:nowrap;vertical-align:top";
  }
  const btn = document.createElement("a");
  btn.textContent = "F1 · keys";
  btn.href = "#";
  btn.style.cssText = "position:fixed;top:8px;right:12px;color:#888;text-decoration:none;z-index:10;font:14px monospace";
  const toggle = show => { box.style.display = show ? "flex" : "none"; };
  btn.onclick = e => { e.preventDefault(); toggle(box.style.display === "none"); };
  box.onclick = e => { if (e.target === box) toggle(false); };
  addEventListener("keydown", e => {
    const open = box.style.display !== "none";
    if (e.key === "F1" || (open && e.key === "Escape")) {
      e.preventDefault(); e.stopImmediatePropagation();
      toggle(e.key === "F1" && !open);
    }
  }, true);
  addEventListener("keyup", e => { if (e.key === "F1") { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  document.body.append(box, btn);
})();
