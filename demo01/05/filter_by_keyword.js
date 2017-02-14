function filterPs() {
  var selected = $('select').val()

  $('p').each(function (idx, elt) {
    var $elt = $(elt);
    var elKeywords = $elt.data('keywords');
    $elt.toggle(selected.length === 0
                || _.intersection(elKeywords, selected).length > 0)
  });
}

$().ready(function() {
  $('select').change(filterPs);
});

