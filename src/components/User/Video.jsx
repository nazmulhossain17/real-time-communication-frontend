import React, { useEffect, useRef } from "react";
import ZegoExpressEngine from "zego-express-engine-webrtc";

const appID = "2084606523"; // Replace with your AppID
const appSign = "b654b17f85e51f6a80f9294c90c2ff7a"; // Replace with your AppSign
const userID = "YOUR_USER_ID"; // Unique user ID
const userName = "YOUR_USER_NAME"; // Display name

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const zegoEngine = new ZegoExpressEngine(appID, appSign);

    const initCall = async () => {
      await zegoEngine.loginRoom("ROOM_ID", { userID, userName });

      // Start local stream
      const localStream = await zegoEngine.createStream({
        camera: { video: true, audio: true },
      });
      localVideoRef.current.srcObject = localStream;

      // Play remote stream
      zegoEngine.on(
        "roomStreamUpdate",
        async (roomID, updateType, streamList) => {
          if (updateType === "ADD") {
            const remoteStream = await zegoEngine.startPlayingStream(
              streamList[0].streamID
            );
            remoteVideoRef.current.srcObject = remoteStream;
          } else if (updateType === "DELETE") {
            zegoEngine.stopPlayingStream(streamList[0].streamID);
            remoteVideoRef.current.srcObject = null;
          }
        }
      );
    };

    initCall();

    return () => {
      zegoEngine.logoutRoom("ROOM_ID");
      zegoEngine.destroy();
    };
  }, []);

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "400px", height: "300px" }}
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{ width: "400px", height: "300px" }}
      />
    </div>
  );
};

export default VideoCall;
