import React, { ReactElement } from "react";
import { getArticleData } from "../../../api/s3";
import { Oswald, Quattrocento } from '@next/font/google'

const majorFont = Oswald({
    weight: "400"
});

const standardFont = Quattrocento({
    weight: "400"
}); 

export default async function Article({params}: Params): Promise<ReactElement> {
    const key = params.key;
    const data = await getArticleData(key);

    return <div className={`${standardFont.className} mr-20 ml-20 mt-7 border-4 border-solid rounded-lg px-10`} >
        <h1 className={`text-center ${majorFont.className} text-4xl`}>{data.title}</h1>
        {/* <p className="text-center italic text-gray-700">{data.description}</p> */}
        {data.body.split("\n").map((paragraph) => <p className={`text-left text-black mb-8 text-lg`} key={`Paragraph${paragraph.length}${paragraph.split(" ")[0]}`}>{paragraph}</p>)}
        <p className="text-center text-gray-600">{`By: ${data.author}`}</p>
    </div>
}

interface Params {
    params: {
        key: string;
    }
}