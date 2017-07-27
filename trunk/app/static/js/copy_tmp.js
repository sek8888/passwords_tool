function copyToClipboard(text) {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val(text).select();
  document.execCommand('copy');
  $temp.remove()
}

$(function($) {
    var selection = [];
    $('#table td').dblclick(function() {
        copyToClipboard(this.innerHTML);
        $('#copyingText').val(this.innerHTML);
    });
});


function search_keys() {

  var bools = [];
  var input, filter, filters, table, tr, td, i;
  input = document.getElementById("searchInput");
  //filter = input.value.toUpperCase();
  filters = input.value.toUpperCase().split(" ");
  //console.log(filters);
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");


  // filters.forEach(function(element) {
  //   console.log(element);
  // });

  //_td = tr[0].getElementsByTagName("_td");
  console.log(filters);

  for (i = 0; i < filters.length; i++){
    if (filters[i] != ""){

      for (j = 0; j < tr.length; j++) {
        td = tr[j].getElementsByTagName("td");
        for (k = 1; k < td.length-2; k++){
          if (td[k]) {
            // if (td[k].innerHTML.toUpperCase().indexOf(filters[i]) > -1) {
            //   bools[i] = true;
            //   tr[j].style.display = "";
            //   console.log(filters[i], td[k].innerHTML.toUpperCase(), bools[i]);
            // } else {
            //   bools[i] = false;
            //   tr[j].style.display = "none";
            // }

            if (td[k].innerHTML.toUpperCase().indexOf(filters[i]) > -1) {
              tr[j].style.display = "";
            } else {
              tr[j].style.display = "none";
            }
          }
        }
      }
    }

  }
  //console.log(bools);
}
