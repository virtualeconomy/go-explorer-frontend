import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './nftcollection.module.scss'
import CollectionsGeneral from '../../../src/components/pageComps/nft/collectionpageComps/collectionsGeneral'
import { nftCard, nftCollectionGeneralType, nftCordget } from '../../../src/models/interface/nft'
import NftCord from '../../../src/components/pageComps/nft/collectionpageComps/collectionNfts'
import NftsTable from '../../../src/components/commonComps/explorerDataTable'
import NftTransactionsTable from '../../../src/components/commonComps/explorerDataTable'
import { NftsColumns, NftTransactionColumns } from '../../../src/models/commonData/tableColumns';
import { getCollectionGeneral, getCollectionRegister, getCollectionTransactions, getNftimg, postTransactionDetail, postTransactionDetailList } from '../../../src/api'
import { isEvalString, setipfsIconUrlName } from '../../../src/utils/tools'

type Props = {}

const NftCollection = (props: Props) => {
    const router = useRouter()
    const [nftGeneraldata, setnftGeneraldata] = useState<nftCollectionGeneralType>({ totalNft: 0, transactionNumber: 0, newNft: 0 })
    const [nftCorddata, setnftCorddata] = useState<Array<nftCard>>([])
    const [nftCordget, setnftCordget] = useState<nftCordget>({ contractId: '', page: 1, size: 16 })
    const [nftTableget, setnftTableget] = useState<nftCordget>({ contractId: '', page: 1, size: 10 })
    const [spinshow, setspinshow] = useState(false)
    const [collectionName, setCollectionName] = useState<any>('')
    const [nftCordTotal, setnftCordTotal] = useState(0)
    const [transactionTotal, setTransactionTotal] = useState(0)
    const { id, Name } = router.query
    useEffect(() => {
        setCollectionName(Name ? Name : '')
        if (id) {
            setnftCordTotal(0)
            setTransactionTotal(0)
            setnftCordget({ contractId: id as string, page: 1, size: 16 })
            setnftTableget({ contractId: id as string, page: 1, size: 10 })
            getCollectionGeneral(id as string).then((res) => {
                if (res.data.data) {
                    setnftGeneraldata(res.data.data)
                    setTransactionTotal(res.data.data.transactionNumber)
                }
            })
            getCollectionRegister({ contractId: id as string, page: 1, size: 16 }).then(async (res) => {
                if (res.data.data.data) {
                    let data = JSON.parse(JSON.stringify(res.data.data))
                    fillterdata(data, 'init')
                }
            }).catch(() => {
                setspinshow(true)
            })
        }
    }, [id])

    useEffect(() => {
        if (transactionTotal && collectionName == '') {
            getCollectionTransactions({ contractId: id, page: transactionTotal, size: 1 }).then(async (res) => {
                if (res.data?.data?.data[0]?.Description) {
                    if (res.data?.data?.data[0]?.Description) {
                        let IconObj = ""
                        if (!isEvalString(res.data?.data?.data[0]?.Description)) {
                            try {
                                IconObj = (await postTransactionDetail(res.data?.data?.data[0]?.Description))?.data?.data?.DBEntry?.Data
                            } catch (error) {
                                IconObj = ""
                            }
                        }
                        if (IconObj) {
                            let result = await setipfsIconUrlName(IconObj)
                            if (result.Name) {
                                setCollectionName(result.Name)
                            }
                            if (result.CollectionName) {
                                setCollectionName(result.CollectionName)
                            } else {
                                setCollectionName(IconObj)
                            }
                        } else {
                            let result = await setipfsIconUrlName(res.data?.data?.data[0]?.Description)
                            if (result.Name) {
                                setCollectionName(result.Name)
                            }
                            if (result.CollectionName) {
                                setCollectionName(result.CollectionName)
                            } else {
                                setCollectionName(res.data?.data?.data[0]?.Description)
                            }
                        }
                    }
                }
            })
        }
    }, [transactionTotal])

    async function fillterdata(data: any, type?: string) {
        let array: any[] = data.data
        let total = data.total
        let getNftAttrIdList: string[] = []
        let nftUrlList: any[] = []
        array.map(async (item: any, index: number) => {
            if (item.Attributes.Description && !isEvalString(item.Attributes.Description)) {
                getNftAttrIdList.push(item.Attributes.Description)
            }
        })
        if (getNftAttrIdList.length > 0) {
            try {
                nftUrlList = (await postTransactionDetailList(getNftAttrIdList))?.data?.data
            } catch (error) {
                nftUrlList = []
            }
        }
        if (array?.length > 0) {
            for await (let item of array) {
                let IconObj = nftUrlList.find((nftUrl: any) => {
                    return nftUrl.Id === item.Attributes.Description
                })?.DBEntry.Data
                if (IconObj) {
                    let result = await setipfsIconUrlName(IconObj)
                    if (result.IconUrl && !item.Attributes.IconUrl) {
                        item.Attributes.IconUrl = result.IconUrl
                    } else if (result.Word) {
                        item.Attributes.IconUrl = result.Word
                    }
                    if (result.Name && !item.Collection) {
                        item.Collection = result.Name
                    }
                    if (result.CollectionName && !item.Collection) {
                        item.Collection = result.CollectionName
                    }
                } else {
                    let result = await setipfsIconUrlName(item.Attributes.Description)
                    if (result.IconUrl && !item.Attributes.IconUrl) {
                        item.Attributes.IconUrl = result.IconUrl
                    } else if (result.Word) {
                        item.Attributes.IconUrl = result.Word
                    }
                    if (result.Name && !item.collection) {
                        item.Collection = result.Name
                    }
                    if (result.CollectionName && !item.collection) {
                        item.Collection = result.CollectionName
                    }
                }
                if (item.Collection) {
                    item.Attributes.Name = "#" + item.Index
                } else {
                    item.Attributes.Name = ' #' + item.Index
                }
            }
        }
        if (type == 'init') {
            setnftCorddata(array)
            setspinshow(true)
            setnftCordTotal(total)
        }
        else {
            setnftCorddata([...nftCorddata, ...array])
        }

    }
    function loadCord() {
        let newLoadData = JSON.parse(JSON.stringify(nftCordget))
        newLoadData.page++
        getCollectionRegister(newLoadData).then((res) => {
            if (res.data.data.data.length) {
                //Add NFT Name in NftCord component
                let data = JSON.parse(JSON.stringify(res.data.data))
                fillterdata(data)
                setnftCordget(newLoadData)
            }
        })
    }
    return (
        <div className={style.collection}>
            <h1 className={style.title}>Collections - {collectionName || ' . . . .'}</h1>
            <CollectionsGeneral generalData={nftGeneraldata} />
            <NftCord nftsdata={nftCorddata} loadMore={loadCord} spinshow={spinshow} total={nftCordTotal} />
            <NftsTable
                tableTitle='Latest NFTs in this Collection'
                columnsData={NftsColumns}
                postData={nftTableget}
                initalPostData={nftTableget}
                loadTableListFun={getCollectionRegister}
                tableType='nftCollection'
            />
            <NftTransactionsTable
                tableTitle='Latest Transactions in this Collection'
                columnsData={NftTransactionColumns}
                postData={nftTableget}
                initalPostData={nftTableget}
                loadTableListFun={getCollectionTransactions}
                tableType='nftCollection'
            />
        </div>
    )
}

export default NftCollection