import Script from "next/script";

export default function Head() {
    const googleAnalyticsTag = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KVEKCRFHM9');
    `;

    return (
        <>
            <title>Gaming Knowledge</title>
            <meta name="description">Entertaining articles on gaming trends and controversy</meta>
            <Script id="google-analytics-home" async  src="https://www.googletagmanager.com/gtag/js?id=G-KVEKCRFHM9" />
            <Script dangerouslySetInnerHTML={{__html: googleAnalyticsTag}} />
        </>
    );
}