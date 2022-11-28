import BlacksTable from '../../src/components/commonComps/explorerDataTable'
import { BlocksGeneralColumns } from '../../src/models/commonData/tableColumns'
import { getBlock, postindex } from '../../src/api/index'
import styles from './page_padding.module.scss'
import { useEffect, useState } from 'react';
type Props = {};

const Blocks = (props: Props) => {
    const [blockInit, setblockInit] = useState({})
    useEffect(() => {
        getblcokPageData()
    }, [])
    const getblcokPageData = async () => {
        const data = (await postindex({ name: 'block' })).data
        if (data.data) {
            setblockInit(data.data)
        } else {
            setblockInit({ message: 'no data' })
        }
    }
    const postData = { page: 1, size: 20, height: 0 }
    return (
        <div className={styles.page_padding}>
            <BlacksTable
                tableTitle='Blocks Table'
                columnsData={BlocksGeneralColumns}
                postData={postData}
                initalPostData={postData}
                loadTableListFun={getBlock}
                initdata={blockInit}
                tableType='init'
            />
        </div>
    )
}

export default Blocks