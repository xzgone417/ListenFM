import { request } from '@umijs/max';

// 获取tag
export function queryHotTags() {
    return request(`http://bapi.xinli001.com/fm2/hot_tag_list.json/?flag=1&offset=0&rows=100&key=046b6a2a43dc6ff6e770255f57328f89`)
}

// tag发请求
export function queryTagSearch(val:string,offer:number) {
    return request(`http://bapi.xinli001.com/fm2/broadcast_list.json/?offset=${offer}&speaker_id=0&tag=${val}&rows=10&key=046b6a2a43dc6ff6e770255f57328f89`)
}

// 搜索框发请求
export function querySearch(val:string,offer:number) {
    return request(`http://bapi.xinli001.com/fm2/broadcast_list.json/?q=${val}&is_teacher=&offset=${offer}&speaker_id=0&rows=10&key=046b6a2a43dc6ff6e770255f57328f89`)
}  