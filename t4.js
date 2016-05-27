/**
 * t4.js
 *
 * Functions related to TERMINALFOUR itself
 *
 */

({
  /**
   * Module information
   */
  name: "TERMINALFOUR",
  description: "Functions related to TERMINALFOUR"
  version: "0.0.1",
  author: "Paul Kelly (T4)",

  /**
   * Copyright notice
   */
  copyright: "TERMINALFOUR",

  /**
   * Functions to get information about the TERMINALFOUR installation.
   */
  t4: {

    /**
     * Get the TERMINALFOUR version number.
     *
     * @return Version number (String)
     */
    version: function() {
      return com.terminalfour.sitemanager.SiteManagerVersion.version;
    },

    /**
     * Get the TERMINALFOUR build details.
     *
     * @return Build details (String)
     */
    buildDetails: function() {
      return com.terminalfour.sitemanager.SiteManagerVersion.buildDetails;
    }
  },

  /**
   * Internal initialisation function
   *
   * This is needed for each module. It should be noted that this function self-
   * destructs (deletes) once called.
   *
   */
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