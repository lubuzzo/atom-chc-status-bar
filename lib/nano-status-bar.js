var nano;

nano = null;

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
    if (nano != null) {
      nano.destroy();
    }

    return nano = null;
  },
  consumeStatusBar: function(statusBar) {
    var NanoStatusBarView;
    NanoStatusBarView = require('./nano-status-bar-view');
    nano = new NanoStatusBarView();
    nano.initialize(statusBar);
    return nano.attach();
  }
};
