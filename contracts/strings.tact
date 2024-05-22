import "@stdlib/deploy";

contract Strings with Deployable {

    s1: String = "hello world";
    s2: String = "some text 😆 abc ࠉ abc";
    s3: String;
    s4: String;
    s5: String;
    s6: String;

    init() {
        let i1: Int = -12345;
        let i2: Int = 7250000000;  // coins = ton("7.25")

        self.s3 = i1.toString();
        self.s4 = i1.toFloatString(3);
        self.s5 = i2.toCoinsString();

        let sb: StringBuilder = beginString();
        sb.append(self.s1);
        sb.append(", your balance is ");
        sb.append(self.s5);
        self.s6 = sb.toString();
    }

    get fun finalString(): String {
        return self.s6;
    }
}
