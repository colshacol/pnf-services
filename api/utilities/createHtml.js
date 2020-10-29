import { html } from "common-tags"

const styles = html`
  <style>
    * {
      font-family: "Manrope", system-ui;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      border: none;
      outline: none;
    }

    .gridjs-th {
      letter-spacing: 1px;
      font-size: 14px;
      font-size: 13px;
      font-weight: 800;
    }

    .gridjs-td {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.5px;
    }

    body {
      padding: 24px;
    }
  </style>
`

export const createHtml = (columns, data, serviceName) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/gridjs/dist/gridjs.development.js"></script>
        ${styles}
      </head>
      <body>
        <h2>${serviceName}</h2>
        <div id="wrapper"></div>
        <script type="text/javascript" defer>
          window.addEventListener("DOMContentLoaded", () => {
            console.log("DOMContentLoaded", window.gridjs)
            const grid = new window.gridjs.Grid({
              search: true,
              fixedHeader: true,
              autoWidth: true,
              height: window.innerHeight - 150,
              columns: ${JSON.stringify(columns)},
              data: ${JSON.stringify(data)},
            }).render(document.getElementById("wrapper"))

            grid.on("rowClick", (...args) => console.log("row: " + JSON.stringify(args), args))
            grid.on("cellClick", (...args) => console.log("cell: " + JSON.stringify(args), args))
          })
        </script>
      </body>
    </html>
  `
}
