import Link from "next/link";
import React, { ReactElement } from "react";
import { ArticleData, getArticleData, listArticles } from "../api/s3";
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
            {/* <div className="fixed overflow-hidden -z-10">
                <Image alt="hero image" src={Hero} placeholder="blur" className="hidden lg:inline" />
                <Image alt="hero image" src={Mobile} placeholder="blur" className="lg:hidden -z-10" />
            </div> */}
            <h1 className={`text-center text-8xl mb-10 ${majorFont.className}`}>JR Knowledge</h1>
            {/* <div className="m-auto w-3/5  mt-32 text-white" >
                <input className="w-full h-32  border-4 rounded-lg text-6xl opacity-60" placeholder="Learn Something" />
                <p className={`text-6xl text-center mt-5 ${majorFont.className}`}>Brain Fuel</p>
            </div> */}
            <div className="px-2">
                <div className={`grid md:grid-cols-3 sm:grid-cols-1 gap-8 mx-5`}>
                    {articleDataList.map((data) => <ArticleCard articleData={data} />)}
               </div>
            </div>
        </div>
}

    function ArticleCard({articleData}: {articleData: ArticleData}): ReactElement {
        return <Link href={`/article/${articleData.key}`} className="text-black mb-10 px-5 border-solid border-2 rounded-md pb-5 min-h-20" key={`Article Card ${articleData.key}`}>
                <div className={`bg-white rounded-lg ${standardFont.className}`}>
                    <p className={`text-center text-lg mb-2 ${standardFont.className}`}>{articleData.title}</p>
                    <p className={`text-center italic mb-4 ${standardFont.className}`}>{articleData.author}</p>
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
