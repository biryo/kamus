function cariPlesetan()
{
  var searchField = $('#input-search').val();
  var max_str = searchField.trim();
  var nmr = 0 ;
  $.getJSON('kbbp.json',function(data)
  {
    var hasil = false;
    $.each(data,function(key,value)
    {
        max_str_v = value.kata_baku.trim();
        persen = similar_text(value.kata_baku.trim(),searchField.trim())                
        if(persen > 75 && persen < 85 && max_str.length == max_str_v.length && max_str != max_str_v)
        {
          hasil = true;
              nmr++
              $('#dta_plesetan').append(`
              <tr id="` +nmr+ `">
                  <th scope="row">`+ nmr +`</th>
                  <td>`+ value.kata_baku +`</td>
                  <td>`+ value.arti_katanya +`</td>
                  <td><input type="submit" name="Ser" id="serit" onclick="imgBuild(`+nmr+`)"></td>
              </tr>
          `);                          
        }                
    });
    if(!hasil){
      alert("Data Tidak Di temukan");
    }
    else{
      var lvlsblm = parseInt($('#lvl').text());
      var lvl = lvlsblm + nmr;
      updateprofile(lvl);
    }                 
  });  
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
