import React, { useState, useEffect } from 'react'
import '../Style/home.css';
import ChatWindow from './ChatWindow';
import PPTWindow from './PPTWindow';
import RecordRTC from 'recordrtc';
import Analyser from 'web-audio-analyser';

export default function Home() {
  const [chatWindow, setChatWindow] = useState(true);//false
  const [recorder, setrecorder] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])
  const [isRecording, setIsrecording] = useState(false)
  // var timerId;

  useEffect(() => {
    const initializerecorder = async() => {
      try{
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const option = {
          type: 'audio',
          mimeType: 'audio/wav',
          recorderType: RecordRTC.StereoAudioRecorder,
          timeSlice: 3000,
          ondataavailable: blob => {
            setAudioChunks(prev => [...prev, blob]);
          },
        }
        const newRecorder = new RecordRTC(stream, option);
        const analyser = Analyser(stream, {stereo: false});
        analyser.analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.analyser.frequenceBinCount);

        newRecorder.startRecording()
        setrecorder(newRecorder)
        setIsrecording(true)
        checkAudioLevel(analyser,dataArray);
      } catch(err) {
          console.error(err)
      }
    };
    initializerecorder();

    return () => {
      if(recorder) {
        recorder.stopRecording(() => {
          const finalAudioBlob = recorder.getBlob();
          // upload to server
          setAudioChunks(recorder.getBlob())
          console.log(finalAudioBlob, 'stop');
        })
        setIsrecording(false)
        recorder.reset()
      }
    };
  }, []);
// 

  const checkAudioLevel = (analyser, recorderInstance) => {
    const silencethreshold = 128;
    const sileneceDuration = 2000;
    const checkSilence = () => {
      analyser.analyser.getByteFrequencyData(recorderInstance)
      const average = recorderInstance.reduce((acc, val) => acc + val, 0) //length of recorderInstance
      // const audioLevel = recorderInstance.audioInputVolume;
      if (average < silencethreshold) {
        console.log('Silenece Detected');
        stopRecording();
        // clearInterval(timerId)
      } else {
        setTimeout(checkSilence, sileneceDuration)
    }

  }; 
  checkSilence()
}
  const stopRecording = () => {
    if(recorder) {
      recorder.stopRecording(() => {
        // setAudioChunks(false);
        setIsrecording(false);
      })
    }
  }

  return (
    <div className='home-wrapper'>
      {chatWindow && <div className='flex-item-1 chat-layout-wrapper'><ChatWindow/></div>}
      <div className='flex-item-2'><PPTWindow />
      <div>
        {isRecording && <p>Recording ...</p>}
        <button onClick={stopRecording} disabled={!isRecording}>Stop Recording </button>
      </div>
      {audioChunks?.length > 0 && (
        <div>
          <p>Recorded Audio</p>
        <audio controls>
          {audioChunks.map((chunk, index) => {
          return <source index={index} src={URL.createObjectURL(chunk)} type="audio/wav" />
          
          })}
          {/* <source src={URL.createObjectURL(audioChunks)} type="audio/wav" /> */}
        </audio>
        </div>
      )}
      </div>

    </div>
  )
}


// --------2nd opproach -Z-



// import React, { useState, useEffect } from 'react'
// import '../Style/home.css';
// import ChatWindow from './ChatWindow';
// import PPTWindow from './PPTWindow';
// import RecordRTC from 'recordrtc';
// import AudioAnalyser from 'audio-analyser';

// export default function Home() {
//   const [chatWindow, setChatWindow] = useState(true);//false
//   const [recorder, setrecorder] = useState(null)
//   const [audioChunks, setAudioChunks] = useState([])
//   const [isRecording, setIsrecording] = useState(false)


