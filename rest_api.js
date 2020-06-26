! function(a) {
  "use strict";

  function b(a, b) {
    return b = b || {}, Promise.resolve(a).then(function(a) {
      return e(a, b.filter)
    }).then(f).then(g).then(function(a) {
      return b.bgcolor && (a.style.backgroundColor = b.bgcolor), a
    }).then(function(b) {
      return h(b, a.scrollWidth, a.scrollHeight)
    })
  }

  function c(a, b) {
    return i(a, b || {}).then(function(a) {
      return a.toDataURL()
    })
  }

  function d(a, b) {
    return i(a, b || {}).then(n.canvasToBlob)
  }

  function e(b, c) {
    function d(a) {
      return a instanceof HTMLCanvasElement ? n.makeImage(a.toDataURL()) : a.cloneNode(!1)
    }

    function f(a, b, c) {
      function d(a, b, c) {
        var d = Promise.resolve();
        return b.forEach(function(b) {
          d = d.then(function() {
            return e(b, c)
          }).then(function(b) {
            b && a.appendChild(b)
          })
        }), d
      }
      var f = a.childNodes;
      return 0 === f.length ? Promise.resolve(b) : d(b, n.asArray(f), c).then(function() {
        return b
      })
    }

    function g(b, c) {
      function d() {
        function d(a, b) {
          function c(a, b) {
            n.asArray(a).forEach(function(c) {
              b.setProperty(c, a.getPropertyValue(c), a.getPropertyPriority(c))
            })
          }
          a.cssText ? b.cssText = a.cssText : c(a, b)
        }
        d(a.window.getComputedStyle(b), c.style)
      }

      function e() {
        function d(d) {
          function e(b, c, d) {
            function e(a) {
              var b = a.getPropertyValue("content");
              return a.cssText + " content: " + b + ";"
            }

            function f(a) {
              function b(b) {
                return b + ": " + a.getPropertyValue(b) + (a.getPropertyPriority(b) ? " !important" : "")
              }
              return n.asArray(a).map(b).join("; ") + ";"
            }
            var g = "." + b + ":" + c,
              h = d.cssText ? e(d) : f(d);
            return a.document.createTextNode(g + "{" + h + "}")
          }
          var f = a.window.getComputedStyle(b, d),
            g = f.getPropertyValue("content");
          if ("" !== g && "none" !== g) {
            var h = n.uid();
            c.className = c.className + " " + h;
            var i = a.document.createElement("style");
            i.appendChild(e(h, d, f)), c.appendChild(i)
          }
        } [":before", ":after"].forEach(function(a) {
          d(a)
        })
      }

      function f() {
        b instanceof HTMLTextAreaElement && (c.innerHTML = b.value)
      }

      function g() {
        c instanceof SVGElement && c.setAttribute("xmlns", "http://www.w3.org/2000/svg")
      }
      return c instanceof Element ? Promise.resolve().then(d).then(e).then(f).then(g).then(function() {
        return c
      }) : c
    }
    return c && !c(b) ? Promise.resolve() : Promise.resolve(b).then(d).then(function(a) {
      return f(b, a, c)
    }).then(function(a) {
      return g(b, a)
    })
  }

  function f(a) {
    return p.resolveAll().then(function(b) {
      var c = document.createElement("style");
      return a.appendChild(c), c.appendChild(document.createTextNode(b)), a
    })
  }

  function g(a) {
    return q.inlineAll(a).then(function() {
      return a
    })
  }

  function h(a, b, c) {
    return Promise.resolve(a).then(function(a) {
      return a.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), (new XMLSerializer).serializeToString(a)
    }).then(n.escapeXhtml).then(function(a) {
      return '<foreignObject x="0" y="0" width="100%" height="100%">' + a + "</foreignObject>"
    }).then(function(a) {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="' + b + '" height="' + c + '">' + a + "</svg>"
    }).then(function(a) {
      return "data:image/svg+xml;charset=utf-8," + a
    })
  }

  function i(a, c) {
    function d(a) {
      var b = document.createElement("canvas");
      return b.width = a.scrollWidth, b.height = a.scrollHeight, b
    }
    return b(a, c).then(n.makeImage).then(n.delay(100)).then(function(b) {
      var c = d(a);
      return c.getContext("2d").drawImage(b, 0, 0), c
    })
  }

  function j() {
    function b() {
      var a = "application/font-woff",
        b = "image/jpeg";
      return {
        woff: a,
        woff2: a,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: b,
        jpeg: b,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml"
      }
    }

    function c(a) {
      var b = /\.([^\.\/]*?)$/g.exec(a);
      return b ? b[1] : ""
    }

    function d(a) {
      var d = c(a).toLowerCase();
      return b()[d] || ""
    }

    function e(a) {
      return -1 !== a.search(/^(data:)/)
    }

    function f(a) {
      return new Promise(function(b) {
        for (var c = window.atob(a.toDataURL().split(",")[1]), d = c.length, e = new Uint8Array(d), f = 0; d > f; f++) e[f] = c.charCodeAt(f);
        b(new Blob([e], {
          type: "image/png"
        }))
      })
    }

    function g(a) {
      return a.toBlob ? new Promise(function(b) {
        a.toBlob(b)
      }) : f(a)
    }

    function h(b, c) {
      var d = a.document.implementation.createHTMLDocument(),
        e = d.createElement("base");
      d.head.appendChild(e);
      var f = d.createElement("a");
      return d.body.appendChild(f), e.href = c, f.href = b, f.href
    }

    function i() {
      var a = 0;
      return function() {
        function b() {
          return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
        }
        return "u" + b() + a++
      }
    }

    function j(a) {
      return new Promise(function(b, c) {
        var d = new Image;
        d.onload = function() {
          b(d)
        }, d.onerror = c, d.src = a
      })
    }

    function k(a) {
      var b = 3e4;
      return new Promise(function(c, d) {
        function e() {
          if (4 === g.readyState) {
            if (200 !== g.status) return void d(new Error("Cannot fetch resource " + a + ", status: " + g.status));
            var b = new FileReader;
            b.onloadend = function() {
              var a = b.result.split(/,/)[1];
              c(a)
            }, b.readAsDataURL(g.response)
          }
        }

        function f() {
          d(new Error("Timeout of " + b + "ms occured while fetching resource: " + a))
        }
        var g = new XMLHttpRequest;
        g.onreadystatechange = e, g.ontimeout = f, g.responseType = "blob", g.timeout = b, g.open("GET", a, !0), g.send()
      })
    }

    function l(a, b) {
      return "data:" + b + ";base64," + a
    }

    function m(a) {
      return a.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1")
    }

    function n(a) {
      return function(b) {
        return new Promise(function(c) {
          setTimeout(function() {
            c(b)
          }, a)
        })
      }
    }

    function o(a) {
      for (var b = [], c = a.length, d = 0; c > d; d++) b.push(a[d]);
      return b
    }

    function p(a) {
      return a.replace(/#/g, "%23").replace(/\n/g, "%0A")
    }
    return {
      escape: m,
      parseExtension: c,
      mimeType: d,
      dataAsUrl: l,
      isDataUrl: e,
      canvasToBlob: g,
      resolveUrl: h,
      getAndEncode: k,
      uid: i(),
      delay: n,
      asArray: o,
      escapeXhtml: p,
      makeImage: j
    }
  }

  function k() {
    function a(a) {
      return -1 !== a.search(e)
    }

    function b(a) {
      for (var b, c = []; null !== (b = e.exec(a));) c.push(b[1]);
      return c.filter(function(a) {
        return !n.isDataUrl(a)
      })
    }

    function c(a, b, c, d) {
      function e(a) {
        return new RegExp("(url\\(['\"]?)(" + n.escape(a) + ")(['\"]?\\))", "g")
      }
      return Promise.resolve(b).then(function(a) {
        return c ? n.resolveUrl(a, c) : a
      }).then(d || n.getAndEncode).then(function(a) {
        return n.dataAsUrl(a, n.mimeType(b))
      }).then(function(c) {
        return a.replace(e(b), "$1" + c + "$3")
      })
    }

    function d(d, e, f) {
      function g() {
        return !a(d)
      }
      return g() ? Promise.resolve(d) : Promise.resolve(d).then(b).then(function(a) {
        var b = Promise.resolve(d);
        return a.forEach(function(a) {
          b = b.then(function(b) {
            return c(b, a, e, f)
          })
        }), b
      })
    }
    var e = /url\(['"]?([^'"]+?)['"]?\)/g;
    return {
      inlineAll: d,
      shouldProcess: a,
      impl: {
        readUrls: b,
        inline: c
      }
    }
  }

  function l() {
    function a() {
      return b(document).then(function(a) {
        return Promise.all(a.map(function(a) {
          return a.resolve()
        }))
      }).then(function(a) {
        return a.join("\n")
      })
    }

    function b() {
      function a(a) {
        return a.filter(function(a) {
          return a.type === CSSRule.FONT_FACE_RULE
        }).filter(function(a) {
          return o.shouldProcess(a.style.getPropertyValue("src"))
        })
      }

      function b(a) {
        var b = [];
        return a.forEach(function(a) {
          try {
            n.asArray(a.cssRules || []).forEach(b.push.bind(b))
          } catch (c) {
            console.log("Error while reading CSS rules from " + a.href, c.toString())
          }
        }), b
      }

      function c(a) {
        return {
          resolve: function() {
            var b = (a.parentStyleSheet || {}).href;
            return o.inlineAll(a.cssText, b)
          },
          src: function() {
            return a.style.getPropertyValue("src")
          }
        }
      }
      return Promise.resolve(n.asArray(document.styleSheets)).then(b).then(a).then(function(a) {
        return a.map(c)
      })
    }
    return {
      resolveAll: a,
      impl: {
        readAll: b
      }
    }
  }

  function m() {
    function a(a) {
      function b(b) {
        return n.isDataUrl(a.src) ? Promise.resolve() : Promise.resolve(a.src).then(b || n.getAndEncode).then(function(b) {
          return n.dataAsUrl(b, n.mimeType(a.src))
        }).then(function(b) {
          return new Promise(function(c, d) {
            a.onload = c, a.onerror = d, a.src = b
          })
        })
      }
      return {
        inline: b
      }
    }

    function b(c) {
      function d(a) {
        var b = a.style.getPropertyValue("background");
        return b ? o.inlineAll(b).then(function(b) {
          a.style.setProperty("background", b, a.style.getPropertyPriority("background"))
        }).then(function() {
          return a
        }) : Promise.resolve(a)
      }
      return c instanceof Element ? d(c).then(function() {
        return c instanceof HTMLImageElement ? a(c).inline() : Promise.all(n.asArray(c.childNodes).map(function(a) {
          return b(a)
        }))
      }) : Promise.resolve(c)
    }
    return {
      inlineAll: b,
      impl: {
        newImage: a
      }
    }
  }
  var n = j(),
    o = k(),
    p = l(),
    q = m();
  a.domtoimage = {
    toSvg: b,
    toPng: c,
    toBlob: d,
    impl: {
      fontFaces: p,
      images: q,
      util: n,
      inliner: o
    }
  }
}(this);

