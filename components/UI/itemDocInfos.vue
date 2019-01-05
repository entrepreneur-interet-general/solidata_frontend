<template>

	<v-card 
		v-show="!is_preview"
		class="grey lighten-3 elevation-0 mt-0 pa-4"
		>

		<!-- is_preview - {{ is_preview }} -->

		<!-- DOC INFOS + PUBLIC_AUTH -->
		<v-layout row wrap >

			<!-- infos - {{ item_doc.infos }} -->

			<!-- DOC INFOS -->
			<v-flex xs6 px-2>
				<v-layout row wrap>

					<!-- DOC TITLE -->
					<v-flex 
						xs12
						>
						<!-- <br>- {{ itemId }} -->
						<!-- <br>- {{ item_headers }} -->
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'infos'"
							:subField="'title'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['infos']['title']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('infos.title')"
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
							:parentField="'infos'"
							:subField="'description'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['infos']['description']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('infos.description')"
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


			<!-- DOC PUBLIC_AUTH + LICENCE -->
			<v-flex xs6 px-2>
				<v-layout row wrap >

					<!-- DOC LICENCE -->
					<v-flex 
						xs12
						v-if="!no_licence_docs.includes(coll)"
						>
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'infos'"
							:subField="'licence'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['infos']['licence']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('infos.licence')"
							:is_file="is_file"
							:filetype="filetype"
							:is_loading="loading"
							:no_subField="no_subField"
							@input="updateIsFile"
							>
						</ValueEdit>
					</v-flex>

					<!-- DOC PUBLIC_AUTH / open_level_show -->
					<v-flex xs12
						>
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'public_auth'"
							:subField="'open_level_show'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['public_auth']['open_level_show']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('public_auth.open_level_show')"
							:is_file="is_file"
							:filetype="filetype"
							:is_loading="loading"
							:no_subField="no_subField"
							@input="updateIsFile"
							>
						</ValueEdit>
					</v-flex>

					<!-- DOC PUBLIC_AUTH / open_level_edit -->
					<v-flex xs12
						>
						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="'public_auth'"
							:subField="'open_level_edit'"
							:is_create="is_create"
							:is_preview="is_preview"
							:item_id="itemId"
							:item_data="itemDoc['public_auth']['open_level_edit']"
							:item_auth="itemDoc.public_auth"
							:canEdit="checkUserAuth('public_auth.open_level_edit')"
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



		<!-- DOC TEAM -->
		<!-- <v-layout row wrap v-show="!is_preview" align-center>

			<v-flex xs4>
				<v-card  color="primary">
					<v-card-text class="px-0">
						team - {{ item_doc.team }}
					</v-card-text>
				</v-card>
			</v-flex> 

		</v-layout> -->




		<!-- DOC SPECS -->
		<v-layout row wrap>

			<!-- specs - {{ item_doc.specs }} -->

			<!-- DOC SRC_LINK -->
			<v-flex xs6 v-if="coll=='dsi'">
				<ValueEdit
					:coll="coll"
					:collName="collName"
					:parentField="'specs'"
					:subField="'src_link'"
					:is_create="is_create"
					:is_preview="is_preview"
					:item_id="itemId"
					:item_data="itemDoc['specs']['src_link']"
					:item_auth="itemDoc.public_auth"
					:canEdit="checkUserAuth('specs.src_link')"
					:is_file="is_file"
					:filetype="filetype"
					:is_loading="loading"
					:no_subField="no_subField"
					@input="updateIsFile"
					>
				</ValueEdit>
			</v-flex>

		</v-layout>

		<!-- DOC SPECS -->
		<v-layout row wrap>

			<!-- DOC SRC_TYPE -->
			<v-flex xs6 px-2 v-if="coll=='dsi'">
				src_type - {{ itemDoc['specs']['src_type'] }} / 
				filetype - {{ filetype }}
				<ValueEdit
					:coll="coll"
					:collName="collName"
					:parentField="'specs'"
					:subField="'src_type'"
					:is_create="is_create"
					:is_preview="is_preview"
					:item_id="itemId"
					:item_data="itemDoc['specs']['src_type']"
					:item_auth="itemDoc.public_auth"
					:canEdit="checkUserAuth('specs.src_type')"
					:is_file="is_file"
					:filetype="filetype"
					:is_loading="loading"
					:no_subField="no_subField"
					@input="updateIsFile"
					>
				</ValueEdit>
			</v-flex>

			<!-- DOC SRC_SEP -->
			<v-flex xs6 px-2 v-if="coll=='dsi'">
				src_sep - {{ itemDoc['specs']['src_sep'] }}
				<ValueEdit
					:coll="coll"
					:collName="collName"
					:parentField="'specs'"
					:subField="'src_sep'"
					:is_create="is_create"
					:is_preview="is_preview"
					:item_id="itemId"
					:item_data="itemDoc['specs']['src_sep']"
					:item_auth="itemDoc.public_auth"
					:canEdit="checkUserAuth('specs.src_sep')"
					:is_file="is_file"
					:filetype="filetype"
					:is_loading="loading"
					:no_subField="no_subField"
					@input="updateIsFile"
					>
				</ValueEdit>
			</v-flex>

			<!-- DOC SRC_PARSER -->
			<v-flex xs6 px-2 v-if="coll=='dsi'">
				<ValueEdit
					:coll="coll"
					:collName="collName"
					:parentField="'specs'"
					:subField="'src_parser'"
					:is_create="is_create"
					:is_preview="is_preview"
					:item_id="itemId"
					:item_data="itemDoc['specs']['src_parser']"
					:item_auth="itemDoc.public_auth"
					:canEdit="checkUserAuth('specs.src_parser')"
					:is_file="is_file"
					:filetype="filetype"
					:is_loading="loading"
					:no_subField="no_subField"
					@input="updateIsFile"
					>
				</ValueEdit>
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

			// console.log("\ncheckUserAuth / field_name : ", field_name ) ;

			var can_update_field 	= false  ;
			
			if (this.is_create) {
				can_update_field 	= true  ;
			}

			else {
				var isLogged 			= this.$store.state.auth.isLogged ;
				var user_id 			= this.$store.state.auth.user_id ;

				can_update_field 		= checkDocUserAuth(this.item_doc, field_name, isLogged, user_id)
			}

			// console.log("checkUserAuth / can_update_field : ", can_update_field ) ;

			return can_update_field
		},


	}


}

</script>