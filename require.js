/* require.js */
/* global dbStatement, publishCache, section, content, language, isPreview, com, org */

({
  /* Go fetch an item from the media library based on name in config */
  require: function(moduleName) {
    if (!!content === false) content = null;
    var moduleID = this.config[moduleName] || false;
    if (!!moduleID === false) throw new Error("No module ID for "+moduleName);
    // SiteManager has a fit if you don't separate the 't' and the '4' ¯\_(ツ)_/¯
    var t4Tag = '<t'+'4 type="media" id="'+moduleID+'" formatter="inline/*" />';
    var moduleObject = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, t4Tag);
    if (moduleObject.isEmpty() === true) throw new Error("No module content for "+moduleName);
    var module = eval(String(moduleObject));
    return module;
  },
  // IDs in media library of available modules
  config: {
    "fetch": 460179,
    "t4": 460180,
    "debug": 460181,
    "utils": 410587
  },

  init: function (node) {

    node = node || this;
    node.base = this;
    for (var i in node) {
      if ((i !== "base") && (typeof node[i] === "object")) {
        this.init(node[i]);
      }
    }
    if (this === node) {
      delete this.init;
    }
    return this;
  }

}).init();