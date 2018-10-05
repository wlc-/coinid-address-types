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
  addInputFunctionP2PKH,
  addInputFunctionP2SHP2WPKH,
  addInputFunctionP2WPKH,
} from 'coinid-address-functions'

const addressTypes = {
  'P2PKH': {
    bip44Derivation: 44, // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
    title: 'Legacy',
    description: 'Legacy addresses. We recommend using segwit addresses instead.',
    addressFunction: addressFunctionP2PKH,
    signInputFunction: signInputFunctionP2PKH,
    addInputFunction: addInputFunctionP2PKH,
  },
  'P2SH-P2WPKH': { // https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki
    bip44Derivation: 49, // https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki
    title: 'Segwit',
    description: 'Recommended address type. Lower tx size and fees compared to legacy.',
    addressFunction: addressFunctionP2SHP2WPKH,
    signInputFunction: signInputFunctionP2SHP2WPKH,
    addInputFunction: addInputFunctionP2SHP2WPKH,
  },
  'P2WPKH': { // https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki
    bip44Derivation: 84, // https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki
    title: 'Native Segwit (Bech32)',
    description: 'Important! Not all wallets and services support sending to Bech32 addresses.',
    addressFunction: addressFunctionP2WPKH,
    signInputFunction: signInputFunctionP2WPKH,
    addInputFunction: addInputFunctionP2WPKH,
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

export const getAddInputFunctionFromDerivation = (derivationPath) => {
  const type = getTypeFromDerivation(derivationPath);
  return type !== undefined ? addressTypes[type].addInputFunction : addInputFunctionP2PKH;
}