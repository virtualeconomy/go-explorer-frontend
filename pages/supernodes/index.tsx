import { postindex, postSupernode } from '../../src/api';
import { supernodescolumns } from '../../src/models/commonData/tableColumns';
import styles from '../blocks/page_padding.module.scss'
import SuperNodesTable from '../../src/components/commonComps/explorerDataTable'
import { useEffect, useState } from 'react';
type Props = {};

const Supernodes = (props: Props) => {
    const postData = { page: 1, size: 20 }
    const [supernodeInit, setsupernodeInit] = useState({})
    useEffect(() => {
        getSupernodePageData()
    }, [])
    const getSupernodePageData = async () => {
        const data = (await postindex({ name: 'superNode' })).data
        if (data.data) {
            setsupernodeInit(data.data)
        } else {
            setsupernodeInit({ message: 'no data' })
        }


    }
    return (
        <div className={styles.page_padding}>
            <SuperNodesTable
                tableTitle='Supernodes Table'
                columnsData={supernodescolumns}
                postData={postData}
                initalPostData={postData}
                loadTableListFun={postSupernode}
                initdata={supernodeInit}
                tableType='init'
            />
        </div>
    )
}

export default Supernodes