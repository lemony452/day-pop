"use client";

import Image from "next/image";
import styles from "./Controller.module.css";
import { useEffect, useState } from "react";
import { onPlayTrack } from "@/lib/play";

const transToTimeFormat = (time) => {
  const timeToSec = Math.ceil(time / 1000);
  const minutes = parseInt(timeToSec / 60);
  const seconds = timeToSec % 60;

  return `${minutes}:${seconds < 10 ? "0" + String(seconds) : seconds}`;
};

export default function Controller({
  player,
  access_token,
  track_uri,
  device_id,
  // isPaused,
  // duration,
  // currentPosition,
  // isActive,
}) {
  // const [position, setPosition] = useState(currentPosition);
  const [isPaused, setPaused] = useState(false);
  // const [isActive, setActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const durationValue = transToTimeFormat(duration);
  const positionValue = transToTimeFormat(position);

  useEffect(() => {
    const play = async () => {
      await onPlayTrack(access_token, track_uri, device_id);

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        // setTrack(() => state.track_window.current_track); // 현재 트랙 정보 가져옴
        setPaused(state.paused); // 정지 또는 플레이
        setPosition(state.position); // 재생 시간 ms
        setDuration(state.duration); // 총 시간 ms

        // player.getCurrentState().then((state) => {
        //   !state ? setActive(false) : setActive(true);
        // });
      });
    };
    if (player) {
      play();
    }
  }, [player, device_id, track_uri, access_token]);

  useEffect(() => {
    if (!player) return;
    if (!isPaused) {
      const interval = setInterval(() => {
        setPosition((prevPosition) => prevPosition + 100);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPaused, setPosition, player]);

  return (
    <div className={styles["player-controller-container"]}>
      <button
        className="btn-spotify"
        onClick={() => {
          player.togglePlay();
        }}
      >
        {isPaused ? (
          <Image
            src={"/PlayIcon.png"}
            alt="play image"
            width={30}
            height={30}
          />
        ) : (
          <Image
            src={"/StopIcon.png"}
            alt="play image"
            width={30}
            height={30}
          ></Image>
        )}
      </button>

      <div className={styles["player-time"]}>
        <div className="current-position">{positionValue}</div>
        <div className={styles["player-progressbar"]}></div>
        <div className="player-duration">{durationValue}</div>
      </div>
    </div>
  );
}
