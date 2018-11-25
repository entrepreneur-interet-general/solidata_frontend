<template>

	<v-container 
		grid-list-xl 
		text-xs-center
		>
		
		<!-- ITEM TITLE ROW -->
		<v-layout 
			v-if="!is_create"
			row 
			wrap 
			>

			<v-flex d-flex :class="flex_vars">

				<v-toolbar dark dense color="primary" xs12>

					<v-icon>
						{{ $store.state.mainIcons[collName]['icon'] }}
					</v-icon>

					<v-card-text class="text-uppercase">
						<!-- {{$t(collName+'.edit', $store.state.locale )}} -->
						{{ item_doc.infos.title }}
					</v-card-text>

					<v-btn icon small
						:to="'/'+coll"
						>
						<v-icon>
							arrow_back
						</v-icon>
					</v-btn>

				</v-toolbar dense>

			</v-flex>

		</v-layout>



		<!-- ITEM VALUES ROW -->
		<v-layout 
			row wrap
			>

			<v-flex 
				d-flex 
				:class="flex_vars + ' pb-0 pt-1'" 
				v-for="parentField in parentFieldslist"
				>

				<!-- parentFieldName -->
				<v-flex 
					v-if="!is_preview"
					:class="parentFieldsSize"
					d-flex 
					>
					<v-card color="secondary" dark>
						<!-- <v-card-title primary class="title">Lorem</v-card-title> -->
						<v-card-text>
							{{ parentField.parentFieldName }}
						</v-card-text>
					</v-card>
				</v-flex>


				<!-- subFields names and values-->
				<v-flex 
					d-flex 
					:class="valueBlockSize"
					>

					<v-layout row wrap>
						<v-flex d-flex>
							<v-layout row wrap>
								
								<v-flex 
									v-for="subField in parentField.subFields"
									d-flex xs12
									class="ma-0 py-0 pr-0 pl-2"
									>

									<v-card>

										<ValueEdit
											:coll="coll"
											:collName="collName"
											:parentField="parentField.parentFieldName"
											:subField="subField"
											:is_create="is_create"
											:is_preview="is_preview"
											:item_id="item_doc._id"
											:item_data="item_doc[parentField.parentFieldName][subField]"
											:item_auth="item_doc.public_auth"
											:canEdit="canEdit"
											>
										</ValueEdit>

									</v-card>

								</v-flex>

							</v-layout>
						</v-flex>
					</v-layout>
				</v-flex>

			</v-flex>



			<!-- DEBUG  -->
			<v-flex d-flex :class="flex_vars">

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

			</v-flex>

		</v-layout>


	</v-container>
	
</template>


<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'

// import CardInfos from '~/components/UI/parentFields/cardInfos.vue'
import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'


export default {

	props : [ 
		"flex_vars",			// 
		"is_create",			// view | create
		"is_preview",			// 
		"parentFieldslist",		// 
		"item_doc", 			// complete item infos
	],

	components : {
		SectionTitle,
		// CardInfos,
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

			blockFullSize : "xs12",
			blockPartSize : "xs10",
			parentFieldsSize : "xs2 ma-0 pa-0",

		}
	},

	computed : {

		valueBlockSize () {
			// console.log('\n valueBlockSize - is_create : ', this.is_create) ;
			return (this.is_preview) ? this.blockFullSize : this.blockPartSize ;
		},

	},

	methods: {
		
		//  TO DO  --> FACTORIZE checkUserAuth for an item --> utils
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