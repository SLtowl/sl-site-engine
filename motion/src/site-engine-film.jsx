import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { motionTokens } from './motion.tokens.js';
import { plaqueContours, sceneSize } from './plaque-contours.js';
import './style.css';

const { durationInFrames: DURATION, easing, sequence } = motionTokens;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const emphasizedEase = Easing.bezier(...easing.emphasized);

const keyed = (frame, frames, values, ease = emphasizedEase) =>
  interpolate(frame, frames, values, { ...clamp, easing: ease });

const plaques = plaqueContours.map((plaque, index) => ({
  ...plaque,
  start: sequence.plaqueStart + index * sequence.plaqueStagger,
}));

const ScreenCover = ({ plaque, frame, reducedMotion }) => {
  const opacity = reducedMotion
    ? 0
    : keyed(
      frame,
      [plaque.start, plaque.start + sequence.plaqueReveal, sequence.outroStart, DURATION - 1],
      [1, 0, 0, 1],
    );
  return (
    <g
      className="screen-cover"
      opacity={opacity * motionTokens.plaqueDimming.opacity}
      mask={plaque.occludedBy ? `url(#visible-${plaque.id})` : undefined}
    >
      <path
        d={plaque.d}
        fill={motionTokens.plaqueDimming.color}
        stroke={motionTokens.plaqueDimming.color}
        strokeWidth={motionTokens.plaqueDimming.edgeOverlap}
        strokeLinejoin="round"
      />
    </g>
  );
};

export const SiteEngineFilm = ({ reducedMotion = false }) => {
  const frame = useCurrentFrame();
  const motionFrame = reducedMotion ? 0 : frame;
  const finalFrame = DURATION - 1;

  const cameraX = keyed(motionFrame, [0, 84, 154, 246, 326, 404, finalFrame], [0, -10, 118, 58, -82, -18, 0]);
  const cameraY = keyed(motionFrame, [0, 84, 154, 246, 326, 404, finalFrame], [0, 3, -12, -4, 10, 4, 0]);
  const cameraScale = keyed(motionFrame, [0, 84, 154, 246, 326, 404, finalFrame], [1, 1.012, 1.085, 1.045, 1.075, 1.018, 1]);
  const cameraRotate = keyed(motionFrame, [0, 154, 246, 326, 404, finalFrame], [0, -0.12, -0.04, 0.1, 0.03, 0]);
  const cameraTiltX = keyed(motionFrame, [0, 154, 246, 326, 404, finalFrame], [0, 0.2, 0.08, -0.16, -0.04, 0]);
  const cameraTiltY = keyed(motionFrame, [0, 154, 246, 326, 404, finalFrame], [0, -0.65, -0.2, 0.72, 0.18, 0]);
  const topLight = keyed(motionFrame, [0, 160, 310, 410, finalFrame], [0.16, 0.42, 0.5, 0.28, 0.16]);

  return (
    <AbsoluteFill className="film">
      <div className="deep-void" />
      <div
        className="scene-camera"
        style={{
          transform: `translate3d(${cameraX}px, ${cameraY}px, 0) scale(${cameraScale}) rotateX(${cameraTiltX}deg) rotateY(${cameraTiltY}deg) rotateZ(${cameraRotate}deg)`,
        }}
      >
        <Img className="accepted-scene" src={staticFile('accepted-scene.png')} />
        <svg
          className="accepted-scene"
          viewBox={`0 0 ${sceneSize.width} ${sceneSize.height}`}
          preserveAspectRatio="none"
        >
          <defs>
            {plaques.filter(plaque => plaque.occludedBy).map(plaque => (
              <mask
                key={plaque.id}
                id={`visible-${plaque.id}`}
                maskUnits="userSpaceOnUse"
                x="0" y="0" width={sceneSize.width} height={sceneSize.height}
              >
                <rect width={sceneSize.width} height={sceneSize.height} fill="white" />
                {plaque.occludedBy.map(id => (
                  <path key={id} d={plaques.find(item => item.id === id).d} fill="black" />
                ))}
              </mask>
            ))}
          </defs>
          {plaques.map(plaque => (
            <ScreenCover
              key={plaque.id}
              plaque={plaque}
              frame={frame}
              reducedMotion={reducedMotion}
            />
          ))}
        </svg>
      </div>
      <div className="top-light" style={{ opacity: topLight }} />
      <div className="vignette" />
      <div className="grain" />
    </AbsoluteFill>
  );
};
