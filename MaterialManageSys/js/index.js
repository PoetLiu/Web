$(document).ready(function () {
	var tb = new Table('stock-tb');
	function Table(id) {
		this.id	= id;	
		this.dom	= $(id);
	}
	Table.prototype.update = function(content) {
		var tr = document.creat;
	}
    (function init() {
        $.post('php/api.php/getStock', function (data) {
			tb.update(data);
        });
    })();
});
