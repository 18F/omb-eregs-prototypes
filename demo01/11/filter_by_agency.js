function filterPs() {
  var $category = $('[name=category]');
  var category = $category.val();
  var categoryAgencies = $category.find('[selected]').data('agencies');
  var selectedAgency = $('[name=agency]').val();

  $('p').each(function (idx, elt) {
    var $elt = $(elt);
    var elCategories = $elt.data('categories');
    var elAgencies = $elt.data('agencies');
    var matches = (
      (category === 'None' && selectedAgency === 'None')
      || _.contains(elAgencies, selectedAgency)
      || _.contains(elCategories, category)
      || _.intersection(elAgencies, categoryAgencies).length > 0
      || (selectedAgency != 'None'
          && _.intersection(categoriesByAgency[selectedAgency],
                            elCategories).length > 0)
    );
    $elt.toggle(matches);
  });
}

$().ready(function() {
  $('select').change(filterPs);
});