function imgBuild() {     
      var node = document.getElementById('serpotonye');
      
      domtoimage.toPng(node).then(function(dataUrl) {

          function dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
              while(n--){
                  u8arr[n] = bstr.charCodeAt(n);
              }
              return new File([u8arr], filename, {type:mime});
          }

          var fail = dataURLtoFile(dataUrl, 'jokes.png');

           const data = {
              files: [fail]
            };  
          // error.textContent = '';

          navigator.share(data).then(() => {
          })
          .catch((err) => {
            alert('Unsuccessful share');
            console.log(err)
            // error.textContent = 'Share failed: ' + err.message;
          });
        })
        .catch(function(error) {
          console.log(error)
          // alert('oops, something went wrong!', error);

        // $('#serpoto').html('');
        });

};

function priview(warna,pala,isi){
  $('#serpoto').html(`
                      <div class="card mb-3 list-itemm `+ warna +`" id="serpotonye" style="width: 18rem;">
                        <div class="card-header">`+pala+`</div>
                        <div class="card-body text-dark">
                          <p class="card-text">`+ isi +`</p>
                        </div>
                        <div class="card-footer text-right">Generated From Kamus Plesetan</div>
                      </div>
              `);

      $('#priview').modal('show');
}

// Pelesetan Bunyi
function search_plesetan(pesan){
  $('#dta_plesetan').html("");
    if (pesan) {
      var pecah = pesan.split(" ");
      var i = pecah.length - 1;
      var text = pecah[i];
    }else{
      var text = $('#input-search').val();  
    }

    var arraybcr = [];

    $.ajax({
      url: 'https://452138aee55a.ngrok.io/sw/db_spell.php',
      type:'get',
      dataType:'json',
      data:{
        'operasi':'Search',
        'key': text
      },
      success: function(result){
        if(result.length == 0){
          arraybcr[0] = "Data Tidak Ada , Mulai Mendengarkan Kembali";
          $('#dta_plesetan').html(`
            <td colspan="3"><center><h1>Data Tidak Di temukan</h1></center><td>
          `);
        }
        else{
            updateprofile();
            console.log(result.length)
          var clr = ['bg-primary','bg-success','bg-warning','bg-info','bg-danger'];
                var x = 0
          let data_plesetan = result;
          let nmr = 0 ;
          $.each(data_plesetan,function (i,value){
            var encode = $('<textarea />').html(""+value.makna_kata+"").text();
            arraybcr[nmr] = value.kata;
                             nmr++
              var reg = new RegExp(value.kata.trim(),'gi')
              $('#dta_plesetan').append(`
                      <div class="card mb-3 list-itemm `+ clr[x] +`" style="width: 18rem;">
                        <div class="card-header bg-transparent">`+ value.kata +`</div>
                        <div class="card-body text-dark">
                          <p class="card-text">`+ readmore(encode) +`</p>
                        </div>
                        <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Bunyi','`+encode.substr(0,300).replace(reg,text)+`')"><i class="fas fa-share-alt"></i></button></div>
                      </div>
              `);
              
              if (x == 4) {
                x = 0
              }else{
                x++ 
              }
        });
        pagi()
        if (pesan) {
            textBicara(arraybcr) 
          }
        }
      } 
    });
}

