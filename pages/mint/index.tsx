import Head from "next/head";
import PublicMint from "../../components/Mint";
import Header from "../../components/Header";
import Image from "next/image";
import mintLive from "../../public/images/mintlive.png";
const Mint = (): JSX.Element => {
    return(
        <div className="h-screen w-screen p-40 flex flex-col justify-center md:justify-evenly items-center bg-wallpaper bg-fixed bg-cover bg-center border-red-700">
            <Head>
                <title>Moonslugs</title>
                <meta name="description" content="Standard ERC 721 Contract" />
                <meta property="og:title" content="Standard ERC 721 Contract" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/banner.jpg" />
                <meta property="og:description" content="Standard ERC 721 Contract" />
                <meta name="theme-color" content="#7900a8"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className="h-80 w-80 md:h-128 md:w-128">
                <Image src={mintLive} layout="responsive"/>
            </div>
            
            <PublicMint />
        </div>
    );
};

export default Mint;