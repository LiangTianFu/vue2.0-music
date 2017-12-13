import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    g_tk: 5381,
    format: 'jsonp'
  })
 return jsonp(url, data, options)

}