function cariPlesetan(pesan)
{
  $('#dta_plesetan').html("");
  if (pesan){
      var pecah = pesan.split(" ");
      var i = pecah.length - 1;
      var searchField = pecah[i];
  }else{
    var searchField = $('#input-search').val();
  }

  var arraybcr = [];
  var max_str = searchField.trim();
  var nmr = 0 ;
  $.getJSON('kbbp.json',function(data)
  {
    var hasil = false;
                  var clr = ['bg-primary','bg-success','bg-warning','bg-info','bg-danger'];
                var x = 0              
    $.each(data,function(key,value)
    {
        max_str_v = value.kata.trim();
        persen = similar_text(value.kata.trim(),searchField.trim())                
        if(persen > 75 && persen < 85 && max_str.length == max_str_v.length && max_str != max_str_v)
        {
          hasil = true;
          var encode = $('<textarea />').html(""+value.makna_kata+"").text();
              arraybcr[nmr] = value.kata;
              nmr++
              var reg = new RegExp(value.kata.trim(),'gi')
              $('#dta_plesetan').append(`
                    <div class="card mb-3 list-itemm `+ clr[x] +`"  style="width: 18rem;">
                      <div class="card-header bg-transparent">`+ value.kata +`</div>
                      <div class="card-body text-dark">
                        <p class="card-text">`+ readmore(encode) +`</p>
                      </div>
                       <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Bunyi','`+encode.substr(0,300).replace(reg,max_str)+`')"><i class="fas fa-share-alt"></i></button></div>
                        </div>
              `);
          if (x == 4) {
                x = 0
              }else{
                x++ 
              }                         
        }                
    });
    if(!hasil){
      arraybcr[0] = "Data Tidak Ada , Mulai Mendengarkan Kembali";
      $('#dta_plesetan').html(`
            <td colspan="3"><center><h1>Data Tidak Di temukan</h1></center><td>
          `);
      if (pesan) {
            textBicara(arraybcr) 
          }    }
    else{
      updateprofile();
      pagi()
      if (pesan) {
            textBicara(arraybcr) 
          }
    }                 
  });  
}
// akhir Pelesetan bunyi

