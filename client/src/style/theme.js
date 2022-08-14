const colors = {
  mainMint: '#2CDCB2',
  subMint: '#99E8E8',
  mainPurple: '#893CD6',
  white: '#F5F5F5',
  mainBlack: '#0D0C0F',
  subBlack: '#191919',
  pointRed: '#F58181',
  pointYellow: '#FFDA7B',
  pointBlue: '#1472FF',
  pointBlack: '#393838',
  pointGray: '#5C5C5C',
  disabledGray: '#999999',
  textGray: '#C0C0C0',
  gradientMintToPurple: `linear-gradient(103.87deg, #2CDCB2 4.21%, #893CD6 100%)`,
  gradientMainMintToSubMint: `linear-gradient(103.87deg, #2CDCB2 4.21%, #99E8E8 100%)`,
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
  page: pixelToRem(30),
};

export const theme = {
  colors,
  fontSizes,
};
