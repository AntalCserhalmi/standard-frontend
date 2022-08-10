import type { NextPage } from 'next';
import { useEffect } from 'react';
import Router from "next/router";

const Home: NextPage = () => {

    useEffect(() => {
        const { pathname } = Router;
        if (pathname === "/"){
            Router.push("/mint");
        }
    });

    return <></>;
};

export default Home;