// Pelesetan kalimat
function ambilSingkatan(isi) {
  var str = isi;
  var joinword="";
  var res = str.split(" ");
  for(i=0 ; i < res.length ; i++){
    var ress = res[i].substr(0,1);    
    joinword += ress;
  }
  return joinword
}

function search_plesetanKalimat(pesan){
  $('#dta_plesetan').html("");
    if (pesan) {
      var text = pesan;
    }else{
      var text = $('#input-search-kkt').val();  
    }

    var arraybcr = [];

    $.ajax({
      url: 'https://452138aee55a.ngrok.io/sw/db_spell.php',
      type:'get',
      dataType:'json',
      data:{
        'operasi':'Kalimat',
        'key': text
      },
      success: function(result){
        if(result.length == 0){
          arraybcr[0] = "Data Tidak Ada , Mulai Mendengarkan Kembali";
          $('#dta_plesetan').html(`
            <td colspan="3"><center><h1>Data Tidak Di temukan</h1></center><td>
          `);
        }
        else{
            updateprofile();

          let data_plesetan = result;
          let nmr = 0 ;
            var clr = ['bg-primary','bg-success','bg-warning','bg-info','bg-danger'];
            var x = 0    
          $.each(data_plesetan,function (i,value){
            var encode = $('<textarea />').html(""+value.makna_kata+"").text();
            arraybcr[nmr] = value.kata;
            nmr++
            $('#dta_plesetan').append(`
                <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
                  <div class="card-header bg-transparent">`+ value.kata +`</div>
                  <div class="card-body text-dark">
                    <p class="card-text">`+ readmore(encode) +`</p>
                  </div>
                  <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Kalimat','`+text+` Disingkat `+value.kata+`')"><i class="fas fa-share-alt"></i></button></div>
                </div>
            `);
              if (x == 4) {
                x = 0
              }else{
                x++ 
              } 
          });
          pagi()
          if (pesan) {
            textBicara(arraybcr) 
          }
        }
      } 
    });
}

function cariPlesetanKalimat(pesan)
{
  $('#dta_plesetan').html("");
  if (pesan){
    var spell = pesan;
  }else{
    var texts = $('#input-search-kkt').val();
      var spell = texts;
  }
  
    var arraybcr = [];
  var nmr = 0 ;
  $.getJSON('kbbp.json',function(data)
  {
    var hasil = false;
    var clr = ['bg-primary','bg-success','bg-warning','bg-info','bg-danger'];
            var x = 0 
    $.each(data,function(key,value)
    {
        var firstw = value.kata.split("")
        var firsts = spell.split("")
        if(firsts[0] === firstw[0]){

            if(cek(value.kata.trim(),spell) === value.kata.trim().length)
            {
                hasil = true;

                  var encode = $('<textarea />').html(""+value.makna_kata+"").text();
                  arraybcr[nmr] = value.kata;
                  nmr++
                  $('#dta_plesetan').append(`
                  <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
                  <div class="card-header bg-transparent">`+ value.kata +`</div>
                  <div class="card-body text-dark">
                    <p class="card-text">`+ readmore(encode) +`</p>
                  </div>
                  <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Kalimat','`+spell+` Disingkat `+value.kata+`')"><i class="fas fa-share-alt"></i></button></div>
                </div>
              `); 
                if (x == 4) {
                x = 0
              }else{
                x++ 
              }                                 
            }          
        }                        
    });

    if(!hasil){
          $('#dta_plesetan').html(`
            <td colspan="3"><center><h1>Data Tidak Di temukan</h1></center><td>
          `);
          arraybcr[0] = "Data Tidak Ada , Mulai Mendengarkan Kembali";
          if (pesan) {
            textBicara(arraybcr) 
          }
    }
    else{
      updateprofile();
      pagi()
      if (pesan) {
            textBicara(arraybcr) 
          }
    }

  });  
}
// akhir Pelesetan kalimat

