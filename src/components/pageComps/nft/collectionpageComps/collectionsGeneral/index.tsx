import { useEffect, useState } from 'react'
import { CollectionGeneralProps, nftCollectionGeneralType } from '../../../../../models/interface/nft'
import { toThousands } from '../../../../../utils/tools'
import styles from '../../../home/generalInfo/generalInfo.module.scss'

const CollectionGeneral = (props: CollectionGeneralProps) => {
    const [nftGwneraldata, setnftGeneraldata] = useState<nftCollectionGeneralType>({
        totalNft: 0,
        transactionNumber: 0,
        newNft: 0
    })
    useEffect(() => {
        setnftGeneraldata(props.generalData)
    }, [props.generalData])

    return (
        <div className={styles.info_container}>
            <div className={styles.common_content}>
                <div className={styles.info_title}>Total NFTS in this collection</div>
                <div className={styles.info_content}>{toThousands(nftGwneraldata?.totalNft)}</div>
            </div>
            <div className={styles.common_content}>
                <div className={styles.info_title}>New NFTs 24H in this collection</div>
                <div className={styles.info_content}>{toThousands(nftGwneraldata?.newNft)}</div>
            </div>
            <div className={styles.common_content}>
                <div className={styles.info_title}>Total transactions in this collection</div>
                <div className={styles.info_content}>{toThousands(nftGwneraldata?.transactionNumber)}</div>
            </div>
        </div>
    )
}

export default CollectionGeneral