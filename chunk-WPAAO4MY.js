import{S as i}from"./chunk-3V7XFFK5.js";var n=class e{printElement(r,o="Documento Oficial"){let t=window.open("","_blank","width=900,height=900");if(!t){alert("Por favor, permite las ventanas emergentes en tu navegador para poder imprimir.");return}let a=Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(l=>l.outerHTML).join(`
`);t.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>${o}</title>
        ${a}
        <style>
          @page {
            size: A4;
            margin: 12mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
          }
          .official-print-document {
            display: block !important;
          }
        </style>
      </head>
      <body>
        <div class="print-wrapper">
          ${r.outerHTML}
        </div>
      </body>
      </html>
    `),t.document.close(),t.focus(),t.onload=()=>{setTimeout(()=>{t.print(),t.close()},250)}}static \u0275fac=function(o){return new(o||e)};static \u0275prov=i({token:e,factory:e.\u0275fac,providedIn:"root"})};export{n as a};
