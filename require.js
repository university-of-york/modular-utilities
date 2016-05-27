// require.js
importClass(com.terminalfour.publish.utils.BrokerUtils);
var utils = require("utils");

var require = function(moduleName) {
  try {
    var moduleID = this.config[moduleName] || false;
    if (!moduleID) return false;
    return eval(String(utils.processTags('<t4 type="media" id="'+moduleID+'" formatter="inline/*" />')));
  } catch(e) {
    document.write('<pre>Error: '+e+'</pre>')
    return e;
  }
};

// IDs in media library of available modules
require.config = {
  "fetch": 12345,
  "utils": 410587
};

return require;