
import CryptoJS from 'crypto-js'
import JWT from 'jsonwebtoken'
import sjcl from 'sjcl'
import JSEncrypt from 'jsencrypt'
import forge from 'node-forge'


console.log("loading CryptoJS...", CryptoJS )
console.log("loading JWT...", JWT )


function base64url(source) {
	
	console.log("\base64url / source : ", source ) ;

	// Encode in classical base64
	var encodedSource = CryptoJS.enc.Base64.stringify(source);
	console.log("\base64url / encodedSource (A): ", encodedSource ) ;
	
	// Remove padding equal characters
	encodedSource = encodedSource.replace(/=+$/, '');
	
	// Replace characters according to base64url specifications
	encodedSource = encodedSource.replace(/\+/g, '-');
	encodedSource = encodedSource.replace(/\//g, '_');
	console.log("\base64url / encodedSource (END): ", encodedSource ) ;
	
	return encodedSource;
}

const EncryptString = {

	// cf : https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
	// cf : https://github.com/brix/crypto-js 


	EncryptionRSA (string_to_encrypt, public_key) {

		// cf : https://github.com/travist/jsencrypt 

		console.log("\EncryptString.EncryptionRSA / string_to_encrypt : ", string_to_encrypt ) ;
		console.log("\EncryptString.EncryptionRSA / public_key : ", public_key ) ;

		// Encrypt with the public key...
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(public_key);
		var encrypted_pwd = encrypt.encrypt(string_to_encrypt);

		console.log("\EncryptString.EncryptionRSA / encrypted_pwd : ", encrypted_pwd ) ;

		return {
			salt	: public_key,
			hashed	: encrypted_pwd
		}

	},

	// EncryptionForgeRSA (string_to_encrypt, public_key) {

	// 	// cf : https://github.com/travist/jsencrypt 

	// 	console.log("\EncryptString.EncryptionForgeRSA / string_to_encrypt : ", string_to_encrypt ) ;
	// 	console.log("\EncryptString.EncryptionForgeRSA / public_key : ", public_key ) ;

	// 	var publicKey = forge.pki.publicKeyFromPem(public_key);
	// 	console.log("\EncryptString.EncryptionForgeRSA / publicKey : ", publicKey ) ;

	// 	// Encrypt with the public key...
	// 	var encrypted = publicKey.encrypt(string_to_encrypt, "RSA-OAEP", {
	// 		md		: forge.md.sha256.create(),
	// 		mgf1	: forge.mgf1.create()
	// 	});
	// 	var encrypted_pwd = forge.util.encode64(encrypted);

	// 	console.log("\EncryptString.EncryptionForgeRSA / encrypted_pwd : ", encrypted_pwd ) ;

	// 	return {
	// 		salt	: public_key,
	// 		hashed	: encrypted_pwd
	// 	}

	// },

	// sha512 (string_to_encrypt, salt) {

	// 	console.log("\EncryptString.sha512 / string_to_encrypt : ", string_to_encrypt ) ;
	// 	console.log("\EncryptString.sha512 / salt : ", salt ) ;
		
	// 	console.log("\EncryptString.sha512 / CryptoJS.HmacSHA512 : ", CryptoJS.HmacSHA512 ) ;

	// 	var hash = CryptoJS.HmacSHA512(string_to_encrypt, salt).toString(); /** Hashing algorithm sha512 */

	// 	console.log("\EncryptString.sha512 / hash : ", hash ) ;

	// 	return {
	// 		salt	: salt,
	// 		hashed	: hash
	// 	};
		
	// },

	// homemadeJWT (string_to_encrypt, salt) {
	// 	// cf : https://codepen.io/jpetitcolas/pen/zxGxKN 
	// 	// cf : https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html 

	// 	console.log("\EncryptString.homemadeJWT / string_to_encrypt : ", string_to_encrypt ) ;
	// 	console.log("\EncryptString.homemadeJWT / salt : ", salt ) ;

	// 	var header = {
	// 		"typ": "JWT",
	// 		"alg": "HS256",
	// 	};

	// 	var data = {
	// 		pwd : string_to_encrypt
	// 	};

	// 	var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
	// 	var encodedHeader = base64url(stringifiedHeader);
	// 	console.log("\EncryptString.homemadeJWT / encodedHeader : ", encodedHeader ) ;

	// 	var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
	// 	var encodedData 	= base64url(stringifiedData);
	// 	console.log("\EncryptString.homemadeJWT / encodedData : ", encodedData ) ;

	// 	var signature = encodedHeader + "." + encodedData;
	// 	signature = CryptoJS.HmacSHA256(signature, salt);
	// 	signature = base64url(signature);
	// 	console.log("\EncryptString.homemadeJWT / signature : ", signature ) ;

	// 	var hashed_jwt = encodedHeader + "." + encodedData + "." + signature

	// 	return {
	// 		salt	: salt,
	// 		hashed	: hashed_jwt
	// 	};
	// },

	// EncryptionSCJL (string_to_encrypt, salt_key) {
		
	// 	console.log("\nEncryptString.EncryptionSCJL / sjcl : ", sjcl ) ;
		
	// 	console.log("\EncryptString.EncryptionSCJL / string_to_encrypt : ", string_to_encrypt ) ;
	// 	console.log("\EncryptString.EncryptionSCJL / salt_key : ", salt_key ) ;

	// 	var encrypted = sjcl.encrypt(salt_key, string_to_encrypt)
	// 	console.log("\EncryptString.EncryptionSCJL / encrypted : \n", encrypted ) ;
		
	// 	return {
	// 		salt	: salt_key,
	// 		hashed	: encrypted
	// 	};
	// },

	// AESEncryption (string_to_encrypt, salt_key) {

	// 	console.log("\nEncryptString.AESEncryption / CryptoJS : ", CryptoJS ) ;
		
	// 	console.log("\EncryptString.AESEncryption / string_to_encrypt : ", string_to_encrypt ) ;
	// 	console.log("\EncryptString.AESEncryption / salt_key : ", salt_key ) ;

	// 	var encrypted = CryptoJS.AES.encrypt(string_to_encrypt, salt_key);
	// 	var encrypted_hex = encrypted.toString()
	// 	console.log(encrypted_hex); // this is the value you send over the wire


	// 	// var encrypted_test	= CryptoJS.AES.encrypt( 
	// 	// 	CryptoJS.enc.Utf8.parse(string_to_encrypt), 
	// 	// 	salt_key, 
	// 	// 	{ 	
	// 	// 		mode: CryptoJS.mode.ECB, 
	// 	// 		padding: CryptoJS.pad.NoPadding 
	// 	// 	} 
	// 	// )

	// 	// console.log("\EncryptString.AESEncryption / encrypted_test : ", encrypted_test ) ;
	// 	// var encrypted_hex = Crypto.util.bytesToHex(encrypted);
	// 	// console.log(encrypted_hex); // this is the value you send over the wire



	// 	// // Crypto = CryptoJS.Crypto;

	// 	// // var KEY = 'This is a key123';
	// 	// var IV = 'IV_solidata';
	// 	// var MODE = new CryptoJS.mode.CFB(CryptoJS.pad.ZeroPadding);
	// 	// console.log("\EncryptString.AESEncryption / CryptoJS : ", CryptoJS ) ;

	// 	// var input_bytes = Crypto.charenc.UTF8.stringToBytes(string_to_encrypt);
	// 	// var key = Crypto.charenc.UTF8.stringToBytes(salt_key);
	// 	// var options = {iv: Crypto.charenc.UTF8.stringToBytes(IV), asBytes: true, mode: MODE};
		
	// 	// var encrypted = CryptoJS.AES.encrypt(input_bytes, key, options);
	// 	// var encrypted_hex = Crypto.util.bytesToHex(encrypted);
	// 	// console.log(encrypted_hex); // this is the value you send over the wire
		
	// 	return {
	// 		salt	: salt_key,
	// 		hashed	: encrypted_hex
	// 	};

	// },

	// StandardAES (string_to_encrypt, salt_key) {

	// 	// cf : https://gist.github.com/LucaLanziani/5705257

	// 	var KEY = salt_key
	// 	var IV = '9AAECFCF7E82ABB8118D8E567D42EE86'
	// 	var PLAIN_TEXT = string_to_encrypt
		
	// 	var encrypt = function (my_key, my_iv, my_plain_text) {

	// 		var key = CryptoJS.enc.Hex.parse(my_key || KEY);
	// 		var iv  = CryptoJS.enc.Hex.parse(my_iv || IV);
	// 		var text = my_plain_text || PLAIN_TEXT

	// 		var result = CryptoJS.AES.encrypt(text, key, {iv:iv, mode: CryptoJS.mode.CFB})

	// 		result.text = text
	// 		return result
						
	// 	};
		
	// 	var result = encrypt()

	// 	return {
	// 		salt	: salt,
	// 		hashed	: hash
	// 	}

	// },




}

export default EncryptString