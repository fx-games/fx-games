// Loading bar for the WASM play pages: progressFetch(url) streams the .wasm and counts bytes.
// nginx sends it gzipped, so Content-Length is the compressed size; the real size comes from
// data-size on this script tag (publish_web.sh stamps it).
(() => {
  const total = +document.currentScript.dataset.size || 0;
  const mb = n => (n / 1048576).toFixed(1);
  window.progressFetch = async url => {
    const box = document.createElement("div");
    box.style.cssText = "position:fixed;left:50%;top:58%;transform:translateX(-50%);width:min(320px,80vw);z-index:20;font:12px monospace;color:#aaa;text-align:center";
    box.innerHTML = '<div style="height:6px;background:#333"><div style="height:100%;width:0;background:#ffb000"></div></div><span></span>';
    document.body.append(box);
    const [fill, label] = [box.firstChild.firstChild, box.lastChild];
    const res = await fetch(url);
    let got = 0;
    const count = new TransformStream({
      transform(chunk, c) {
        got += chunk.length;
        fill.style.width = total ? Math.min(100, got / total * 100) + "%" : "100%";
        label.textContent = total ? `${mb(got)} / ${mb(total)} MB` : `${mb(got)} MB`;
        c.enqueue(chunk);
      },
      flush() { box.remove(); },
    });
    return new Response(res.body.pipeThrough(count), { headers: { "Content-Type": "application/wasm" } });
  };
})();
