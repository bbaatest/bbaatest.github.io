(function() {
  var check_change_mode, correct_badge_position, correct_fixed_position_width, list_toggle, make_recent_date, make_roaming_menu, make_spacing, monitor_device_mode, tag_sort, wrap_img;

  make_recent_date = function() {
    var day, i, label, len, month, ref, results, seconds, sentence, year;
    ref = $('#recent-list span.label');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      label = ref[i];
      seconds = (Date.now() - Date.parse($(label).data('date'))) / 1000;
      day = Math.floor(seconds / 60 / 60 / 24);
      month = Math.floor(seconds / 60 / 60 / 24 / 30);
      year = Math.floor(seconds / 60 / 60 / 24 / 365);
      if (year > 1) {
        sentence = year + " years ago";
      } else if (year === 1) {
        sentence = 'a year ago';
      } else if (month > 1) {
        sentence = month + " months ago";
      } else if (month === 1) {
        sentence = 'a month ago';
      } else if (day > 1) {
        sentence = day + " days ago";
      } else if (day === 1) {
        sentence = "yesterday";
      } else {
        sentence = "today";
      }
      results.push($(label).html(sentence));
    }
    return results;
  };

  tag_sort = function(button) {
    var cmp, li, ord;
    if (/freq$/.test($(button).attr('id'))) {
      ord = function(selector) {
        return Number($(selector).find('.ord-freq').html());
      };
      cmp = function(a, b) {
        if (ord(a) <= ord(b)) {
          return 1;
        } else {
          return -1;
        }
      };
    } else {
      ord = function(selector) {
        return $(selector).find('.ord-alph').html().toLowerCase();
      };
      cmp = function(a, b) {
        if (ord(a) > ord(b)) {
          return 1;
        } else {
          return -1;
        }
      };
    }
    return $('ul#tags').html(((function() {
      var i, len, ref, results;
      ref = $('ul#tags > li').detach();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        li = ref[i];
        results.push(li);
      }
      return results;
    })()).sort(cmp));
  };

  correct_fixed_position_width = function() {
    $('#leftbar').css('width', $('#leftbar-spacing').css('width'));
    $('#rightbar').css('width', $('#rightbar-spacing').css('width'));
    return $('#rightbar').css('left', $('#rightbar-spacing').offset()['left']);
  };

  correct_badge_position = function() {
    var badge, i, len, parent, ref, results;
    ref = $('ul li span.badge');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      badge = ref[i];
      parent = $(badge).parent();
      results.push($(badge).detach().prependTo(parent));
    }
    return results;
  };

  wrap_img = function() {
    var alt, i, img, len, ref, results;
    ref = $('img');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      img = ref[i];
      alt = $(img).attr('alt');
      if (alt != null ? alt.trim().length : void 0) {
        results.push($(img).wrap($('<div>').addClass('figure')).after($('<p>').html($('<em>').html(alt))).wrap('<p>'));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  list_toggle = function(a) {
    var li;
    li = $(a).parent();
    li.find('i.fa:first').toggleClass('fa-plus-square');
    li.find('i.fa:first').toggleClass('fa-minus-square');
    return li.find('ul:first').toggleClass('hidden');
  };

  check_change_mode = function() {
    var i, len, mode, ref;
    ref = ['xs', 'sm', 'md'];
    for (i = 0, len = ref.length; i < len; i++) {
      mode = ref[i];
      if ($("#device-" + mode).is(':visible')) {
        break;
      }
    }
    if ($('#device-mode').data('mode') !== mode) {
      $('#device-mode').data('mode', mode);
      return mode;
    }
    return null;
  };

  monitor_device_mode = function() {
    var mode;
    mode = check_change_mode();
    if (mode != null) {
      make_roaming_menu(mode);
      return make_spacing(mode);
    }
  };

  make_roaming_menu = function(mode) {
    if (mode === 'xs') {
      $('#roaming-pager').detach().appendTo('#leftrow');
      $('#roaming-share').detach().appendTo('#footer');
      $('#roaming-attribution').detach().appendTo('#leftrow');
      $('#roaming-pager-newer').detach().appendTo('#mini-pager-newer');
      return $('#roaming-pager-older').detach().appendTo('#mini-pager-older');
    } else if (mode === 'sm') {
      $('#roaming-pager').detach().appendTo('#leftrow');
      $('#roaming-share').detach().appendTo('#leftrow');
      $('#roaming-attribution').detach().appendTo('#leftrow');
      $('#roaming-pager-newer').detach().appendTo('#full-pager');
      return $('#roaming-pager-older').detach().appendTo('#full-pager');
    } else {
      $('#roaming-pager').detach().appendTo('#rightrow');
      $('#roaming-share').detach().appendTo('#rightrow');
      $('#roaming-attribution').detach().appendTo('#rightrow');
      $('#roaming-pager-newer').detach().appendTo('#full-pager');
      return $('#roaming-pager-older').detach().appendTo('#full-pager');
    }
  };

  make_spacing = function(mode) {
    if (mode === 'xs') {
      if ($('#leftrow').is(':visible')) {
        $('#menu-toggle').click();
      }
      $('#leftbar-spacing').height($('#leftbar').outerHeight());
      return $('#rightbar-spacing').height($('#rightbar').outerHeight());
    }
  };

  $(document).ready(function() {
    $('table').addClass('table');
    $('#leftrow').addClass('hidden-xs');
    $('ul ul').css('margin-bottom', 0);
    correct_fixed_position_width();
    correct_badge_position();
    make_recent_date();
    monitor_device_mode();
    wrap_img();
    $('.tag-sort').click(function(event) {
      event.preventDefault();
      $('.tag-sort').removeClass('active');
      $(this).addClass('active');
      return tag_sort(this);
    });
    $('.list-toggle').click().children('ul').click(function() {
      return false;
    });
    $('.list-toggle').click(function(event) {
      event.preventDefault();
      list_toggle(this);
      return correct_fixed_position_width();
    });
    $('#menu-toggle').click(function(event) {
      event.preventDefault();
      $(this).toggleClass('active');
      return $('#leftrow').toggleClass('hidden-xs');
    });
    return $(window).resize(function() {
      correct_fixed_position_width();
      return monitor_device_mode();
    });
  });

}).call(this);