// awal Pelesetan Kata -> kalimat

function search_plesetanKata(pesan){
  $('#dta_plesetan').html("");
    if (pesan) {
      var pecah = pesan.split(" ");
      var i = pecah.length - 1;
      var text = pecah[i];
    }else{
      var text = $('#input-search-kk').val();  
    }
    

    var arraybcr = [];

    $.ajax({
      url: 'https://452138aee55a.ngrok.io/sw/db_spell.php',
      type:'get',
      dataType:'json',
      data:{
        'operasi':'Kata',
        'key': text
      },
      success: function(result){
        if(result.length == 0){
          arraybcr[0] = "Data Tidak Ada , Mulai Mendengarkan Kembali";
          $('#dta_plesetan').html(`
            <td colspan="3"><center><h1>Data Tidak Di temukan</h1></center><td>
          `);
        }
        else{
            updateprofile();
            console.log(result.length)

            let data_plesetan = result;
            let nmr = 0 ;
            var clr = ['bg-primary','bg-success','bg-warning','bg-info','bg-danger'];
            var x = 0 
            $.each(data_plesetan,function (i,value){
              arraybcr[nmr] = value;
                nmr++
                $('#dta_plesetan').append(`
                    <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
                      <div class="card-header bg-transparent">Kepanjangan</div>
                      <div class="card-body text-dark">
                        <p class="card-text">`+ value +`</p>
                      </div>
                      <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Akronim','`+text+` Akronim Dari `+value+`')"><i class="fas fa-share-alt"></i></button></div>
                    </div>
                `);
                 if (x == 4) {
                x = 0
              }else{
                x++ 
              }          
            });
            pagi() 
            if (pesan) {
            textBicara(arraybcr.slice(0,5)) 
          }
        }
      } 
    });
}

