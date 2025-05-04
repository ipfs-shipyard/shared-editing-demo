import IPFS from "ipfs";

import Y from "yjs";
import y_ipfs_connector from "y-ipfs-connector";
import y_text from "y-text";
import y_array from "y-array";
import y_memory from "y-memory";

Y.extend(y_ipfs_connector, y_text, y_array, y_memory );

function repo () {
  return 'ipfs/yjs-demo/' + Math.random()
}

const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true
  },
    config: { // overload the default config
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/'
            ]
        },
    }
})

ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) { throw err }

  console.log('IPFS node ready with address ' + info.id)

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
      textfield: 'Text'
    }
  }).then((y) => {
    y.share.textfield.bind(document.getElementById('textfield'))
  })
}))
