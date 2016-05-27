/**
 * debug.js
 *
 * Functions for testing, debugging and general troubleshooting. Probably not
 * needed on a live page.
 *
 */

({
  /**
   * Module information
   */
  name: "Debug",
  description: "TEsting, debugging and troubleshooting.",
  version: "0.0.1",
  author: {
    name: "University of York Digital Team",
    url: "http://yorkwebteam.blogspot.co.uk/"
  },
  contributors: [
    {
      name: "Chris Marsh",
      email: "chris.marsh@york.ac.uk",
      url: "http://www-users.york.ac.uk/~cm1438/"
    }
  ],

  /**
   * Enable console.logging
   */
  console: {
    log: function(textOrObj) {
      document.write('<script>console.log("'+textOrObj+'");</script>\n');
    },
    warn: function(textOrObj) {
      document.write('<script>console.warn("'+textOrObj+'");</script>\n');
    },
    error: function(textOrObj) {
      document.write('<script>console.error("'+textOrObj+'");</script>\n');
    },
  },

  /**
   * Function to list all of the available properties of an object
   *
   * @param  myObject  The object to get information about (Object)
   *
   * @return           A list of all object information (String)
   */
  viewObjectProperties: function (myObject) {
    var output = "<pre>";
    for (var prop in myObject) {
      output += "object [" + prop + "] :  " + myObject[prop] + "<br/>";
    }
    output+= "</pre>";
    return output;
  },

  /**
   * Internal initialisation function
   *
   * This is needed for each module. It should be noted that this function self-
   * destructs (deletes) once called.
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