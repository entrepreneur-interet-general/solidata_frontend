
// // import CryptoJS from 'crypto-js'
// // import JWT from 'jsonwebtoken'
// // import forge from 'node-forge'
// // import sjcl from 'sjcl'
// // import {Crypt, keyManager, RSA} from 'hybrid-crypto-js';

// // import CryptoJS from 'crypto-js'
// // import cryptico from 'cryptico'

// // import crypto from 'crypto'

// import JSEncrypt from 'jsencrypt' 		// import a constructor
// // var JSEncrypt = require('jsencrypt') // import a function

// const NodeRSA = require('node-rsa')



// // console.log("loading CryptoJS...", CryptoJS )
// // console.log("loading JWT...", JWT )

// var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// var b64pad = "=";
// function hex2b64(h) {
//     var i;
//     var c;
//     var ret = "";
//     for (i = 0; i + 3 <= h.length; i += 3) {
//         c = parseInt(h.substring(i, i + 3), 16);
//         ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
//     }
//     if (i + 1 == h.length) {
//         c = parseInt(h.substring(i, i + 1), 16);
//         ret += b64map.charAt(c << 2);
//     }
//     else if (i + 2 == h.length) {
//         c = parseInt(h.substring(i, i + 2), 16);
//         ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
//     }
//     while ((ret.length & 3) > 0) {
//         ret += b64pad;
//     }
//     return ret;
// }


// const EncryptString = {

// 	// cf : https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
// 	// cf : https://github.com/brix/crypto-js 



// 	// WORKING BUT WITH NAVIGATOR NOT DEFINED IF CLIENT RELOADS THE PAGE
// 	EncryptionRSA (string_to_encrypt, public_key) {

// 		// cf : https://github.com/travist/jsencrypt 

// 		console.log("\EncryptString.EncryptionRSA / string_to_encrypt : ", string_to_encrypt ) ;
// 		console.log("\EncryptString.EncryptionRSA / public_key : ", public_key ) ;

// 		if (process.browser || process.client) {
// 			console.log("\n- - - encryptPWD... browesr side")
// 			window.onNuxtReady((app) => {
// 				console.log('Nuxt ready!')
// 			})
// 		  }
// 		else {
// 			console.log("\n- - - encryptPWD... server side")
// 			window.onNuxtReady((app) => {
// 				console.log('Nuxt ready!')
// 			})
// 		}

// 		console.log("\EncryptString.EncryptionRSA / JSEncrypt : ", JSEncrypt ) ;


// 		// Encrypt with the public key...
// 		var encrypt = new JSEncrypt();
// 		console.log("\EncryptString.EncryptionRSA / encrypt : ", encrypt ) ;

// 		encrypt.setPublicKey(public_key);
// 		var encrypted = encrypt.encrypt(string_to_encrypt);

// 		console.log("\EncryptString.EncryptionRSA / encrypted : ", encrypted ) ;

// 		return {
// 			salt	: public_key,
// 			hashed	: encrypted
// 		}

// 	},



// 	// NOT WORKING BUT PROMISING
// 	EncryptionRSA_ ( string_to_encrypt, pem_public_key ) {
		
// 		console.log("\EncryptString.EncryptionRSA  / string_to_encrypt : ", string_to_encrypt ) ;
// 		console.log("\EncryptString.EncryptionRSA  / public_key : ", pem_public_key ) ;
		
// 		// console.log("\EncryptString.EncryptionRSA  / NodeRSA : ", NodeRSA ) ;

// 		const key = new NodeRSA(pem_public_key);
					  
// 		// string to bytes
// 		var buffer = new Buffer(string_to_encrypt, "utf8")

// 		var encrypted = key.encrypt(buffer, "hex")
// 		// type Encoding = | 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'latin1' | 'base64' | 'hex' | 'binary' | 'buffer';
// 		console.log("\EncryptString.EncryptionRSA  / encrypted : \n", encrypted ) ;
		
// 		return {
// 			salt	: pem_public_key,
// 			hashed	: encrypted
// 		};
	
// 	},






// 	// EncryptionRSA ( string_to_encrypt, pem_public_key ) {
		
// 	// 	console.log("\EncryptString.EncryptionRSA  / string_to_encrypt : ", string_to_encrypt ) ;
// 	// 	console.log("\EncryptString.EncryptionRSA  / public_key : ", pem_public_key ) ;
		
// 	// 	console.log("\EncryptString.EncryptionRSA  / crypto : ", crypto ) ;

// 	// 	// string to bytes
// 	// 	var buffer = new Buffer(string_to_encrypt, "utf8")

// 	// 	var encrypted_bytes = crypto.publicEncrypt(pem_public_key, buffer)
// 	// 	console.log("\EncryptString.EncryptionRSA  / encrypted_bytes : \n", encrypted_bytes ) ;
		
