// Mock implementation for cardano-serialization-lib-asmjs
console.log(
  "Using Cardano mock library - Cardano functionality will be disabled"
);

// Create a recursive proxy that returns itself for any property access
const createRecursiveProxy = () => {
  return new Proxy(
    function () {
      return createRecursiveProxy();
    },
    {
      get: () => createRecursiveProxy(),
      apply: () => createRecursiveProxy(),
    }
  );
};

// Create basic mock object with essential functions
const mock = {
  BigNum: {
    from_str: () => createRecursiveProxy(),
  },
  Value: {
    new: () => ({
      checked_add: () => createRecursiveProxy(),
      set_multiasset: () => {},
      coin: () => ({ to_str: () => "0", to_bytes: () => new Uint8Array() }),
      multiasset: () => null,
      from_bytes: () => createRecursiveProxy(),
    }),
  },
  min_ada_required: () => ({ to_str: () => "1000000" }),
  TransactionUnspentOutput: {
    from_bytes: () => createRecursiveProxy(),
  },
  Address: {
    from_bech32: () => createRecursiveProxy(),
  },
  ByronAddress: {
    from_base58: () => {
      throw new Error("Cardano functionality not available");
    },
    from_address: () => {
      throw new Error("Cardano functionality not available");
    },
  },
  AuxiliaryData: {
    new: () => ({ set_metadata: () => {} }),
  },
  encode_json_str_to_metadatum: () => createRecursiveProxy(),
  GeneralTransactionMetadata: {
    from_bytes: () => createRecursiveProxy(),
  },
};

// Make the mock respond to any property access to avoid undefined errors
module.exports = new Proxy(mock, {
  get: (target, prop) => {
    return prop in target ? target[prop] : createRecursiveProxy();
  },
});
