import storage from 'good-storage'

/*__search__比较内部的值，和外面的冲突可能性比较小*/
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

/*数组， 值， 比较函数， 最大值*/
function insertArray(arr, val, compare, maxLen) {
	/*findIndex es6的API*/
	const index =arr.findIndex(compare)
	if (index === 0) { /*第一条数据直接返回*/
		return
	}
	if (index > 0) {
		/*有数据，并且不在第一个位置，把之前的数据删掉*/
		arr.splice(index, 1)
	}
	/*插入到数组的第一个位置*/
	arr.unshift(val)
	if (maxLen && arr.length > maxLen) {
		arr.pop()
	}

}

function deleteFromArray(arr, compare) {
	const index = arr.findIndex(compare) 
	if (index > -1) {
		arr.splice(index, 1)
	}
}

/*保存搜索记录*/
export function saveSearch(query) {
	let searches = storage.get(SEARCH_KEY, [])
	insertArray(searches, query, (item) => {
		return item === query
	}, SEARCH_MAX_LEN)
	storage.set(SEARCH_KEY, searches)
	return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
export function deleteSearch(query) {  /*删除数组*/
	let searches = storage.get(SEARCH_KEY, [])
	deleteFromArray(searches, (item) => {
		return item === query
	})
	/*保存数组*/
	storage.set(SEARCH_KEY, searches)
	/*把数组返回出去*/
	return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}