// 	// 	var encrypted = encrypted_bytes.toString("base64") ;

// 	// 	return {
// 	// 		salt	: pem_public_key,
// 	// 		hashed	: encrypted
// 	// 	};
	
// 	// },

// 	// EncryptionRSA ( string_to_encrypt, public_key ) {
		
// 	// 	console.log("\EncryptString.EncryptionRSA HybridCrypto / string_to_encrypt : ", string_to_encrypt ) ;
// 	// 	console.log("\EncryptString.EncryptionRSA HybridCrypto / public_key : ", public_key ) ;

// 	// 	var rsa 	= new RSA() 	;
// 	// 	var crypt 	= new Crypt() 	;

// 	// 	console.log("\nEncryptString.EncryptionRSA HybridCrypto / rsa : ", rsa ) ;
// 	// 	console.log("\nEncryptString.EncryptionRSA HybridCrypto / crypt : ", crypt ) ;
		
// 	// 	var encrypted = Crypt.encrypt( public_key, string_to_encrypt )
// 	// 	console.log("\EncryptString.EncryptionRSA HybridCrypto / encrypted : \n", encrypted ) ;
		
// 	// 	return {
// 	// 		salt	: public_key,
// 	// 		hashed	: encrypted
// 	// 	};
	
// 	// },

// 	// EncryptionRSA (string_to_encrypt, public_key) {
		
// 	// 	console.log("\nEncryptString.EncryptionSCJL / sjcl : ", sjcl ) ;
		
// 	// 	console.log("\EncryptString.EncryptionSCJL / string_to_encrypt : ", string_to_encrypt ) ;
// 	// 	console.log("\EncryptString.EncryptionSCJL / public_key : ", public_key ) ;

// 	// 	var encrypted = sjcl.encrypt(public_key, string_to_encrypt)
// 	// 	console.log("\EncryptString.EncryptionSCJL / encrypted : \n", encrypted ) ;
		
// 	// 	return {
// 	// 		salt	: salt_key,
// 	// 		hashed	: encrypted
// 	// 	};
	
// 	// },

// 	// EncryptionRSA (string_to_encrypt, public_key) {

// 	// 	console.log("\EncryptString.EncryptionForgeRSA / string_to_encrypt : ", string_to_encrypt ) ;
// 	// 	console.log("\EncryptString.EncryptionForgeRSA / public_key : ", public_key ) ;

// 	// 	var publicKey = forge.pki.publicKeyFromPem(public_key);
// 	// 	console.log("\EncryptString.EncryptionForgeRSA / publicKey : ", publicKey ) ;

// 	// 	// Encrypt with the public key...
// 	// 	var encrypted = publicKey.encrypt(string_to_encrypt)
// 	// 	// var encrypted = publicKey.encrypt(string_to_encrypt, "RSA-OAEP", {
// 	// 	// 	md		: forge.md.sha256.create(),
// 	// 	// 	mgf1	: forge.mgf1.create()
// 	// 	// });

// 	// 	var encrypted_b = forge.util.bytesToHex(encrypted);
// 	// 	// var encrypted_b = forge.util.encode64(encrypted);

// 	// 	console.log("\EncryptString.EncryptionForgeRSA / encrypted_b : ", encrypted_b ) ;

// 	// 	return {
// 	// 		salt	: public_key,
// 	// 		hashed	: encrypted_b
// 	// 	}

// 	// },

// 	// sha512 (string_to_encrypt, salt) {

// 	// 	console.log("\EncryptString.sha512 / string_to_encrypt : ", string_to_encrypt ) ;
// 	// 	console.log("\EncryptString.sha512 / salt : ", salt ) ;
		
// 	// 	console.log("\EncryptString.sha512 / CryptoJS.HmacSHA512 : ", CryptoJS.HmacSHA512 ) ;

// 	// 	var hash = CryptoJS.HmacSHA512(string_to_encrypt, salt).toString(); /** Hashing algorithm sha512 */

// 	// 	console.log("\EncryptString.sha512 / hash : ", hash ) ;

// 	// 	return {
// 	// 		salt	: salt,
// 	// 		hashed	: hash
// 	// 	};
		
// 	// },

// 	// homemadeJWT (string_to_encrypt, salt) {
// 	// 	// cf : https://codepen.io/jpetitcolas/pen/zxGxKN 
// 	// 	// cf : https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html 

// 	// 	console.log("\EncryptString.homemadeJWT / string_to_encrypt : ", string_to_encrypt ) ;
// 	// 	console.log("\EncryptString.homemadeJWT / salt : ", salt ) ;

