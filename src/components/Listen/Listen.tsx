import { connect } from '@umijs/max';
import React  from 'react'

const Listen = React.forwardRef<HTMLAudioElement>((props:any, ref) => {
  // console.log(props,"xxxxxxxxxxx",);
  return  <audio  autoPlay={false} src={props.FMplayer.FMsong.url} id="listen">
            </audio>
})

// export default Listen;

export default connect(({ FMplayer, loading }) => ({
  FMplayer,
  //表示user这个model有数据请求行为的时候，loading为true，没有请求的时候为false
  loading: loading.models.FMplayer, 
}))(Listen);