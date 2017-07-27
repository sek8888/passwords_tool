function show_add(){
      var x = document.getElementById('form');
      var b = document.getElementById('li_add_pass');
      if (x.style.display === 'none') {
          x.style.display = 'block';
      } else {
          x.style.display = 'none';
      }
}

function copyToClipboard_(text) {
  var supported = document.queryCommandSupported('copy');
  if (supported) {
    var $temp = $('<input id="0">');
    $('body').append($temp);
    $temp.val(text).select();
    document.execCommand('copy');
    $temp.remove();
  }
}
function copyToClipboard(text){
    var $temp = $('<input id="0">');
    $('body').append($temp);
    $temp.val(text).select();

    //Copy Content
    document.execCommand("Copy", false, null);

    $temp.remove();

}

function copyTo(text){
  copyToClipboard(text);
  $('#copyingText').val(text);
}

function get_copy(data){
  console.log('get_copy:', data);
  copyTo(data);
  //copyToClipboard(data);
  //$('#copyingText').val(data);
}

$(function($) {
    $('#table td').dblclick(function() {
      var column_num = parseInt( $(this).index() );
      var row_num = parseInt( $(this).parent().index() ) - 2;
      var get_str = 'get?table_name=';
      console.log(row_num, column_num);
      var table_name = document.getElementById("table_name").innerHTML;
      get_str += table_name + '&id='+ row_num;
      if (table_name == 'servers'){
        //console.log(table_name);
        if (column_num == 5){
          $.get(get_str, get_copy);
        }else {
            copyTo(this.innerHTML);
        }
      }

      if (table_name == 'svn'){
        //console.log('table_name:', table_name);
        if (column_num == 2){
          $.get(get_str, get_copy);
        }else {
            copyTo(this.innerHTML);
        }
      }
      if (table_name == 'accounts'){
        //console.log('table_name:', table_name);
        if (column_num == 4){
          $.get(get_str, get_copy);
        }else {
            copyTo(this.innerHTML);
        }
      }

    });
});

//
function search_keys() {
  var comp_bools= [];
  var input, filter, filters, table, tr, td, i;

  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  input = document.getElementById("searchInput");

  if (input.value){
    keys = input.value.toUpperCase().split(" ");
    //console.log(keys);
    for (i = 0; i < keys.length; i++){
      for (j = 2; j < tr.length; j++) {
        td = tr[j].getElementsByTagName("td");
        //for (k = 0; k < td.length-2; k++){
        var k = 1;
          if (td[k])
            if (td[k].innerHTML.toUpperCase().indexOf(keys[0]) > -1)
              comp_bools[j] = true;
            else
              comp_bools[j] = false;
        //}
      }
    }
    for (i = 2; i < tr.length; i++) {
      if (comp_bools[i])
        tr[i].style.display = "";
      else{
        comp_bools[i] = true;
        tr[i].style.display = "none";
      }
    }
  }else{
    //console.log("emputy");
    for (i = 2; i < tr.length; i++) {
      tr[i].style.display = "";
    }
  }
}
