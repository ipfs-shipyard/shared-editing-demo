# Shared editing demo (over Yjs and IPFS)

Hi, welcome!

In this video I’ll show you how to build an distributed application that allows for several users to edit the same document at the same time, something similar to Google Docs, but without any coordinating server.

IPFS stands for Interplanetary File System, and is much more than a file system. It’s an entire network stack for the decentralised and peer-to-peer web, allowing you to build truly serverless web applications.

If you want to find out more about IPFS you can head out to IPFS’s website, ipfs.io.

In this screencast we’ll be using js-ipfs, which is a Javascript implementation of IPFS that works in Node.js and in a modern browser.

## Our goal

Our goal today is to create a text editor that requires no server but yet, allows several users to edit it in a collaborative fashion. We can call it “google docs without google for plain text”.

## Repo

The product of this demo is located in [this GitHub repo](https://github.com/ipfs-labs/shared-editing-demo). Feel free to download it, install it and poke around. It’s simple, and instructions are in the README.

If you’re curious, I’ll next show you the steps you need to take to create this application.

## The recipe

Your’re going to need some things to make this happen:

* Node.js
* js-IPFS
* Browserify
* Yjs
* Y-ipfs-connector
* http-server

Also, you will need to know a bit of basic javascript to be able to understand this video.

Next, I’ll show you the steps you need to take to install them.

## Installation

If you don’t have Node.js installed, you can head out to nodejs.org and following the installations instructions there.

## Create dir and project

After that, you can create the project dir.
And run `npm init` to initialise our application package.json manifest.

## Serve some static files

Next you’ll need to install the `http-server` package so that we can serve some static files.

We can now create a start script in our `package.json` manifest that starts our HTTP server.

## Create a static page

Now we need to create a "public" directory that will host our static files.

Now we need to create a really simple static webpage that contains a text area and a script tag for our application code.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Y IPFS Example</title>
  </head>
  <body>
    <textarea style="width: 100%; height: 500px" id="textfield"></textarea>
    <script src="js/app.js"></script>
  </body>
</html>
```

We can now start our web server and try to load our webpage.

It says the javascript file was not found. Let’s take care of that now.

## Bundling with Browserify

To deploy our application we’ll need to create a single packaged javascript file containing the entirety of our app. For that we’re going to use Browserify, which you should install using npm:

`$ npm install browserify —save`

Now we can create an npm "compile" script that we can run from the command line.

```
browserify src/app.js -o public/js/app.js -d"
```

Let’s create an application that just outputs “Hello World” for now in src/app.js:


```
console.log('Hello World!')
```

Let’s compile it and try it out.

## Creating an IPFS node

Now we need to download and install js-IPFS using npm:

```
$ npm install ipfs —save
```

In the app, we now need to create an IPFS node:

```js
const IPFS = require(‘ipfs’)
const ipfs = new IPFS({
  repo: repo(),
  config: {
    Addresses: {
      Swarm: [
        '/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss'
      ]
    },
    Discovery: {
      webRTCStar: {
        Enabled: true
      }
    }
  },
  EXPERIMENTAL: {
    pubsub: true
  }
})

ipfs.once(‘ready’, () => ipfs.id((err, peerInfo) => {
  If (err) { throw err }
  console.log(‘IPFS node started and has ID ‘ + peerInfo.id)
})

function repo () {
  return 'ipfs/yjs-demo/' + Math.random()
}
```

## Install Yjs (and other dependencies)

Now we’re going to need to install Yjs. Yjs is a library and framework that allows offline-first and decentralised collaborative editing of structured data like text and JSON.

It is composed of a main package (“yjs”) and some modules you can plug into Yjs.
We’ll be needing the following:

```
$ npm install yjs y-array y-text y-memory -—save
```

We’ll also need our Yjs IPFS connector, which allows Yjs to use the IPFS network.

```
$ npm install y-ipfs-connector —save
```

Now we’re going to bring all of these together inside our app code.

First, some dependencies:

```js
const Y = require(‘yjs’)

// Yjs plugins
require('y-memory')(Y)
require(‘y-ipfs-connector’)(Y)
require('y-array')(Y)
require('y-text')(Y)
```

And then setting up Yjs:

```js
Y({
  db: {
    name: 'memory'
  },
  connector: {
    name: 'ipfs', // use the IPFS connector
    room: 'Textarea-example-dev',
    ipfs: ipfs
  },
  share: {
    textarea: 'Text' // y.share.textarea is of type Y.Text
  }
}).then(function (y) {
  // bind the textarea to a shared text element
  y.share.textarea.bind(document.getElementById('textfield'))
})
```

Let’s then compile this and try it out.


## Summary

In this video we saw how you can start creating a collaborative text editor based on Yjs and IPFS. We setup our project, installed some dependencies, setup an IPFS node, a Yjs instance were able to sync the state between peers in a conflict-free way.

## CRDTs

If you’re interested in this subject of research and development, there is a IPFS repo dedicated to gathering resources on the subject of Conflict-Free Replicated Data Types (CRDT for short) at https://github.com/ipfs/research-CRDT . Feel free to read more, watch some lectures and tutorials and poke around.

---

That’s all for now.

Hope you enjoyed watching this video. See you soon!
