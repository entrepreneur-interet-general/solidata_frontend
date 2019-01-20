
// import jsonwebtoken from 'jsonwebtoken'

// console.log("loading jsonwebtoken...", jsonwebtoken )

// const generateJWT512 = {

// 	// cf : https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
// 	// cf : https://github.com/brix/crypto-js 

// 	generateJWT512 (string_to_encrypt, salt) {

// 		console.log("\generateJWT.generateJWT512 / string_to_encrypt : ", string_to_encrypt ) ;
// 		console.log("\generateJWT.generateJWT512 / salt : ", salt ) ;
		
// 		console.log("\generateJWT.generateJWT512 / jsonwebtoken : ", jsonwebtoken ) ;

// 		var jwt_generated = jsonwebtoken.sign(string_to_encrypt, salt).toString(); /** Hashing algorithm sha512 */

// 		console.log("\generateJWT.generateJWT512 / hash : ", hash ) ;

// 		return {
// 			salt	: salt,
// 			hashed	: jwt_generated
// 		};
		
// 	}

// }

// export default generateJWT512