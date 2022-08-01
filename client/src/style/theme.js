const colors = {
  mainMint: '#2CDCB2',
  subMint: '#99E8E8',
  mainPurple: '#893CD6',
  white: '#FFFFFF',
  mainBlack: '#0D0C0F',
  subBlack: '#191919',
  pointRed: '#F58181',
  pointYellow: '#FFDA7B',
  pointBlack: '#393838',
  pointGray: '#5C5C5C',
  disabledGray: '#414040',
  textGray: '#C0C0C0',
};

const pixelToRem = (size) => `${size / 16}rem`;

const fontSizes = {
  h1: pixelToRem(60),
  h2: pixelToRem(50),
  h3: pixelToRem(38),
  h4: pixelToRem(22),
  h5: pixelToRem(20),
  p: pixelToRem(16),
  small: pixelToRem(10),
};

export const theme = {
  colors,
  fontSizes,
};
