const checkDocUserAuth = function(item_doc, field_name, isLogged, user_id) {

	// console.log("\nutils / checkDocUserAuth..." ) ;

	// TO DO : check also by field_name + user_role
	// console.log("\nutils / checkDocUserAuth - field_name : ", field_name ) ;

	var can_update_field 	= false  ;
	var doc_auth_edit 		= item_doc.public_auth.open_level_edit ; 

	// console.log("utils / checkDocUserAuth - doc_auth_edit : ", doc_auth_edit ) ;

	// OPEN DATA -> even anonymous users can update
	if ( doc_auth_edit == 'open_data' ) {
		can_update_field = true
	}

	// only for logged users
	if ( isLogged ) {

		//  COMMONS -> check if user is connected
		if (doc_auth_edit == 'commons') {
			can_update_field = true
		} 
	
		// COLLECTIVE -> check if user is part of the team
		else if (doc_auth_edit == 'collective') {
			var doc_creator 		= item_doc.log.created_by ; 
			var doc_auth_team 		= item_doc.team ; 
			// console.log("\nutils / checkDocUserAuth - doc_auth_team : ", doc_auth_team ) ;
	
			doc_auth_team = doc_auth_team.filter(function(d) { return d.oid_usr == doc_creator ; });
	
			// console.log("utils/checkDocUserAuth ... doc_auth_team : ", doc_auth_team ) ;
			if ( user_id == doc_creator || doc_auth_team.lenght == 1 ){
				can_update_field = true
			}
		} 
	
		// PRIVATE -> check if user is the owner
		else if (doc_auth_edit == 'private') {
			var doc_creator 		= item_doc.log.created_by ; 
			// console.log("utils/checkDocUserAuth ...", item_doc.public_auth ) ;
			if ( user_id == doc_creator ){
				can_update_field = true
			}
		} 

	}

	// console.log("utils / checkDocUserAuth - can_update_field : ", can_update_field ) ;

	return can_update_field
}

export default checkDocUserAuth
