import { connect } from '@/.umi/plugin-dva';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Link } from '@umijs/max'
import React, { useEffect, useState } from 'react'
import styles from './index.less'
 function Playbar(FM) {
// console.log(FM,"xxxlmg");
  // const [whostop, setStop] = useState<boolean>(true);
  const audioRef=document.getElementsByTagName("audio")[0];

  // 暂停播放
const songstop=()=>{
  if (audioRef) {
    audioRef.pause();
    // setStop(false)
    FM.dispatch({
      type: 'FMplayer/PlayOrNot', 
    });
  }
}
// 开始播放
const songplay=()=>{
  if (audioRef) {
    audioRef.play();
    // setStop(true);
    FM.dispatch({
      type: 'FMplayer/PlayOrNot', 
    });
  }
}

// 播放完成函数
function audioEnded() {
  if (audioRef) {
    audioRef.play();
  }
}
    // 监听播放完成事件
    useEffect(() => {
      if (audioRef) {
        audioRef.addEventListener('ended', function () {
           audioEnded();
         }, false)
      }
    })


  return (
  <div>   
   {FM.FMplayer.FMsong.title ? 
  <div className={styles.player}>
  <div className={styles.westop}>
        {FM.FMplayer.play ? <PauseCircleOutlined onClick={()=>songstop()}></PauseCircleOutlined> : <PlayCircleOutlined onClick={()=>songplay()}></PlayCircleOutlined>}
      </div>  
      <Link to={`/FMplayer/${FM.FMplayer.id}`}>
      <div className={styles.song}>
     {/* <audio src={FM.FMplayer.FMsong.url} autoPlay={true}>
      </audio> */}
   <div className={styles.songt}>{FM.FMplayer.FMsong.title}</div>
      <div className={styles.songb}>{FM.FMplayer.FMsong.speak}</div>    
     </div>
     </Link>
  </div>
  :
  <div className={styles.playernot}>聆听FM，世界和我爱着你</div>
   }
 </div>
   )
}


export default connect(({ FMplayer, loading }) => ({
  FMplayer,
  //表示user这个model有数据请求行为的时候，loading为true，没有请求的时候为false
  loading: loading.models.FMplayer, 
}))(Playbar);