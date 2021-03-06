/* @flow */

import { Core, init as initCore, initTransport } from '../../js/core/Core.js';
import { checkBrowser } from '../../js/utils/browser';
import { settings, CoreEventHandler } from './common.js';

import { getHDPath } from '../../js/utils/pathUtils.js';

import type {
    SubtestSignTransaction,
    SignTransactionBgoldAvailableSubtests,
} from 'flowtype/tests';
import type {
    TestSignTransactionPayload,
    ExpectedSignTransactionResponse,
} from 'flowtype/tests/sign-transaction';

const change = (): SubtestSignTransaction => {
    const testPayloads: Array<TestSignTransactionPayload> = [
        {
            method: 'signTransaction',
            coin: 'Bgold',
            inputs: [
                {
                    address_n: getHDPath("44'/156'/0'/0/0"),
                    amount: 1995344,
                    prev_hash: '25526bf06c76ad3082bba930cf627cdd5f1b3cd0b9907dd7ff1a07e14addc985',
                    prev_index: 0,
                    script_type: 'SPENDADDRESS',
                },
            ],

            outputs: [
                {
                    address_n: getHDPath("44'/156'/0'/1/0"),
                    amount: 1896050,
                    script_type: 'PAYTOADDRESS',
                },
                {
                    address: 'GfDB1tvjfm3bukeoBTtfNqrJVFohS2kCTe',
                    amount: 73452,
                    script_type: 'PAYTOADDRESS',
                },
            ],
        },
    ];

    const expectedResponses: Array<ExpectedSignTransactionResponse> = [
        {
            payload: {
                serialized: {
                    serialized_tx: '010000000185c9dd4ae1071affd77d90b9d03c1b5fdd7c62cf30a9bb8230ad766cf06b5225000000006b483045022100963904da0731b71ce468afd45366dd80fbff566ec0d39c1161ab85d17459c7ca02202f5c24a7a7272d98b14a3f5bc000c7cde8ac0eb773f20f4c3131518186cc98854121023bd0ec4022d12d0106c5b7308a25572953ba1951f576f691354a7b147ee0cc1fffffffff0272ee1c00000000001976a9141c82b9c11f193ad82413caadc0955730572b50ae88acec1e0100000000001976a914ea5f904d195079a350b534db4446433b3cec222e88ac00000000',
                },
            },
        },
    ];

    return {
        testPayloads,
        expectedResponses,
        specName: '/change',
    };
};

const noChange = (): SubtestSignTransaction => {
    const testPayloads: Array<TestSignTransactionPayload> = [
        {
            method: 'signTransaction',
            coin: 'Bgold',
            inputs: [
                {
                    address_n: getHDPath("44'/156'/0'/1/0"),
                    amount: 1896050,
                    prev_hash: '25526bf06c76ad3082bba930cf627cdd5f1b3cd0b9907dd7ff1a07e14addc985',
                    prev_index: 0,
                    script_type: 'SPENDADDRESS',
                },
                {
                    address_n: getHDPath("44'/156'/0'/0/1"),
                    amount: 73452,
                    prev_hash: 'db77c2461b840e6edbe7f9280043184a98e020d9795c1b65cb7cef2551a8fb18',
                    prev_index: 1,
                    script_type: 'SPENDADDRESS',
                },
            ],

            outputs: [
                {
                    address: 'GfDB1tvjfm3bukeoBTtfNqrJVFohS2kCTe',
                    amount: 1934960,
                    script_type: 'PAYTOADDRESS',
                },
            ],
        },
    ];

    const expectedResponses: Array<ExpectedSignTransactionResponse> = [
        {
            payload: {
                serialized: {
                    serialized_tx: '010000000285c9dd4ae1071affd77d90b9d03c1b5fdd7c62cf30a9bb8230ad766cf06b5225000000006b483045022100928852076c9fab160c07564cd54691af1cbc37fb28f0b7bee7299c7925ef62f0022058856387afecc6508f2f04ecdfd292a13026a5b2107ebdd2cc789bdf8820d552412102a6c3998d0d4e5197ff41aab5c53580253b3b91f583f4c31f7624be7dc83ce15fffffffff18fba85125ef7ccb651b5c79d920e0984a18430028f9e7db6e0e841b46c277db010000006b483045022100faa2f4f01cc95e680349a093923aae0aa2ea01429873555aa8a84bf630ef33a002204c3f4bf567e2d20540c0f71dc278481d6ccb6b95acda2a2f87ce521c79d6b872412102d54a7e5733b1635e5e9442943f48179b1700206b2d1925250ba10f1c86878be8ffffffff0170861d00000000001976a914ea5f904d195079a350b534db4446433b3cec222e88ac00000000',
                },
            },
        },
    ];

    return {
        testPayloads,
        expectedResponses,
        specName: '/noChange',
    };
};

