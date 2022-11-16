import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Image, Button } from 'antd'
import { NftCollectionsInfoProps, nftcollectionsType } from '../../../../models/interface/nft'
import styles from './collectionsInfo.module.scss'

const CollectionsInfo = (props: NftCollectionsInfoProps) => {
    const router = useRouter()
    const [nftcollectionsdata, setnftcollectionsdata] = useState<Array<nftcollectionsType>>([])
    useEffect(() => {
        setnftcollectionsdata(props.collectionsData)
    }, [props.collectionsData])

    const scrollToBottom = () => {
        props.updateCollections()
    }

    return (
        <div className={styles.collectionsInfo}>
            <h1>Explore Collections</h1>
            <div className={styles.content} id="collectionsContent" style={{ display: (props.spinshow) ? 'flex' : 'none', paddingTop: '0.2rem' }}>
                {nftcollectionsdata.map((item, index) => {
                    return (
                        <div className={styles.collections} key={item.CreatingHeight + index}>
                            <Link href={{ pathname: '/nft/collection', query: { id: item.ContractId, Name: item.Name } }} >
                                <div><Image src={item.IconUrl} alt="" fallback='/NftDef.jpg' preview={false} /></div>
                            </Link>
                            <p>{item.Name}</p>
                        </div>
                    )
                })}
                <div className={styles.link}>
                    <img src="/Arrow_Left_MD.svg" onClick={() => scrollToBottom()} />
                </div>
                <Button className={styles.more_btn_collection} onClick={() => scrollToBottom()}>Load More</Button>
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

export default CollectionsInfo