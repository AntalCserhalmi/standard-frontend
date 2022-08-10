import Head from "next/head";
import PublicMint from "../../components/Mint";
import Header from "../../components/Header";

const Mint = (): JSX.Element => {
    return(
        <div className="h-screen w-screen p-16 flex flex-col justify-center md:justify-evenly items-center bg-wallpaper bg-fixed bg-cover bg-center">
            <Head>
                <title>Standard ERC 721 Contract</title>
                <meta name="description" content="Standard ERC 721 Contract" />
                <meta property="og:title" content="Standard ERC 721 Contract" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/banner.jpg" />
                <meta property="og:description" content="Standard ERC 721 Contract" />
                <meta name="theme-color" content="#7900a8"></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <h1 className="text-4xl m-5 md:text-6xl text-center font-poppins text-white italic">
                Tiny Bunnies
            </h1>
            <PublicMint />
        </div>
    );
};

export default Mint;