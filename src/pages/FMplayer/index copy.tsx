import React, { useEffect, useState } from 'react';
import { useRequest, useParams, connect,history } from '@umijs/max';
import styles from './index.less';
import { testArray,queryFMtext } from '@/services/FMplayer';
import Fmboard from '@/components/FMplayer/Fmboard';
import Fmtext from '@/components/FMplayer/Fmtext';



function Page({ FMplayer, dispatch, loading }) {
  let idment = useParams()
  // console.log(idment.id,"mnknknk");
  let [readornot, setRead] = useState<boolean>(true);

  // ##1、请求FM数据
  const { FMsong } = FMplayer;
  // console.log(FMplayer,"vv");
  // console.log(loading,"llllllllllllooo");
  const idnum = parseInt(idment.id!);  // dva的id
  useEffect(() => {
    //dispatch一个action来触发对应的reducer
    dispatch({
      type: 'FMplayer/fetchFMplayer',
      //payload 有效负载 ，dispatch传递参数的时候
      payload: {
        id: idment.id
      },
    });
  }, []);


  //### 原文
  const texttt = useRequest(() =>queryFMtext(idnum),{
    manual: true,
  })
  // console.log(texttt,"bbbbbbbbbbbbbbbbbbbbbbbbHHHHHHHH");
  const yuanwen =()=>{
  texttt.run()
  setRead(false)
}

// ###换歌曲列表，现在歌曲列表是固定的
// const tt = useRequest(() => {
//   return testArray()
// })

  // console.log(tt.data,"tttttttttttttttttttttttttttttttttt");
  // FMplayer.FMlist = tt.data;  // 暂时没有请求，是直接修改的dva中各列表数据
  // useEffect(() => {
  //   console.log( tt,"TTTTT");  //TT始终没有变过，一直是这一个列表数据，如果给顶死列表的话
  //   if (!tt.data) return;
  //   // 直接调用会报一个死循环错误
  //   dispatch({
  //     type: "FMplayer/FMListOK",
  //     payload: tt       //不需要把最终数组给页面，因为我在页面还会再拿一层data才是数组来循环
  //   })
  // }, [tt.data])   //这里写tt会造成死循环,如果返回所有数据的话
// console.log( FMplayer,"FAFAFAFAFAFFFAFANNNNNNN");


  // 换歌曲、、、、、、、、、、、、、、、、、、、、
  const whereFM = (value) => {
    history.replace(`/FMplayer/${value}`);
    dispatch({
      type: 'FMplayer/fetchFMplayer',
      //payload 有效负载 ，dispatch传递参数的时候
      payload: {
        id: value
      },
    });
 
  }
  // ##3、是否调用缓存
  // data一开始为false，loading一开始为true// 请求中，data还是false，loading为true
  // if (loading===undefined) {
  //   return <p>loading...........</p>;
  // }
  return (
    <div>
      {/* 顶部标签 */}
      <div className={styles.header}>
        <span className={styles.header123} onClick={() => setRead(true)}  style={{ "color": "pink" }} >电台</span>
        <span className={styles.header123}>|</span>
        <span className={styles.header123} onClick={() => yuanwen() }>原文</span>
      </div>
      {readornot && loading === false ? <Fmboard board={FMsong} FMlist={FMplayer.FMlist} reload={whereFM}></Fmboard> : <Fmtext text={texttt.data}></Fmtext>}

    </div>
  );
}

// 这里的箭头函数体的括号不能少
// mapStateToProps() in Connect(Page) must return a plain object. Instead received undefined. 
export default connect(({ FMplayer, loading }) => ({
  FMplayer,
  loading: loading.models.FMplayer,
  loadingList: loading.effects['FMplayer/fetchFMplayer']
}))(Page);
