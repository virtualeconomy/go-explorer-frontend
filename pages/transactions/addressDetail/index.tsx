import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AddressDetail from '../../../src/components/pageComps/transactions/addressDetail/index'
import ContractDetail from '../../../src/components/pageComps/transactions/contractDetail/index'
import DoubletransactionTable from '../../../src/components/commonComps/explorerDataTable/index'
import ContracTokenTable from '../../../src/components/commonComps/explorerDataTable/index'
import styles from '../../blocks/page_padding.module.scss'
import { getAddressDetail, getAddressToken, getContractDetail, postAddressTrans, postgetTokenTransaction } from '../../../src/api/index'
import { addressDetailDataType, postDataType, getAddressTokenTransactionType, contractDetailDataType } from '../../../src/models/interface/transactions'
import { txColumns, TokenRecordscolumns, tokenInfocolumns } from '../../../src/models/commonData/tableColumns'



type Props = {

};
const postData = { page: 1, size: 10 }
const TransactionAddressDetail = (props: Props) => {
    const router = useRouter()
    var { address } = router.query
    const [getAddressTokenTransactionsdata, setgetAddressTokenTransactionsdata] = useState<getAddressTokenTransactionType>({
        address: address as string,
        page: 1,
        size: 10
    })
    const [detailData, setdetailData] = useState<object>({})
    const [spinshow, setspinshow] = useState(false)
    const [addressID, setaddressID] = useState<string>('')
    const [addressTokenList, setadderssTokenList] = useState([])
    const [isContract, setisContract] = useState(false)
    function getDoubletransactionsone(address: string, data: postDataType) {
        if (address) {
            return new Promise(function (resovle, reject) {
                postAddressTrans(address as string, data).then(res => {
                    resovle(res)
                })
            })
        } else {
            return false
        }
    }

    function IsContract(address: string) {
        let contract = /^C/
        return contract.test(address)
    }

    useEffect(() => {
        if (address) {
            setaddressID(address as string)
            setgetAddressTokenTransactionsdata({
                address: address as string,
                page: 1,
                size: 10
            })
            if (IsContract(address as string)) {
                setisContract(true)
                getContractDetail(address as string).then(res => {
                    // console.log(res.data);x
                    setdetailData(res?.data?.data)

                }).finally(() => {
                    setspinshow(true)
                })
            } else {
                setisContract(false)
                getAddressDetail(address as string).then(res => {
                    let code = res.data.code
                    if (!code) {
                        setdetailData(res.data.data)
                    } else {

                    }
                }).finally(() => {
                    setspinshow(true)
                })
                getAddressToken({ "address": address }).then(res => {
                    if (!res.data.code) {
                        setadderssTokenList(res.data.data.data)
                    }
                })
            }
        }
    }, [address])

    return (
        <div className={styles.page_padding}>
            {
                isContract ?
                    <div>
                        <ContractDetail
                            title={'Contract Details'}
                            detailData={detailData as contractDetailDataType}
                            spinshow={spinshow}
                        />
                        {/* <ContracTokenTable
                            tableType="contracttoken"
                            tableTitle='Token Records'
                            columnsData={TokenRecordscolumns}
                            loadTableListFun={postgetTokenTransaction}
                            postData={getAddressTokenTransactionsdata}
                            initalPostData={getAddressTokenTransactionsdata}
                        /> */}
                    </div> :
                    <div>
                        <AddressDetail
                            title={'Address Details'}
                            subtitle={address as string}
                            detailData={detailData as addressDetailDataType}
                            spinshow={spinshow}
                        />
                        <DoubletransactionTable
                            tableType="doubletransactionsTable"
                            tableTitle='Transactions Records'
                            doubletableTitle='Token Records'
                            columnsData={txColumns}
                            doublecolumnsData={TokenRecordscolumns}
                            addressID={addressID}
                            loadTableListFun={getDoubletransactionsone}
                            doubleloadTableListFun={postgetTokenTransaction}
                            doublepostData={getAddressTokenTransactionsdata}
                            postData={postData}
                            doubleinitalPostData={getAddressTokenTransactionsdata}
                            initalPostData={postData}
                            addressTokenlist={addressTokenList}
                        />
                    </div>
            }
        </div>
    )
}

export default TransactionAddressDetail