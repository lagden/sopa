'use strict';

const soap = require('soap');
const pify = require('pify');
const debug = require('debug')('sopa');

const createClient = pify(soap.createClient);
const wsdl = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
const wsdlOptions = {
	overrideRootElement: {
		namespace: 'cli',
		xmlnsAttributes: [{
			name: 'xmlns:cli',
			value: 'http://cliente.bean.master.sigep.bsb.correios.com.br/'
		}]
	}
};

function ws(method, args = {}) {
	return createClient(wsdl, wsdlOptions)
		.then(client => pify(client[method])(args, {method: 'POST'}))
		.then(result => result.return);
}

ws('consultaCEP', {'cep': '04653055'})
	.then(debug)
	.catch(debug);
