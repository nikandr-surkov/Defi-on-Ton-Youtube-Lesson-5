import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SliceCellBuilder } from '../wrappers/SliceCellBuilder';
import '@ton/test-utils';

describe('SliceCellBuilder', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sliceCellBuilder: SandboxContract<SliceCellBuilder>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sliceCellBuilder = blockchain.openContract(await SliceCellBuilder.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sliceCellBuilder.send(
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
            to: sliceCellBuilder.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sliceCellBuilder are ready to use
    });

    it('should change the values', async () => {
        const coinNumberBefore = await sliceCellBuilder.getCoinNumber();
        const coinAddressBefore = await sliceCellBuilder.getCoinAddress();
        console.log("coin number before:", coinNumberBefore);
        console.log("coin address before:", coinAddressBefore);

        const changeValuesResult = await sliceCellBuilder.send(
            deployer.getSender(),
            {
                value: toNano('0.05')
            },
            "change coin values"
        );

        const coinNumberAfter = await sliceCellBuilder.getCoinNumber();
        const coinAddressAfter = await sliceCellBuilder.getCoinAddress();
        console.log("coin number after:", coinNumberAfter);
        console.log("coin address after:", coinAddressAfter);

        expect(coinNumberBefore).not.toEqual(coinNumberAfter);
        expect(coinAddressBefore).not.toEqualAddress(coinAddressAfter);
    });
});
