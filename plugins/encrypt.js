import Vue from 'vue'
import JSEncrypt from 'jsencrypt'

// const NodeRSA = require('node-rsa')

console.log('> > > plugins/encrypt... ')

Vue.prototype.$EncryptionRSA = (stringToEncrypt, publicKey) => {
  // cf : https://github.com/travist/jsencrypt

  console.log('> > > plugin EncryptionRSA / stringToEncrypt : ', stringToEncrypt)
  console.log('> > > plugin EncryptionRSA / publicKey : ', publicKey)

  // NODE-RSA TEST
  // const key = new NodeRSA(pem_public_key);
  // // string to bytes
  // var buffer = new Buffer(stringToEncrypt, "utf8")
  // var encrypted = key.encrypt(buffer, "hex")

  // JSENCRYPT
  // Encrypt with the public key...
  var encrypt = new JSEncrypt()
  console.log('> > > plugin EncryptString / encrypt : ', encrypt)
  encrypt.setPublicKey(publicKey)
  var encrypted = encrypt.encrypt(stringToEncrypt)

  console.log('> > > plugin EncryptString / encrypted : ', encrypted)

  return {
    salt: publicKey,
    hashed: encrypted
  }
}
