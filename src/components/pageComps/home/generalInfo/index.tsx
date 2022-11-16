import { useState, useEffect } from 'react'

import styles from './generalInfo.module.scss'
import { HomeProps } from '../../../../models/interface/home'
import { toThousands } from '../../../../utils/tools'

const GeneralInfo = (props: HomeProps) => {

    const [supplyInfo, setSupplyInfo] = useState(props.supplyData)
    const [generalInfo, setGeneralInfo] = useState(props.generalData)

    useEffect(() => {
        setSupplyInfo(props.supplyData)
        setGeneralInfo(props.generalData)
    }, [props.generalData, props.supplyData]);

    return (
        <div className={styles.info_container}>
            <div className={styles.common_content}>
                <div className={styles.info_title}>Version</div>
                <div className={styles.info_content}>{generalInfo.Version}</div>
                <div className={styles.info_sub_content}>SPOS</div>
            </div>
            <div className={styles.common_content}>
                <div className={styles.info_title}>Current Height</div>
                <div className={styles.info_content}>{generalInfo.CurrentHeight}</div>
                <div className={styles.info_sub_content}>Average Block Delay - {generalInfo.AvgBlockDelay} ms</div>
            </div>
            <div className={styles.common_content}>
                <div className={styles.info_title}>Total Supply</div>
                <div className={styles.info_content}>{toThousands(supplyInfo.TotalSupply)} VSYS</div>
                <div className={styles.info_sub_content}>Circulating Supply: {toThousands(supplyInfo.CirculatingSupply)} VSYS</div>
            </div>
        </div>
    )
}

export default GeneralInfo