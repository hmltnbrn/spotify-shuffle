import { createTransform } from 'redux-persist';

export const PlayerTransform = createTransform(
  (inboundState, key) => {
    return { ...inboundState };
  },
  (outboundState, key) => {
    return { ...outboundState, playing: false };
  },
  { whitelist: ['player'] }
);
