import { useEffect, useState } from 'react';
import { postindex, postTokenList } from '../../src/api/index'
import TokenList from '../../src/components/commonComps/explorerDataTable'
import { TokenInfoColumns } from '../../src/models/commonData/tableColumns';

type Props = {
};
const postData = { page: 1, size: 20 }
const Token = (props: Props) => {
    const [tokenInit, settokenInit] = useState({})
    useEffect(() => {
        getTokenPageData()
    }, [])
    const getTokenPageData = async () => {
        const data = (await postindex({ name: 'token' })).data
        if (data.data) {
            settokenInit(data.data)
        } else {
            settokenInit({ message: 'no data' })
        }
    }

    return (
        <div className=''>
            <TokenList
                tableTitle='Token List'
                columnsData={TokenInfoColumns}
                postData={postData}
                initalPostData={postData}
                loadTableListFun={postTokenList}
                tableType='TokenList'
                initdata={tokenInit}
            />
        </div>
    )
}

export default Token