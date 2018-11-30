<template>

	<v-layout 
		v-model="raw_input"	
		row
		wrap	
		align-center
		justify-center
		fill-height
		text-xs-center
		>

		<template
			v-if="!fileName"
			>
			<v-flex 
				class="pb-0 mx-3 pt-3 xs12"
				>	
				<v-btn 
					raise
					large
					block
					@click="onPickFile"
					class="accent"
					>
					<v-icon left>{{$store.state.mainIcons.upload.icon}}</v-icon>
					{{ $t( 'global.upload', $store.state.locale) }}
				</v-btn>
			</v-flex>

			<v-flex 
				class="pt-0 xs12"
				>	
				{{ $t( labelText, $store.state.locale) }} : {{  $t( 'global.nofile', $store.state.locale) }}
			</v-flex>	

		</template>


		<template 
			v-else
			>

			<v-flex 
				class="pb-0 mx-3 pt-3 xs12"
				>	
				<v-btn 
					raise
					large
					block
					@click="removeFile"
					class="error"
					>
					<v-icon left>{{$store.state.mainIcons.cancel.icon}}</v-icon>
					{{ $t( 'global.remove', $store.state.locale) }}
				</v-btn>
			</v-flex>	

			<v-flex 
				class="pt-0 xs12"
				>	
				{{ $t( labelText, $store.state.locale) }} : {{ fileName }}
			</v-flex>	

		</template>

		<input 
			type="file"
			style="display : none"
			ref="fileInput"
			@change="onFilePicked"
			>
		</input>

		<!-- </v-flex> -->
	</v-layout>

</template>


<script>

	export default {
		
		props : [ 
			"rawInput", 
			"labelText"
		],
		
		data () {
			return {

				coll		: 'dsi',
				tab			: 'datasets',

				raw_input 	: this.rawInput,
				fileName 	: '',
				file		: null,
				rules: {
					required: v => !!v || this.$t('rules.required', this.$store.state.locale)
				}
			}
		},

		methods : {
			
			// cf : https://www.youtube.com/watch?v=J2Wp4_XRsWc
			// cf : https://github.com/vuetifyjs/vuetify/issues/238

			onPickFile() {
				this.$refs.fileInput.click()
			},

			onFilePicked(event) {

				console.log("\n onFilePicked ... " )

				const files 	= event.target.files
				let filename 	= files[0].name
				if (filename.lastIndexOf('.') <= 0 ) {
					return alert('Please add a valid file')
				}

				console.log("onFilePicked / filename : ", filename )

				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.fileName = filename
				})
				fileReader.readAsDataURL(files[0])
				this.file = files[0]

				// send data back to parent component
				this.$emit('input', {
					fileName 	: filename,
					file		: files[0]
				})
			},

			removeFile() {
				this.fileName 	= ''
				this.file 		= ''

				this.$store.commit(`${this.coll}/reset_current_file` );

				this.$emit('input', {
					fileName 	: '',
					file		: ''
				})
			},

		}
	}

</script>