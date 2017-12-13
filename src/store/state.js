import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

/*数据 原始数据 最好是底层数据*/
const state = {
	singer: {},
	playing: false,/*播放状态*/
	fullScreen: false, /*播放器展开收起*/
	playlist: [],/* 播放列表*/
	sequenceList: [], /*顺序列表*/
	mode: playMode.sequence, /* 播放模式 顺序播放*/
	currentIndex: -1, /*当前播放的索引*/
	disc: {},  /*歌单的对象*/
	topList: {},    /*歌曲排行*/
	searchHistory: loadSearch()  /*搜索历史*/
}

export default state

