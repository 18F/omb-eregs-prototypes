function filterTags(reqIds) {
  var $reqs = $('.req');
  $('.text').addClass('blur');
  $('.tag').removeClass('unblur');
  $reqs.hide();

  $reqs.each(function(idx, el) {
    var $el = $(el);
    $el.toggle(_.contains(reqIds, $el.attr('data-req-id')));
  });

  $('.tag').each(function(idx, el) {
    var $el = $(el);
    if (_.intersection(reqIds, $el.data('reqs')).length > 0) {
      $el.addClass('unblur');
    }
  });
}

function resetTags() {
  $('.text').removeClass('blur');
  $('.req').hide();
  $('.tag').removeClass('unblur');
}

$().ready(function() {
  $('.req').hide();
  $('.tag').mouseover(function (ev) { filterTags($(ev.target).data('reqs')); });
  $('.tag').mouseout(resetTags);
});


