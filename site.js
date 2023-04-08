var site_trans_cec = {
  urlbase: [],

  head_stylesheets_scripts: function () {
    document.write([
      '<link rel="stylesheet" href="'+site_trans_cec.urlbase+'bootstrap-3.4.1-dist/css/bootstrap.min.css" />',
      '<link rel="stylesheet" href="'+site_trans_cec.urlbase+'custom.css" />',
      '<script src="'+site_trans_cec.urlbase+'texlive.js/promisejs/promise.js"></script>',
      '<script src="'+site_trans_cec.urlbase+'texlive.js/pdftex.js"></script>',
    ].join('\n'));
  },

  nav: function() {
    document.write([
      '<nav class="navbar navbar-inverse">',
      '  <div class="container-fluid">',
      '    <div class="navbar-header">',
      '      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">',
      '        <span class="icon-bar"></span>',
      '        <span class="icon-bar"></span>',
      '      </button>',
      '      <a class="navbar-brand" href="'+site_trans_cec.urlbase+'#">Trans Administratif</a>',
      '    </div>',
      '    <div class="collapse navbar-collapse" id="myNavbar">',
      '      <ul class="nav navbar-nav">',
      '        ',
      '        <li><a href="'+site_trans_cec.urlbase+'procuration/">Courriers par procuration</a></li>',
      '        ',
      '        <li><a href="'+site_trans_cec.urlbase+'procuration_relance/">Courriers de relance par procuration</a></li>',
      '        ',
      '        <li><a href="'+site_trans_cec.urlbase+'standalone/">Courriers sans procuration</a></li>',
      '        ',
      '        <li><a href="'+site_trans_cec.urlbase+'attestation/chgmtprenom/">Changement de prénom</a></li>',
      '      </ul>',
      '      <ul id="memory" class="nav navbar-nav">',
      '        <li><span title="Activer l\'enregistrement des données" class="icon" id="save">🐾︎</span></li>',
      '        <li><span title="Effacer toutes les données" class="icon" id="forget">🌊︎</span></li>',
      '      </ul>',
      '    </div>',
      '  </div>',
      '  </nav>',
    ].join('\n'));
  },

  footer: function() {
    document.write([
      '  <footer class="text-center">',
      '<p>En cas d\'erreur contacter:',
      '    <a href="mailto: freyja_wildes+trans-cec@pm.me">Freyja Wildes</a> ou <a href="mailto: trans-cec@suzanne.soy">Suzanne Soy Dupéron</a>.',
      '</p>',
      '<p>Adresse du répositoire <a href="http://gitlab.s1.0x39b.fr/freyja/trans-cec.git">ici</a>.</p>',
      '</footer>',
    ].join('\n'));
  },

  allFields: [],
  field: function(info) {
    var str = '';
    str += '<div class="form-group">';
    str += '  <label class="col-sm-4 control-label" for="'+info.id+'">' + info.label + '</label>';
    str += '  <div class="col-sm-8">';
    if (typeof(info.placeholder) != 'undefined') {
      ph = ' placeholder="' + info.placeholder + '"';
    } else {
      ph = '';
    }
    if (info.type == 'text') {
      str += '    <input class="form-control" type="text" id="' + info.id + '" ' + ph + '/>';
    } else if (info.type == 'date') {
      str += '    <input class="form-control" type="date" id="' + info.id + '" ' + ph + '//>';
    } else if (info.type == 'select') {
      str += '    <select class="form-control" id="' + info.id + '">';
      for (var i = 0; i < info.choices.length; i++) {
        str += '      <option value="' + info.choices[i][0] + '">' + info.choices[i][1] + '</option>';
      }
      str += '    </select>';
    } else if (info.type == 'checkbox') {
      str += '    <select class="form-control" id="' + info.id + '">';
      str += '      <option value="0">oui</option>';
      str += '      <option value="1">non</option>';
      str += '    </select>';
      /* str += '    <input class="form-control" type="checkbox" id="' + info.id + '" />'; */
    }
    str += '  </div>';
    str += '</div>';
    document.write(str);
    site_trans_cec.allFields[site_trans_cec.allFields.length] = info.id;
  },
  
  genpdf: function() {
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

    fetch("attestation_chgmtprenom.tex").then(res => res.text()).then(function(source_code) {
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
  
  site_loaded: function() {
    document.getElementById("genpdf-button").addEventListener("click", function(e) {
      e.preventDefault();
      site_trans_cec.genpdf();
    });
  }
}