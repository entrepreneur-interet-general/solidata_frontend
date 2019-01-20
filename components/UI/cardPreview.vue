<template>

  <v-flex
    v-bind="{ [`xs${defaultFlex}`]: true }"
    :key="index"
    >

    <no-ssr placeholder="Loading..."> 
      
      <v-card
        :to="$store.state.mainIcons[tab]['to'] + '/' + item._id"
        >

        <v-card-media
          :height="defaultHeight"
          class="black--text"
          >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>

                <template v-if="inTeam == 'yes'">
                  <v-badge left overlap color="primary">
                    <!-- <v-icon slot="badge" dark small>{{ $store.state.mainIcons.edit.icon }}</v-icon> -->
                    <v-icon slot="badge"> </v-icon>
                    <v-chip>{{ $t(tab+'.singular', $store.state.locale) }}</v-chip>
                  </v-badge>
                </template>

                <template v-else>
                  <v-chip>{{ $t(tab+'.singular', $store.state.locale) }}</v-chip>
                </template>

                <br><br>

                <span class="headline">{{ item.infos.title }}</span>

              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>


        <v-card-title
          >
          <div>
            <span class="grey--text">owner : {{ item.log.created_by }} </span><br>
            <span class="grey--text">id : {{ item._id }}</span><br>
            <span class="grey--text">open_level_show : {{ item.public_auth.open_level_show }}</span><br>
            <span class="grey--text">open_level_edit : {{ item.public_auth.open_level_edit }}</span><br>
            <span class="grey--text">tags : to do </span><br>
          </div>
        </v-card-title>

        <v-card-media
        :height="defaultHeight"
        >
          <v-container
            fill-height
            fluid
            pa-2
            >
              <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                      <span class="headline" >
                      {{  item.infos.description }}
                      </span>
                  </v-flex>
              </v-layout>

          </v-container>
        </v-card-media>

        <v-divider></v-divider>

        <v-card-actions>
          
          <!-- team button -->
          <v-btn 
            flat block class="text-lowercase" 
            :to="$store.state.mainIcons[tab]['to'] + '/' + item._id + '/team'"
            > 
            <v-icon left>{{ $store.state.mainIcons.profile.icon }}</v-icon>
            {{ $t('global.team', $store.state.locale) }}
          </v-btn>

          <!-- <v-divider vertical></v-divider> -->
          
          <!-- settings button -->
          <!-- <template
            > -->

          <!-- <no-ssr> -->
          <v-btn 
            v-if="inTeam === 'yes'"
            flat block class="text-lowercase" 
            :to="$store.state.mainIcons[tab]['to'] + '/' + item._id + '/settings'"
            > 
            <v-icon left>{{ $store.state.mainIcons.settings.icon }}</v-icon>
            {{ $t('global.settings', $store.state.locale) }}
          </v-btn>

          <!-- </no-ssr> -->
          <!-- </template> -->
        
        </v-card-actions>

      </v-card>

    </no-ssr>

  </v-flex>

</template>


<script>
export default {
  props: [ 'tab', 'item', 'index', 'inTeam', 'defaultHeight', 'defaultFlex' ],
  data () {
    return {
    }
  }
}
</script>