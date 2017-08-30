# Shared editing demo using IPFS and CRDT

> This codebase was developed to demostrate how to use IPFS in conjuction with [Y.js, a CRDT library](http://y-js.org/).

Links:

- [Transcript](SCRIPT.md)
- [Video of Demo](https://www.youtube.com/watch?v=-kdx8rJd8rQ)
- [Live Demo](<insert IPFS hash>)

## Set up

### Pre-requisites

-  Have Node.js version 6 or greater installed

### Install

```
> git clone https://github.com/ipfs-labs/shared-editing-demo.git
> cd shared-editing-demo
> npm install
```

### Run

```
> npm start
```

### Open in browser

Using a modern browser that supports WebRTC, like a recent version of Chrome or Firefox, open several windows of [http://localhost:12345](http://localhost:12345).

## Development

## Build

```
> npm run build
```

## Known issues

This Demo uses WebRTC to establish the connections between nodes. WebRTC is a CPU intensive protocol and not all Browsers will behave correctly, depending on their implementation of WebRTC or the resources available on the machine that they are running. This is a known issue and something the [js-ipfs team is looking at alternatives to solve](https://github.com/ipfs/js-ipfs/issues/962).

## License

MIT
