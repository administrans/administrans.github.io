var site_trans_cec = (function() {
  var appendChildrenList = function(e, children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        appendChildrenList(e, children[i]);
      } else if (children[i] instanceof Function) {
        children[i](e)
      } else if (typeof children[i] === 'string' || children[i] instanceof String) {
        e.appendChild(document.createTextNode(children[i]));
      } else {
        e.appendChild(children[i]);
      }
    }
  };

  var appendChildren = (e, child_or_children) => appendChildrenList(e, [child_or_children]);

  var $e = function(tag, attrs) { // tag, attrs, children...
    var e = document.createElement(tag);
    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        if (typeof(attrs[attr]) != 'undefined') {
          e.setAttribute(attr, attrs[attr])
        }
      } else {
        if (console) {
          console.log('warning: skipping !hasOwnProperty(' + attr + ') in ' + tag + '.');
        }
      }
    }

    appendChildren(e, Array.prototype.slice.call(arguments, 2));
    return e;
  };

  var groupByN = function(l, n) {
    var result = [];
    for (var i = 0; i < l.length; i++) {
      if (!result[Math.floor(i/n)]) {
        result[Math.floor(i/n)] = [];
      }
      result[Math.floor(i/n)][i%n] = l[i];
    }
    return result;
  }

  return {
    urlbase: [],

    appendChildren: appendChildren,

    body : (category, id) =>
      site_trans_cec.form_to_body(site_trans_cec.forms[category][id]),

    body_category: (category) =>
      [ site_trans_cec.nav(),
        $e('main', {class:"container"},
          $e('h1', {}, site_trans_cec.forms[category].category_title),
          groupByN(site_trans_cec.forms[category].forms, 3).map((line) =>
            $e('div', {class: "row row-margin-custom"},
              line.map((form_id) =>
                $e('div', {class: "col-sm-4"},
                  $e('article', {},
                    $e('header', {}, $e('a', {href: form_id + "/"}, site_trans_cec.forms[category][form_id].linktext)),
                    $e('p', {}, site_trans_cec.forms[category][form_id].description))))))),
        site_trans_cec.footer()],

    form_to_body: (form) =>
      [ site_trans_cec.nav(),
        $e('main', {class:"container"},
          $e('div', {class:"container form-container"},
            $e('h1', {},
              form.pagetitle,
              $e('br', {}),
              $e('small', {}, form.pagesubtitle || '')), // TODO: have a pagesubtitle for every page
            site_trans_cec.form_to_html(form))),
        site_trans_cec.footer()],

    head_stylesheets_scripts: function () {
      document.write(
        $e('head', {},
          $e('meta', {name:"viewport", content:"width=device-width, initial-scale=1"}),
          $e('title', {}, "Administrans"),
          $e('link', {rel: "stylesheet", href: site_trans_cec.urlbase+'bootstrap-4.3.1-dist/css/bootstrap.min.css'}),
          $e('link', {rel: "stylesheet", href: site_trans_cec.urlbase+'custom.css'}),
          //$e('script', {src: site_trans_cec.urlbase+'bootstrap-4.3.1-dist/js/bootstrap.min.js'}),
          $e('script', {src: site_trans_cec.urlbase+'texlive.js/promisejs/promise.js'}),
          $e('script', {src: site_trans_cec.urlbase+'texlive.js/pdftex.js'}),
          $e('script', {src: site_trans_cec.urlbase+'memory.js'}),
          $e('script', {src: site_trans_cec.urlbase+'forms.js'}),
        ).innerHTML
      );
    },

    nav: () =>
      $e('nav', {class: "navbar navbar-expand-lg navbar-dark bg-dark"},
        $e('a', {class:"navbar-brand", href:site_trans_cec.urlbase+"#"}, "Administrans"),
          $e('button', {class:"navbar-toggler", type:"button", 'data-toggle':"collapse", 'data-target':"#myNavbar", 'aria-controls':"myNavbar", 'aria-expanded':"false", 'aria-label':"Toggle navigation"},
            $e('span', {class:"navbar-toggler-icon"})),
          $e('div', {class:"collapse navbar-collapse", id:"myNavbar"},
            $e('ul', {class:"nav navbar-nav"},
              $e('li', {class:"nav-item"}, $e('a', {href:site_trans_cec.urlbase+"procuration/"}, "Courriers par procuration")),
              $e('li', {class:"nav-item"}, $e('a', {href:site_trans_cec.urlbase+"procuration_relance/"}, "Courriers de relance par procuration")),
              $e('li', {class:"nav-item"}, $e('a', {href:site_trans_cec.urlbase+"standalone/"}, "Courriers sans procuration")),
              $e('li', {class:"nav-item"}, $e('a', {href:site_trans_cec.urlbase+"attestation/chgmtprenom/"}, "Changement de prénom"))),
            $e('ul', {id:"memory", class:"nav navbar-nav", style:"display:none"},
              $e('li', {}, $e('span', {title:"Activer l'enregistrement des données", class:"icon", id:"save"}, "🐾︎")),
              $e('li', {}, $e('span', {title:"Effacer toutes les données", class:"icon", id:"forget"}, "🌊︎"))))),

    footer: () =>
      $e('footer', {class:"text-center"},
        $e('p', {},
          "En cas de problèmes, merci de préférer ",
          $e('a', {href:"https://github.com/entropyqueen/trans-cec/issues/new"}, "remplir une issue sur github"),
          $e('br', {}),
          "Ou bien contacter : ",
          $e('a', {href:"mailto: emy.canton@proton.me"}, "Emy Canton"),
          " ou ",
          $e('a', {href:"mailto: trans-cec@suzanne.soy"}, "Suzanne Soy Dupéron")),
        $e('p', {}, "Code source sur : ", $e('a', {href:"https://github.com/trans-cec/trans-cec.github.io"}, "github"), ".")),


    allFields: [],

    field: function(info) {
      site_trans_cec.allFields[site_trans_cec.allFields.length] = info.id;

      if (info.type == 'text') {
        // note: info.placeholder can be undefined, $e will then omit the attribute
        var input =
          $e('input', {class:"form-control", type:"text", id:info.id, placeholder: info.placeholder})
      } else if (info.type == 'date') {
        // note: info.placeholder can be undefined, $e will then omit the attribute
        var input =
          $e('input', {class:"date-widget form-control", type:"date", id:info.id, placeholder: info.placeholder})
      } else if (info.type == 'select') {
        var input =
          $e('select', {class:"form-control", id:info.id},
            info.choices.map(choice => $e('option', {value:choice[0]}, choice[1])));
      } else if (info.type == 'checkbox') {
        // $e('input', {class:"form-control", type:"checkbox", id:info.id}) looks a bit weird and confusing (checkbox is centered, can't be bothered to fix the CSS)
        var input =
          $e('select', {class: "form-control", id:info.id},
            $e('option', {value:"0"}, "oui"),
            $e('option', {value:"1"}, "non"))
      }

      var elt =
        $e('div', {class:"form-group"},
          $e('label', {class:"col-sm-4 control-label", for:info.id}, info.label),
          $e('div', {class:"col-sm-8"},
            input));
      
      return elt;
    },

    dataurl_to_blob: function(dataurl, mime, form) {
      var byteString = atob(dataurl.split(',')[1]);
      var buf = new ArrayBuffer(byteString.length);
      var buf_view = new Uint8Array(buf);
      for (var i = 0; i < byteString.length; i++) {
        buf_view[i] = byteString.charCodeAt(i);
      }
      // mime could be extracted from data url
      var mime = mime || dataurl.split(',')[0].split(':')[1].split(';')[0];
      //try {
        return new File([ buf ], site_trans_cec.get_pdf_filename(form), { type: mime });
      //} catch (e) {
        // IE doesn't support File constructor, we loose the filename with Blob when opening the PDF (not when saving), no big deal.
        //return new Blob([ buf ], { type: mime });
      //}
    },

    open_pdf: function(form) {
      var blob = site_trans_cec.dataurl_to_blob(site_trans_cec.pdf_dataurl, "application/pdf", form);
      window.open(window.URL.createObjectURL(blob));
      /*
      var iframe = '<body style="padding: 0; margin: 0; overflow: hidden;"><iframe width="100%" height="100%" src="' + site_trans_cec.pdf_dataurl + '"></iframe></body>'
      var x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.close();
      */
    },

    // TODO: name of file should include more details maybe? Especially for "attestation", since the user is likely to make several
    get_pdf_filename: (form) => 'Adminitrans ' + form.linktext + '.pdf',

    save_pdf: function(form) {
      var blob = site_trans_cec.dataurl_to_blob(site_trans_cec.pdf_dataurl, "application/pdf", form);
      var a = $e('a', {href: window.URL.createObjectURL(blob), download: site_trans_cec.get_pdf_filename(form)});
      a.click();
    },

    genpdf: function(form) {
      document.getElementById("gen-pdf-button").innerHTML = 'Génération… 0%';
      document.getElementById('open-pdf-button').style.display = 'none';
      document.getElementById('save-pdf-button').style.display = 'none';
      document.getElementById('gen-pdf-button').setAttribute('type', 'submit');

      var log_lines_counter = 0;
      var expected_log_lines = 150; // TODO: have this memorized for each form.
      var logfn = function(s) {
        try {
          log_lines_counter++;
          if (log_lines_counter > expected_log_lines) {
            var progress = 'Génération… (' + log_lines_counter + '/' + expected_log_lines + ')';
          } else {
            var progress = 'Génération… ' + Math.floor(log_lines_counter/expected_log_lines*100) + '%';
          }
          document.getElementById("gen-pdf-button").innerHTML = progress;
          if (console && s !== '') { console.log(s); }
        } catch(e) {
          if (console) { console.log(e); }
        }
      };
      
      var utf8Encode = function(str) {
        try {
          return new TextEncoder().encode(str, 'utf-8').reduce((prev, curr) => prev + String.fromCharCode(curr), '');
        } catch (e) { // no TextEncoder available?
          return unescape(encodeURIComponent(str)); // monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
        }
      };

      fetch(site_trans_cec.urlbase + '/templates-latex/'+form.category+'_'+form.id+'.tex')
      .then(res => res.text())
      .then(function(source_code) {
        source_code = source_code.replaceAll(
          RegExp("{{- cleaned_data\\[\"(" + site_trans_cec.allFields.join("|") + ")\"\\] -}}", "g"),
          function($field$) {
            //var fieldName = $field$.substring(1, $field$.length-1)
            var fieldName = $field$.match(/{{- cleaned_data\["([-a-zA-Z0-9]*)"\] -}}/)[1];
            return document.getElementById(fieldName).value;
          }
        );
        console.log(source_code);
        var texlive = new TeXLive(site_trans_cec.urlbase+"texlive.js/");
        texlive.pdftex.set_TOTAL_MEMORY(80*1024*1024).then(function() {
          texlive.pdftex.on_stdout = logfn;
          texlive.pdftex.on_stderr = logfn;
          texlive.pdftex.compile(utf8Encode(source_code)).then(function(pdf_dataurl) {
            console.log(pdf_dataurl);
            document.getElementById("gen-pdf-button").innerHTML = "Générer";
            if (pdf_dataurl === false) {
              console.log("compilation error");
            } else {
              document.getElementById('open-pdf-button').style.removeProperty('display');
              document.getElementById('save-pdf-button').style.removeProperty('display');
              document.getElementById('gen-pdf-button').removeAttribute('type');
              document.getElementById('open-pdf-button').setAttribute('type', 'submit');
              document.getElementById('gen-pdf-button').classList.remove('btn-primary');
              document.getElementById('gen-pdf-button').classList.add('btn-secondary');              
              site_trans_cec.pdf_dataurl = pdf_dataurl;
              site_trans_cec.open_pdf(form);
            }
          });
        });
      });
    },

    fieldset_to_html: fieldset =>
      $e('fieldset', {},
        $e('legend', {}, fieldset.legend),
        fieldset.fields.map(site_trans_cec.field)),

    form_to_html: form =>
      $e('form', {class:"memory form-horizontal"},
        form.fieldsets.map(site_trans_cec.fieldset_to_html),
        $e('div', {class:"form-actions"},
          $e('div', {class:"memoryControls"},
            $e('button', {type:"button", class:"btn btn-secondary", name:"save", title:"En activant cette option, les données entrées sur ce site seront partagées entre les formulaires. Cela ne marche que pour un même navigateur sur une même machine. N'activez cette option que si vous êtes sur une machine en votre contrôle"},
              $e('span', {class:"toggleable enable"}, $e('i', {class:"icon pawprint"}), "Activer l'enregistrement des données"),
              $e('span', {class:"toggleable disable"}, $e('i', {class:"icon pawprint"}), "Désactiver l'enregistrement des données")),
            " ",
            $e('button', {type:"button", class:"btn btn-secondary", name:"forget", title:"Toutes les données sauvegardées par ce site dans le cache de votre navigateur seront effacées et les formulaires seront à nouveau vides quand vous les afficherez"},
              $e('i', {class:"icon wave"}), "Effacer toutes les données")),
          $e('button', {id:"gen-pdf-button", class:"btn btn-primary", type:"submit"}, "Générer",
            // TODO: LISTEN TO OTHER EVENTS
            btn => btn.addEventListener("click", function(e) {
              e.preventDefault();
              site_trans_cec.genpdf(form);
            })),
          " ",
          $e('button', {id:"open-pdf-button", class:"btn btn-primary", style:"display:none"}, "Ouvrir",
            // TODO: LISTEN TO OTHER EVENTS
            btn => btn.addEventListener("click", function(e) {
              e.preventDefault();
              site_trans_cec.open_pdf(form);
            })),
            " ",
            $e('button', {id:"save-pdf-button", class:"btn btn-secondary", style:"display:none"}, "Enregistrer",
              // TODO: LISTEN TO OTHER EVENTS
              btn => btn.addEventListener("click", function(e) {
                e.preventDefault();
                site_trans_cec.save_pdf(form);
              }))
            )),

    gen_file_lines: (category, id) =>
      [
        '<!doctype html>',
        '<html>',
        '  <head>',
        '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
        '    <script src="../../site.js"></script>',
        '    <script>',
        "      site_trans_cec.urlbase = '../../';",
        '      site_trans_cec.head_stylesheets_scripts();',
        '    </script>',
        '  </head>',
        '  <body>',
        // category and id are supplied by the system, no need to escape them.
        "    <script>site_trans_cec.appendChildren(document.body, site_trans_cec.body('"+category+"', '"+id+"'));</script>",
        '  </body>',
        '</html>',
      ],

    gen_file_bash: (category, id) =>
      ("mkdir -p '" + category + "/" + id + "'\n") +
      (": > '" + category + "/" + id + "/index.html'\n") +
      site_trans_cec.gen_file_lines(category, id)
      .map(line => line.replaceAll("'", "'\\''"))
      .map(line => "printf %s\\\\n '" + line + "' >> '" + category + "/" + id + "/index.html'")
      .join('\n'),

    gen_category_file_lines: (category) =>
      [
        '<!doctype html>',
        '<html>',
        '  <head>',
        '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
        '    <script src="../site.js"></script>',
        "    <script>site_trans_cec.urlbase = '../';</script>",
        '    <script>site_trans_cec.head_stylesheets_scripts();</script>',
        '  </head>',
        '  <body>',
        // category is supplied by the system, no need to escape it.
        "    <script>site_trans_cec.appendChildren(document.body, site_trans_cec.body_category('"+category+"'));</script>",
        '  </body>',
        '</html>',
      ],

    gen_category_file_bash: (category) =>
      ("mkdir -p '" + category + "'\n") +
      (": > '" + category + "/index.html'\n") +
      site_trans_cec.gen_category_file_lines(category)
      .map(line => line.replaceAll("'", "'\\''"))
      .map(line => "printf %s\\\\n '" + line + "' >> '" + category + "/index.html'")
      .join('\n'),

    gen_site: () =>
      Object.keys(site_trans_cec.forms).map(category =>
        (site_trans_cec.gen_category_file_bash(category) + "\n") +
        site_trans_cec.forms[category].forms.map(form_id =>
          site_trans_cec.gen_file_bash(category, form_id)
        ).join('\n')
      ).join('\n'),
  };
})();
