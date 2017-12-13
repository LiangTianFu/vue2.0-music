import * as types from './mutation-types'
/*mutations是对数据修改的逻辑  mutations本质上市一个函数  函数名是mutation-types的值*/
 const mutations =  {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	},
	[types.SET_PLAYING_STATE](state, flag) { /*布尔值，yongflag*/
		state.playing = flag
	},
	[types.SET_FULL_SCREEN](state, flag) {
		state.fullScreen = flag
	},
	[types.SET_PLAYLIST](state, list) {
		state.playlist = list
	},
	[types.SET_SEQUENCE_LIST](state, list) {
		state.sequenceList = list
	},
	[types.SET_PLAY_MODE](state, mode) {
		state.mode = mode
	},
    [types.SET_CURRENT_INDEX](state, index) {
		state.currentIndex = index
	},
	[types.SET_DISC](state, disc) {
		state.disc = disc
	},
	[types.SET_TOP_LIST](state, topList) {
		state.topList = topList
	},
	[types.SET_SEARCH_HISTORY](state, history) {
		state.searchHistory = history
	}

}

export default mutations