//   useEffect(() => {
//     const initializerecorder = async() => {
//       try{
//         const stream = await navigator.mediaDevices.getUserMedia({audio: true});
//         const option = {
//           type: 'audio',
//           mimeType: 'audio/wav',
//           recorderType: RecordRTC.StereoAudioRecorder,
//           timeSlice: 3000,
//           ondataavailable: blob => {
//             setAudioChunks(prev => [...prev, blob]);
//           },
//         }
//         const newRecorder = new RecordRTC(stream, option);
//         // const analyser = Analyser(stream, {stereo: false});
//         // analyser.analyser.fftSize = 256;
//         // const dataArray = new Uint8Array(analyser.analyser.frequenceBinCount);

//         newRecorder.startRecording()
//         setrecorder(newRecorder)
//         setIsrecording(true)
//         setTimeout(() => {
//           stopRecording();
//         }, 10000)
//         // checkAudioLevel(analyser,dataArray);
//       } catch(err) {
//           console.error(err)
//       }
//     };
//     initializerecorder();

//     return () => {
//       if(recorder) {
//         recorder.stopRecording(() => {
//           const finalAudioBlob = recorder.getBlob();
//           // upload to server
//           setAudioChunks(recorder.getBlob())
//           console.log(finalAudioBlob, 'stop');
//         })
//         analyseAudio();
//         setIsrecording(false)
//         recorder.reset()
//       }
//     };
//   }, []);


//   const checkAudioLevel = (analyser, recorderInstance) => {
//     const silencethreshold = 128;
//     const sileneceDuration = 2000;
//     const checkSilence = () => {
//       analyser.analyser.getByteFrequencyData(recorderInstance)
//       const average = recorderInstance.reduce((acc, val) => acc + val, 0) //length of recorderInstance
//       // const audioLevel = recorderInstance.audioInputVolume;
//       if (average < silencethreshold) {
//         console.log('Silenece Detected');
//         stopRecording();
//       } else {
//         setTimeout(checkSilence, sileneceDuration)
//     }

//   }; 
//   checkSilence()
// }


// const analyseAudio = () => {
//   const analyser = new AudioAnalyser({audio: audioChunks})
//   const silencethreshold = 50;
//   audioChunks.forEach(element => {
//     analyser.setSource(URL.createObjectURL(element));
//     const rms = analyser.getRMS();
//     if (rms < silencethreshold) {
//       console.log('Silenece');
//     }
//   });
//   const overAllRMS = analyser.getRMS();
//   console.log(overAllRMS);
// }
//   const stopRecording = () => {
//     if(recorder) {
//       recorder.stopRecording(() => {
//         // setAudioChunks(false);
//         setIsrecording(false);
//       })
//     }
//   }

//   return (
//     <div className='home-wrapper'>
//       {chatWindow && <div className='flex-item-1'><ChatWindow/></div>}
//       <div className='flex-item-2'><PPTWindow />
//       <div>
//         {isRecording && <p>Recording ...</p>}
//         <button onClick={stopRecording} disabled={!isRecording}>Stop Recording </button>
//       </div>
//       {audioChunks?.length > 0 && (
//         <div>
//           <p>Recorded Audio</p>
//         <audio controls>
//           {audioChunks.map((chunk, index) => {
//           return <source index={index} src={URL.createObjectURL(chunk)} type="audio/wav" />
          
//           })}
//           {/* <source src={URL.createObjectURL(audioChunks)} type="audio/wav" /> */}
//         </audio>
//         </div>
//       )}
//       </div>

//     </div>
//   )
// }

// import React from 'react';
// import useRecorder from './UseRecorder';

// export default function Home() {
  
//     const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
//     return (
//       <div className="App">
//         {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
//         <div>
//           {audioURL && (
//             <audio
//               controls="controls"
//               preload="none"
//               src={audioURL}
//               type="audio/wav"
//             />
//           )}
//           dataavailable
//         </div>
//         <button onClick={startRecording} disabled={isRecording}>
//           start recording
//         </button>
//         <button onClick={stopRecording} disabled={!isRecording}>
//           stop recording
//         </button>
//         <p>audioURL: {audioURL}</p>
//       </div>
//     );
// }
