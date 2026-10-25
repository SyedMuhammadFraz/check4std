// React DOM integration tests do not require testing-library. React Router 7
// needs TextEncoder in the older jsdom environment shipped by react-scripts.
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.IS_REACT_ACT_ENVIRONMENT = true;
