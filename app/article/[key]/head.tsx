import Script from "next/script";
import { getArticleData } from "../../../api/s3";

export default async function Head({params}: {params: {key: string}}) {
    const key = params.key;
    const articleData = await getArticleData(key);

    const script = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": articleData.title,
    //   "image": [
    //     "https://example.com/photos/1x1/photo.jpg",
    //     "https://example.com/photos/4x3/photo.jpg",
    //     "https://example.com/photos/16x9/photo.jpg"
    //    ],
      "datePublished": articleData.createdAt,
      "dateModified": articleData.createdAt,
      "author": [{
          "@type": "Person",
          "name": articleData.author,
        //   "url": "https://example.com/profile/janedoe123"
        }]
    }

    const googleAnalyticsTag = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KVEKCRFHM9');
    `;

    return (
        <>
            <title>{articleData.title}</title>
            <meta name="description">{articleData.description}</meta>
            <Script id="article-meta-data" async type="application/ld+json" 
            dangerouslySetInnerHTML={{__html: JSON.stringify(script)}}/>
            <Script id="google-analytics-home" async  src="https://www.googletagmanager.com/gtag/js?id=G-KVEKCRFHM9" />
            <Script dangerouslySetInnerHTML={{__html: googleAnalyticsTag}} />
        </>
    );
}