function upload() {
    var form = $('#upload_form');
  form.submit( function (e) {
     e.preventDefault();
  });
  var str = $('#uploadFile').val();
  if (str.length === 0) {
     console.log("empty file name.") ;
     return;
  }
  form.unbind('submit').bind('submit');
  form.submit();
}

$(document).ready(function () {
	var tb = new Table('stock-tb');
	function Table(id) {
		this.id	= id;
		this.dom = document.getElementById(id);
	}
	Table.prototype.update = function(content) {
	    var t   = this.dom;
	    var data    = JSON.parse(content);
	    console.log(content, t);
	    data.forEach(function (value) {
	        // console.log(value);
            var tr = document.createElement('tr');
            var o = value, html = '';
            html    += '<td>'+o['id']+'</td>';
            html    += '<td>'+o['name']+'</td>';
            html    += '<td>'+o['description']+'</td>';
            html    += '<td>'+o['quantity']+'</td>';
            tr.innerHTML    = html;
            t.appendChild(tr);
        });
	};

    (function init() {
        $.post('php/api.php/getStock', function (data) {
			tb.update(data);
        });
    })();
});
