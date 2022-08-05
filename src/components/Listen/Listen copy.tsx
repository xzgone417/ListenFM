// import React from 'react'

// export default function Listen() {
//   return <div>Listen is a awesome component</div>
// } onEnded={()=>jieshu()  
// Son
import React, { forwardRef } from 'react'

const Listen = React.forwardRef<HTMLAudioElement>((props, ref) => {
  return  <audio  autoPlay={false} ref={ref} src={"http://yiapi.xinli001.com/fm/media-url/0/99389004"}>
            </audio>
})

export default Listen;

