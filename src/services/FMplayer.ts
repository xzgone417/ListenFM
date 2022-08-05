import { request } from '@umijs/max';

export function queryFMplayer(arg: number) {
    return request(`/fm/broadcast-detail.json?id=${arg}&key=046b6a2a43dc6ff6e770255f57328f89`)
}

export function likeSong(idx: number) {
    return request(`http://bapi.xinli001.com/fm2/toggle_fav.json/`, {
        method: "POST",
        data: {
            "fmid": idx,
            "key": "046b6a2a43dc6ff6e770255f57328f89",
            "token": "b845588abcf58804c99d289584cd6068",  
        },       
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
}

// export function testArray() {
//     return request(`http://bapi.xinli001.com/fm2/broadcast_list.json/?offset=0&speaker_id=0&tag=%E6%8A%91%E9%83%81%E7%97%87%E6%98%AF%E6%9D%A1%E9%BB%91%E7%8B%97&rows=10&key=046b6a2a43dc6ff6e770255f57328f89`)
// }

// 原文
export function queryFMtext(arg: number) {
    return request(`http://bapi.xinli001.com/fm2/article.json/?pk=${arg}&key=046b6a2a43dc6ff6e770255f57328f89`)
}

// 是否关注
export function queryAttentionOK(arg: number) {
    return request(`/fm/diantai-check-guanzhu.json?diantai_id=${arg}&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`)
}
// 关注主播
export function queryAttention(arg: number) {
    return request(`/fm/diantai-toggle-guanzhu.json?diantai_id=${arg}&key=046b6a2a43dc6ff6e770255f57328f89&token=b845588abcf58804c99d289584cd6068`)
}

