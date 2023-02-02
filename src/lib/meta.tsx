import React from "react";
import Head from "next/head";

interface MetaProps {
    title: string;
}

// very basic implementation of meta information
export const Meta: React.FC<MetaProps> = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
        </Head>
    );
};
