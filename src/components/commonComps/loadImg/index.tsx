import { Image } from 'antd';
import { useEffect, useState } from 'react';

export type LoadImgProps = {
    src: string,
};

export function LoadImg(props: LoadImgProps) {
    const { src } = props;
    const [imgSrc, setImgSrc] = useState<string>(src)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setImgSrc(src)
    }, [src])

    const BuseUrl = [
        'https://gateway.pinata.cloud',
        "https://gw.ipfs-lens.dev",
        "https://ipfs.crossbell.io",
        "https://ipfs.joaoleitao.org",
        'https://cloudflare-ipfs.com',
        'https://ipfs.4everland.io',
        "https://ipfs.io",
    ]

    const updateImg = () => {
        setLoading(true)
        let urlData = imgSrc.split("/ipfs/")
        let baseUrl = urlData[0]
        let ids = urlData[1]
        let url = ""
        if (baseUrl) {
            let index = BuseUrl.findIndex((item) => { return baseUrl === item })
            if (index > -1 && index < BuseUrl.length - 1) {
                url = BuseUrl[index + 1] + "/ipfs/" + ids
            } else {
                url = "/NftDef.jpg"
            }
        } else {
            url = "/NftDef.jpg"
        }
        setImgSrc(url)
    }

    const Loaded = () => {
        setLoading(false)
    }

    return (
        <div style={{ position: "relative" }}>
            {loading ?
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#222831",
                        borderRadius: ".044rem",
                    }}
                >
                    <Image
                        style={{ width: "45%" }}
                        preview={false}
                        alt="Loading"
                        src='/loading.svg'
                    />
                </div>
                : ""
            }
            <img
                src={imgSrc ? imgSrc : "/NftDef.jpg"}
                onError={() => { updateImg() }}
                style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                }}
                onLoad={() => { Loaded() }}
            />
        </div >
    );
}
