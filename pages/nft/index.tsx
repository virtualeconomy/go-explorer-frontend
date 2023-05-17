import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NftGeneral from '../../src/components/pageComps/nft/nftGeneral/index'
import CollectionsInfo from '../../src/components/pageComps/nft/collectionsInfo'
import { nftcollectionsType, nftgeneralType, paralleingtableType, nftsTabledataType } from '../../src/models/interface/nft'
import style from './nft.module.scss'
import LatestNftsTable from '../../src/components/commonComps/explorerDataTable'
import LatestNftTransactionsTable from '../../src/components/commonComps/explorerDataTable'
import NftparallelingTable from '../../src/components/pageComps/nft/nftparallelingtable'
import { ColumnsType } from 'antd/es/table'
import { NftsColumns, NftTransactionColumns } from '../../src/models/commonData/tableColumns'
import { getNftCollections, getMostUsedNft, getMostChangedNft, getLeastNft, getNftAllTransaction, postindex } from '../../src/api/index'

type Props = {};

const LeastColumns: ColumnsType<paralleingtableType> = [
    {
        title: 'Non-fungible token',
        width: '50%',
        dataIndex: 'name',
        ellipsis: true,
        render: (val: any, record: any) => {
            if (!val) {
                return '-'
            } else {
                return <Link href={{ pathname: '/nft/collection', query: { id: record.contractId, Name: record.name } }} >{val}</Link>
            }
        }
    },
    {
        title: 'Transaction count',
        width: '50%',
        dataIndex: 'num',
        ellipsis: true,
        render: (val: any, record: any) => {
            return <Link href={{ pathname: '/nft/collection', query: { id: record.contractId, Name: record.name } }} >{val}</Link>
        }
    }
];
const MostColumns: ColumnsType<paralleingtableType> = [
    {
        title: 'Non-fungible token',
        width: '50%',
        dataIndex: 'name',
        ellipsis: true,
        render: (val: any, record: any) => {
            if (!val) {
                return '-'
            } else {
                return <Link href={{ pathname: '/nft/collection', query: { id: record.contractId, Name: record.name } }} >{val}</Link>
            }
        }
    },
    {
        title: 'Owner change count',
        width: '50%',
        dataIndex: 'num',
        ellipsis: true,
        render: (val: any, record: any) => {
            return <Link href={{ pathname: '/nft/collection', query: { id: record.contractId, Name: record.name } }} >{val}</Link>
        }
    }
];
const Nft = (props: Props) => {
    const router = useRouter()
    const [nftGeneraldata, setnftGeneraldata] = useState<nftgeneralType>({ totalNft: 0, transactionNumber: 0, newNft: 0 })
    const [nftInit, setnftInit] = useState({})
    const [nftTransactionInit, setnftTransactionInit] = useState({})
    // collections data
    const [nftCollectionsData, setnftCollectionsData] = useState<Array<nftcollectionsType>>([])
    const [collectionPageData, setCollectionPageData] = useState({ page: 1, size: 10 })
    const [totalCollection, setTotalCollection] = useState(0)
    const [show, setShow] = useState(false)
    // most used nfts data
    const [nftUsedParallelingdata, setNftUsedParallelingdata] = useState<Array<paralleingtableType>>([])
    // most changed nfts data
    const [nftChangedParallelingdata, setNftChangedParallelingdata] = useState<Array<paralleingtableType>>([])

    const [parallelingPageData, setParallelingPageData] = useState({ page: 1, size: 100 })
    const [spinshow, setspinshow] = useState(false)
    const [spinshowMostUsedNft, setspinshowMostUsedNft] = useState(false)
    const [spinshowMostChangedNft, setspinshowMostChangedNft] = useState(false)

    useEffect(() => {
        // get nft general information
        setspinshow(false)
        setspinshowMostUsedNft(false)
        setspinshowMostChangedNft(false)
        postindex({ name: 'NFT' }).then(res => {
            setspinshow(true)
            if (!res.data.code) {
                setnftGeneraldata(res.data.data.GeneralInfo)
                setShow(true)
                setnftCollectionsData(res.data.data.Collections.data)
                setTotalCollection(res.data.data.Collections.total)
                res.data.data.LatestNft.data.map((item: any, index: number) => {
                    if (item.Collection) {
                        item.Attributes.Name = item.Collection + ' #' + item.Index
                    }
                    else if (item.Attributes.Description[0] === '{') {
                        let url = JSON.parse(item.Attributes?.Description)
                        if (url?.properties) {
                            item.Attributes.Name = url.properties?.name
                        } else if (url?.name) {
                            item.Attributes.Name = url.name + ' #' + item.Index
                        }
                    } else {
                        item.Attributes.Name = ' #' + item.Index
                    }
                })

                setnftInit(res.data.data.LatestNft)
                setnftTransactionInit(res.data.data.Transactions)
            } else {
                setShow(true)
                setnftInit({ message: 'no data' })
                setnftTransactionInit({ message: 'no data' })
            }
        }).finally(() => {
            setShow(true)
            setspinshow(true)
        })
        updateParallelingNft()
    }, [])

    const updateCollections = (type: string) => {
        // get nft collections
        let newPageData = JSON.parse(JSON.stringify(collectionPageData))
        let newNftCollectionsData = JSON.parse(JSON.stringify(nftCollectionsData))
        let seclector = document.getElementById('collectionsContent') || { scrollLeft: 0 };

        if (nftCollectionsData.length == 0 || type == 'init') {
            newPageData = {
                size: 10,
                page: 1
            }
            setCollectionPageData(newPageData)
            getNftCollections().then(res => {
                setspinshow(true)
                if (res.data.data) {
                    setnftCollectionsData(res.data.data.data)
                    setTotalCollection(res.data.data.total)
                }
            }).catch((err) => {
                setspinshow(true)
            })
        } else {
            newPageData.page++
            setCollectionPageData(newPageData)
            if (nftCollectionsData.length < totalCollection) {
                getNftCollections(newPageData).then(res => {
                    newNftCollectionsData.push(...res.data.data.data)
                    setTotalCollection(res.data.data.total)
                    setnftCollectionsData(newNftCollectionsData)
                })
            }
            seclector.scrollLeft += 300
        }
    }

    const updateParallelingNft = () => {

        getMostUsedNft(parallelingPageData).then(res => {
            setspinshowMostUsedNft(true)
            if (!res.data.code) {
                setNftUsedParallelingdata(res.data.data.data)
            }
        })

        getMostChangedNft(parallelingPageData).then(res => {
            setspinshowMostChangedNft(true)
            if (!res.data.code) {
                setNftChangedParallelingdata(res.data.data.data)
            }
        })
    }

    return (
        <div className={style.nft}>
            <NftGeneral generalData={nftGeneraldata} show={show}  />
            <CollectionsInfo collectionsData={nftCollectionsData} updateCollections={updateCollections} spinshow={spinshow} />
            <div className={style.paralleling_table}>
                <NftparallelingTable
                    tablelist={nftUsedParallelingdata}
                    columnsdata={LeastColumns}
                    tabletitle='Most used NFTs over the last month'
                    spinshow={spinshowMostUsedNft}
                />
                <NftparallelingTable
                    tablelist={nftChangedParallelingdata}
                    columnsdata={MostColumns}
                    tabletitle='NFTs that changed owners most times'
                    spinshow={spinshowMostChangedNft}
                />
            </div>
            <LatestNftsTable
                tableTitle='Latest NFTs'
                viewPath="nft/nfts"
                tableType="briefTable"
                columnsData={NftsColumns}
                loadTableListFun={getLeastNft}
                initdata={nftInit}
            />

            <LatestNftTransactionsTable
                tableTitle='Latest Transactions'
                viewPath="nft/transactionList"
                tableType="briefTable"
                columnsData={NftTransactionColumns}
                loadTableListFun={getNftAllTransaction}
                initdata={nftTransactionInit}
            />
        </div>
    )
}

export default Nft