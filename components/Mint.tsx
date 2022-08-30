import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import { contract, abi } from "../constants/index";
import QuantityButton from "./buttons/QuantityButton";
import MintButton from "./buttons/MintButton";
import Image from "next/image";
import OS from "../public/images/os.svg";
import Etherscan from "../public/images/etherscan.svg";

const PublicMint = (): JSX.Element => {

    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();

    const walletChainId = Number(chainIdHex);
    const contractAddress = contract.address;
    const collectionSize = "3333";

    const [mintPaused, setMintPaused] = useState(false);
    const [mintEnabled, setMintEnabled] = useState(false);
    const [minted, setMinted] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [totalSupply, setTotalSupply] = useState("0");
    const [priceDetails, setPriceDetails] = useState("Cost: 0.009 ETH");
    const [price, setPrice] = useState(1000);
    const [mintBtnStatus, setMintBtnStatus] = useState(false);
    const [mintBtnText, setMintBtnText] = useState("Connect your ETH wallet");

    const dispatch = useNotification();

    const { runContractFunction: getTotalySupply } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "totalSupply"
    });

    const { runContractFunction: getMinted } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getWalletMints",
        params: {
            wallet_: account
        }
    });

    const { runContractFunction: getMintEnabled } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "mintEnabled"
    });

    const { runContractFunction: getMintPaused } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "paused"
    });

    const { runContractFunction: mintNFT } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "mintPublic",
        msgValue: Moralis.Units.ETH((quantity * price).toFixed(3)),
        params: {
            quantity_: quantity
        }
    });

    const { runContractFunction: getCost } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "cost"
    });

    const updateUI = async () => {
        try {
            const mintEnabledCall: any = await getMintEnabled();
            const mintPausedCall: any = await getMintPaused();
            const totalSupplyCall: any = await getTotalySupply();
            const mintedCall: any = await getMinted();
            const costCall: any = await getCost();
            setMintEnabled(mintEnabledCall);
            setMintPaused(mintPausedCall);
            setTotalSupply(totalSupplyCall.toString());
            setMinted(Number(mintedCall));
            setPrice(Number(Moralis.Units.FromWei(costCall)));

            console.log(mintedCall);

            if (Number(mintedCall) >= 15){
                setPriceDetails(`0 ETH`);
                setQuantity(0);
                setPrice(1000);
                setMintBtnStatus(false);
                setMintBtnText("All of your NFT minted");
            }

            console.log(Number(Moralis.Units.FromWei(costCall)));
            console.log(mintEnabledCall);
            console.log(account);
        } catch (err) {
            console.log(err);
        }
    };

    const increase = () => {
        let nextQuantity = 0;

        if (quantity === 15) {
            nextQuantity = 15;
        } else if (minted + quantity >= 15){
            nextQuantity = quantity;
        }else{
            nextQuantity = quantity + 1;
        }

        if (minted === 15){
            nextQuantity = 0;
        }

        setPriceDetails(`Cost: ${(nextQuantity * price).toFixed(3)} ETH`);
        setQuantity(nextQuantity);
    };

    const decrease = () => {
        let nextQuantity = 0;

        if (quantity === 1) {
            nextQuantity = 1;
        } else if (quantity <= 0) {
            nextQuantity = 0;
        } else {
            nextQuantity = quantity - 1;
        }

        if (minted === 15){
            nextQuantity = 0;
        }

        setPriceDetails(`Cost: ${(nextQuantity * price).toFixed(3)} ETH`);
        setQuantity(nextQuantity);
    };

    const mint = async () => {
        if (quantity === 0) {
            return;
        }

        await mintNFT({
            onError: handleError,
            onSuccess: handleSuccess
        });
    };

    const handleSuccess = async (tx: any) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            title: "Succuess",
            message: "Successful mint",
            position: "topR",
            icon: "checkmark"
        });

        updateUI();
    };

    const handleError = (msg: any) => {
        dispatch({
            type: "error",
            message: msg.data ? `${msg.message} \n${msg.data.message}` : `${msg.message}`,
            title: "Error",
            position: "topR",
            icon: "arrowCircleDown"
        });
    };

    const checkAllMinted = (): boolean => {
        return Number(totalSupply) === Number(collectionSize);
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            if (contract.chainId !== walletChainId) {
                setMintBtnStatus(false);
                setMintBtnText("Switch network to Mainnet");
            } else {
                if (mintPaused) {
                    setMintBtnStatus(false);
                    setMintBtnText("Minting is paused");
                } else if (mintEnabled) {
                    setMintBtnStatus(true);
                    setMintBtnText("Mint");
                } else {
                    setMintBtnStatus(false);
                    setMintBtnText("Minting is not started yet");
                }
            }


            updateUI();
        } else {
            setMintBtnStatus(false);
            setMintBtnText("Connect your ETH wallet");
        }
    }, [isWeb3Enabled, mintEnabled, mintPaused]);

    return (
        <>
            <div className="absolute top-6 flex flex-row items-center right-56 md:right-auto">
                <div className="w-10 h-10 hover:scale-125 transition-all duration-300">
                    <a href="https://opensea.io/" target="_blank">
                        <Image src={OS} layout="responsive"/>
                    </a>
                </div>
                <div className="w-10 h-10 m-5 hover:scale-125 transition-all duration-300">
                    <a href="https://etherscan.io/" target="_blank">
                        <Image src={Etherscan} layout="responsive"/>
                    </a>
                </div>
            </div>
            {
                checkAllMinted() ?
                    <div className="flex items-center flex-col justify-evenly bg-zinc-900 rounded-xl opacity-90 w-screen md:w-9/12 lg:w-7/12 xl:w-6=12 md:h-80 md:p-10 shadow-orange-500 shadow-2xl">
                        <div className="text-white p-3 border-2 border-red-700 rounded-xl text-2xl md:w-9/12 md:h-2/4 md:text-3xl xl:w-8/12 xl:text-5xl text-center font-sans font-medium bg-red-800 bg-opacity-90 shadow-red-800 shadow-md m-8 md:m-0">All Standard have been minted</div>

                        <div className="text-white p-3 border-2 border-green-700 rounded-xl text-2xl md:w-9/12 md:h-2/4 md:text-3xl xl:w-8/12 xl:text-5xl text-center font-poppins font-medium bg-green-800 bg-opacity-90 shadow-green-800 shadow-md m-8 md:m-5">Thank you for the participation</div>
                    </div> :
                    <div className="flex items-center flex-col justify-evenly rounded-xl opacity-90 w-screen md:w-9/12 lg:w-7/12 xl:w-6/12 md:h-80 md:p-10 shadow-blue-700 shadow-lg">
                        <div className="text-black p-3 border-2 rounded-xl w-6/12 text-5xl text-center font-poppins font-medium bg-white bg-opacity-90 shadow-white shadow-md m-8 md:m-0">
                            {totalSupply}/{collectionSize}
                        </div>
                        <div className="flex justify-around items-center w-8/12">
                            <div className="flex justify-center items-center">
                                <QuantityButton text="-" onClick={decrease} disabled={!mintBtnStatus} />
                                <h1 className="text-center font-poppins font-medium text-xl text-white">{quantity}</h1>
                                <QuantityButton text="+" onClick={increase} disabled={!mintBtnStatus} />
                            </div>
                            <h1 className="text-center font-poppins font-medium text-2xl md:text-4xl text-white">{priceDetails}</h1>
                        </div>
                        <MintButton onClick={mint} disabled={!mintBtnStatus} text={mintBtnText}></MintButton>
                    </div>
            }
        </>
    );
};

export default PublicMint;