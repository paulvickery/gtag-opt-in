let isInitialized = false;
let gaMeasurementId = undefined;
let configOptions = undefined;

const register = (gaMeasurementIdValue, configOptionsValue = { 'anonymize_ip': true }) => {
  throwIfInvalidGAMeasurementId(gaMeasurementIdValue);
  gaMeasurementId = gaMeasurementIdValue;
  configOptions = configOptionsValue;
};

const throwIfInvalidGAMeasurementId = (value) => {
  if (!value) {
    throw new Error('gtag-opt-in: invalid value passed to `register` method. Make sure to use a valid Analytics ID.');
  }
};

const optOut = () => {
  throwIfUnregistered();
  window[`ga-disable-${gaMeasurementId}`] = true;
};

const optIn = () => {
  throwIfUnregistered();
  initGTagIfNeeded();
  window[`ga-disable-${gaMeasurementId}`] = false;
};

const throwIfUnregistered = () => {
  if (!gaMeasurementId) {
    throw new Error('gtag-opt-in: no value found for Analytics ID. Make sure to register before by calling the `register` method.');
  }
};

const initGTagIfNeeded = () => {
  if (!isInitialized) {
    initGTag();
    isInitialized = true;
  }
};

const initGTag = () => {
  const gtag = getGtagAPI();
  setInitialValuesToGtag(gtag);
};

const getGtagAPI = () => {
  window.dataLayer = window.dataLayer || [];
  return function () { dataLayer.push(arguments); };
};

const setInitialValuesToGtag = (gtag) => {
  gtag('js', new Date());
  gtag('config', gaMeasurementId, configOptions);
};

export {
  register,
  optIn,
  optOut
};
