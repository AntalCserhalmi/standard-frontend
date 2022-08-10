import { ConnectButton } from "web3uikit";

const Header = (): JSX.Element => {
    return (
        <div className="absolute top-5 right-5">
            <ConnectButton />
        </div>
    );
};

export default Header;