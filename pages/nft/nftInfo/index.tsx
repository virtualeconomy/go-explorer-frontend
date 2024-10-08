import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './nftinfo.module.scss'
import NftDetail from '../../../src/components/pageComps/nft/nftinfopageComps/nftDetail'
import { nftDetail, nftdetailgetdata, nftOwershiphistory } from '../../../src/models/interface/nft'
import NftOwnershipHistoryDetail from '../../../src/components/pageComps/nft/nftinfopageComps/nftOwnershiphistory'
import NftregistryTable from '../../../src/components/commonComps/explorerDataTable'
import { NftregistryColumns } from '../../../src/models/commonData/tableColumns'
import { getNftDetail, getNftRegister, getNftOwnerTransfer, postTransactionDetail } from '../../../src/api'
import { isEvalString, setipfsIconUrlName } from '../../../src/utils/tools'
type Props = {}

const NftInfo = (props: Props) => {
    const router = useRouter()
    const { id } = router.query
    const [nftDetaildata, setnftDetaildata] = useState<nftDetail>({
        NftDetail: {
            Attributes: { Name: '', IconUrl: '', CollectionName: '', Creator: '', Description: '' },
            Id: '',
            NftTokenId: '',
            CreatingHeight: 0,
            RegisterTime: 0,
            CurrentOwner: '',
            ContractId: '',
            description: '',
        },
        TransactionNumber: 0,
        ChangeOwnerLastDay: 0
    })
    const [nftOwnershipHistoryDetaillist, setnftOwnershipHistoryDetaillist] = useState<nftOwershiphistory>({
        data: [],
        total: 0
    })
    const [nftgetdata, setnftgetdata] = useState<nftdetailgetdata>({})
    const [nftDetailSpin, setnftDetailSpin] = useState<boolean>(false)
    const [nftOwnershipHistoryDetailSpin, setnftOwnershipHistoryDetailSpin] = useState<boolean>(false)
    useEffect(() => {
        if (id) {
            getNftDetail(id as string).then(async (res) => {
                if (res.data.data) {
                    res.data.data.NftDetail.Attributes.Name = '#' + res.data.data.NftDetail.Index
                    let IconObj = ""
                    if (res.data.data.NftDetail?.Attributes?.Description) {
                        if (!isEvalString(res.data.data.NftDetail?.Attributes?.Description)) {
                            try {
                                IconObj = (await postTransactionDetail(res.data.data.NftDetail?.Attributes?.Description))?.data?.data?.DBEntry?.Data
                            } catch (error) {
                                IconObj = ""
                            }
                        }
                        if (IconObj) {
                            let result = await setipfsIconUrlName(IconObj)
                            if (result.IconUrl && !res.data.data.NftDetail.Attributes.IconUrl) {
                                res.data.data.NftDetail.Attributes.IconUrl = result.IconUrl
                            } else if (result.Word) {
                                res.data.data.NftDetail.Attributes.IconUrl = result.Word
                            }
                            if (result.Name) {
                                res.data.data.NftDetail.Attributes.Name = result.Name
                            }
                            if (result.CollectionName) {
                                res.data.data.NftDetail.Attributes.Name = result.CollectionName + ' #' + res.data.data.NftDetail.Index
                            }
                        } else {
                            let result = await setipfsIconUrlName(res.data.data.NftDetail.Attributes.Description)
                            if (result.IconUrl && !res.data.data.NftDetail.Attributes.IconUrl) {
                                res.data.data.NftDetail.Attributes.IconUrl = result.IconUrl
                            } else if (result.Word) {
                                res.data.data.NftDetail.Attributes.IconUrl = result.Word
                            }
                            if (result.Name) {
                                res.data.data.NftDetail.Attributes.Name = result.Name
                            }
                            if (result.CollectionName) {
                                res.data.data.NftDetail.Attributes.Name = result.CollectionName + ' #' + res.data.data.NftDetail.Index
                            }
                        }
                    }
                    if (res.data.data.NftDetail?.Collection) {
                        res.data.data.NftDetail.Attributes.Name = res.data.data?.NftDetail?.Collection + ' #' + res.data.data.NftDetail.Index
                    }
                    setnftDetailSpin(true)
                    setnftDetaildata(res.data.data)
                } else {
                    setnftDetailSpin(true)
                }
            }).catch((err) => {
                setnftDetailSpin(true)
            })
            setnftgetdata({ 'nftTokenId': id as string, page: 1, size: 5 })
            getNftOwnerTransfer({ 'nftTokenId': id as string, page: 1, size: 5 }).then((res) => {
                setnftOwnershipHistoryDetailSpin(true)
                if (res.data?.data) {
                    setnftOwnershipHistoryDetaillist(res.data?.data)
                }
            }).catch((err) => {
                setnftOwnershipHistoryDetailSpin(true)
            })
        }
    }, [id])
    function loadMoreOwnershipHistroy() {
        let newgetdata = JSON.parse(JSON.stringify(nftgetdata))
        newgetdata.page++
        getNftOwnerTransfer(newgetdata).then((res) => {
            if (res.data.data.data.length) {
                setnftOwnershipHistoryDetaillist({ total: res.data.data.total, data: [...nftOwnershipHistoryDetaillist.data, ...res.data.data.data] })
                setnftgetdata(newgetdata)
            }
        })
    }
    return (
        <div className={style.nftinfo}>
            <NftDetail
                spinshow={nftDetailSpin}
                detailData={nftDetaildata}
            />
            <NftOwnershipHistoryDetail
                spinshow={nftOwnershipHistoryDetailSpin}
                detailList={nftOwnershipHistoryDetaillist}
                nftID={id as string}
                loadMore={loadMoreOwnershipHistroy}
            />
            <NftregistryTable
                tableTitle='NFT registry'
                columnsData={NftregistryColumns}
                postID={id}
                loadTableListFun={getNftRegister}
                tableType="DetailInfo"
            />
        </div>
    )
}

export default NftInfo