const p2sh = (): SubtestSignTransaction => {
    const testPayloads: Array<TestSignTransactionPayload> = [
        {
            method: 'signTransaction',
            coin: 'Bgold',
            inputs: [
                {
                    address_n: getHDPath("49'/156'/0'/1/0"),
                    amount: 123456789,
                    prev_hash: '25526bf06c76ad3082bba930cf627cdd5f1b3cd0b9907dd7ff1a07e14addc985',
                    prev_index: 0,
                    script_type: 'SPENDP2SHWITNESS',
                },
            ],

            outputs: [
                {
                    address: 'GfDB1tvjfm3bukeoBTtfNqrJVFohS2kCTe',
                    amount: 12300000,
                    script_type: 'PAYTOADDRESS',
                },
                {
                    address: 'GZFLExxrvWFuFT1xRzhfwQWSE2bPDedBfn',
                    amount: 123456789 - 11000 - 12300000,
                    script_type: 'PAYTOADDRESS',
                },
            ],
        },
    ];

    const expectedResponses: Array<ExpectedSignTransactionResponse> = [
        {
            payload: {
                serialized: {
                    serialized_tx: '0100000000010185c9dd4ae1071affd77d90b9d03c1b5fdd7c62cf30a9bb8230ad766cf06b52250000000017160014b5355d001e720d8f4513da00ff2bba4dcf9d39fcffffffff02e0aebb00000000001976a914ea5f904d195079a350b534db4446433b3cec222e88ac3df39f06000000001976a914a8f757819ec6779409f45788f7b4a0e8f51ec50488ac02473044022073fcbf2876f073f78923ab427f14de5b2a0fbeb313a9b2b650b3567061f242a702202f45fc22c501108ff6222afe3aca7da9d8c7dc860f9cda335bef31fa184e7bef412102ecea08b559fc5abd009acf77cfae13fa8a3b1933e3e031956c65c12cec8ca3e300000000',
                },
            },
        },
    ];

    return {
        testPayloads,
        expectedResponses,
        specName: '/p2sh',
    };
};

const p2shWitnessChange = (): SubtestSignTransaction => {
    const testPayloads: Array<TestSignTransactionPayload> = [
        {
            method: 'signTransaction',
            coin: 'Bgold',
            inputs: [
                {
                    address_n: getHDPath("49'/156'/0'/1/0"),
                    amount: 123456789,
                    prev_hash: '25526bf06c76ad3082bba930cf627cdd5f1b3cd0b9907dd7ff1a07e14addc985',
                    prev_index: 0,
                    script_type: 'SPENDP2SHWITNESS',
                },
            ],

            outputs: [
                {
                    address: 'GfDB1tvjfm3bukeoBTtfNqrJVFohS2kCTe',
                    amount: 12300000,
                    script_type: 'PAYTOADDRESS',
                },
                {
                    address_n: getHDPath("49'/156'/0'/1/0"),
                    amount: 123456789 - 11000 - 12300000,
                    script_type: 'PAYTOP2SHWITNESS',
                },
            ],
        },
    ];

    const expectedResponses: Array<ExpectedSignTransactionResponse> = [
        {
            payload: {
                serialized: {
                    serialized_tx: '0100000000010185c9dd4ae1071affd77d90b9d03c1b5fdd7c62cf30a9bb8230ad766cf06b52250000000017160014b5355d001e720d8f4513da00ff2bba4dcf9d39fcffffffff02e0aebb00000000001976a914ea5f904d195079a350b534db4446433b3cec222e88ac3df39f060000000017a9140cd03822b799a452c106d1b3771844a067b17f118702483045022100d79b33384c686d8dd40ad5f84f46691d30994992c1cb42e934c2a625d86cb2f902206859805a9a98ba140b71a9d4b9a6b8df94a9424f9c40f3bd804149fd6e278d63412102ecea08b559fc5abd009acf77cfae13fa8a3b1933e3e031956c65c12cec8ca3e300000000',
                },
            },
        },
    ];

    return {
        testPayloads,
        expectedResponses,
        specName: '/p2shWitnessChange',
    };
};

