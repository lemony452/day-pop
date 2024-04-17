"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./WebPlayback.module.css";
import Controller from "./Controller";

export default function WebPlayback({ access_token, cardInfo }) {
  const [player, setPlayer] = useState(undefined);
  const [deviceId, setDeviceId] = useState();
  // const [is_active, setActive] = useState(false);
  // const [is_paused, setPaused] = useState(false);
  // const [position, setPosition] = useState(0);
  // const [duration, setDuration] = useState(0);

  useEffect(() => {
    const playbackSpotifyPlayer = () => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("============");
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            // cb(token.replace(/\"/g, ""));
            cb(access_token);
          },
          volume: 0.5,
        });
        // console.log("player : ", player);

        player.addListener("ready", async ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          // setDeviceId(device_id);
          // setReady(true);

          setDeviceId(device_id);
          setPlayer(player);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player
          .connect()
          .then(async () => {
            console.log("플레이어 연결 성공");
          })
          .catch((e) => console.log("플레이어 연결 실패"));
      };
    };

    playbackSpotifyPlayer();
  }, []);

  useEffect(() => {
    if (player) {
      return () => {
        console.log("$$$$$$$", player);
        if (player) {
          player.removeListener("ready");
          player.disconnect();
        }
      };
    }
  }, [player]);

  return (
    <>
      <section className={styles.player}>
        <div className={styles["player-wrapper"]}>
          <div className={styles["player-info"]}>
            <Image
              src={cardInfo.trackImgSrc}
              className={styles.album}
              alt="album image"
              width={100}
              height={100}
            />

            <div className={styles["player-side"]}>
              <div className={styles["track-name"]}>{cardInfo.trackTitle}</div>

              <div className={styles["track-artist"]}>
                {cardInfo.trackArtist}
              </div>
            </div>
          </div>

          <Controller
            player={player}
            device_id={deviceId}
            track_uri={cardInfo.track_uri}
            access_token={access_token}
            // isPaused={is_paused}
            // duration={duration}
            // currentPosition={position}
            // isActive={is_active}
          ></Controller>
        </div>
      </section>
    </>
  );
}
