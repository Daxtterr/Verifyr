const generateReference = () => {
  const prefix = "VRF-TF";
  const minm = 1000000000;
  const maxm = 9999999999;
  const generatedRandom = Math.floor(Math.random() * (maxm - minm + 1) + minm);
  return prefix + generatedRandom;
};

module.exports = generateReference;