const sendMultisig1 = (): SubtestSignTransaction => {
    const address_n = getHDPath("999'/1'/1'/2/0");
    address_n[2] = 0x80000003;

    const testPayloads: Array<TestSignTransactionPayload> = [
        {
            method: 'signTransaction',
            coin: 'Bgold',
            inputs: [
                {
                    address_n,
                    prev_hash: '25526bf06c76ad3082bba930cf627cdd5f1b3cd0b9907dd7ff1a07e14addc985',
                    prev_index: 1,
                    script_type: 'SPENDP2SHWITNESS',
                    amount: 1610436,
                    multisig: {
                        pubkeys: [
                            {
                                node: 'xpub6CjKUcbAZ6vfG6hiA89X7DiJ9ssicMkjT2Y6xyaPoA9nb51RCSiQ8fetjLD22JdeQHMjyYoBqSucwAMD6qCagb2YvwenjBJWYgVHsK1fzzd',
                                address_n: [2, 0],
                            },
                            {
                                node: 'xpub6CjKUcbAZ6vfJgiDknHCzQoFqx23Gr6nNhFiSHATvUxHQRgzDArtfudwxTY4yPdUJxJiyfXce9tk3iDzXHJsdWWfhwNG9KiZTnUDZHmV1mX',
                                address_n: [2, 0],
                            },
                            {
                                node: 'xpub6CjKUcbAZ6vfMesVqtAs92pwF7QDrdekhnJuCwrSrZXJGA8V3rgJn4n9kBnKFEGQktkdn8qyuNwi6GLcwj2bt3GG1NHpTEuNDETAXt4cZqw',
                                address_n: [2, 0],
                            },
                        ],
                        signatures: ['3045022100e728485c8337f9a09ebbf36edc0fef10f8bcf5c1ba601b7d8ba43a9250a898f002206b9e3401c297f9ab9afb7f1be59bb342db53b5b65aff7c557e3109679697df0f', '', ''],
                        m: 2,
                    }
                },
            ],
            outputs: [
                {
                    address: 'GfDB1tvjfm3bukeoBTtfNqrJVFohS2kCTe',
                    amount: 1605000,
                    script_type: 'PAYTOADDRESS',
                },
            ],
        },
    ];
    const expectedResponses: Array <ExpectedSignTransactionResponse> = [
        {
            payload: {
                serialized: {
                    serialized_tx: '0100000000010185c9dd4ae1071affd77d90b9d03c1b5fdd7c62cf30a9bb8230ad766cf06b522501000000232200201e8dda334f11171190b3da72e526d441491464769679a319a2f011da5ad312a1ffffffff01887d1800000000001976a914ea5f904d195079a350b534db4446433b3cec222e88ac0400483045022100e728485c8337f9a09ebbf36edc0fef10f8bcf5c1ba601b7d8ba43a9250a898f002206b9e3401c297f9ab9afb7f1be59bb342db53b5b65aff7c557e3109679697df0f41473044022062ea69ecdc07d0dadc1971fbda50a629a56dd30f431db26327428f4992601ce602204a1c8ab9c7d81c36cb6f819109a26f9baaa9607b8d37bff5e24eee6fab4a04e441695221038e81669c085a5846e68e03875113ddb339ecbb7cb11376d4163bca5dc2e2a0c1210348c5c3be9f0e6cf1954ded1c0475beccc4d26aaa9d0cce2dd902538ff1018a112103931140ebe0fbbb7df0be04ed032a54e9589e30339ba7bbb8b0b71b15df1294da53ae00000000',
                },
            },
        },
    ];


    return {
        testPayloads,
        expectedResponses,
        specName: '/sendMultisig1',
    };
};

export const signTransactionBgold = (): void => {
    const subtest: SignTransactionBgoldAvailableSubtests = __karma__.config.subtest;
    const availableSubtests = {
        change,
        noChange,
        p2sh,
        p2shWitnessChange,
        sendMultisig1,
    };

    describe('SignTransactionBgold', () => {
        let core: Core;

        beforeEach(async (done) => {
            core = await initCore(settings);
            checkBrowser();
            done();
        });
        afterEach(() => {
            // Deinitialize existing core
            core.onBeforeUnload();
        });

        const { testPayloads, expectedResponses, specName } = availableSubtests[subtest]();
        if (testPayloads.length !== expectedResponses.length) {
            throw new Error('Different number of payloads and expected responses');
        }

        for (let i = 0; i < testPayloads.length; i++) {
            const payload = testPayloads[i];
            const expectedResponse = expectedResponses[i];

            it(specName, async (done) => {
                const handler = new CoreEventHandler(core, payload, expectedResponse, expect, done);
                handler.startListening();
                await initTransport(settings);
            });
        }
    });
};
