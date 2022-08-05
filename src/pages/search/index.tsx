
import React, { useEffect, useRef, useState } from 'react';
import { useRequest, connect, history } from '@umijs/max';
import styles from './index.less';
import { SearchBar, Tag, Space, Toast, List, InfiniteScroll, Image } from 'antd-mobile'
import { queryHotTags, querySearch, queryTagSearch } from '@/services/search';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar';
// import { clear } from 'antd-mobile/es/components/dialog/clear';
import fire from "@/assets/xzg/iconfont.css"
import { LeftOutline } from 'antd-mobile-icons';
import Listen from '@/components/Listen';



function Page(FM) {
  // 状态赋值
  const searchRef = useRef<SearchBarRef>(null);
  const [myval, setMyval] = useState("")
  const [mytag, setMytag] = useState("")
  const [mysooo, setSooo] = useState([] as any)
  const [mypanduan, setpanduan] = useState(false)
  const [myquery, setquery] = useState(0)
  const [value, setValue] = useState<string>("")
  const { FMplayer, search, dispatch } = FM
  const [page, setPage] = useState(0)
  const [page123, setPage123] = useState(0)
  const [myhistory1, setHHH] = useState(JSON.parse(localStorage.getItem("searchHistory")!))
  const [myhistoryOK, setHHHOK] = useState(0)
  // 计算属性计算历史
  // const myhistory =localStorage.getItem("searchHistory")
  // let myhistory = useMemo(() => {
  //   return (transTime(props.board.duration))
  // }, [props.board.duration]);
  // console.log(myhistory1,"hhhhhhhhhhhnnnnnnnn");
  useEffect(() => {
    setHHH(JSON.parse(localStorage.getItem("searchHistory")!))
  }, [mypanduan])
  // 、、、useRequest请求、、、、、、、、、、、、、、、、、、、、
  const hotTags = useRequest(() => queryHotTags())
  const tagSearch = useRequest(() => queryTagSearch(mytag, page), {
    manual: true,
    // refreshDeps: [page]    //手动调用加了之后，自动调用就不起效果了
  })
  // console.log(tagSearch);

  const Search1 = useRequest(() => querySearch(myval, page), {
    manual: true,
    // refreshDeps: [page]
  })
  // console.log(tagSearch);

  // 上拉加载
  //上拉加载
  let onPullData = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight + 40 >= scrollHeight) {
      setPage(page + 1)
    }
  }


  // 、、、、、、搜索、、、、、、、、、0000000、0000000、、、、、、、、、、、、、、、、、、、、、、
  const tagsoso = (val: string) => {
    // console.log(val, "注意此时的vallllll");
    setMytag(encodeURI(val));
    //这里的tag变化跟不上请求
    setpanduan(true)  //、、、、搜索列表出不出现
    dispatch({       //搜索历史添加
      type: "search/addHistory",
      payload: val     //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
    })
    setValue(val)
    setHHH(JSON.parse(localStorage.getItem("searchHistory")!))        //搜索历史增加标签
  }

  // console.log(mytag,"修改后的tag,但已经发过请求了");
  const soso = (val) => {
    setMyval(encodeURI(val));   //把最新的关键词给了myval，但是下面发请求还是用的旧值，解决？
    setpanduan(true)  //选择性显示
    dispatch({
      type: "search/addHistory",
      payload: val       //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
    })
    setHHH(JSON.parse(localStorage.getItem("searchHistory")!))        //搜索历史增加标签
  }
  // 、、、、11111111111、、、、、清除副作用,发送请求、、、、、、、、11111111、、、、、、、、、、、、、、、、、、、、、、、、、、
  // 加一个副作用再tag修改过后再手动调用请求,否则拿不到最新的参数发请求，利用最新的关键词，发请求
  useEffect(() => {
    tagSearch.run();
    // console.log(tagSearch.data,"xxx");////////这里发完请求后值依然是旧的，副作用调用完之后，才能得到新值
  }, [mytag])
  useEffect(() => {
    Search1.run();
  }, [myval])


  // 第一次请求数据变化后再修改数组。。。。22222222222222222。。。。。。。。。。。。存储到FMist、、、、、拿最新请求数据存到渲染数组上
  useEffect(() => {
    if (page123 === 0) {
      setSooo(tagSearch.data);
    } else if (page123 > 0) {
      if (tagSearch.data && tagSearch.data !== []) {
        const wee = [...mysooo, ...tagSearch.data];
        console.log(wee);
        setSooo([...mysooo, ...tagSearch.data])
      }

    }

  }, [tagSearch.data])    //、、、、、依赖值不要用请求对象，会陷入死循环的，因为请求对象在每一次请求都会一直发生改变
  // 
  useEffect(() => {
    if (page123 === 0) {
      setSooo(Search1.data)
    } else if (page123 > 0) {
      if (Search1.data && Search1.data !== []) {
        setSooo([...mysooo, ...tagSearch.data])
      }
    }
  }, [Search1.data])

  // 分页依赖更改发请求获得新数据--------------------------------------------
  useEffect(() => {
    if (tagSearch.data) {
      tagSearch.run()
      setPage123(page123 + 1)
    } else if (Search1.data) {
      Search1.run();
      setPage123(page123 + 1)
    }
  }, [page])
  // 分页获得新数据之后再发请求获得新数组
  // useEffect(()=>{
  // if (page123>0) {
  //    if (tagSearch.data &&tagSearch.data !==[]) {   
  //          const wee=[...mysooo, ...tagSearch.data];
  //          console.log(wee); 
  //           setSooo([...mysooo, ...tagSearch.data])
  //         }
  //         else if (Search1.data &&Search1.data !==[]) {
  //           setSooo([...mysooo, ...tagSearch.data])
  //         }
  // }
  // },[page123])

  // 列表渲染完毕之后，再把音乐列表传给dva、、、、、、、、、、3333333333333333333333、、、、拿到最新渲染数组存到dva内部，可以将其延迟至点击方法里触发
  // useEffect(()=>{
  // // eslint-disable-next-line eqeqeq
  // if (mysooo !==[]) {
  //   dispatch({
  //     type: "FMplayer/MyFMList",
  //     payload: mysooo     
  //   })
  // }
  // },[mysooo])


  // 播放歌曲，并更改dva状态。存数组，存歌曲？、、、、、、、、、、、、、、、、、、、
  const nowFM = (args) => {
    dispatch({
      type: "FMplayer/FMjump",
      payload: args
    });
    if (mysooo !== []) {
      dispatch({
        type: "FMplayer/MyFMList",
        payload: mysooo
      })
    }
    setquery(parseInt(FM.FMplayer.FMsong.id))  //修改状态，修改后跳转路由
  }
  // 把歌曲存到dva后状态变化后再跳转、、、、、、、4444444444444444、、、、、、dva存储完毕之后再跳转路由
  useEffect(() => {
    if (myquery !== 0) {
      history.push(`/FMplayer/${FM.FMplayer.id}`);
    }
  }, [myquery])


  //、、、、、、、、 清空和取消、、、、、、、、、、、、、、、、、、、、

  const rubblish = () => {
    localStorage.clear()
    setHHHOK(myhistoryOK + 1)
  }
  useEffect(() => {
    if (myhistoryOK > 0) {
      setHHH(JSON.parse(localStorage.getItem("searchHistory")!))
    }
  }, [myhistoryOK])

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



  return (
    <div className={styles.searchbox}>
          <Listen></Listen>
      <div className={styles.searchHead}>
        <span className={styles.back} onClick={() => history.replace("/")}>  <LeftOutline /></span>
        <span className={styles.headhead}>搜索发现</span>
      </div>
      <SearchBar placeholder='请输入内容' showCancelButton ref={searchRef} value={value}     //双向绑定
        onSearch={(val) => soso(val!)} onClear={() => myclear()} onCancel={() => mycancle()} onChange={(val) => setValue(val)} />
      {mypanduan ?
        <div className={styles.HAVE} onTouchMove={() => onPullData()}>
          <div className={styles.searchlisthead}>搜索列表</div>
          <List style={{ "--font-size": "14px" }} >
            {mysooo && mysooo !== [] && mysooo!.map((item, index) => {
              return (
                <List.Item description={item.speak} clickable key={index}
                  prefix={
                    <Image
                      src={item.cover}
                      style={{ borderRadius: 20 }}
                      fit='cover'
                      width={40}
                      height={40}
                    />
                  }
                  onClick={() => nowFM(item)}>
                  {item.title}
                </List.Item>
              )
            })}
          </List>
        </div>
        :
        <div className={styles.NOso}>
          {/* className本身不能写空格，可以用加号+拼接空格 */}
          <div className={styles.hot}> <span className={fire.iconfont + " " + fire.iconHuoyanjiare + " " + styles.hotfire}></span><span>热门搜索</span></div>
          <div className={styles.alltags}>
            <Space wrap style={{ '--gap': '10px' }}>
              {hotTags.data && hotTags.data.map((item) => {
                return (<Tag round color='#F5F5F5' key={item.id} style={{ "--text-color": "#696969" }} onClick={() => tagsoso(item.name)}>{item.name} </Tag>)
              })}
            </Space>
          </div>
          <div className={styles.record}><span>历史搜索记录</span> <span className={fire.iconfont + " " + fire.iconLajitong + " " + styles.rubblish} onClick={() => rubblish()}></span></div>
          <div>
            <Space wrap style={{ '--gap': '10px' }}>
              {myhistory1 && myhistory1.map((item, index) => {
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
export default connect(({ FMplayer, search }) => ({
  FMplayer,
  search
}))(Page);
