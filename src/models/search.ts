// import { queryFMplayer } from '@/services/FMplayer';

type typeYY = {
    tyepe: string;
    payload: string
}


export default {
    namespace: "search",
    state: {
        shistory: []
    },
    //纯函数
    reducers: {
        // {type: 'search/addHistory', payload: '12'} 解构payload是因为它还有type属性
        addHistory(state: any, YY: typeYY) {
            const { payload } = YY;
            state.shistory.push(payload)
            // 本地存储不为空时
            if (localStorage.getItem("searchHistory")) {
                const n1: string = localStorage.getItem("searchHistory") as string
                // console.log(JSON.parse(n1),"xxxxxx");
                const n2: string[] = JSON.parse(n1)
                // console.log(n2, "ololol");
                const n3 = [...n2, payload]
                // console.log(n3, "lllllllll111111112222");
                localStorage.setItem("searchHistory", JSON.stringify(n3))
                // console.log(localStorage.setItem("searchHistory", JSON.stringify(n3)),"ppppppppppppmmcc7787");
                // if (n1) {
                //     const nbhhh: any = [...n1!];
                //     console.log(nbhhh, "nmbbbb");
                //     nbhhh.push(payload)
                //     // const nb22=[...nbhhh,payload]   
                //     console.log(nbhhh, "pp");
                // }
            }else{
                localStorage.setItem("searchHistory", JSON.stringify([payload]))
            }


            //   console.log(state.shistory,"vvvvvv");
            //    console.log(localStorage.getItem("searchHistory"))
            // console.log(payload,"mmmmmmmmmmpppppppppp"); 
            // reducers必须要有返回值  
            return { ...state };
        },
    },

    effects: {

    }
}

