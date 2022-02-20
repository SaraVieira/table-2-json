function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return { tableEl: template.content.firstChild, parent: template };
}

export function parseHTMLTableElem(text) {
  const { parent, tableEl } = htmlToElement(text);
  const columns = Array.from(tableEl.querySelectorAll("th")).map(
    (it) => it.textContent
  );
  const rows = tableEl.querySelectorAll("tbody > tr");
  const allStuff = Array.from(rows).map((row) => {
    const cells = Array.from(row.querySelectorAll("td"));
    return columns.reduce((obj, col, idx) => {
      if (cells[idx]) {
        obj[col.trim()] = (cells[idx] || {}).textContent.trim() || "";
      }

      return obj;
    }, {});
  });
  parent.remove();
  return allStuff;
}
