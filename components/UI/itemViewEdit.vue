<template>

	<v-container 
		grid-list-xl text-xs-center
		>
		
		<!-- ROW TITLE -->
		<v-layout row wrap >

			<v-alert       
				:value="true"
				type="error"
				>
				---- DEBUG component - ItemViewEdit ----
				<hr>
				-- item_doc -- <br>
				{{ item_doc }}
				<hr>
				-- vars -- <br>
				coll : {{ coll }} - 
				collName : {{ collName }} - 
				is_create : {{ is_create }} - 
				item_doc._id : {{ item_doc._id}} - 
				canEdit : {{ canEdit }}
				flex_vars : {{flex_vars}} - 
			</v-alert>

			<v-flex d-flex :class="flex_vars">
				

				<v-toolbar dark color="primary">

					<v-card-text>
						{{$t(collName+'.edit', $store.state.locale )}}
					</v-card-text>

					<v-btn icon small
						:to="'/'+coll"
						>
						<v-icon>clear</v-icon>
					</v-btn>

				</v-toolbar dense>

			</v-flex>

		</v-layout>



		<!-- FORM STARTS HERE IF CREATE -->




		<!-- ROW PREVIEW/EDIT -->

		<v-layout 
			v-for="parentField in parentFieldslist"
			d-flex row wrap
			>

			<v-flex d-flex :class="flex_vars">

				<v-layout row wrap >

					<v-flex 
						v-for="subField in parentField.subFields"
						d-flex xs12
						class="ma-0 py-0"
						>

						<ValueEdit
							:coll="coll"
							:collName="collName"
							:parentField="parentField.parentFieldName"
							:subField="subField"
							:is_create="is_create"
							:item_id="item_doc._id"
							:item_data="item_doc[parentField.parentFieldName][subField]"
							:item_auth="item_doc.public_auth"
							:canEdit="canEdit"
							>
						</ValueEdit>

					</v-flex>

				</v-layout >

			</v-flex>

		</v-layout>







		<!-- ROW PREVIEW/EDIT : DATA -->
		<v-layout d-flex row wrap>

			<v-flex d-flex :class="flex_vars">

				<v-layout row wrap >

					<!-- CARD PREVIEW/EDIT : SPECS -->
					<v-flex d-flex xs12>

						<CardInfos
							:parentField="'public_auth'"
							:view_or_create="is_create"
							:item_id="item_doc._id"
							:item_data="item_doc"
							:item_auth="item_doc.public_auth"
							>
						</CardInfos>
		
		`			</v-flex>
			
				</v-layout>

			</v-flex>

		</v-layout>


		


	</v-container>
	
</template>


<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'
import CardInfos from '~/components/UI/parentFields/cardInfos.vue'
import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'


export default {

	props : [ 
		"flex_vars",
		"is_create",		// view | create
		"parentFieldslist",		// 
		"item_doc", 			// complete item infos
	],

	components : {
		SectionTitle,
		CardInfos,
		ValueEdit,
	},
	
	mounted () {
		console.log("\n- itemViewEdit / mounted ---> item_doc : ", this.item_doc ) ;
		this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
	},

	data: function () {

		return {
			coll 		: this.item_doc.specs.doc_type, 
			collName 	: this.$store.state.collectionsNames[this.item_doc.specs.doc_type],
			canEdit		: false ,
		}
	},

	// computed : {

	// 	canEdit() {
	// 		console.log("\ncanEdit ...\n", this.item_doc.open_level_edit ) ;
	// 		return this.checkUserAuth(this.parentField+'.'+this.subField)
	// 	}
		
	// },

	methods: {

		checkUserAuth (field_name) {

			console.log("\ncheckUserAuth ...\n", this.item_doc.public_auth ) ;

			var can_update_field 	= false  ;
			var doc_auth_edit 		= this.item_doc.public_auth.open_level_edit ; 
			var doc_auth_team 		= this.item_doc.team ; 

			if (doc_auth_edit == 'open_data' ){
				can_update_field = true
			}

			else if (doc_auth_edit == 'commons') {
				//  check if user is connected
				can_update_field = true
			} 
			else if (doc_auth_edit == 'collective') {
				//  check if user is part of the team
				can_update_field = true
			} 
			else if (doc_auth_edit == 'private') {
				//  check if user is the owner
				can_update_field = true
			} 

			return can_update_field
		},

	}


}

</script>