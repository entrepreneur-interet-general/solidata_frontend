const checkDocUserAuth = function(item_doc, field_name, isLogged, user_id) {

	// console.log("\nutils/checkDocUserAuth..." ) ;

	// TO DO : check also by field_name

	var can_update_field 	= false  ;
	var doc_auth_edit 		= item_doc.public_auth.open_level_edit ; 


	if (doc_auth_edit == 'open_data' ){
		can_update_field = true
	}

	else if (doc_auth_edit == 'commons') {
		//  check if user is connected
		if ( isLogged ){
			can_update_field = true
		}
	} 

	else if (doc_auth_edit == 'collective') {
		//  check if user is part of the team
		var doc_creator 		= item_doc.log.created_by ; 
		var doc_auth_team 		= item_doc.team ; 
		doc_auth_team = doc_auth_team.filter(function(d) { return d.oid_usr == doc_creator ; });

		// console.log("utils/checkDocUserAuth ... doc_auth_team", doc_auth_team ) ;
		if ( user_id == doc_creator || doc_auth_team.lenght == 1 ){
			can_update_field = true
		}
	} 

	else if (doc_auth_edit == 'private') {
		//  check if user is the owner
		var doc_creator 		= item_doc.log.created_by ; 
		// console.log("utils/checkDocUserAuth ...", item_doc.public_auth ) ;
		if ( user_id == doc_creator ){
			can_update_field = true
		}
	} 

	return can_update_field
}

export default checkDocUserAuth
