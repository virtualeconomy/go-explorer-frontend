import { useEffect, useState } from 'react'
import { Image } from 'antd';
import { NftGeneralProps, nftgeneralType } from '../../../../models/interface/nft'
import { toThousands } from '../../../../utils/tools'
import styles from '../../home/generalInfo/generalInfo.module.scss'

const NftGeneral = (props: NftGeneralProps) => {
    const [nftGwneraldata, setnftGeneraldata] = useState<nftgeneralType>({
        totalNft: 0,
        transactionNumber: 0,
        newNft: 0
    })
    const [show, setShow] = useState(false)
    useEffect(() => {
        setnftGeneraldata(props.generalData)
        setShow(props.show)
    }, [props.generalData,props.show])

    return (
        <div className={styles.info_container}>
            <div className={styles.common_content}>
                <div style={{ display: (show) ? 'block' : 'none' }}>
                    <div className={styles.info_title}>Total NFTs</div>
                    <div className={styles.info_content}>{toThousands(nftGwneraldata?.totalNft)}</div>
                </div>
                <div className={styles.spinning} style={{ display: (!show) ? 'flex' : 'none' }}>
                    <Image
                        preview={false}
                        alt="Loading"
                        src='/loading.svg'
                    />
                </div>
            </div>
            <div className={styles.common_content}>
                <div style={{ display: (show) ? 'block' : 'none' }}>
                    <div className={styles.info_title}>New NFTs 24H</div>
                    <div className={styles.info_content}>{toThousands(nftGwneraldata?.newNft)}</div>
                </div>
                <div className={styles.spinning} style={{ display: (!show) ? 'flex' : 'none' }}>
                    <Image
                        preview={false}
                        alt="Loading"
                        src='/loading.svg'
                    />
                </div>
            </div>
            <div className={styles.common_content}>
                <div style={{ display: (show) ? 'block' : 'none' }}>
                    <div className={styles.info_title}>Total transactions</div>
                    <div className={styles.info_content}>{toThousands(nftGwneraldata?.transactionNumber)}</div>
                </div>
                <div className={styles.spinning} style={{ display: (!show) ? 'flex' : 'none' }}>
                    <Image
                        preview={false}
                        alt="Loading"
                        src='/loading.svg'
                    />
                </div>
            </div>
        </div>
    )
}

export default NftGeneral