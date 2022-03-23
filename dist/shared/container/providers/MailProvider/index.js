"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _EthrealMailProvider = _interopRequireDefault(require("./implementations/EthrealMailProvider"));

var _SESMailProvider = _interopRequireDefault(require("./implementations/SESMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _tsyringe.container.resolve(_EthrealMailProvider.default),
  ses: _tsyringe.container.resolve(_SESMailProvider.default)
};

_tsyringe.container.registerInstance('MailProvider', providers[_mail.default.driver]);