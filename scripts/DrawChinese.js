(function() {
  var DrawChinese;

  DrawChinese = (function() {

    function DrawChinese(options) {
      if (options == null) {
        options = {};
      }
    }

    DrawChinese.prototype.filterNodes = function(childNodes) {
      var n, nodes, _i, _len;
      nodes = [];
      for (_i = 0, _len = childNodes.length; _i < _len; _i++) {
        n = childNodes[_i];
        if (n.nodeType === 1) {
          nodes.push(n);
        }
      }
      return nodes;
    };

    DrawChinese.prototype.strokeOutline = function(paper, outline, pathAttrs) {
      var a, node, outlineElement, path, _i, _len, _ref;
      path = [];
      _ref = outline.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.nodeType !== 1) {
          continue;
        }
        a = node.attributes;
        if (!a) {
          continue;
        }
        switch (node.nodeName) {
          case "MoveTo":
            path.push(["M", parseFloat(a.x.value), parseFloat(a.y.value)]);
            break;
          case "LineTo":
            path.push(["L", parseFloat(a.x.value), parseFloat(a.y.value)]);
            break;
          case "QuadTo":
            path.push(["Q", parseFloat(a.x1.value), parseFloat(a.y1.value), parseFloat(a.x2.value), parseFloat(a.y2.value)]);
        }
      }
      outlineElement = paper.path(path).attr(pathAttrs).transform("s0.2,0.2,0,0");
      return outlineElement;
    };

    DrawChinese.prototype.fetchStrokeXml = function(code, cb) {
      return $.get("data/utf8/" + code.toLowerCase() + ".xml", cb, "xml");
    };

    DrawChinese.prototype.strokeWord = function(word, cb) {
      var utf8code,
        _this = this;
      utf8code = escape(word).replace(/%u/, "");
      return this.fetchStrokeXml(utf8code, function(doc) {
        var color, delay, outline, outlines, paper, pathAttrs, timeoutSeconds, _i, _len, _results;
        outlines = doc.getElementsByTagName('Outline');
        paper = Raphael("holder", 430, 430);
        Raphael.getColor();
        Raphael.getColor();
        color = Raphael.getColor();
        pathAttrs = {
          stroke: color,
          "stroke-width": 5,
          "stroke-linecap": "round",
          "fill": color,
          "opacity": 0.5
        };
        timeoutSeconds = 0;
        delay = 800;
        _results = [];
        for (_i = 0, _len = outlines.length; _i < _len; _i++) {
          outline = outlines[_i];
          _results.push((function(outline) {
            return setTimeout((function() {
              outline = _this.strokeOutline(paper, outline, pathAttrs);
              return outline.animate({
                "opacity": 1
              }, delay);
            }), timeoutSeconds += delay);
          })(outline));
        }
        return _results;
      });
    };

    DrawChinese.prototype.strokeWords = function(words) {
      var a, _i, _len, _ref, _results;
      _ref = words.split(/(?:)/).reverse();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        _results.push(this.strokeWord(a));
      }
      return _results;
    };

    return DrawChinese;

  })();

  window.DrawChinese = DrawChinese;

}).call(this);
