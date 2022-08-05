/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { RefObject, useEffect, useRef, useState, useMemo } from 'react'
import styles from './Fmboard.less'
import { Image, Tag, Popup, Dialog, Toast } from 'antd-mobile'
import { HeartOutline, DownlandOutline, MessageOutline, ClockCircleOutline, HeartFill } from 'antd-mobile-icons'
import { StepBackwardOutlined, StepForwardOutlined, PlayCircleOutlined, RetweetOutlined, BarsOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { useRequest } from '@umijs/max';
import { queryAttention, queryAttentionOK } from '@/services/FMplayer';
import fire from "@/assets/xzg/iconfont.css"

export default function Fmboard(props: any) {
  // console.log(props);
  const audioRef: RefObject<HTMLAudioElement> = useRef<HTMLAudioElement>(null);
  const stopRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const progressBar: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const progressBarBg: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const progressDot: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null);
  const audioCurTime: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null);
  const [lookAt, setLook] = useState<boolean>(true);
  const [listRound, setRound] = useState<boolean>(true);
  const [visible1, setVisible1] = useState(false)
  const [whostop, setStop] = useState<boolean>(true);
  const [loveornot, setlover] = useState<boolean>(false);
  const [YHYH, setYHYH] = useState<boolean>(true);
  // 计算属性计算时间
  let myduration = useMemo(() => {
    return (transTime(props.board.duration))
  }, [props.board.duration]);

  // 是否关注主播
  const attentionOK = useRequest(() => {
    return queryAttentionOK(props.board.diantai.id)
  })
  // console.log(attentionOK, "aaaaaaaooooooo");
  useEffect(() => {
    setLook(attentionOK.data)
  }, [attentionOK.data])
  // 关注主播
  const attention = useRequest(() => {
    return queryAttention(props.board.diantai.id)
  }, {
    manual: true
  })


  // 播放列表
  const myreload = props.reload;


  // 列表
  const needList = () => {
    setVisible1(true);
  };
  // 列表换歌
  const otherFM = (arg) => {
    const numid = parseInt(props.board.id)
    if (numid !== arg) {
      myreload(arg);
    }
    // console.log(arg); 
  }



  // 上一首
  const lastFM = () => {
    const needindex = props.FMlist.findIndex((item) => {
      // eslint-disable-next-line eqeqeq
      return item.id == props.board.id
    })
    // console.log(needindex,"kkkkkkkkkkkkkkkk");
    const shao1 = needindex + 1;
    // console.log(shao1,"1111111");
    const leftneed = props.FMlist.find((item, index) => {
      // eslint-disable-next-line eqeqeq
      return shao1 === index
    })
    const firstsongnot = props.FMlist.find((item, index) => {
      return index === props.FMlist.length + 1
    })
    // console.log(leftneed,"vvvvvvvvvv");
    if (shao1 === 0) {
      myreload(firstsongnot.id)
    } else {
      myreload(leftneed.id);
    }
  }
  // 下一首、、、、、、、、、、、
  const nextFM = () => {
    // forEach没有return，普通for循环
    //  props.FMlist.forEach((item,index)=>{
    //     console.log(index,item.id);
    //   });
      console.log(props.board.id);
    const needindex = props.FMlist.findIndex((item) => {
      // eslint-disable-next-line eqeqeq
      return item.id == props.board.id
    })
    const jia1 = needindex + 1;
    const rightneed = props.FMlist.find((item, index) => {
      // eslint-disable-next-line eqeqeq
      return jia1 === index
    })
    const firstsong = props.FMlist.find((item, index) => {
      return index === 0
    })
    if (jia1 === props.FMlist.length) {
      myreload(firstsong.id)
    } else {
      myreload(rightneed.id);
    }

  }
  // 关注
  const guanzhu = () => {
    attention.run()
    setLook(true)
  }
  const cancelguanzhu = () => {
    attention.run()
    setLook(false)
  }

  // 列表循环
