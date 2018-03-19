var chaincoin;

chaincoin = null;

module.exports = {
  config: {
    display: {
      type: 'string',
      'default': 'right',
      'enum': ['left', 'right']
    },
    refresh: {
      type: 'integer',
      'default': 60
    }
  },
  activate: function() {
  },
  deactivate: function() {
    if (chaincoin != null) {
      chaincoin.destroy();
    }

    return chaincoin = null;
  },
  consumeStatusBar: function(statusBar) {
    var ChaincoinStatusBarView;
    ChaincoinStatusBarView = require('./chaincoin-status-bar-view');
    chaincoin = new ChaincoinStatusBarView();
    chaincoin.initialize(statusBar);
    return chaincoin.attach();
  }
};
