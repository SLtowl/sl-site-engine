import React from 'react';
import { Composition } from 'remotion';
import { SiteEngineFilm } from './site-engine-film.jsx';
import { motionTokens } from './motion.tokens.js';

export const RemotionRoot = () => (
  <Composition
    id="SL-Site-Engine"
    component={SiteEngineFilm}
    durationInFrames={motionTokens.durationInFrames}
    fps={motionTokens.fps}
    width={1920}
    height={1080}
  />
);
