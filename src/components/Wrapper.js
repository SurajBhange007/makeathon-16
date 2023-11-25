// import React, {useEffect, useRef} from 'react'

// export default function Wrapper(props) {
//     const ref = useRef(null)
//     useEffect(() => {
//         if (props.newChats?.length) {
//           ref.current?.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, [props.newChats?.length]);
//   return (
//     <div className=''><div>{props.children}</div>
//      <div ref={ref} /></div>
//   )
// }
