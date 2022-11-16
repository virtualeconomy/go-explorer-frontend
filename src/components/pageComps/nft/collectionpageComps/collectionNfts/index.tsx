import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Image, Button, Empty } from 'antd'
import { nftCard, NftCardProps } from '../../../../../models/interface/nft'
import styles from '../../collectionsInfo/collectionsInfo.module.scss'
import { getNftimg } from '../../../../../api'

const CollectionNfts = (props: NftCardProps) => {
    const router = useRouter()
    const [nftcollectionsdata, setnftcollectionsdata] = useState<Array<nftCard>>([])
    useEffect(() => {
        if (props.nftsdata) {
            let data = props.nftsdata
            data.map(async (item, index) => {
                if (item.Attributes?.Description) {
                    if (item.Attributes.Description[0] === '{') {
                        let url = JSON.parse(item.Attributes?.Description)
                        if (url.img) {
                            item.Attributes.IconUrl = 'https://gateway.pinata.cloud/ipfs/' + url.img
                        } else if (url.image) {
                            item.Attributes.IconUrl = 'https://gateway.pinata.cloud/ipfs/' + url.image
                        } else if (url.ipfs_json_file) {
                            let result = (await getNftimg(url.ipfs_json_file)).data?.image
                            item.Attributes.IconUrl = result
                        } else if (url.url) {
                            item.Attributes.IconUrl = url.url
                        }
                    }
                }
            })
            setnftcollectionsdata(data)
        }

    }, [props.nftsdata])

    return (
        <div className={styles.collectionsInfo}>
            <h1>Explore NFTs in this collection</h1>
            <div style={{ display: (props.spinshow) ? 'block' : 'none', paddingTop: '0.2rem' }} >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ display: props.spinshow && nftcollectionsdata.length == 0 ? 'block' : 'none' }} />
                <div className={styles.content_nft} style={{ overflow: 'hidden' }}>
                    {nftcollectionsdata.map((item, index) => {
                        return (
                            <div className={styles.collections} key={item.NftTokenId + index}>
                                <Link href={{ pathname: '/nft/nftInfo', query: { id: item.NftTokenId } }}>
                                    <div>
                                        <Image src={item.Attributes.IconUrl} alt="" fallback='/NftDef.jpg' preview={false} />
                                    </div>
                                </Link>
                                <p>{item.Attributes.Name}</p>
                            </div>
                        )
                    })}
                </div>
                <Button className={styles.more_btn} style={{ display: props.total <= props.nftsdata.length ? 'none' : 'block' }} onClick={() => { props.loadMore() }}>Load More</Button>
            </div>
            <div className={styles.spinning} style={{ display: (!props.spinshow) ? 'flex' : 'none' }}>
                <Image
                    preview={false}
                    alt="Loading"
                    src='/loading.svg'
                />
            </div>
        </div>
    )
}

export default CollectionNfts