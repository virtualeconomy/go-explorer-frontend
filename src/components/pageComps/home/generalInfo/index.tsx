import { useState, useEffect } from 'react'

import styles from './generalInfo.module.scss'
import { Image } from 'antd';
import { HomeProps } from '../../../../models/interface/home'
import { toThousands } from '../../../../utils/tools'

const GeneralInfo = (props: HomeProps) => {

    const [supplyInfo, setSupplyInfo] = useState(props.supplyData)
    const [generalInfo, setGeneralInfo] = useState(props.generalData)
    const [show, setShow] = useState(false)

    useEffect(() => {
        setSupplyInfo(props.supplyData)
        setGeneralInfo(props.generalData)
        setShow(props.show)
    }, [props.generalData, props.supplyData,props.show]);

    return (
        <div className={styles.info_container}>
            <div className={styles.common_content}>
                <div style={{ display: (show) ? 'block' : 'none' }}>
                    <div className={styles.info_title}>Version</div>
                    <div className={styles.info_content}>{generalInfo.Version}</div>
                    <div className={styles.info_sub_content}>SPOS</div>
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
                    <div className={styles.info_title}>Current Height</div>
                    <div className={styles.info_content}>{generalInfo.CurrentHeight}</div>
                    <div className={styles.info_sub_content}>Average Block Delay - {generalInfo.AvgBlockDelay} ms</div>
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
                    <div className={styles.info_title}>Total Supply</div>
                    <div className={styles.info_content}>{toThousands(supplyInfo.TotalSupply)} VSYS</div>
                    <div className={styles.info_sub_content}>Circulating Supply: {toThousands(supplyInfo.CirculatingSupply)} VSYS</div>
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

export default GeneralInfo