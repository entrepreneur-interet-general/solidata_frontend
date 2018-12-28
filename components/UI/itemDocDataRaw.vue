<template>

	<v-card 
		v-show="!is_preview"
		class="grey lighten-3 elevation-0 mt-0 pa-4"
		>

		<!-- is_preview - {{ is_preview }} -->

		<!-- DOC DATA RAW -->
		<v-layout row wrap >

			<!-- infos - {{ item_doc.infos }} -->

			<!-- DOC DATA RAW -->
			<v-flex xs7>
				<v-layout row wrap>

					<!-- DOC DATA_RAW / TEXTS -->
					<v-flex 
						xs12
						>
						<!-- <br>- {{ itemId }} -->
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'data_raw'"
							:subField="'f_code'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['data_raw']['f_code']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('data_raw.f_code')"
							:is_file="is_file"
							:filetype="filetype"
							:is_loading="loading"
							:no_subField="no_subField"
							@input="updateIsFile"
							>
						</ValueEdit>
					</v-flex>

					<v-flex 
						xs12
						>
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'f_object'"
							:subField="'f_object'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['data_raw']['f_object']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('data_raw.f_object')"
							:is_file="is_file"
							:filetype="filetype"
							:is_loading="loading"
							:no_subField="no_subField"
							@input="updateIsFile"
							>
						</ValueEdit>
					</v-flex>

				</v-layout>
			</v-flex>


			<!-- DOC DATA RAW / CHOICES-->
			<v-flex xs5>
				<v-layout row wrap>

					<!-- DOC F_TYPE -->					
					<v-flex 
						xs12
						>
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'data_raw'"
							:subField="'f_type'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['data_raw']['f_type']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('data_raw.f_type')"
							:is_file="is_file"
							:filetype="filetype"
							:is_loading="loading"
							:no_subField="no_subField"
							@input="updateIsFile"
							>
						</ValueEdit>
					</v-flex>

					<!-- DOC F_TYPE -->					
					<v-flex 
						xs12
						>
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'data_raw'"
							:subField="'f_is_required'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['data_raw']['f_is_required']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('data_raw.f_is_required')"
							:is_file="is_file"
							:filetype="filetype"
							:is_loading="loading"
							:no_subField="no_subField"
							@input="updateIsFile"
							>
						</ValueEdit>
					</v-flex>

				</v-layout>
			</v-flex>


		</v-layout>

	</v-card>
	
</template>


<script>

import ObjectFormatterCreate from "~/utils/ObjectFormatterCreate.js"
import checkDocUserAuth from "~/utils/checkDocUserAuth.js"

import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'


export default {

	props : [ 
		// "flex_vars",			// 

		"coll",
		"is_create",			// view | create
		"is_preview",			// 
		"item_doc", 			// complete item infos

		// "is_switch",
		// "no_toolbar"
	],

	components : {

		ValueEdit,

	},




	mounted () {
		console.log("\n- itemDocInfos / created ---> item_doc : ", this.item_doc ) ;
		this.itemDoc = this.item_doc ;
		this.onResize() ; 
		window.addEventListener('resize', this.onResize, { passive: true })
	},

	beforeDestroy () {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.onResize, { passive: true })
		}
	},

	data () {

		return {
			
			alert		: null,
			// isPreview 	: this.is_preview,
			no_subField : true,

			
			collName 		: this.$store.state.collectionsNames[this.coll],

			no_licence_docs : ['tag', 'dmt', 'dmf'], 

			itemId 			: this.item_doc._id, 
			itemDoc			: this.item_doc,
			// item_data 		: this.item_doc.data_raw.f_data, 
			// item_headers 	: this.item_doc.data_raw.f_col_headers, 

			is_file 			: null,
			filetype 			: null,

			// data table : loading, pagination 
			loading 		: false,
			pagination 		: {},
			total_items		: 0, // per page must be in [0, 2, 5, 10, 20, 25, 50, 100]

			// data table - edit/create item
			dialog			: false,
			editedIndex		: -1,
			// editedItem		: {},
			// defaultItem		: this.fill_defaultItem(),


			blockFullSize 		: "xs12",
			blockPartSize 		: "xs10",
			blockSwitchSize 	: "md6 offset-md3",

			parentFieldsSize 	: "xs2 ma-0 pa-0",
			parentBotPadding	: " pb-0 pt-1",
			parentNoBotPadding	: " py-0",

			valueNoPadding 		: " ma-0 pa-0",
			valueLeftPadding 	: " ma-0 py-0 pr-0 pl-2",

			createHeight  		: "",
			createSize			: 12

		}
	},

	computed : {


	},


	// mounted () {
	// 	this.getDataFromApi()
	// 	.then(data => {
	// 		this.desserts = data.items
	// 		this.totalDesserts = data.total
	// 	})
	// },
	

	watch: {
		
		dialog (val) {
			val || this.close()
		},
	
	},

	methods: {
		

		onResize () {
			this.no_subField = window.innerWidth < 1100
		},

		// PREALOADS / UPDATES
		preloadIsFile () {
			var isFile = false ;
			if ( this.coll == "dsi"){
				if(this.item_doc.specs.src_type != "API") {
					isFile = true
				}
			}
			return isFile
		},

		preloadFileType () {
			var filetype ;
			if ( this.coll == "dsi"){
				filetype = this.item_doc.specs.src_type
			}
			return filetype
		},

		updateIsFile(val) {
			
			// if( val.subField == "src_type"){
			if( val.subField == "switchFileType"){
				console.log("\n updateIsFile - src_type / val : ", val)
				this.is_file = val.is_file ;
				this.filetype = val.filetype ;
			}

			if( val.subField == "fileExt"){
				console.log("\n updateIsFile - fileExt / val : ", val)
				this.itemDoc.specs.src_type = val.fileExt ;
				this.filetype = val.fileExt ;
			}
			
			console.log("updateIsFile / this.filetype : ", this.filetype)

		},



		//  USER AUTH  - checkUserAuth for an item --> /utils
		checkUserAuth (field_name) {

			console.log("\ncheckUserAuth / field_name : ", field_name ) ;
			// console.log("checkUserAuth ...\n", this.item_doc.public_auth ) ;

			var can_update_field 		= false  ;
			
			if (this.is_create) {
				can_update_field 		= true  ;
			}

			else {
				var isLogged 			= this.$store.state.auth.isLogged ;
				var user_id 			= this.$store.state.auth.user_id ;

				can_update_field 		= checkDocUserAuth(this.item_doc, field_name, isLogged, user_id)
			}

			console.log("checkUserAuth / can_update_field : ", can_update_field ) ;

			return can_update_field
		},


	}


}

</script>