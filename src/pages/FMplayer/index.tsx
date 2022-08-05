import React, { useEffect, useState } from 'react';
import { useRequest, useParams, connect,history } from '@umijs/max';
import styles from './index.less';
import { testArray,queryFMtext, likeSong } from '@/services/FMplayer';
import Fmboard from '@/components/FMplayer/Fmboard';
import Fmtext from '@/components/FMplayer/Fmtext';
import { DownOutline } from 'antd-mobile-icons';



function Page({ FMplayer, dispatch, loading }) {
  let idment = useParams()
  let [readornot, setRead] = useState<boolean>(true);

  // ##1、请求FM数据
  const { FMsong } = FMplayer;
  const idnum = parseInt(idment.id!);  // dva的id
  useEffect(() => {
    //dispatch一个action来触发对应的reducer
    dispatch({
      type: 'FMplayer/fetchFMplayer',
      //payload 有效负载 ，dispatch传递参数的时候
      payload: {
        id: idnum
      },
    });
  }, []);


  //### 原文
  const texttt = useRequest(() =>queryFMtext(idnum),{
    manual: true,
  })
  // 
  const yuanwen =()=>{
  texttt.run()
  setRead(false)
}



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

  // 是否播放
console.log(FMplayer.play,"mmmmmm");
const saystop=()=>{
  dispatch({
    type: 'FMplayer/PlayOrNot', 
  });
}

  return (
    <div>
      {/* 顶部标签 */}
      <div className={styles.header}>
        <span  className={styles.back} onClick={history.back}>  <DownOutline /></span> 
        <span className={styles.header123} onClick={() => setRead(true)}    style={ readornot? { "color": "#ec7c70" }:{ "color": "#696969" } } >电台</span>
        <span className={styles.header123}>|</span>
        <span className={styles.header123} onClick={() => yuanwen()} style={ readornot? { "color": "#696969" }:{ "color": "#ec7c70" } }>原文</span>
      </div>
      {readornot && loading === false ? <Fmboard board={FMsong} juststop={FMplayer.play} FMlist={FMplayer.FMlist} reload={whereFM} read={readornot} youstop={saystop}></Fmboard> : <Fmtext text={texttt.data}></Fmtext>}

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
