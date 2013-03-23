// Generated by CoffeeScript 1.3.1
(function() {

  $(function() {
    var downloadStyle, downloadThemes, styles, theme;
    downloadThemes = function(cb) {
      return $.getJSON("themes.json").done(cb);
    };
    downloadStyle = function(style, cb) {
      return $.ajax({
        'url': "/themes/" + style + ".css",
        'cache': true
      }).done(function(css) {
        return cb(css.replace(/\.highlight/g, ".highlight.theme-" + style));
      });
    };
    styles = ["bw", "emacs"];
    theme = $("link#theme");
    return downloadThemes(function(styles) {
      return $.Mustache.load('code.mustache').done(function() {
        var pygments_styles, style, vim_styles, _i, _len, _results;
        pygments_styles = _.where(styles, {
          'source': 'pygments'
        });
        vim_styles = _.where(styles, {
          'source': 'vim'
        });
        $('#container').mustache('code', {
          "styles": pygments_styles
        });
        $('#container').mustache('code', {
          "styles": vim_styles,
          "foo": "bar"
        });
        $('#container').masonry({
          'itemSelector': '.item',
          'isAnimated': !Modernizr.csstransitions
        });
        _results = [];
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          _results.push((function(style) {
            return downloadStyle(style.name, function(css) {
              var stylesheet;
              stylesheet = $('<style></style>');
              stylesheet.text(css);
              return $("head").append(stylesheet);
            });
          })(style));
        }
        return _results;
      });
    });
  });

}).call(this);
