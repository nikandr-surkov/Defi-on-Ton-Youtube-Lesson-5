import "@stdlib/deploy";

contract SliceCellBuilder with Deployable {

    storage: Cell;

    init() {
        let coinAddress: Address = address("EQDv-yr41_CZ2urg2gfegVfa44PDPjIK9F-MilEDKDUIhlwZ");
        let builder: Builder = beginCell().storeAddress(coinAddress).storeCoins(100000);
        self.storage = builder.asCell();        
    }

    get fun coinAddress(): Address {
        let slice: Slice = self.storage.asSlice();
        let coinAddress: Address = slice.loadAddress();
        return coinAddress;
    }

    get fun coinNumber(): Int {
        let slice: Slice = self.storage.asSlice();
        //slice.loadAddress();

        let coins: Int = slice.loadCoins();
        return coins;
    }

    receive("change coin values") {
        let newCoinAddress: Address = address("EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE");
        let newCoinNumber: Int = 777777;
        let builder: Builder = beginCell().storeAddress(newCoinAddress).storeCoins(newCoinNumber);
        self.storage = builder.asCell();
    }
}
