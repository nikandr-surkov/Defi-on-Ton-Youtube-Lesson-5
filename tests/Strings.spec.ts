import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Strings } from '../wrappers/Strings';
import '@ton/test-utils';

describe('Strings', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let strings: SandboxContract<Strings>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        strings = blockchain.openContract(await Strings.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await strings.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: strings.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and strings are ready to use
        const finalString = await strings.getFinalString();
        console.log("final string:", finalString);
    });
});