function cariPlesetanKata(pesan)
{
  $('#dta_plesetan').html("");
  if (pesan){
    var pecah = pesan.split(" ");
    var i = pecah.length - 1;
    var spell = pecah[i]; 
  }else{
    var texts = $('#input-search-kk').val();
      var spell = texts;
  }
  
  var cek = spell.split("")
  var s ;
  var p ;
  var o ;
  var k ;

  var arraybcr = [];
  var nmr = 0 ;
  $.getJSON('kbbp.json',function(data)
  {
    var hasil = false;
    var kks = [];
    var kkp = [];
    var kko = [];
    var kkk = [];

      var i = 0;
      var j = 0;
      var ka = 0;
      var l = 0;


  if(cek.length == 4){
     var firsts = spell.split("")
     s = firsts[0];
     p = firsts[1];
     o = firsts[2];
     k = firsts[3];
  }

  else if(cek.length == 3){
    var firsts = spell.split("")
    s = firsts[0];
    p = firsts[1];
    o = firsts[2];
  }

  else if(cek.length == 2){
    var firsts = spell.split("")
    s = firsts[0];
    p = firsts[1];
  }

  else if(cek.length > 4){
    var firsts = spell.split("")
    
      if(firsts.length == 5){
        s = firsts[0] + firsts[1];
        p = firsts[2];
        o = firsts[3];
        k = firsts[4];                                  
      }

      else if(firsts.length == 6){
        s = firsts[0] + firsts[1];
        p = firsts[2] + firsts[3];
        o = firsts[4];
        k = firsts[5]; 
      }

      else if(firsts.length == 7){
        s = firsts[0] + firsts[1];
        p = firsts[2] + firsts[3];
        o = firsts[4] + firsts[5];
        k = firsts[6];
      }

      else if(firsts.length == 8){
        s = firsts[0] + firsts[1];
        p = firsts[2] + firsts[3];
        o = firsts[4] + firsts[5];
        k = firsts[6] + firsts[7];
      }

      else if(firsts.length == 9){
        s = firsts[0] + firsts[1] + firsts[2];
        p = firsts[3] + firsts[4];
        o = firsts[5] + firsts[6];
        k = firsts[7] + firsts[8];
      }

      else if(firsts.length == 10){
        s = firsts[0] + firsts[1] + firsts[2];
        p = firsts[3] + firsts[4] + firsts[5];
        o = firsts[6] + firsts[7];
        k = firsts[8] + firsts[9];
      }

      else if(firsts.length == 11){
        s = firsts[0] + firsts[1] + firsts[2];
        p = firsts[3] + firsts[4] + firsts[5];
        o = firsts[6] + firsts[7] + firsts[8];
        k = firsts[9] + firsts[10];
      }

      else if(firsts.length == 12){
        s = firsts[0] + firsts[1] + firsts[2];
        p = firsts[3] + firsts[4] + firsts[5];
        o = firsts[6] + firsts[7] + firsts[8];
        k = firsts[9] + firsts[10] + firsts[11];
      }

      else if(firsts.length == 13){
        s = firsts[0] + firsts[1] + firsts[2] + firsts[3];
        p = firsts[4] + firsts[5] + firsts[6];
        o = firsts[7] + firsts[8] + firsts[9];
        k = firsts[10] + firsts[11] + firsts[12];
      }

      else if(firsts.length == 14){
        s = firsts[0] + firsts[1] + firsts[2] + firsts[3];
        p = firsts[4] + firsts[5] + firsts[6] + firsts[7];
        o = firsts[8] + firsts[9] + firsts[10];
        k = firsts[11] + firsts[12] + firsts[13];
      }

      else if(firsts.length == 15){
        s = firsts[0] + firsts[1] + firsts[2] + firsts[3];
        p = firsts[4] + firsts[5] + firsts[6] + firsts[7];
        o = firsts[8] + firsts[9] + firsts[10] + firsts[11];
        k = firsts[12] + firsts[13] + firsts[14];
      }

      else if(firsts.length == 16){
        s = firsts[0] + firsts[1] + firsts[2] + firsts[3];
        p = firsts[4] + firsts[5] + firsts[6] + firsts[7];
        o = firsts[8] + firsts[9] + firsts[10] + firsts[11];
        k = firsts[12] + firsts[13] + firsts[14] + firsts[15];
      }

      else{
          s = false;
          p = false;
          o = false;
          k = false;
      }
  }

  else{
    s = false;
    p = false;
    o = false;
    k = false;
  }

    $.each(data,function(key,value)
    {
      if(cek.length >= 4){        
        var cek_s = value.kata.substr(0,s.length);
        var cek_p = value.kata.substr(0,p.length);
        var cek_o = value.kata.substr(0,o.length);
        var cek_k = value.kata.substr(0,k.length);
      }

      else if(cek.length == 2){
        var cek_s = value.kata.substr(0,s.length);
        var cek_p = value.kata.substr(0,p.length);
      }

      else if(cek.length == 3){
          var cek_s = value.kata.substr(0,s.length);
          var cek_p = value.kata.substr(0,p.length);
          var cek_o = value.kata.substr(0,o.length);
      }
      else{
        var cek_s = false;
        var cek_p = false;
        var cek_o = false;
        var cek_k = false;
      }

      if (s === cek_s && value.sifat_kata.toLowerCase().indexOf("adjektiva") != -1 && value.kata.trim().length >= 3 ) {
        kks[i] = value.kata.trim();
        i++
      }
      if (p === cek_p && value.sifat_kata.toLowerCase().indexOf("adjektiva") != -1 && value.kata.trim().length >= 3 ) {
        kkp[j] = value.kata.trim();
        j++
      }

      if (o === cek_o && value.sifat_kata.toLowerCase().indexOf("adjektiva") != -1 && value.kata.trim().length >= 3 ) {
        kko[ka] = value.kata.trim();
        ka++
      }

      if (k === cek_k && value.sifat_kata.toLowerCase().indexOf("adjektiva") != -1 && value.kata.trim().length >= 3 ) {
        kkk[l] = value.kata.trim();
        l++
      }
        
    });

    var clr = ['bg-primary','bg-success','bg-warning','bg-info','bg-danger'];
            var x = 0 
    if(cek.length >= 4){        

        for(var p = 0 ; p < Math.min(kks.length,5); p++){
          for(var q = 0 ; q < Math.min(kkp.length,5); q++){
            for(var r = 0 ; r < Math.min(kko.length,5); r++){
              for(var s = 0 ; s < Math.min(kkk.length,5); s++){
                if (kks[p] && kkp[q] && kko[r] && kkk[s]){
                        hasil = true;
                        arraybcr[nmr] = kks[p] +" "+ kkp[q] +" "+ kko[r] +" "+ kkk[s];
                        nmr++
                        $('#dta_plesetan').append(`                     
                        <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
                          <div class="card-header bg-transparent">Kepanjangan</div>
                          <div class="card-body text-dark">
                            <p class="card-text">`+ kks[p] +" "+ kkp[q] +" "+ kko[r] +" "+ kkk[s] +`</p>
                          </div>
                          <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Akronim','`+spell+` Akronim Dari `+arraybcr[nmr-1]+`')"><i class="fas fa-share-alt"></i></button></div>
                        </div>
                    `);
                     if (x == 4) {
                      x = 0
                    }else{
                      x++ 
                    }           
                }else{
                  p = kks.length;
                }            
              }
            } 
          }
        }

        // for (var i = 0; i < Math.min(kks.length,kkp.length,kko.length,kkk.length) ; i++) {
        //         hasil = true;
        //         arraybcr[nmr] = kks[i] +" "+ kkp[i] +" "+ kko[i] +" "+ kkk[i];
        //         nmr++
        //         $('#dta_plesetan').append(`                     
        //         <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
        //           <div class="card-header bg-transparent">Kepanjangan</div>
        //           <div class="card-body text-dark">
        //             <p class="card-text">`+ kks[i] +" "+ kkp[i] +" "+ kko[i] +" "+ kkk[i] +`</p>
        //           </div>
        //           <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="imgBuild(`+nmr+`)"><i class="fas fa-share-alt"></i></button></div>
        //         </div>
        //     `);
        // }
      }


      else if(cek.length == 2){

        for(var p = 0 ; p < Math.min(kks.length,50); p++){
          for(var q = 0 ; q < Math.min(kkp.length,50); q++){
            if (kks[p] && kkp[q]){
               hasil = true;
                        arraybcr[nmr] = kks[p] +" "+ kkp[q];
                    nmr++
                    $('#dta_plesetan').append(`
                        <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
                          <div class="card-header bg-transparent">Kepanjangan</div>
                          <div class="card-body text-dark">
                            <p class="card-text">`+ kks[p] +" "+ kkp[q] +`</p>
                          </div>
                          <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Akronim','`+spell+` Akronim Dari `+arraybcr[nmr-1]+`')"><i class="fas fa-share-alt"></i></button></div>
                        </div>
                `); 
                    if (x == 4) {
                      x = 0
                    }else{
                      x++ 
                    }
            }else{
              p = kks.length;
            }             
          }
        }

        // for (var i = 0; i < Math.min(kks.length,kkp.length) ; i++) {
        //         hasil = true;
        //         arraybcr[nmr] = kks[i] +" "+ kkp[i];
        //         nmr++
        //         $('#dta_plesetan').append(`                     
        //         <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
        //           <div class="card-header bg-transparent">Kepanjangan</div>
        //           <div class="card-body text-dark">
        //             <p class="card-text">`+ kks[i] +" "+ kkp[i] +`</p>
        //           </div>
        //           <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="imgBuild(`+nmr+`)"><i class="fas fa-share-alt"></i></button></div>
        //         </div>
        //     `);
        // }
      }

      else if(cek.length == 3){
        for(var p = 0 ; p < Math.min(kks.length,7); p++){
          for(var q = 0 ; q < Math.min(kkp.length,7); q++){
            for(var s = 0 ; s < Math.min(kko.length,7); s++){
              if (kks[p] && kkp[q] && kko[s]){
                 hasil = true;

                        arraybcr[nmr] = kks[p] +" "+ kkp[q] +" "+ kko[s];
                      nmr++
                      $('#dta_plesetan').append(`
                        <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
                          <div class="card-header bg-transparent">Kepanjangan</div>
                          <div class="card-body text-dark">
                            <p class="card-text">`+ kks[p] +" "+ kkp[q] +" "+ kko[s] +`</p>
                          </div>
                          <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="priview('`+ clr[x] +`','Plesetan Akronim','`+spell+` Akronim Dari `+arraybcr[nmr-1]+`')"><i class="fas fa-share-alt"></i></button></div>
                        </div>
                  `); 
                      if (x == 4) {
                      x = 0
                    }else{
                      x++ 
                    }
              }else{
                p = kks.length;
              }            
            }
          }
        }

        // for (var i = 0; i < Math.min(kks.length,kkp.length,kko.length) ; i++) {
        //         hasil = true;
        //         arraybcr[nmr] = kks[i] +" "+ kkp[i] +" "+ kko[i];
        //         nmr++
        //         $('#dta_plesetan').append(`                     
        //         <div class="card mb-3 list-itemm `+clr[x]+`" id="` +nmr+ `" style="width: 18rem;">
        //           <div class="card-header bg-transparent">Kepanjangan</div>
        //           <div class="card-body text-dark">
        //             <p class="card-text">`+ kks[i] +" "+ kkp[i] +" "+ kko[i] +`</p>
        //           </div>
        //           <div class="card-footer text-right bg-transparent"><button class="btn btn-outline-dark" name="Ser" id="serit" onclick="imgBuild(`+nmr+`)"><i class="fas fa-share-alt"></i></button></div>
        //         </div>
        //     `);
        // }
      }

      else{
        console.log("panjang baring krng dari 2")
      }


    if(!hasil){
          arraybcr[0] = "Data Tidak Ada , Mulai Mendengarkan Kembali";
          $('#dta_plesetan').html(`
            <td colspan="3"><center><h1>Data Tidak Di temukan</h1></center><td>
          `);
          if (pesan) {            
            textBicara(arraybcr.slice(0,5)) 
          }
    }
    else{
      updateprofile();
      pagi()
      if (pesan) {
            textBicara(arraybcr.slice(0,5)) 
          }
    }

  });  
}
// akir Pelesetan Kata -> kalimat