const changeround =()=>{
  setRound(false);

  }
  // 单曲循环
  const changesingle =()=>{
    setRound(true)
  }

  // 点击播放/暂停图片时，控制音乐的播放与暂停
  const changefunc = () => {
    // 改变播放/暂停图片,类型断言要放在后面
    if (audioRef.current!.paused) {
      setStop(true)
      audioRef.current!.play();
    } else {
      setStop(false)
      audioRef.current!.pause();
    }

  }

    /**
  * 更新进度条与当前播放时间////////
  * @param {object} argument - audioRef对象
  */
     const  updateProgress=(argument) =>{
      let value = argument.currentTime / argument.duration;
      progressBar.current!.style.width = value * 100 + '%';
      progressDot.current!.style.left = value * 100 + '%';
      audioCurTime.current!.innerText = transTime(argument.currentTime);
  
    }
  

  // 监听音频播放时间并更新进度条
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current!.addEventListener('timeupdate', function () {
        updateProgress(audioRef.current!);
      }, false);
    }
  })



  /**
  * 音频播放时间换算
  * @param {number} value - 音频当前播放时间，单位秒
  */
  function transTime(vtimer: number) {
    // console.log(vtimer,"rrrrrrrrrrrrrrrrrrrr");
    let time = "";
    let h: number = parseInt(vtimer / 3600);
    // eslint-disable-next-line no-param-reassign
    vtimer %= 3600;
    let m: number = parseInt(vtimer / 60);
    let s: number = parseInt(vtimer % 60);
    if (h > 0) {
      time = formatTime(h + ":" + m + ":" + s);
    } else {
      time = formatTime(m + ":" + s);
    }
    return time;
  }

  /**
  * 格式化时间显示，补零对齐
  * eg：2:4  -->  02:04
  * @param {string} value - 形如 h:m:s 的字符串 
  */
  function formatTime(value) {
    let time = "";
    let s = value.split(':');
    let i = 0;
    for (; i < s.length - 1; i++) {
      time += s[i].length === 1 ? ("0" + s[i]) : s[i];
      time += ":";
    }
    time += s[i].length === 1 ? ("0" + s[i]) : s[i];
    return time;
  }

  // 点击进度条跳到指定点播放
  // PS：此处不要用click，否则下面的拖动进度点事件有可能在此处触发，此时e.offsetX的值非常小，会导致进度条弹回开始处（简直不能忍！！）
  useEffect(() => {
    progressBarBg.current!.addEventListener('mousedown', function (event) {
      // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
      if (!audioRef.current!.paused || audioRef.current!.currentTime !== 0) {
        let pgsWidth = parseFloat(window.getComputedStyle(progressBarBg.current!, null).width.replace('px', ''));
        let rate = event.offsetX / pgsWidth;
        audioRef.current!.currentTime = audioRef.current!.duration * rate;
        updateProgress(audioRef.current!);
      }
    }, false);
  })

  /**
   * 鼠标拖动进度点时可以调节进度
   * @param {*} audio
   */
  useEffect(() => {
    dragProgressDotEvent(audioRef.current!)
  })

  function dragProgressDotEvent(audio) {
    // var dot = document.getElementById('progressDot');

    // eslint-disable-next-line no-var
    var position = {
      oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
      oriX: 0, // 移动开始时的x坐标
      maxLeft: 0, // 向左最大可拖动距离
      maxRight: 0 // 向右最大可拖动距离
    };
    let flag = false; // 标记是否拖动开始


    function down(event) {

      if (!audio.paused || audio.currentTime !== 0) { // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
        flag = true;

        position.oriOffestLeft = progressDot.current!.offsetLeft;
        // console.log( position.oriOffestLeft,"hhhhhhhhhhhhhhhhhhhhhh");

        position.oriX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousedown和touchstart事件
        position.maxLeft = position.oriOffestLeft; // 向左最大可拖动距离
        position.maxRight = progressBarBg.current!.offsetWidth - position.oriOffestLeft; // 向右最大可拖动距离   #######################问题在这，DOM元素找错了
        //  console.log(event,"xxxxxxxxxxxeeeeee"); ////////////////////////

        // 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
        if (event && event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }

        // 禁止事件冒泡
        if (event && event.stopPropagation) {
          event.stopPropagation();
        } else {
          window.event!.cancelBubble = true;
        }
      }
    }

    function move(event) {

      if (flag) {
        let clientX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousemove和touchmove事件


        let length = clientX - position.oriX;

        if (length > position.maxRight) {
          length = position.maxRight;
        } else if (length < -position.maxLeft) {
          length = -position.maxLeft;
        }
        // let progressBarBg = document.getElementById('progressBarBg');
        let pgsWidth = parseFloat(window.getComputedStyle(progressBarBg.current!).width.replace('px', ''));

        let rate = (position.oriOffestLeft + length) / pgsWidth;
        // console.log(rate,"ccccccxxx",length,"lll",position.oriOffestLeft);
        audio.currentTime = audio.duration * rate;
        // console.log(audio.currentTime,"zzzzzzzzzzz");
        updateProgress(audio);
      }
    }

    function end() {
      flag = false;
    }
    // 鼠标按下时
    progressDot.current!.addEventListener('mousedown', down, false);
    progressDot.current!.addEventListener('touchstart', down, false);

    // 开始拖动
    document.addEventListener('mousemove', move, false);
    document.addEventListener('touchmove', move, false);

    // 拖动结束
    document.addEventListener('mouseup', end, false);
    progressBarBg.current!.addEventListener('touchend', end, false);
  }

    // 监听播放完成事件
  // useEffect(() => {
  //   // if (listRound===true) {
  //     // 放完歌后不会更新页面
  //     audioRef.current!.addEventListener('ended', function () {
  //       console.log("zhengquede"); 
  //      if (listRound===true) {  
  //       audioEnded();
  //       }else {
  //       nextFM();
  //       }
  //     }, false)
  // })
  // console.log(listRound,"xxxxxx7777777");  
  const jieshu =()=>{
    console.log("zzzz");   
    if (listRound===true) {  
      audioEnded();
      }else {
      nextFM();
      }
  } 


  /**
  * 播放完成时把进度调回开始的位置
  */
  function audioEnded() {
    progressBar.current!.style.width = "0";
    progressDot.current!.style.left = "0";
    audioCurTime.current!.innerText = transTime(0);
    audioRef.current!.play();
    // document.getElementById('audioPlayer').src = './image/play.png';
  }



  // console.log(props);

  return (
    <>
      <div className={styles.contanier}>
        {/* 图片和歌手信息 */}
        <div className={styles.cover}>
          <Image src={props.board.diantai.cover} width={290} height={290} fit='cover' />
        </div>
        <div className={styles.song}>
          <div className={styles.title}>{props.board.title}</div>
          <div className={styles.speak}> <span className={styles.speaker}>{props.board.speak}</span>
            {/* 加关注 */}
            {lookAt
              ?
              <Tag
              color='#ec7c70'  fill='outline' round style={{ '--border-radius': '6px' }}
                onClick={() =>
                  Dialog.confirm({
                    content: '是否取消关注该主播',
                    onConfirm: () => {
                      cancelguanzhu()
                      Toast.show({
                        icon: 'success',
                        content: '取消成功',
                        position: 'bottom',
                      })
                    }
                  })
                }
              >
                已关注
              </Tag>
              :
              <Tag
                color='#ec7c70' fill='outline' round style={{ '--border-radius': '6px' }}
                onClick={() =>
                  Dialog.confirm({
                    content: '是否关注该主播',
                    onConfirm: () => {
                      guanzhu()
                      Toast.show({
                        icon: 'success',
                        content: '关注成功',
                        position: 'bottom',
                      })
                    }
                  })
                }
              >
                +关注
              </Tag>
            }

          </div>
        </div>
        {/* 4个小图标 */}
        <div className={styles.myicons}>
          {loveornot ? <HeartFill onClick={() => setlover(false)} style={{ "color": "red" }} /> : <HeartOutline onClick={() => setlover(true)} ></HeartOutline>}
          <DownlandOutline></DownlandOutline>
          <MessageOutline></MessageOutline>
          <ClockCircleOutline></ClockCircleOutline>
        </div>
        <div className={styles.linebox}>
          {/* 播放线  增加loop属性就无法监听播放器结束事件 */}
          <div className={styles.audioWrapper}>   
            <audio src={props.board.url} autoPlay={true} ref={audioRef} onEnded={()=>jieshu()}>
            </audio>
            <div className={styles.audioright}>
              <div className={styles.progressbarbg} id="progressBarBg" ref={progressBarBg}>
                <span id="progressDot" ref={progressDot}></span>
                <div className={styles.progressbar} id="progressBar" ref={progressBar}></div>
              </div>
              {/* 时间 */}
              <div className={styles.audiotime}>
                <span className={styles.audiolengthcurrent} ref={audioCurTime} id="audioCurTime">00:00</span>
                <span className={styles.audiolengthtotal}>{myduration}</span></div>
            </div>
          </div>

          {/* 控制单元 */}
          <div className={styles.control}>
    {listRound
    ?  
    <span className={fire.iconfont+" "+fire.iconDanquxunhuan+" "+styles.singleFM} onClick={()=>changeround()}></span> : 
    <RetweetOutlined onClick={()=>changesingle()}></RetweetOutlined>  }

            <StepBackwardOutlined onClick={() => lastFM()}></StepBackwardOutlined>

            <div className={styles.westop} ref={stopRef} onClick={changefunc}>
              {whostop ? <PauseCircleOutlined></PauseCircleOutlined> : <PlayCircleOutlined></PlayCircleOutlined>}

            </div>
            <StepForwardOutlined onClick={() => nextFM()}></StepForwardOutlined>
            <BarsOutlined onClick={needList}></BarsOutlined>
            {/* 弹出层 */}
            <Popup visible={visible1}
              onMaskClick={() => {
                setVisible1(false)
              }}>
              <div style={{ height: '60vh', overflowY: 'scroll' }}>
                <div className={styles.poplist}>
                  <div className={styles.popon}>播放列表：{props.FMlist && <span>{props.FMlist.length}</span>}首</div>
                  {props.FMlist && props.FMlist.map((item,index) => {
                    return (<div key={index} className={styles.listsong} onClick={() => otherFM(item.id)}>
                      <span className={styles.listsongtitle}>{item.title}</span>
                      <span className={styles.listsonger}>-{item.speak}</span>
                    </div>)
                  })}
                </div>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </>
  )
}
