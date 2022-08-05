import React, { useEffect, useState } from 'react';
import { useRequest,useParams,connect } from '@umijs/max';
import styles from './index.less';
import { queryFMplayer } from '@/services/FMplayer';
import Fmboard from '@/components/FMplayer/Fmboard';
import Fmtext from '@/components/FMplayer/Fmtext';

function Page({FMplayer,dispatch,loading,loadingList}) {
  // ##1、请求FM数据
  let {id}=useParams()
  const FMplayerONE = useRequest(() => queryFMplayer(id as unknown as number), {
    cacheKey: "FMplayerKey"
  });
  // ##2、FMplayerONE状态赋值
  let [FMplayer1, setFMplayerone] = useState<any>();
  useEffect(() => {
    setFMplayerone(FMplayerONE.data)
  }, [FMplayerONE.data])
  // console.log(FMplayers, "xxxx");
    console.log(FMplayer, "xxxxcc");

  // ##3、是否调用缓存
// data一开始为false，loading一开始为true// 请求中，data还是false，loading为true
  if (!FMplayerONE.data && FMplayerONE.loading) {
    return <p>loading...........</p>;
  }

  return (
    <div>
        {/* 顶部标签 */}
        <div className={styles.header}>
          <span className={styles.header123}>电台</span>
          <span className={styles.header123}>|</span>
          <span className={styles.header123}>原文</span>
        </div>
      <Fmboard board={FMplayerONE.data}></Fmboard>
      <Fmtext></Fmtext>
    </div>
  );
}

// 箭头函数体的括号不能少
// mapStateToProps() in Connect(Page) must return a plain object. Instead received undefined. 
export default connect(({FMplayer,loading}) =>({
  FMplayer,
  loading: loading.models.FMplayer,
  loadingList: loading.effects['FMplayer/fetchFMplayerList']
  }))(Page);