//pagination
function pagi(){
    var items = $('.lapis .list-itemm');
    var numitem = items.length;
    var perPage = 4;

    items.slice(perPage).hide();

    $('#pagination-container').pagination({
      items: numitem,
      itemsOnPage : perPage,
      displayedPages:8,
      prevText : "<",
      nextText : ">",
      onPageClick : function (pageNumber){
          var showForm = perPage * (pageNumber - 1);
          var showTo  = showForm + perPage;
          items.hide().slice(showForm, showTo).show();
      }
    });
}
//akkhir pagination

//readmore
function readmore(text){
  if (text.length > 300) {
    var potong = text.substr(0,300);
    potong += `<a href="#" class="card-link" style="color:red;" onclick="showMore('`+text+`')"> Read More</a>`;

    return potong
  }else{
    return text
  }
}

function showMore(isi){
  $("#modal-body").html("")

  $("#modal-body").append(isi)

  $('#show').modal({

    });
}
//akir readmore

function showForm(){
$('#myModal').modal({
      backdrop:'static'
    });
}

function cek(w,s) {
  var word = w.split("");
  var splitw = s.split(" ");
  var spell = [];
  for (i = 0 ; i < splitw.length ; i++){
    spell[i] = splitw[i].split("");
  }
  var wa=0;
  var sa=0;
  var saa=0;
  var swkl = 0;
  var r = 0;
  var x = false;
  if(word[0] === spell[0][0])
  {
    for(;wa < word.length;wa++){   
      for(;saa < spell[sa].length;){
          if(word[wa] === spell[sa][saa]){
                    if(sa > 0){
                      swkl++
                      if(swkl === spell.length){
                        x = true;
                      }
                    }
                    r++
                    saa++                    
                    break;                           
            }
          else{
              if(sa > 0){
                saa = 99;
                  wa = 99;
                  r = 99;
              }else{
                if((spell.length - 1) > sa){                
                  sa++
                  saa=0;                  
                }else{
                  saa = 99;
                  wa = 99;
                }
              }             
            }
        }
    }    
  }
  if(x){
    return r
  }else{
    return false
  }
}

