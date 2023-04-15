var site_trans_cec = (function() {
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
    var appendAllChildren = function(children) {
      for (var i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
          appendAllChildren(children[i]);
        } else if (children[i] instanceof Function) {
          children[i](e)
        } else if (typeof children[i] === 'string' || children[i] instanceof String) {
          e.appendChild(document.createTextNode(children[i]));
        } else {
          e.appendChild(children[i]);
        }
      }
    }
    appendAllChildren(Array.prototype.slice.call(arguments, 2));
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

    body : (category, id) =>
      site_trans_cec.form_to_body(site_trans_cec.forms[category][id]),

    body_category: (category) =>
      $e('div', {}, // TODO: this should be <body> but can't dynamically-generate <body> it seems ?
        site_trans_cec.nav(),
        $e('main', {class:"container"},
          $e('h1', {}, "Courriers par procuration"), // TODO
          groupByN(site_trans_cec.forms[category].forms, 3).map((line) =>
            $e('div', {class: "row row-margin-custom"},
              line.map((form_id) =>
                $e('div', {class: "col-sm-4"},
                  $e('article', {},
                    $e('header', {}, $e('a', {href: form_id + "/"}, site_trans_cec.forms[category][form_id].linktext)),
                    $e('p', {}, site_trans_cec.forms[category][form_id].description))))))),
        site_trans_cec.footer()),

    form_to_body: (form) =>
      $e('div', {}, // TODO: this should be <body> but can't dynamically-generate <body> it seems ?
        site_trans_cec.nav(),
        $e('main', {class:"container"},
          $e('div', {class:"container form-container"},
            $e('h1', {},
              form.pagetitle,
              $e('small', {}, form.pagesubtitle)),
            site_trans_cec.form_to_html(form))),
        site_trans_cec.footer()),

    head_stylesheets_scripts: function () {
      document.write(
        $e('head', {},
          $e('title', {}, "Adminitrans"),
          $e('link', {rel: "stylesheet", href: site_trans_cec.urlbase+'bootstrap-3.4.1-dist/css/bootstrap.min.css'}),
          $e('link', {rel: "stylesheet", href: site_trans_cec.urlbase+'custom.css'}),
          $e('script', {src: site_trans_cec.urlbase+'texlive.js/promisejs/promise.js'}),
          $e('script', {src: site_trans_cec.urlbase+'texlive.js/pdftex.js'}),
          $e('script', {src: site_trans_cec.urlbase+'forms.js'}),
        ).innerHTML
      );
    },

    nav: () =>
      $e('nav', {class: "navbar navbar-inverse"},
        $e('div', {class: "container-fluid"},
          $e('div', {class: "navbar-header"},
            $e('button', {type:"button", class:"navbar-toggle", 'data-toggle':"collapse", 'data-target':"#myNavBar"},
              $e('span', {class:"icon-bar"}),
              $e('span', {class:"icon-bar"})),
            $e('a', {class:"navbar-brand", href:site_trans_cec.urlbase+"#"}, "Adminitrans")),
          $e('div', {class:"collapse navbar-collapse", id:"myNavbar"},
            $e('ul', {class:"nav navbar-nav"},
              $e('li', {}, $e('a', {href:site_trans_cec.urlbase+"procuration/"}, "Courriers par procuration")),
              $e('li', {}, $e('a', {href:site_trans_cec.urlbase+"procuration_relance/"}, "Courriers de relance par procuration")),
              $e('li', {}, $e('a', {href:site_trans_cec.urlbase+"standalone/"}, "Courriers sans procuration")),
              $e('li', {}, $e('a', {href:site_trans_cec.urlbase+"attestation/chgmtprenom/"}, "Changement de prénom"))),
            $e('ul', {id:"memory", class:"nav navbar-nav"},
              $e('li', {}, $e('span', {title:"Activer l'enregistrement des données", class:"icon", id:"save"}, "🐾︎")),
              $e('li', {}, $e('span', {title:"Effacer toutes les données", class:"icon", id:"forget"}, "🌊︎")))))),

    footer: () =>
      $e('footer', {class:"text-center"},
        $e('p', {},
          "En cas d'erreur contacter: ",
          $e('a', {href:"mailto: freyja_wildes+trans-cec@pm.me"}, "Freyja Wildes"),
          " ou ",
          $e('a', {href:"mailto: trans-cec@suzanne.soy"}, "Suzanne Soy Dupéron")),
        $e('p', {}, "Adresse du répositoire ", $e('a', {href:"http://gitlab.s1.0x39b.fr/freyja/trans-cec.git"}, "ici"), ".")),


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
    
    genpdf: function(form) {
      oldGenPdfInnerHtml = document.getElementById("genpdf-button").innerHTML;
      document.getElementById("genpdf-button").innerHTML = '...';

      var logfn = function(s) {
        if (s !== '') { console.log(s); }
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
            document.getElementById("genpdf-button").innerHTML = oldGenPdfInnerHtml;
            if (pdf_dataurl === false) {
              console.log("compilation error");
            } else {
              window.open(pdf_dataurl);
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
          $e('button', {id:"genpdf-button", class:"btn btn-primary", type:"submit"}, "Générer",
            // TODO: LISTEN TO OTHER EVENMENTS
            btn => btn.addEventListener("click", function(e) {
              e.preventDefault();
              site_trans_cec.genpdf(form);
            })))),

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
        "    <script>document.body.appendChild(site_trans_cec.body('"+category+"', '"+id+"'));</script>'",
        '  </body>',
        '</html>',
      ],

    gen_file_bash: (category, id) =>
      (": > " + category + "/" + id + "/index.html\n") +
      site_trans_cec.gen_file_lines(category, id)
      .map(line => line.replaceAll("'", "'\\''"))
      .map(line => "printf %s\\\\n '" + line + "' >> " + category + "/" + id + "/index.html")
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
        "    <script>document.body.appendChild(site_trans_cec.body_category('"+category+"'));</script>",
        '  </body>',
        '</html>',
      ],

    gen_category_file_bash: (category) =>
      (": > " + category + "/index.html\n") +
      site_trans_cec.gen_category_file_lines(category)
      .map(line => line.replaceAll("'", "'\\''"))
      .map(line => "printf %s\\\\n '" + line + "' >> " + category + "/index.html")
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
