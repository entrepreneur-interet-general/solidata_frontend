<template>

  <div>

    
    <SectionTitle
      :title="$t(tab+'.name', $store.state.locale)"
      :intro="$t(tab+'.create', $store.state.locale)"
      :icon="$store.state.mainIcons[tab]['icon']"
      :to_link="'/'+coll"
      :tab="tab"
      >
    </SectionTitle>


    <!-- CREATE EDIT DOC -->
    <v-container class="pt-3">
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12>

          <ViewEditDoc
            :flex_vars="$store.state.createSize"
            :is_create="true"
            :is_preview="false"
            :coll="coll"
            :parentFieldslist="parentFieldsList"
            :item_doc="$store.state[coll].current_new"
            :is_switch="true"
            >
          </ViewEditDoc>
        
        </v-flex>
      </v-layout>
    </v-container>

  
    <!-- <CreateItem
      :itemType="itemType"
      :itemAbr="itemAbr"
      :itemSteps="itemSteps"
      >
    </CreateItem> -->


  </div>

</template>



<script>
// import SectionTitle from '~/components/UI/sectionTitle.vue'
// import ViewEditDoc from '~/components/UI/viewEditDoc.vue'

// import CreateItem from '~/components/Forms/createItem.vue'

export default {
  components: {
    // SectionTitle,
    // ViewEditDoc,
    // CreateItem,

  },

  // TO DO : middleware to check if logged and authenticated
  // middleware : [ ],

  data () {
    return {

      // for ViewEditDoc component

      coll: 'dmf',
      tab: 'datamodel_fields',

      parentFieldsList: [

        {
          parentFieldName: 'infos',
          subFields: [
            'title',
            'description'
          ]
        },

        {
          parentFieldName: 'public_auth',
          subFields: [
            'open_level_edit'
          ]
        },

        {
          parentFieldName: 'data_raw',
          subFields: [
            'f_code',
            'f_type',
            'f_object',
            'f_comments',
            'f_is_required'
          ]
        }
      ]
    }
  },

  methods: {
  }

}
</script>