//similiar text
function similar_text (first, second, percent) { 

  if (first === null ||
    second === null ||
    typeof first === 'undefined' ||
    typeof second === 'undefined') {
    return 0
  }

  first += ''
  second += ''

  var pos1 = 0
  var pos2 = 0
  var max = 0
  var firstLength = first.length
  var secondLength = second.length
  var p
  var q
  var l
  var sum

  for (p = 0; p < firstLength; p++) {
    for (q = 0; q < secondLength; q++) {                 
      for (l = 0; (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++) { // eslint-disable-line max-len
        // @todo: ^-- break up this crazy for loop and put the logic in its body
      }
      if (l > max) {
        max = l
        pos1 = p
        pos2 = q
      }
    }
  }

  sum = max

  if (sum) {
    if (pos1 && pos2) {
      sum += similar_text(first.substr(0, pos1), second.substr(0, pos2))
    }

    if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
      sum += similar_text(
        first.substr(pos1 + max, firstLength - pos1 - max),
        second.substr(pos2 + max,
        secondLength - pos2 - max))
    }
  }

  // if (!percent) {
  //   return sum
  // } 

  return (sum * 200) / (firstLength + secondLength)
}

        var aktif = aktif;
//speech recognartion
        var message = $('#konten','#message');

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

        var grammar = '#JSGF V1.0;'

        var recognition = new SpeechRecognition();
        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.lang = 'id-ID';
        recognition.interimResults = false;

        var pid ;

        recognition.onresult = function(event) {
            var last = event.results.length - 1;
            var command = event.results[last][0].transcript;
            message.textContent = 'Voice Input: ' + command + '.';

            if(aktif){
              // console.log('Offline mode');
                if (pid === "index") {
                  cariPlesetan(command);
                }
                else if(pid === "kata"){
                  cariPlesetanKata(command);
                }
                else{
                  cariPlesetanKalimat(command);
                }                   
            }else{
              if (pid === "index") {
                  search_plesetan(command);
                }
                else if(pid === "kata"){
                  search_plesetanKata(command);
                }
                else{
                  search_plesetanKalimat(command);
                }
              // alert('Online Mode');
            }

            // textBicara(command);
        };

        recognition.onspeechend = function() {
            recognition.stop();
        };

        recognition.onerror = function(event) {
            message.textContent = 'Error occurred in recognition: ' + event.error;
        }        

        $('#konten').on('click','#btnGiveCommand', function(){
            recognition.start();
            message.textContent = '';
            pid = "kalimat";
        });

        $('#konten').on('click','#btnGiveCommandindex', function(){
            recognition.start();
            message.textContent = '';
            pid = "index";
        });


        $('#konten').on('click','#btnGiveCommandkata', function(){
            recognition.start();
            message.textContent = '';
            pid = "kata";
        });

        function textBicara(pesan){

            const speech = new SpeechSynthesisUtterance();
            speech.text = pesan;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            speech.lang = 'id-ID';

              window.speechSynthesis.speak(speech);

              speech.onend = function(event){
                  recognition.start(); 
              }
        }