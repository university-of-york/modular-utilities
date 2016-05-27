/**
 * fetch.js
 *
 * Functions related to fetching external data, as JSON, HTML or any other data structure.
 *
 */

({
  /**
   * Module information
   */
  name: "Fetch",
  description: "Fetching external files"
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
   * Function for getting an external file
   *
   * This function will save a new version of the file in the default temp
   * directory. If the external file is unavailable, it will load the cached
   * file instead
   *
   * @param  options     The URL to fetch (String) or an options object
   *                     containing url, username, password for Basic Auth
   *                     (Object)
   *
   * @param onComplete   The function to run when finished
   *
   * @return             True if file contents returned, false otherwise (Bool)
   *
   */
  get: function(options, onComplete) {

    importPackage(java.io, java.net);

    var output = "";
    var url, username, password;
    if (typeof options === 'string') {
      url = options;
    } else {
      url = options.url;
      username = options.username;
      password = options.password;
    }

    if (!url || url === '') {
      output = '{ "error":"You must provide a URL" }';
      return false;
      onComplete(output);
    }

    var filename = this.makeFilename(url);
    var tempDir = java.lang.System.getProperty("java.io.tmpdir");
    var filepath = tempDir+File.separator+filename;

    // create new file
    var f = new File(filepath);

    // tests if file exists
    var fileExists = f.exists();

    // Get the URL
    //var url = new URL(url);

    try {

      var openConnection = new URL(url).openConnection();

      if  (username != '' && password != '') {
        // Base64 object - move out to separate file?
        // from https://scotch.io/tutorials/how-to-encode-and-decode-strings-with-base64-in-javascript
        var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
        var userpass = username + ":" + password;
        var encodedString = Base64.encode(userpass);
        var basicAuth = "Basic " + encodedString;
        openConnection.setRequestProperty ("Authorization", basicAuth);
      }

      openConnection.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
      var urlStream = openConnection.getInputStream();

      var reader = new BufferedReader(new InputStreamReader(urlStream, "latin1"));

      var line;
      while (line = reader.readLine()) {
        if (line == null) break;
        output+= line;
      }
      //this.console.log('File fetched successfully');

      // Save it to temp file
      try {

        if (fileExists == true) {
          //this.console.log('File already exists');
          // TODO back it up somewhere in case save doesn't work
        }
        // create new file in the system
        f.createNewFile();

      //write it
        try {
          var bw = new BufferedWriter(new FileWriter(f));
          bw.write(output);
          bw.close();
          //this.console.log('File saved successfully to '+f);
          //return true;
        } catch(e3) {
          document.write('<!-- '+e3.message+' -->\n');
          //this.console.log('Could not write to temp file');
          // TODO reinstate backed up version
          //return false;
        }

      } catch(e2) {
        document.write('<!-- '+e2.message+' -->\n');
        //this.console.log('Could not create temp file');
        //return false;
      }

      return true;

    } catch(e) {

      // Load the temp file
      //this.console.log('File could not be loaded. Falling back to temp.');
      document.write('<!-- '+e.message+' -->\n');

      if (fileExists === false) {
      //this.console.log('Temp file does not exist yet');
        output = '{ "error":"Temp file does not exist yet." }';
        return false;
      }
      try {
        var fr = new FileReader(f);
        var br = new BufferedReader(fr);
        while((line = br.readLine()) != null) {
          output+= line;
        }
        br.close();
        return true;
      } catch (e) {
        //this.console.log('Could not read temp file');
        output = '{ "error":"Could not read temp file" }';
        return false;
      }

      output = '{ "error":"Nothing happening" }';
      return false;

    } finally {

      onComplete(output);

    }

    return true;
  },

  /**
   * Function for getting external JSON files (uses fetch function)
   *
   * @param  options     The URL to fetch (String) or an options object
   *                     containing url, username, password for Basic Auth
   *                     (Object)
   *
   * @param onComplete   The function to run when finished
   *
   * @return             True if file contents returned, false otherwise (Bool)
   *
   */
  getJSON: function(options, onComplete) {

    return this.fetch(options, function(output) {
      onComplete(JSON.parse(output));
    });
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