<template>
  <div class="search">
  	<div class="search-box-wrapper">
  		<search-box ref="searchBox" @query="onQueryChange"></search-box>
  	</div>
  	<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
  	     <scroll  ref="shortcut" class="shortcut" :data="shortcut">
  			<div>
  			<div class="hot-key">
  				<h1 class="title">热门搜索</h1>
  				<ul>
  					<li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
  						<span>{{item.k}}</span>
  					</li>
  				</ul>
  			</div>

  			<div class="search-history" v-show="searchHistory.length">
  				<h1 class="title">
  					<span class="text">搜索历史</span>
  					<!-- <span class="clear" @click="clearSearchHistory"> -->
  						<span class="clear" @click="showConfirm">
  						<i class="icon-clear"></i>
  					</span>
  				</h1>
  				<search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
  			</div>
  			</div>
  		</scroll>
  	</div>
  	<div ref="searchResult" class="search-result" v-show="query">
  		<suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
  	</div>
  	<confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
  	<router-view></router-view>
  </div>
</template>

<script>
	import SearchBox from 'base/search-box/search-box'
	import {getHotKey} from 'api/search'
	import {ERR_OK} from 'api/config'
	import Suggest from 'components/suggest/suggest'
	import {mapActions, mapGetters} from 'vuex'
	import SearchList from 'base/search-list/search-list'
	import Confirm from 'base/confirm/confirm'
	import Scroll from 'base/scroll/scroll'
	import {playListMixin} from 'common/js/mixin'

	export default {
		mixins: [playListMixin],
		created() {
			this._getHotKey()
		},
		data() {
			return {
				hotKey: [],
				query: ''
			}
		},
		computed: {
			shortcut() {
				return this.hotKey.concat(this.searchHistory)
			},
			...mapGetters([
				'searchHistory'
			])
		},
		methods: {
			handlePlaylist(playlist) {
				 const bottom = playlist.length > 0 ? '60px' : ''
				this.$refs.shortcutWrapper.style.bottom = bottom
				this.$refs.shortcut.refresh()

				this.$refs.searchResult.style.bottom = bottom
				this.$refs.suggest.refresh()

			},
			addQuery(query) {
				this.$refs.searchBox.setQuery(query)

			},
			onQueryChange(query) {
				this.query =  query
			},
			blurInput() {
				this.$refs.searchBox.blur()
			},
			saveSearch() {
				this.saveSearchHistory(this.query)
			},
			// deleteOne(item) {
			// 	this.deleteSearchHistory(item)
			// },
			// deleteAll() {
			// 	this.clearSearchHistory()
			// },
			showConfirm() {
				this.$refs.confirm.show()
			},
			_getHotKey() {
				getHotKey().then((res) => {
					if(res.code === ERR_OK) {
						// console.log(res.data.hotkey)
						this.hotKey = res.data.hotkey.slice(0, 10)
					}
				})
			},
			...mapActions([
				'saveSearchHistory',
				'deleteSearchHistory',
				'clearSearchHistory'
			])
		},
		watch: {
			query(newQuery) {
				if (!newQuery) {
					setTimeout(() => {
						this.$refs.shortcut.refresh()
					}, 20)
				}
			}
		},
		components: {
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
		}
	}

</script>
<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.search{
	.search-box-wrapper{
		margin: 20px;
	}
	.shortcut-wrapper{
		position: fixed;
        top: 178px;
        bottom: 0;
        width: 100%;
        .shortcut{
        	height: 100%;
            overflow: hidden;
            .hot-key{
            	margin: 0 20px 10px 20px;
            	.title{
            		 margin-bottom: 20px;
                     font-size: $font-size-medium;
                     color: $color-text-l;
            	}
            	.item:first-child{
            		 border: 1px solid $color-theme;
            		 margin: 0 17px 10px 0;
            		 color: $color-theme;
            	}
            	.item{
            		 display: inline-block;
                     padding: 5px 10px;
                     margin: 0 18px 10px 0;
                     border-radius: 10px;
                     background: $color-highlight-background;
                     font-size: $font-size-medium;
                     color: $color-text-d;
            	}
            }
            .search-history{
            	 position: relative;
                 margin: 0 20px;
                 .title{
                 	 display: flex;
                     align-items: center;
                     height: 40px;
                     font-size: $font-size-medium;
                     color: $color-text-l;
                     .text{
                     	flex: 1;
                     }
                     .clear{
                     	@include extend-click();
                     	.icon-clear{
                     		font-size: $font-size-medium;
                            color: $color-text-d;
                     	}
                     }
                 }
            }
        }
	}
	 .search-result{
	 	 position: fixed;
         width: 100%;
         top: 178px;
         bottom: 0;
	 }
}

</style>