const IPFS = require('ipfs')

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

ipfs.once('ready', () => ipfs.id((err, peerInfo) => {
  if (err) { throw err }
  console.log('IPFS node started with address ' + peerInfo.id)
}))

// Setup Yjs

const Y = require('yjs')
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-ipfs-connector')(Y)

Y({
  db: {
    name: 'memory'
  },
  connector: {
    name: 'ipfs',
    room: 'ipfs-yjs-demo',
    ipfs: ipfs
  },
  share: {
    textarea: 'Text'
  }
}).then((y) => {
  y.share.textarea.bind(document.getElementById('textfield'))
})

function repo () {
  return 'ipfs/yjs-demo/' + Math.random()
}