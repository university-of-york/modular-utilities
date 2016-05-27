# Modular Utilities for Programmable Layouts

A system for writing modular utility functions for use in TERMINALFOUR's SiteManager Programmable Layouts.

## What's this for?

In SiteManager, Programmable Layouts are hard. Some people have been hard at work creating utility files which can be imported into Programmable Layouts.

This repo is an attempt to simplify the process of adding new functionality to our utilities file. Instead of having a single utilities file that grows bigger and bigger, the functionality has been split up into modules, which work independently of one another. Each module can be called in to a Programmable Layout when it's needed.

## How can I use it?

### Setting up `require.js`

The central file is called `require.js` (sorry, [RequireJS](http://requirejs.org/)!).

It contains a property called `config`, which contains the names and Media Library IDs of all your modules, for example:

```
config: {
  "fetch": 460179,
  "t4": 460180,
  "debug": 460181,
  "utils": 410587
}
```

This allows you to reference each module by name in a Programmable Layout.

When you have added all your modules to the Media Library and updated their name and ID in the `config` property, you can start using them in your PLs.

### `require`ing modules

Within a PL, you must first of all load up the `require` script. This bit is not very elegant, as it relies on native classes and `eval()`. You'll need to replace `id="xxxx" with the ID of your `require.js` file.

```
importClass(com.terminalfour.publish.utils.BrokerUtils);
var r = eval(String(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="media" id="xxxx" formatter="inline/*" />')));
```

Now you hav a variable `r` which has a `require` method which you can use to import the functionality from your modules.

```
var fetch = r.require('fetch');
fetch.getJSON('http://example.com/somedata.json', callback);
```

## Adding a new module

Included in this repo is a `module.js` file, which can be used as the basis of wach new module. It contains information about the module (a bit like a `package.json` file in a node module), all the methods and properties to be made available to the module, and an `init` function that is deleted when it's run. This makes the module available to be `eval`d.

## Contributing

It would be great to get feedback and advice on how the `require` function could be made better, and to have a good central repository of modules for common use cases. Feel free to send us a pull request or share modules of your own.
