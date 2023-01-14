import Link from "next/link";
import React, { ReactElement } from "react";
import { ArticleData, getArticleData, listArticles } from "../api/s3";
import Image from "next/image";
import Hero from "../images/HeroDesktop.jpeg";
import Mobile from "../images/HeroMobile.png";
import '../styles/globals.css'
import { _Object } from "@aws-sdk/client-s3";
import { Oswald, Quattrocento } from "@next/font/google";

const majorFont = Oswald({
  weight: "400"
});

const standardFont = Quattrocento({
    weight: "400"
}); 

export default async function HomePage(): Promise<ReactElement> {
    const output = await listArticles();
    const articleDataList = await selectArticles(output.Contents);


    return <div>
            <div className="fixed overflow-hidden -z-10">
                <Image alt="hero image" src={Hero} placeholder="blur" className="hidden lg:inline" />
                <Image alt="hero image" src={Mobile} placeholder="blur" className="lg:hidden -z-10" />
            </div>
            <h1 className={`text-center text-8xl text-white ${majorFont.className}`}>JR Knowledge</h1>
            <div className="h-80" />
            <div className="m-auto w-3/5  mt-32 text-white" >
                <input className="w-full h-32  border-4 rounded-lg text-6xl opacity-60" placeholder="Learn Something" />
                <p className={`text-6xl text-center mt-5 ${majorFont.className}`}>Brain Fuel</p>
            </div>
            <div className="px-2">
                <div className={`flex flex-wrap justify-center -mx-2 ${majorFont.className}`}>
                    {articleDataList.map((data) => <ArticleCard articleData={data} />)}
               </div>
            </div>
        </div>
}

    function ArticleCard({articleData}: {articleData: ArticleData}): ReactElement {
        return <Link href={`/article/${articleData.key}`} className="text-black md:w-1/3 w-full mb-10 px-20" key={`Article Card ${articleData.key}`}>
                <div className="bg-white rounded-lg">
                    <p className="text-center text-lg">{articleData.title}</p>
                    <p className="text-center italic">{articleData.author}</p>
                    <p>{articleData.description}</p>
                </div>
            </Link>
    }


async function selectArticles(contents: _Object[] | undefined): Promise<ArticleData[]> {
    if (!contents) throw console.error("S3 returned nothing");
    
    const displayNumber = 6;
    const selectedArticles = [];
    for (let i = 0; i < displayNumber; i++) {
        const randomIndex = Math.floor(Math.random() * contents.length)
        const s3Object = contents[randomIndex]
        const s3Key = s3Object.Key!;
        const articleData = await getArticleData(s3Key);
        selectedArticles.push(articleData);
    }

    return selectedArticles;
}
