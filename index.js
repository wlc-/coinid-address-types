/*
 * Provides the different address types coinid supports
 */

import {
  addressFunctionP2PKH,
  addressFunctionP2SHP2WPKH,
  addressFunctionP2WPKH,
  signInputFunctionP2PKH,
  signInputFunctionP2SHP2WPKH,
  signInputFunctionP2WPKH,
} from 'coinid-address-functions'

const addressTypes = {
  'P2PKH': {
    bip44Derivation: 44, // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
    title: 'Legacy',
    description: 'Generate legacy addresses.',
    addressFunction: addressFunctionP2PKH,
    signInputFunction: signInputFunctionP2PKH,
  },
  'P2SH-P2WPKH': { // https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    bip44Derivation: 49, // https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki
    title: 'Segwit',
    description: 'Generate Segwit addresses.',
    addressFunction: addressFunctionP2SHP2WPKH,
    signInputFunction: signInputFunctionP2SHP2WPKH,
  },
  'P2WPKH': { // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
    bip44Derivation: 84, // https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki
    title: 'Native Segwit (Bech32)',
    description: 'Generate Native Segwit (Bech32) addresses.',
    warning: 'Not all wallets can send to these addresses.',
    addressFunction: addressFunctionP2WPKH,
    signInputFunction: signInputFunctionP2WPKH,
  }
}

export const getAddressTypeInfo = (addressType) => {
	addressType = addressType ? addressType : 'P2PKH';
	return addressTypes[addressType];
}

export const getTypeFromDerivation = (derivationPath) => {
  const purpose = Number(derivationPath.split('/')[1].replace(/\'/, '')),
        type = Object.keys(addressTypes).find(k => addressTypes[k].bip44Derivation === purpose);
  return type;
}

export const getAddressFunctionFromDerivation = (derivationPath) => {
  const type = getTypeFromDerivation(derivationPath);
  return type !== undefined ? addressTypes[type].addressFunction : addressFunctionP2PKH;
}

export const getSignInputFunctionFromDerivation = (derivationPath) => {
  const type = getTypeFromDerivation(derivationPath);
  return type !== undefined ? addressTypes[type].signInputFunction : signInputFunctionP2PKH;
}