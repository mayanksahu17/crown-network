const NodeCache = require("node-cache");
const otpCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const otpPasswordCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const otpAttemptsCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const blockedUsersCache = new NodeCache({ stdTTL: 0, checkperiod: 60 }); // TTL set to 0 means instant expiry

module.exports = {
  otpCache: otpCache,
  otpAttemptsCache: otpAttemptsCache,
  blockedUsersCache: blockedUsersCache,
  otpPasswordCache: otpPasswordCache,
};
