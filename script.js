(() => {
  const grid = document.getElementById("vege-grid");
  const status = document.getElementById("status");

  // サムネイルがない野菜の背景色。名前から決まるので毎回同じ色になる
  const PALETTE = ["#e8f0d8", "#f4e6cf", "#dcebd5", "#efe3d3", "#e3eccb", "#f1e8c9"];

  const isSafeUrl = (value) => {
    try {
      const url = new URL(value, location.href);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const pickColor = (text) => {
    let sum = 0;
    for (const ch of text) sum += ch.codePointAt(0);
    return PALETTE[sum % PALETTE.length];
  };

  const leafSvg = () => {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("class", "card__placeholder-icon");
    svg.setAttribute("aria-hidden", "true");
    const leaf = document.createElementNS(ns, "path");
    leaf.setAttribute("d", "M32 58 C 10 46, 8 20, 32 6 C 56 20, 54 46, 32 58 Z");
    leaf.setAttribute("fill", "currentColor");
    const vein = document.createElementNS(ns, "path");
    vein.setAttribute("d", "M32 56 V 14 M32 30 L 22 22 M32 40 L 42 32");
    vein.setAttribute("stroke", "#fffdf6");
    vein.setAttribute("stroke-width", "2.5");
    vein.setAttribute("stroke-linecap", "round");
    vein.setAttribute("fill", "none");
    svg.append(leaf, vein);
    return svg;
  };

  const buildThumb = (item) => {
    const thumb = document.createElement("div");
    thumb.className = "card__thumb";

    const showPlaceholder = () => {
      thumb.replaceChildren();
      thumb.classList.add("card__thumb--placeholder");
      thumb.style.backgroundColor = pickColor(item.name);
      const initial = document.createElement("span");
      initial.className = "card__initial";
      initial.textContent = item.name.slice(0, 1);
      initial.append(leafSvg());
      thumb.append(initial);
    };

    if (item.thumbnail && isSafeUrl(item.thumbnail)) {
      const img = document.createElement("img");
      img.src = item.thumbnail;
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("error", showPlaceholder, { once: true });
      thumb.append(img);
    } else {
      showPlaceholder();
    }
    return thumb;
  };

  const buildCard = (item, index) => {
    const li = document.createElement("li");
    li.className = "vege-grid__item";
    li.style.setProperty("--delay", `${index * 70}ms`);

    const link = document.createElement("a");
    link.className = "card";
    link.href = item.url;

    const body = document.createElement("div");
    body.className = "card__body";

    const name = document.createElement("h2");
    name.className = "card__name";
    name.textContent = item.name;
    body.append(name);

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "card__desc";
      desc.textContent = item.description;
      body.append(desc);
    }

    const cta = document.createElement("span");
    cta.className = "card__cta";
    cta.textContent = "ページを見る";
    cta.setAttribute("aria-hidden", "true");
    body.append(cta);

    link.append(buildThumb(item), body);
    li.append(link);
    return li;
  };

  const showMessage = (text, isError = false) => {
    status.textContent = text;
    status.hidden = false;
    status.classList.toggle("status--error", isError);
  };

  fetch("vegetables.json", { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error("vegetables.json の中身が配列 [ ... ] になっていません");

      const items = data.filter((item) => {
        const ok = item && typeof item.name === "string" && item.name && typeof item.url === "string" && isSafeUrl(item.url);
        if (!ok) console.warn("name か url が正しくない項目をスキップしました:", item);
        return ok;
      });

      if (items.length === 0) {
        showMessage("まだ野菜が登録されていません。");
        return;
      }

      grid.replaceChildren(...items.map(buildCard));
      status.hidden = true;
    })
    .catch((err) => {
      console.error(err);
      showMessage("野菜の一覧を読み込めませんでした。vegetables.json の書き方（カンマの抜け・余分なカンマなど）を確認してください。", true);
    });
})();
