import { request } from "@umijs/max";


export function queryzhuboList(arg:number) {
    return request(`/fm/diantai-detai.json?id=${arg}`);
}

// export function querydetailList({ offset}) {
//     return request(`/fm/diantai-jiemu-list.json?offset=${offset}&limit=10&diantai_id=921&key=046b6a2a43dc6ff6e770255f57328f89`);
// }
export function querydetailList({ offset,limit,id,key}) {
    return request(`/fm/diantai-jiemu-list.json?offset=${offset}&limit=${limit}&diantai_id=${id}&key=${key}`);
}

export function queryMycare() {
    return request(`/fm/diantai-myguanzhu-list.json?offset=0&limit=10&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`);
}
export function queryMycollect() {
    return request(`http://bapi.xinli001.com/fm2/favorite_list.json/?offset=0&user_id=1004261911&rows=10&key=046b6a2a43dc6ff6e770255f57328f89`);
}


// export function queryMytopic({id}) {
//     return request(`/fm/user-forum-comment-list.json?${id}offset=0&limit=10&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`);
// }
export function queryMytopic() {
    return request(`/fm/user-forum-comment-list.json?offset=0&limit=10&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`);
}

export function queryMyinform() {
    return request(`http://bapi.xinli001.com/fm2/notice_list.json/?offset=0&rows=10&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`);
}

export function queryAttentionOK(arg: number) {
    return request(`/fm/diantai-check-guanzhu.json?diantai_id=${arg}&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`)
}
export function queryAttention(arg: number) {
    return request(`/fm/diantai-toggle-guanzhu.json?diantai_id=${arg}&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`)
}