// 	// 	var header = {
// 	// 		"typ": "JWT",
// 	// 		"alg": "HS256",
// 	// 	};

// 	// 	var data = {
// 	// 		pwd : string_to_encrypt
// 	// 	};

// 	// 	var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
// 	// 	var encodedHeader = base64url(stringifiedHeader);
// 	// 	console.log("\EncryptString.homemadeJWT / encodedHeader : ", encodedHeader ) ;

// 	// 	var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
// 	// 	var encodedData 	= base64url(stringifiedData);
// 	// 	console.log("\EncryptString.homemadeJWT / encodedData : ", encodedData ) ;

// 	// 	var signature = encodedHeader + "." + encodedData;
// 	// 	signature = CryptoJS.HmacSHA256(signature, salt);
// 	// 	signature = base64url(signature);
// 	// 	console.log("\EncryptString.homemadeJWT / signature : ", signature ) ;

// 	// 	var hashed_jwt = encodedHeader + "." + encodedData + "." + signature

// 	// 	return {
// 	// 		salt	: salt,
// 	// 		hashed	: hashed_jwt
// 	// 	};
// 	// },



// 	// AESEncryption (string_to_encrypt, salt_key) {

// 	// 	console.log("\nEncryptString.AESEncryption / CryptoJS : ", CryptoJS ) ;
		
// 	// 	console.log("\EncryptString.AESEncryption / string_to_encrypt : ", string_to_encrypt ) ;
// 	// 	console.log("\EncryptString.AESEncryption / salt_key : ", salt_key ) ;

// 	// 	var encrypted = CryptoJS.AES.encrypt(string_to_encrypt, salt_key);
// 	// 	var encrypted_hex = encrypted.toString()
// 	// 	console.log(encrypted_hex); // this is the value you send over the wire


// 	// 	// var encrypted_test	= CryptoJS.AES.encrypt( 
// 	// 	// 	CryptoJS.enc.Utf8.parse(string_to_encrypt), 
// 	// 	// 	salt_key, 
// 	// 	// 	{ 	
// 	// 	// 		mode: CryptoJS.mode.ECB, 
// 	// 	// 		padding: CryptoJS.pad.NoPadding 
// 	// 	// 	} 
// 	// 	// )

// 	// 	// console.log("\EncryptString.AESEncryption / encrypted_test : ", encrypted_test ) ;
// 	// 	// var encrypted_hex = Crypto.util.bytesToHex(encrypted);
// 	// 	// console.log(encrypted_hex); // this is the value you send over the wire



// 	// 	// // Crypto = CryptoJS.Crypto;

// 	// 	// // var KEY = 'This is a key123';
// 	// 	// var IV = 'IV_solidata';
// 	// 	// var MODE = new CryptoJS.mode.CFB(CryptoJS.pad.ZeroPadding);
// 	// 	// console.log("\EncryptString.AESEncryption / CryptoJS : ", CryptoJS ) ;

// 	// 	// var input_bytes = Crypto.charenc.UTF8.stringToBytes(string_to_encrypt);
// 	// 	// var key = Crypto.charenc.UTF8.stringToBytes(salt_key);
// 	// 	// var options = {iv: Crypto.charenc.UTF8.stringToBytes(IV), asBytes: true, mode: MODE};
		
// 	// 	// var encrypted = CryptoJS.AES.encrypt(input_bytes, key, options);
// 	// 	// var encrypted_hex = Crypto.util.bytesToHex(encrypted);
// 	// 	// console.log(encrypted_hex); // this is the value you send over the wire
		
// 	// 	return {
// 	// 		salt	: salt_key,
// 	// 		hashed	: encrypted_hex
// 	// 	};

// 	// },

// 	// StandardAES (string_to_encrypt, salt_key) {

// 	// 	// cf : https://gist.github.com/LucaLanziani/5705257

// 	// 	var KEY = salt_key
// 	// 	var IV = '9AAECFCF7E82ABB8118D8E567D42EE86'
// 	// 	var PLAIN_TEXT = string_to_encrypt
		
// 	// 	var encrypt = function (my_key, my_iv, my_plain_text) {

// 	// 		var key = CryptoJS.enc.Hex.parse(my_key || KEY);
// 	// 		var iv  = CryptoJS.enc.Hex.parse(my_iv || IV);
// 	// 		var text = my_plain_text || PLAIN_TEXT

// 	// 		var result = CryptoJS.AES.encrypt(text, key, {iv:iv, mode: CryptoJS.mode.CFB})

// 	// 		result.text = text
// 	// 		return result
						
// 	// 	};
		
// 	// 	var result = encrypt()

// 	// 	return {
// 	// 		salt	: salt,
// 	// 		hashed	: hash
// 	// 	}

// 	// },


// }

// export default EncryptString