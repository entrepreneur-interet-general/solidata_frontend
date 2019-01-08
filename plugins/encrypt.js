import Vue from 'vue'
import JSEncrypt from 'jsencrypt'

// const NodeRSA = require('node-rsa')

console.log("\plugins/encrypt... " ) ;

Vue.prototype.$EncryptionRSA = ( string_to_encrypt, public_key ) => {

	// 	// cf : https://github.com/travist/jsencrypt 

	console.log("\> > > plugin EncryptionRSA / string_to_encrypt : ", string_to_encrypt ) ;
	console.log("\> > > plugin EncryptionRSA / public_key : ", public_key ) ;


	// NODE-RSA TEST
	// const key = new NodeRSA(pem_public_key);
	// // string to bytes
	// var buffer = new Buffer(string_to_encrypt, "utf8")
	// var encrypted = key.encrypt(buffer, "hex")


	// JSENCRYPT 
	// Encrypt with the public key...
	var encrypt = new JSEncrypt();
	console.log("\> > > plugin EncryptString / encrypt : ", encrypt ) ;
	encrypt.setPublicKey(public_key);
	var encrypted = encrypt.encrypt(string_to_encrypt);

	
	console.log("\> > > plugin EncryptString / encrypted : ", encrypted ) ;

	return {
		salt	: public_key,
		hashed	: encrypted
	}

}


