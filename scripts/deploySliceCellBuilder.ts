import { toNano } from '@ton/core';
import { SliceCellBuilder } from '../wrappers/SliceCellBuilder';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sliceCellBuilder = provider.open(await SliceCellBuilder.fromInit());

    await sliceCellBuilder.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sliceCellBuilder.address);

    // run methods on `sliceCellBuilder`
}
