import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './nftcollection.module.scss'
import CollectionsGeneral from '../../../src/components/pageComps/nft/collectionpageComps/collectionsGeneral'
import { nftCard, nftCollectionGeneralType, nftCordget } from '../../../src/models/interface/nft'
import NftCord from '../../../src/components/pageComps/nft/collectionpageComps/collectionNfts'
import NftsTable from '../../../src/components/commonComps/explorerDataTable'
import NftTransactionsTable from '../../../src/components/commonComps/explorerDataTable'
import { NftsColumns, NftTransactionColumns } from '../../../src/models/commonData/tableColumns';
import { getCollectionGeneral, getCollectionRegister, getCollectionTransactions, getNftimg, postTransactionDetail } from '../../../src/api'
import { setipfsIconUrlName } from '../../../src/utils/tools'

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
            setnftCordget({ contractId: id as string, page: 1, size: 16 })
            setnftTableget({ contractId: id as string, page: 1, size: 10 })
            getCollectionGeneral(id as string).then((res) => {
                if (res.data.data) {
                    setnftGeneraldata(res.data.data)
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
        if (transactionTotal) {
            getCollectionTransactions({ contractId: id, page: transactionTotal, size: 1 }).then((res) => {
                console.log(res.data.data.data[0].Description);
                if (res.data?.data?.data[0]?.Description) {
                    if (res.data?.data?.data[0]?.Description[0] != "{") {
                        let url = 'https://gateway.ipfs.io/ipfs/' + res.data?.data?.data[0]?.Description
                        getNftimg(url).then((res) => {
                            setCollectionName(res.data.name)
                        })
                    }
                }
            })
        }
    }, [transactionTotal])

    async function fillterdata(data: any, type?: string) {
        let array = data.data
        let total = data.total
        for (let i = 0; i < array.length; i++) {
            let item = array[i]
            if (item.Collection) {
                item.Attributes.Name = "#" + item.Index
                setCollectionName(item.Collection)
            } else {
                setTransactionTotal(nftGeneraldata.transactionNumber)
                item.Attributes.Name = ' #' + item.Index
            }
            if (item.Attributes.Description[0] == '{') {
                let url = JSON.parse(item.Attributes?.Description)
                if (url?.properties) {
                    item.Attributes.Name = url.properties?.name
                    setCollectionName(url.properties?.name)
                } else if (url?.name) {
                    item.Attributes.Name = "#" + item.Index
                    setCollectionName(url.name)
                } else {
                    item.Attributes.Name = "#" + item.Index
                }
            } else {
                let desc = item.Attributes.Description
                const IconObj = await (await postTransactionDetail(desc)).data.data?.DBEntry?.Data
                let result = setipfsIconUrlName(IconObj, i)
                if (result.IconUrl) {
                    item.Attributes.IconUrl = result.IconUrl
                    item.Attributes.Name = "#" + item.Index
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
            <h1 className={style.title}>Collections - {collectionName}</h1>
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