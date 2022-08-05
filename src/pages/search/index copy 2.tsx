
import React, { useEffect, useRef, useState } from 'react';
import { useRequest, connect, history } from '@umijs/max';
import styles from './index.less';
import { SearchBar, Tag, Space, Toast,List, InfiniteScroll } from 'antd-mobile'
import { queryHotTags, querySearch, queryTagSearch } from '@/services/search';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar';
import { clear } from 'antd-mobile/es/components/dialog/clear';



function Page(FM) {
  // 状态赋值
  const searchRef = useRef<SearchBarRef>(null);
  // let inputvalue = document.getElementsByTagName("input")[0];
  const [myval, setMyval] = useState("")
  const [mytag, setMytag] = useState("")
  const [mysooo, setSooo] = useState([] as any)
  const [mypanduan, setpanduan] = useState(false)
  const [myquery, setquery] = useState(0)
  const [offset,setoffset] =useState(0)
  const [value, setValue] = useState<string>("")
  const {FMplayer,search,dispatch}=FM

  // 上拉加载
  // const [hasMore, setHasMore] = useState(false)

  // console.log(FMplayer,"s",dispatch);

  // 、、、useRequest请求、、、、、、、、、、、、、、、、、、、、
  const hotTags = useRequest(() => queryHotTags())
  const tagSearch = useRequest(() => queryTagSearch(mytag,offset), {
    manual: true
  })
  const Search1 = useRequest(() => querySearch(myval,offset), {
    manual: true
  })

  // 、、、、、、搜索、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
  // console.log(tagSearch, "tttttttttttttttttttttttttgggggggggg");
  const tagsoso = (val:string) => {
    console.log(val, "注意此时的vallllll");
    // console.log(val, "xxx");
    // myval =encodeURI(val);
    setMytag(encodeURI(val));
    // console.log(mytag,"运行时的mytag，虽然tag会变，但是是在tag发完请求后变);
    //这里的tag变化跟不上请求
    setpanduan(true)
    dispatch({       //搜索历史
      type: "search/addHistory",
      payload: val     //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
    })
    setValue(val)
    // input属性，DOM操作、、、、、、、、、、、、、、、、、、、、、
    // if (inputvalue) {
    //   inputvalue.value = val
    //   console.log(inputvalue.value);    
    //   console.dir(inputvalue,"11");
      
    // }
    // return  myval
  }

  // console.log(mytag,"修改后的tag,但已经发过请求了");
  const soso = (val) => {
    // console.log(val, "xx");
    // myval =encodeURI(val);
    setMyval(encodeURI(val));   //把最新的关键词给了myval，但是下面发请求还是用的旧值，解决？不用useRequest了
    setpanduan(true)  //选择性显示
    dispatch({
      type: "search/addHistory",
      payload: val       //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
    })
    // searchRef.current?.clear();
    // return  myval
  }
  // 、、、、、、、、、副作用、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
  // 加一个副作用再tag修改过后再手动调用请求,否则拿不到最新的参数发请求
  useEffect(() => {
    tagSearch.run();
    // console.log(tagSearch.data,"xxx");////////这里发完请求后值依然是旧的，副作用调用完之后，才能得到新值
  }, [mytag])
  useEffect(() => {
    Search1.run();
  }, [myval])

  // 请求数据变化后再修改数组。。。。。。。。。。。。。。。。存储到FMist
  useEffect(() => {
    setSooo(tagSearch.data);
    // console.log(mysooo,"zzzzzz");   /////////这里的mysooo也是没有调用过的旧data值
    // console.log(tagSearch);  ////////这里的tagSearch.data就是发过最新请求的最新值了
    // dispatch({
    //   type: "FMplayer/FMListOK",
    //   payload: tagSearch       //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
    // })
  }, [tagSearch.data])    //、、、、、依赖值不要用请求对象，会陷入死循环的，因为请求对象在每一次请求都会一直发生改变
  // 
  useEffect(() => {
    setSooo(Search1.data)
    // dispatch({
    //   type: "FMplayer/FMListOK",
    //   payload: Search1       //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
    // })
  }, [Search1.data])


  useEffect(()=>{
  // eslint-disable-next-line eqeqeq
  if (mysooo !==[]) {
    dispatch({
      type: "FMplayer/MyFMList",
      payload: mysooo       //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
    })
  }
  },[mysooo])
  // console.log(mysooo,"mysssssssssssssssssssssssssssssss");
  
// console.log(FM,"fffffffffff");
// console.log(search,"llnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");

// 播放歌曲并跳转
const nowFM=(args)=>{
// console.log(args,"mmmmmm");
dispatch({
  type: "FMplayer/FMjump",
  payload: args      
});
// dispatch({
//   type: "FMplayer/FMListOK",
//   payload: mysooo      
// });
// console.log(FM.FMplayer.id,"xxxxxxxxxxxxxxxx");

setquery(parseInt(FM.FMplayer.FMsong.id))
// console.log(myquery);

}

useEffect(()=>{
if (myquery !==0) {
  history.push(`/FMplayer/${FM.FMplayer.id}`);
}
},[myquery])

  


  // console.log(mysooo, "sssssssssssssssssssss"); 
  //、、、、、、、、 清空和取消、、、、、、、、、、、、、、、、、、、、
  const myclear = () => {
    // setSooo([]);
    setpanduan(false)
    setValue("")
  };
  const mycancle = () => {
    // setSooo([]);
    setpanduan(false)
    setValue("")
  };
  // console.log(Search1, "jkjjjkjj");
  // console.log(mysooo,"sss");
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.searchbox}>
      <SearchBar placeholder='请输入内容' showCancelButton ref={searchRef}  
        onSearch={(val) => soso(val!)} onClear={() => myclear()} onCancel={() => mycancle()}  />
      {mypanduan ?
        <div className={styles.HAVE}>
          <div className={styles.searchlisthead}>搜索列表</div>
          {mysooo && mysooo !== [] && mysooo!.map((item) => {
            // return (<div key={item.id} className={styles.anyone} onClick={()=>nowFM(item)}>{item.title}</div>)
            return (
              <List.Item description={item.speak} clickable key={item.id} onClick={()=>nowFM(item)}>
              {item.title}
            </List.Item>
            )
          })}
        </div>
        :
        <div className={styles.NOso}>
          <div className={styles.hot}><span>热门搜索</span></div>
          <div className={styles.alltags}>
            <Space wrap style={{ '--gap': '10px' }}>
              {hotTags.data && hotTags.data.map((item) => {
                return (<Tag round color='#F5F5F5' key={item.id} style={{ "--text-color": "#696969" }} onClick={() => tagsoso(item.name)}>{item.name} </Tag>)
              })}
            </Space>
          </div>
          <div className={styles.record}><span>历史搜索记录</span></div>
          <div>
          <Space wrap style={{ '--gap': '10px' }}>
              {search.shistory && search.shistory.map((item,index) => {
                return (<Tag round color='#F5F5F5' key={index} style={{ "--text-color": "#696969" }} onClick={() => tagsoso(item)}>{item} </Tag>)
              })}
            </Space>
          </div>
        </div>

      }
    </div>
  );
}


// 这里的箭头函数体的括号不能少
// mapStateToProps() in Connect(Page) must return a plain object. Instead received undefined. 
export default connect(({ FMplayer,search }) => ({
  FMplayer,
  search
}))(Page);
