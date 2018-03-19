var ChaincoinStatusBarView, CompositeDisposable, ChaincoinPrice, subscriptions,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ChaincoinPrice = require('./chaincoin-price');

CompositeDisposable = require('atom').CompositeDisposable;

subscriptions = new CompositeDisposable;

ChaincoinStatusBarView = (function(superClass) {
  extend(ChaincoinStatusBarView, superClass);

  function ChaincoinStatusBarView() {
    this.build = bind(this.build, this);
    return ChaincoinStatusBarView.__super__.constructor.apply(this, arguments);
  }

  ChaincoinStatusBarView.prototype.initialize = function(statusBar) {
    this.statusBar = statusBar;
    subscriptions.add(atom.commands.add('atom-workspace', {
      'chaincoin-status-bar:toggle': (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)
    }));
    subscriptions.add(atom.commands.add('atom-workspace', {
      'chaincoin-status-bar:refresh': (function(_this) {
        return function() {
          return _this.build();
        };
      })(this)
    }));
    this.observeDisplay = atom.config.observe('chaincoin-status-bar.display', (function(_this) {
      return function(newValue, previous) {
        return _this.build();
      };
    })(this));
    return this.initEls();
  };

  ChaincoinStatusBarView.prototype.initEls = function() {
    this.classList.add('chaincoin-box', 'inline-block');
    this.setAttribute('id', 'chaincoin-status-bar');
    this.one_into_usd = document.createElement('span');
    this.one_into_usd.textContent = '1 CHC = $';
    this.usd_price = document.createElement('span');
    this.appendChild(this.one_into_usd);
    this.appendChild(this.usd_price);

    return this;
  };

  ChaincoinStatusBarView.prototype.attach = function() {
    var minutes, refresh;
    this.build();
    minutes = atom.config.get('chaincoin-status-bar.refresh');
    if (minutes > 0) {
      refresh = minutes * 60 * 1000;
      return setInterval(((function(_this) {
        return function() {
          return _this.build();
        };
      })(this)), refresh);
    }
  };

  ChaincoinStatusBarView.prototype.toggle = function() {
    if (this.hasParent()) {
      return this.detach();
    } else {
      return this.attach();
    }
  };

  ChaincoinStatusBarView.prototype.hasParent = function() {
    var bar, has;
    has = false;
    bar = document.getElementsByTagName('chaincoin-status-bar');

    return has;
  };

  ChaincoinStatusBarView.prototype.detach = function() {
    var bar, el, parent;
    bar = document.getElementsByTagName('chaincoin-status-bar');
    if (bar !== null) {
      if (bar.item() !== null) {
        el = bar[0];
        parent = el.parentNode;
        if (parent !== null) {
          return parent.removeChild(el);
        }
      }
    }
  };

  ChaincoinStatusBarView.prototype.destroy = function() {
    var ref;
    if ((ref = this.tile) != null) {
      ref.destroy();
    }
    return this.detach();
  };

  ChaincoinStatusBarView.prototype.build = function() {
    return ChaincoinPrice((function(_this) {
      return function(coin) {
        _this.usd_price.textContent = coin;

        if (atom.config.get('chaincoin-status-bar.display') === 'left') {
          _this.tile = _this.statusBar.addLeftTile({
            priority: 100,
            item: _this
          });
        } else {
          _this.tile = _this.statusBar.addRightTile({
            priority: 100,
            item: _this
          });
        }
      };
    })(this));
  };

  return ChaincoinStatusBarView;

})(HTMLDivElement);

module.exports = document.registerElement('chaincoin-status-bar', {
  prototype: ChaincoinStatusBarView.prototype
});
