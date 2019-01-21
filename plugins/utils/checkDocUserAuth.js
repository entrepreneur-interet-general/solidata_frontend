import Vue from 'vue'

// const checkDocUserAuth = function (itemDoc, field_name, isLogged, userId) {
Vue.prototype.$checkDocUserAuth = (itemDoc, field_name, isLogged, userId) => {
  // console.log("\nutils / checkDocUserAuth..." ) ;

  // TO DO : check also by field_name + user_role
  // console.log("\nutils / checkDocUserAuth - field_name : ", field_name ) ;

  let canUpdateField = false
  const docAuthEdit = itemDoc.public_auth.open_level_edit

  // console.log("utils / checkDocUserAuth - docAuthEdit : ", docAuthEdit ) ;

  // OPEN DATA -> even anonymous users can update
  if (docAuthEdit === 'open_data') {
    canUpdateField = true
  }

  // only for logged users
  if (isLogged) {
    //  COMMONS -> check if user is connected
    if (docAuthEdit === 'commons') {
      canUpdateField = true
    } else if (docAuthEdit === 'collective') {
      // COLLECTIVE -> check if user is part of the team
      let docCreator = itemDoc.log.created_by
      let docAuthTeam = itemDoc.team
      // console.log("\nutils / checkDocUserAuth - docAuthTeam : ", docAuthTeam ) ;

      docAuthTeam = docAuthTeam.filter(function (d) { return d.oid_usr === docCreator })

      // console.log("utils/checkDocUserAuth ... docAuthTeam : ", docAuthTeam ) ;
      if (userId === docCreator || docAuthTeam.lenght === 1) {
        canUpdateField = true
      }
    } else if (docAuthEdit === 'private') {
      // PRIVATE -> check if user is the owner
      let docCreator = itemDoc.log.created_by
      // console.log("utils/checkDocUserAuth ...", itemDoc.public_auth ) ;
      if (userId === docCreator) {
        canUpdateField = true
      }
    }
  }

  // console.log("utils / checkDocUserAuth - canUpdateField : ", canUpdateField ) ;

  return canUpdateField
}

// export default checkDocUserAuth
