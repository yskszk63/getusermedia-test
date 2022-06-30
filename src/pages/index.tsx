import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { Button, Card, Container, List, ListItem, ListItemText, Switch, TextField } from "@mui/material";

declare global {
  export interface MediaTrackConstraintSet {
    brightness?: ConstrainULong;
    colorTemperature?: ConstrainULong;
    contrast?: ConstrainULong;
  }
}

function useSupportedConstraints(): (keyof MediaTrackSupportedConstraints)[] | undefined {
  const [values, setValues] = useState<(keyof MediaTrackSupportedConstraints)[] | undefined>();
  useEffect(() => {
    const result = navigator.mediaDevices.getSupportedConstraints();
    setValues(Object.keys(result) as (keyof MediaTrackSupportedConstraints)[]);
  }, [setValues]);
  return values;
}

function constraintUpdater<K extends keyof MediaTrackConstraintSet>(state: MediaTrackConstraintSet, [key, value]: [K, MediaTrackConstraintSet[K] | undefined]): MediaTrackConstraintSet {
  if (typeof value === "undefined") {
    const { [key]: _, ...rest } = state;
    return rest;
  }

  switch (key) {
    case "height": return { ...state, [key]: value as ConstrainULong };
    case "width": return { ...state, [key]: value as ConstrainULong };
    case "channelCount": return { ...state, [key]: value as ConstrainULong };
    case "sampleRate": return { ...state, [key]: value as ConstrainULong };
    case "sampleSize": return { ...state, [key]: value as ConstrainULong };
    case "brightness": return { ...state, [key]: value as ConstrainULong };
    case "colorTemperature": return { ...state, [key]: value as ConstrainULong };
    case "contrast": return { ...state, [key]: value as ConstrainULong };

    case "aspectRatio": return { ...state, [key]: value as ConstrainDouble };
    case "frameRate": return { ...state, [key]: value as ConstrainDouble };
    case "latency": return { ...state, [key]: value as ConstrainDouble };

    case "autoGainControl": return { ...state, [key]: value as ConstrainDouble };
    case "echoCancellation": return { ...state, [key]: value as ConstrainDouble };
    case "noiseSuppression": return { ...state, [key]: value as ConstrainDouble };
    case "suppressLocalAudioPlayback": return { ...state, [key]: value as ConstrainDouble };
    default: // NOT IMPLEMENTED..
      return {...state}
  }
}

type ConstrainULongControlProps = {
  name: "height" | "width" | "channelCount" | "sampleRate" | "sampleSize" | "brightness" | "colorTemperature" | "contrast";
  value: ConstrainULong | undefined;
  onChange: (value: ConstrainULong | undefined) => void;
}

function ConstrainULongControl({ value, onChange }: ConstrainULongControlProps): JSX.Element {
  const [inner, setInner] = useState<string | null>(null);

  const handleBlur = useCallback(() => {
    setInner(null);
    const v = Number.parseInt(inner ?? "", 10);
    if (!Number.isInteger(v)) {
      onChange(void 0);
      return;
    }
    onChange(v);
  }, [inner, setInner, onChange]);
  return (
    <TextField size="small" value={ inner ?? value ?? ""} onChange={event => setInner(event.target.value)} onBlur={handleBlur} />
  );
}

type ConstrainDoubleControlProps = {
  name: "aspectRatio" | "frameRate" | "latency";
  value: ConstrainDouble | undefined;
  onChange: (value: ConstrainDouble | undefined) => void;
}

function ConstrainDoubleControl({ value, onChange }: ConstrainDoubleControlProps): JSX.Element {
  const [inner, setInner] = useState<string | null>(null);

  const handleBlur = useCallback(() => {
    setInner(null);
    const v = Number.parseFloat(inner ?? "");
    if (!Number.isFinite(v)) {
      onChange(void 0);
      return;
    }
    onChange(v);
  }, [inner, setInner, onChange]);
  return (
    <TextField size="small" value={ inner ?? value ?? ""} onChange={event => setInner(event.target.value)} onBlur={handleBlur} />
  );
}

type ConstrainBooleanControlProps = {
  name: "autoGainControl" | "echoCancellation" | "noiseSuppression" | "suppressLocalAudioPlayback";
  value: ConstrainBoolean | undefined;
  onChange: (value: ConstrainBoolean | undefined) => void;
}

function ConstrainBooleanControl({ value, onChange }: ConstrainBooleanControlProps): JSX.Element {
  return (
    <Switch checked={value === true} onChange={event => onChange(event.target.checked || void 0)}/>
  );
}

type ConstrainDOMStringControlProps = {
  name: "deviceId" | "facingMode" | "groupId";
  value: ConstrainDOMString | undefined;
  onChange: (value: ConstrainDOMString | undefined) => void;
}

