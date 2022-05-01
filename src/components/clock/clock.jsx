import { useEffect, useState, useRef } from 'react';
import Pie from '../pie/pie';
import Button from '../button/button';
import { ReactComponent as PlayIcon } from "./icons/play.svg";
import { ReactComponent as PauseIcon } from "./icons/pause.svg";
import { ReactComponent as ResetIcon } from "./icons/reset.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as EditResetIcon } from "./icons/editReset.svg";
import { ReactComponent as EditContinueIcon } from "./icons/editContinue.svg";
import TimeEntry from '../inputTime/inputTime';

function Clock(props) {
  const remoteControl = props.remoteControl;
  const size = props.size ? props.size : 100;
  const onComplete = props.onComplete;

  const [targetMs, setTargetMs] = useState(props.targetSeconds ? props.targetSeconds * 1000 : 60 * 1000);
  const [spentMs, setSpentMs] = useState(0);
  const [active, setActive] = useState(props.started);
  const [showEdit, setShowEdit] = useState(false);

  const editingTotalMs = useRef(0);

  useEffect(() => { 
    if (!remoteControl) return;
    const onPlayDestructor = remoteControl.onPlay(() => { 
      if (spentMs >= targetMs)
        setSpentMs(0);
      setActive(true);
    });
    const onPauseDestructor = remoteControl.onPause(() => setActive(false));
    const onResetDestructor = remoteControl.onReset(() => setSpentMs(0));
    const onSetElapsedDestructor = remoteControl.onSetElapsed((ms) => setSpentMs(ms));
    const onSetTargetDestructor = remoteControl.onSetTarget((ms) => setTargetMs(ms));
    return () => {
      onPlayDestructor();
      onPauseDestructor();
      onResetDestructor();
      onSetElapsedDestructor();
      onSetTargetDestructor();
    };
  }, [ remoteControl ]);

  useEffect(_ => {
    let previousTick = new Date().getTime();
    const timeout = setInterval(_ => {
      let currentTick = new Date().getTime()
      const timeSinceLastTick = currentTick - previousTick;
      previousTick = currentTick;
      if (active) {
        setSpentMs(t => {
          if (t + timeSinceLastTick >= targetMs) {
            if (onComplete) onComplete();
            setActive(false);
          }
          return Math.min(targetMs, t + timeSinceLastTick);
        });
      }
    }, 45);
    return _ => clearInterval(timeout);
  }, [ active, onComplete, targetMs ]);

  useEffect(_ => {
    setSpentMs(props.elapsedSeconds ? props.elapsedSeconds * 1000 : 0);
  }, [ props.elapsedSeconds ])

  const totalSeconds = (targetMs - spentMs) / 1000;
  const hours = Math.floor(totalSeconds / 60 / 60);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const minutesStr = minutes.toString(10).padStart(2, 0);
  const seconds = props.showMilliseconds ? (totalSeconds % 60) : Math.floor(totalSeconds % 60);
  const secondsStr = props.showMilliseconds ? seconds.toFixed(3).padStart(6, 0) : seconds.toString(10).padStart(2, 0);

  return (
    <div style={{
      display: `flex`,
      fontSize: (size/100) * 12,
      placeItems: `center`,
      flexDirection: 'row',
      width: `${size}px`,
      height: `${size}px`,
      position: "relative",
      color: "white"
    }}>
      
      { showEdit && 
        <div style={{
            position: 'absolute',
            backgroundColor: "#333",
            border: "solid 1px #444",
            borderRadius: "5px",
            width: "70%",
            padding: "15px 10px",
            boxSizing: "border-box",
            left: "15%",
            display: "flex",
            placeItems: "center",
            justifyContent: "space-evenly"
          }}>
            <TimeEntry onChange={v => editingTotalMs.current = v}
                       value={totalSeconds} />
            <Button alone 
                    onClick={_ => {
                      setSpentMs(0);
                      setTargetMs(editingTotalMs.current);
                      setShowEdit(false);
                    }}
                    style={{
                      position: "absolute", 
                      right: 35,
                      bottom: -35
                    }}>
              <EditResetIcon />
            </Button>
            <Button alone 
                    onClick={_ => {
                      if (editingTotalMs.current > targetMs) {
                        setSpentMs(0);
                        setTargetMs(editingTotalMs.current);
                      } else {
                        setSpentMs(targetMs - editingTotalMs.current);
                      }
                      setShowEdit(false);
                    }}
                    style={{
                      position: "absolute", 
                      right: 0,
                      bottom: -35
                    }}>
              <EditContinueIcon />
            </Button>
        </div>
      }

      <Pie
        size={size}
        value={spentMs/targetMs}
        color={spentMs >= targetMs ? "#AAFFAA" : active ? "#FFB3F2" : "#268de0"}
        style={{
          display: `block`
        }}
      />

      <div style={{
        display: "flex",
        placeItems: "center",
        flexDirection: "column",
        marginLeft: `-${size}px`,
        width: "100%",
        fontFamily: "sans-serif",
        textAlign: "center"
      }}>

        <span 
          contentEditable 
          suppressContentEditableWarning
          style={{
            fontSize: ".6em",
            marginBottom: ".6em",
            padding: ".2em .4em"
          }}>
            {props.name}
        </span>

        <time style={{
          fontSize: props.showMilliseconds ? "1em" : "1.3em",
          fontWeight: "bold",
          marginBottom: ".4em"
        }}>
          {hours}:{minutesStr}:{secondsStr}
        </time>

        <div>
          { props.controls && <>
            <Button left 
              onClick={_ => {
                if (spentMs >= targetMs) {
                  setSpentMs(0);
                }
                setActive(!active)
              }}>
              {active ? <PauseIcon /> : <PlayIcon />}
            </Button>
            { props.edit &&
              <Button 
                onClick={_ => {
                  setActive(false);
                  setShowEdit(!showEdit);
                }}>
                <EditIcon />
              </Button>
            }
            <Button right onClick={_ => setSpentMs(0)}>
              <ResetIcon />
            </Button>
          </> }
        </div>

      </div>
    </div>
  );
}

export default Clock;
