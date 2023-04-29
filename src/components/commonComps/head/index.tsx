import Head from 'next/head'

if (typeof window !== "undefined") {
    import("amfe-flexible");
}
type Props = {};

const ExplorerHead = (props: Props) => {
    return (
        <div>
            <Head>
                <title>V SYSTEMS Explorer</title>
                <meta name="description" content="V SYSTEMS Explorer" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Lato" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Exo%202" rel="stylesheet" />
            </Head>
        </div>
    )
}

export default ExplorerHead