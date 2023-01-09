import Link from "next/link";
import React, { ReactElement } from "react";
import { getImageStatic, listArticles } from "../api/s3";
import Image from "next/image";
import Hero from "../images/HeroDesktop.jpeg";
import Mobile from "../images/HeroMobile.png";
import '../styles/globals.css'

export default async function HomePage(): Promise<ReactElement> {
    const output = await listArticles();

    return <div>
            <div className="fixed overflow-hidden -z-10">
                <Image alt="hero image" src={Hero} placeholder="blur" className="hidden lg:inline" />
                <Image alt="hero image" src={Mobile} placeholder="blur" className="lg:hidden -z-10" />
            </div>
            <div className="h-96" />
            {/* <div className="flex items-center content-center self-center"> */}
            <div className="m-auto w-3/5  mt-32 text-white" >
                <input className="w-full h-32  border-4 rounded-lg text-6xl opacity-60" placeholder="Learn Something" />
                <p className="text-6xl text-center mt-5">Brain Fuel</p>
            </div>
            <div className="flex justify-center mt-10 ml-10">
                {
                    output.Contents?.map((obj) => {
                        const key = obj.Key!;
                        return <ArticleCard link={key} key={`Article Card ${key}`} />
                    })
                }
            </div>
        </div>
}

function ArticleCard({link}: {link: string}): ReactElement {
    return (<div className="bg-white mr-10">
            <Link href={`/article/${link}`} className="text-black w-15">
                <p className="text-center text-lg">{link}</p>
                <p className="text-center">Jerry Alamo</p>
                <p>This article is super cool and will change your life forever and ever and ever</p>
            </Link>
        </div>);
}