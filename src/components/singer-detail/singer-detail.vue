<template>
	<transition name="slider">
	<!-- <div class="singer-detail"></div> -->
	<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	import MusicList from 'components/music-list/music-list'

	export default {
		data() {
          return {
          	songs: []
          }
		},
		computed: {
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created() {
			this._getDetail()
			// console.log(this.singer)
		},
		methods: {

			_getDetail() {
			  if(!this.singer.id){
			  	this.$router.push('/singer')
			  	return
			  }
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						// console.log(res.data.list)
						this.songs = this._normalizeSongs(res.data.list)
						/*console.log(this.songs)*/
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
					if(musicData.songid && musicData.albumid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		components: {
			MusicList
		}
	}
</script>

<style scoped lang="scss">
 @import "~common/scss/variable";

/*	.singer-detail{
		position:fixed;
		z-index:100;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background:$color-background;
	}*/
	.slider-enter-active, .slider-leave-active{
		transition: all 0.3s;
	}
	.slider-enter, .slider-leave-to{
		transform: translate3d(100%, 0, 0);
	}
</style>