function ConstrainDOMStringControl({ value, onChange }: ConstrainDOMStringControlProps): JSX.Element {
  const [inner, setInner] = useState<string | null>(null);

  const handleBlur = useCallback(() => {
    setInner(null);
    onChange(inner ?? void 0);
  }, [inner, setInner, onChange]);
  return (
    <TextField size="small" value={ inner ?? value ?? ""} onChange={event => setInner(event.target.value)} onBlur={handleBlur} />
  );
}

type ConstraintControlProps<K extends keyof MediaTrackConstraintSet> = {
  name: K;
  value: MediaTrackConstraintSet[K] | undefined;
  onChange: (value: MediaTrackConstraintSet[K] | undefined) => void;
}

function ConstraintControl<K extends keyof MediaTrackConstraintSet>({ name, value, onChange }: ConstraintControlProps<K>): JSX.Element {
  switch (name) {
    case "height": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "width": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "channelCount": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "sampleRate": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "sampleSize": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "brightness": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "colorTemperature": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "contrast": return <ConstrainULongControl name={name} value={value as ConstrainULong} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;

    case "aspectRatio": return <ConstrainDoubleControl name={name} value={value as ConstrainDouble} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "frameRate": return <ConstrainDoubleControl name={name} value={value as ConstrainDouble} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "latency": return <ConstrainDoubleControl name={name} value={value as ConstrainDouble} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;

    case "autoGainControl": return <ConstrainBooleanControl name={name} value={value as ConstrainBoolean} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "echoCancellation": return <ConstrainBooleanControl name={name} value={value as ConstrainBoolean} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "noiseSuppression": return <ConstrainBooleanControl name={name} value={value as ConstrainBoolean} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "suppressLocalAudioPlayback": return <ConstrainBooleanControl name={name} value={value as ConstrainBoolean} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;

    case "deviceId": return <ConstrainDOMStringControl name={name} value={value as ConstrainDOMString} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "facingMode": return <ConstrainDOMStringControl name={name} value={value as ConstrainDOMString} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;
    case "groupId": return <ConstrainDOMStringControl name={name} value={value as ConstrainDOMString} onChange={value => onChange(value as MediaTrackConstraintSet[typeof name])} />;

    default: return <>not implemented...</>;
  }
}

function useUserMedia(use: boolean): MediaStream | undefined {
  const [state, setState] = useState<MediaStream | undefined>();

  useEffect(() => {
    if (!use) {
      return;
    }

    const abort = new AbortController();

    (async (signal) => {
      if (signal.aborted) {
        return;
      }

      const media = await window.navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (signal.aborted) {
        for (const track of media.getTracks()) {
          track.stop();
        }
      }
      signal.addEventListener("abort", () => {
        for (const track of media.getTracks()) {
          track.stop();
        }
      });
      setState(media);

    })(abort.signal);

    return () => {
      setState(void 0);
      abort.abort();
    }
  }, [use, setState]);

  return state;
}

export default function Home(): JSX.Element {
  const constraintKeys = useSupportedConstraints();
  const [constraints, updateConstraints] = useReducer(constraintUpdater, {});
  const [use, setUse] = useState(false);
  const mediaStream = useUserMedia(use);
  const video = useRef<HTMLVideoElement | null>(null);

  const [last, setLast] = useState<number>(() => Date.now());
  useEffect(() => {
    Promise.all(mediaStream?.getVideoTracks().map(track => track.applyConstraints(constraints)) ?? []).then(() => setLast(Date.now()));
  }, [mediaStream, constraints, setLast]);

  useEffect(() => {
    if (!video.current) {
      throw new Error();
    }

    video.current.srcObject = mediaStream ?? null;
  }, [mediaStream, video]);

  const settings = useMemo(() => {
    return Object.fromEntries(mediaStream?.getVideoTracks().flatMap(track => Object.entries(track.getSettings())) ?? []);
  }, [mediaStream, last]);

  return (
    <Container>
      <Button variant="contained" onClick={() => setUse(!use)}>{use ? "off" : "on"}</Button>

      <Card sx={{ maxHeight: "32rem", overflow: "auto", padding: "1rem" }}>
        <>{JSON.stringify(constraints)}</>
        <List>
          {(constraintKeys ?? []).map(item => (
            <ListItem key={item}>
              <ListItemText primary={item} secondary={settings[item]}/>
              <ConstraintControl name={item} value={constraints[item]} onChange={value => updateConstraints([item, value])}/>
            </ListItem>
          ))}
        </List>
      </Card>

      <Card sx={{ maxHeight: "32rem", overflow: "auto", padding: "1rem" }}>
      </Card>

      <video ref={video} autoPlay/>
    </Container>
  );
}
