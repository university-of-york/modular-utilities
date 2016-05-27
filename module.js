/**
 * Name of file
 *
 * Brief description of included functionality and what other functions could be
 * added.
 *
 */

({
  /**
   * Module information
   */
  name: "My module",
  description: "The basis for new modules. Please keep this updated",
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
   * Static value which means something
   */
  importantThing: "h4jen3f90fge0",

  /**
   * Single function
   *
   * This function does a certain functional thing
   *
   * @param  paramName1  Description of first parameter paramName1
   *                     (String/Boolean/Number/Object)
   *
   * @param  paramName2  Description of second parameter paramName2
   *                     (String/Boolean/Number/Object)
   *
   * @return             Description of return value
   *                     (String/Boolean/Number/Object)
   */
  functionName: function (paramName1, paramName2) {
    /**
     *  Function code
     */
    return true;
  },

  /**
   * Group of related functions
   *
   * Describe why they are grouped
   */
  thisGroup: {

    /**
     * Function information as above
     */
    beTrue: function() {
      return true;
    },

    /**
     * Function information as above
     */
    beFalse: function() {
      return false;
    }

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