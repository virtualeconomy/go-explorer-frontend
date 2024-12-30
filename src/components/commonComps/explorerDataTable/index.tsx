import { useState, useEffect } from 'react'
import { Table, Button, Image, Input, message } from 'antd'
import styles from './explorerDataTable.module.scss'
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { commonTableProps } from '../../../models/interface/common'
import { useRouter } from 'next/router'
import { addTypeName } from '../../../utils/tools';
import { getAddressToken } from '../../../api';

//This is a self-defined icon that will be used in the Refresh Button
const Refresh = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15V17ZM5 16V15C4.44772 15 4 15.4477 4 16H5ZM4 21C4 21.5523 4.44772 22 5 22C5.55228 22 6 21.5523 6 21H4ZM10 15H5V17H10V15ZM4 16V21H6V16H4Z" fill="#EEEEEE" />
        <path d="M19.4176 14.9968C18.8569 16.3846 17.9182 17.5872 16.7081 18.468C15.498 19.3488 14.065 19.8725 12.5721 19.9795C11.0792 20.0865 9.58624 19.7726 8.26287 19.0734C6.9395 18.3742 5.83882 17.3177 5.08594 16.0241" stroke="#EEEEEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 7C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9V7ZM19 8V9C19.5523 9 20 8.55228 20 8H19ZM20 3C20 2.44772 19.5523 2 19 2C18.4477 2 18 2.44772 18 3H20ZM14 9H19V7H14V9ZM20 8V3H18V8H20Z" fill="#EEEEEE" />
        <path d="M4.58203 9.00315C5.14272 7.61541 6.08146 6.41278 7.29157 5.53197C8.50169 4.65116 9.93462 4.12749 11.4275 4.02048C12.9204 3.91346 14.4134 4.2274 15.7368 4.92661C17.0601 5.62582 18.1608 6.68226 18.9137 7.97584" stroke="#EEEEEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const Drop = () => (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L9.70711 1.70711ZM5 5L4.29289 5.70711C4.68342 6.09763 5.31658 6.09763 5.70711 5.70711L5 5ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM8.29289 0.292893L4.29289 4.29289L5.70711 5.70711L9.70711 1.70711L8.29289 0.292893ZM5.70711 4.29289L1.70711 0.292893L0.292893 1.70711L4.29289 5.70711L5.70711 4.29289Z" fill="white" />
    </svg>
)
const Token = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2902 20.8968L12.6452 21.8317L12.6452 21.8317L12.2902 20.8968ZM11.7098 20.8968L11.3548 21.8317L11.3548 21.8317L11.7098 20.8968ZM5 4H19V2H5V4ZM19 4V10.1649H21V4H19ZM5 10.1649V4H3V10.1649H5ZM19 10.1649C19 16.8586 13.3228 19.435 11.9351 19.962L12.6452 21.8317C14.1289 21.2682 21 18.2341 21 10.1649H19ZM3 10.1649C3 18.2341 9.87108 21.2682 11.3548 21.8317L12.0649 19.962C10.6772 19.435 5 16.8586 5 10.1649H3ZM11.9351 19.962C11.95 19.9564 11.9725 19.951 12 19.951C12.0275 19.951 12.05 19.9564 12.0649 19.962L11.3548 21.8317C11.7737 21.9908 12.2263 21.9908 12.6452 21.8317L11.9351 19.962ZM19 4V4H21C21 2.89543 20.1046 2 19 2V4ZM5 2C3.89543 2 3 2.89543 3 4H5V4V2Z" fill="white" />
        <path d="M15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L15.7071 9.70711ZM11 13L10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L11 13ZM9.70711 10.2929C9.31658 9.90237 8.68342 9.90237 8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071L9.70711 10.2929ZM14.2929 8.29289L10.2929 12.2929L11.7071 13.7071L15.7071 9.70711L14.2929 8.29289ZM11.7071 12.2929L9.70711 10.2929L8.29289 11.7071L10.2929 13.7071L11.7071 12.2929Z" fill="white" />
    </svg>
);

const TokenIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={Token} {...props} />
);
const RefreshIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={Refresh} {...props} />
);
const DropIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={Drop} {...props} />
);


const CommonDataTable = (props: commonTableProps) => {
    const router = useRouter()
    const { loadTableListFun, doubleloadTableListFun, postData, initalPostData, tableTitle, columnsData, tableType, viewPath, doubleinitalPostData, postID } = props
    const [tableList, setTableList] = useState<any>([])
    const [doubletableList, setdoubleTableList] = useState([])
    const [dataAmount, setDataAmount] = useState<number | string>(0)
    const [doubledataAmount, setdoubleDataAmount] = useState<number | string>(0)
    const [loadData, setLoadData] = useState(initalPostData)
    const [doubleloadData, setdoubleLoadData] = useState(doubleinitalPostData)
    const [isLoading, setIsLoading] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)
    const [swit, setswit] = useState(false)
    const [cord, setcord] = useState(false)
    const [searchcord, setsearchcord] = useState(false)
    const [tokenListcord, settokenListcord] = useState(false)
    const [key, setKey] = useState('')
    const [tokenID, settokenID] = useState<string>('')
    const [balance, setbalance] = useState<string>('0')
    const [selectToken, setselectToken] = useState<string>('Select Token')

    function Switch(open: boolean) {
        setswit(open)
        if (open == true && !doubletableList.length) {
            loaddoubleTableList('refreshtwo')
            if (props.addressTokenlist && props.addressTokenlist[0]) {
                settokenID(props.addressTokenlist[0].Token.TokenId)
                setbalance(props.addressTokenlist[0].balance)
            }
        }
        setcord(false)
    }
    async function submit() {
        if (key && key.length == 41) {
            let result1 = (await getAddressToken({ 'address': props.addressID, 'tokenId': key })).data
            if (result1.data.data) {
                let newLoadData1 = JSON.parse(JSON.stringify(doubleloadData))
                newLoadData1.Id = key
                setdoubleLoadData(newLoadData1)
                setbalance(result1.data.data[0].balance)
                settokenID(result1.data.data[0].Token.TokenId)
                setsearchcord(false)
            } else {
                result1.error.map((item: any, i: number) => {
                    message.error(item)
                })
            }

        } else {
            message.error('Please input a legal token ID.')
        }
    }
    function refreshTokenlist(i: number, selectToken: string) {
        settokenListcord(false)
        let newLoadData1 = JSON.parse(JSON.stringify(doubleloadData))
        newLoadData1.Id = props.addressTokenlist[i].Token.TokenId
        setdoubleLoadData(newLoadData1)
        settokenID(props.addressTokenlist[i].Token.TokenId)
        setselectToken(selectToken)
        setbalance(props.addressTokenlist[i].balance)
    }

    function updataKey(e: Event & { target: HTMLInputElement }) {
        setKey(e.target?.value)
    }
    useEffect(() => {
        if (tableType === 'doubletransactionsTable' || tableType === 'DetailInfo' || tableType === 'doubletokenTable' || tableType === 'supernodeTable' || tableType === 'nftCollection' || tableType === 'briefTable' || tableType === 'init' || tableType === 'briefTable' || tableType === 'TokenList' || tableType === 'contracttoken') {
        }
        else {
            loadTableList('refresh') //init table data
        }
    }, [])

    useEffect(() => {
        if (tableType === 'DetailInfo' && postID) {
            loadTableList('refresh')
        }
    }, [props.postID])

    useEffect(() => {
        if (tableType === 'supernodeTable' && postData?.address) {
            loadTableList('refresh')
        } else if (tableType === 'contracttoken' && postData?.address) {
            loadTableList('refresh')
        }
    }, [props.postData?.address])

    useEffect(() => {
        if (props.doubleinitalPostData) {
            setdoubleLoadData(props.doubleinitalPostData)
        }
    }, [props.doubleinitalPostData])

    useEffect(() => {
        if (doubleloadData && swit) {
            loaddoubleTableList('refreshtwo')
        }
    }, [doubleloadData?.Id, doubleloadData?.address])

    useEffect(() => {
        if (tableType === 'doubletransactionsTable' && props.addressID) {
            loaddoubleTableList('refreshone')
        }
    }, [props.addressID])

    useEffect(() => {
        if (tableType === 'doubletokenTable' && postData?.Id) {
            loaddoubleTableList('refreshone')
        }
    }, [postData?.Id])

    useEffect(() => {
        if (tableType === 'nftCollection' && postData?.contractId) {
            loadTableList('refresh')
        }
    }, [postData?.contractId])

    useEffect(() => {
        if (tableType === 'init' || tableType === 'briefTable' || tableType === 'TokenList')
            setIsRefresh(true)
        if (props.initdata?.data) {
            loadTableList('init')
        } else if (props.initdata?.message) {
            setIsRefresh(false)
        }
    }, [props.initdata?.data, props.initdata?.message])

    //load table list data for different types
    const loadTableList = async (loadType: string) => {
        try {
            if (loadType === 'init') {
                if (props.initdata) {
                    props.initdata.data.map((item: any) => item.key ? item.key = item.key + Math.random() : item.key = (item.Timestamp | item.TimeStamp) + Math.random())
                    setTableList(props.initdata.data)
                    setDataAmount(props.initdata.total)
                    setIsRefresh(false)
                }
            }

            else if (loadType === 'refresh') {
                if (!isRefresh) {
                    if (tableType === 'briefTable') {
                        setIsRefresh(true)
                        let result = (await loadTableListFun()).data.data
                        result.data.map((item: any) => {
                            //Add NFT Name 
                            if (item.Collection) {
                                item.Attributes.Name = item.Collection + ' #' + item.Index
                            }
                            if (item.Attributes?.Description[0] === '{') {
                                let url = JSON.parse(item.Attributes?.Description)
                                if (url.properties) {
                                    item.Attributes.Name = url.properties?.name
                                } else if (url?.name) {
                                    item.Attributes.Name = url.name + ' #' + item.Index
                                }
                            }
                            item.key ? item.key = item.key + Math.random() : item.key = (item.Timestamp | item.TimeStamp) + Math.random()
                        })
                        setTableList(result.data)
                        setDataAmount(result.total)
                        setIsRefresh(false)
                    } else if (tableType === 'contracttoken') {
                        let newLoadData = JSON.parse(JSON.stringify(postData))
                        setIsRefresh(true)
                        newLoadData.page = 1
                        setLoadData(newLoadData)
                        let result = (await loadTableListFun(newLoadData)).data.data
                        if (result.data) {
                            result.data.map((item: any) => {
                                item.key = item.TokenTransaction?.Id + Math.random()
                            })
                            setTableList(result.data)
                        }
                        setDataAmount(result.total)
                        setIsRefresh(false)
                    }
                    else if (tableType === 'DetailInfo') {
                        if (postID) {
                            setIsRefresh(true)
                            let result = (await loadTableListFun(postID)).data
                            if (!result?.data) {
                                setTableList([])
                                setDataAmount(0)
                            }
                            if (result.data.Transactions === null || result.data.list === null || result.data.Transactions) {
                                result.data.Transactions.map((item: any) => {
                                    item.key = item.Id + Math.random()
                                })
                                if (!result.data.Transactions.TypeName) {
                                    addTypeName(result.data.Transactions)
                                }
                                setTableList(result.data.Transactions)
                                setDataAmount(result.data.Transactions.length)
                            } else if (!result.code) {
                                let newdata = [result.data]
                                newdata.map((item: any) => {
                                    item.key = item.Id + Math.random()
                                })
                                setTableList(newdata)
                                setDataAmount(newdata.length)
                            } else {
                                setTableList([])
                                setDataAmount(0)
                                setIsRefresh(false)
                            }
                            setIsRefresh(false)
                        }
                    } else {
                        let newLoadData = JSON.parse(JSON.stringify(postData))
                        setIsRefresh(true)
                        if (newLoadData.page) {
                            newLoadData.page = 1
                        } else {
                            newLoadData.pageNumber = 1
                        }
                        if (newLoadData.height == 0 || newLoadData.height) {
                            newLoadData.height = 0

                        }
                        if (newLoadData.seqId == 0 || newLoadData.seqId) {
                            newLoadData.seqId = 0

                        }
                        setLoadData(newLoadData)
                        let result = (await loadTableListFun(newLoadData)).data.data
                        if (result.data) {
                            result.data.map((item: any) => {
                                if (item.Attributes) {
                                    //Add NFT Name
                                    if (tableType === 'nfts') {
                                        // in the nfts page
                                        if (item.Collection) {
                                            item.Attributes.Name = item.Collection + ' #' + item.Index
                                        }
                                        if (item.Attributes?.Description[0] === '{') {
                                            let url = JSON.parse(item.Attributes?.Description)
                                            if (url.url) {
                                                item.Attributes.Name = url.properties?.name
                                            } else if (url?.name) {
                                                item.Attributes.Name = url.name + ' #' + item.Index
                                            }
                                        }
                                    } else {
                                        // in the collection page
                                        item.Attributes.Name = ' #' + item.Index
                                    }
                                }
                                if (item.slotId || item.slotId === 0) {
                                    item.key = item.slotId + Math.random()
                                } else if (item.Id) {
                                    item.key = item.Id + Math.random()
                                } else if (item.BlockId) {
                                    item.key = item.BlockId + Math.random()
                                } else if (item.TokenId) {
                                    item.key = item.TokenId + Math.random()
                                } else {
                                    item.key = item.ContractId + Math.random()
                                }
                            })
                            setTableList(result.data)
                        }
                        setDataAmount(result.total)
                        setIsRefresh(false)
                    }
                }
            }

            else {
                if (!isLoading) {
                    setIsLoading(true)
                    let newTableList = JSON.parse(JSON.stringify(tableList))
                    let newLoadData = JSON.parse(JSON.stringify(loadData))
                    if (newLoadData.page) {
                        newLoadData.page++
                    } else {
                        newLoadData.pageNumber++
                    }
                    if (newLoadData.height == 0 || newLoadData.height) {
                        newLoadData.height = newTableList[newTableList.length - 1].Height
                    }
                    if (newLoadData.seqId == 0 || newLoadData.seqId) {
                        newLoadData.seqId = newTableList[newTableList.length - 1].SeqId
                    }
                    setLoadData(newLoadData)
                    let result = (await loadTableListFun(newLoadData)).data.data
                    if (result.data) {
                        if (result.data[0].TokenTransaction) {
                            result.data.map((item: any) => {
                                item.key = item.TokenTransaction?.Id + Math.random()
                            })
                        } else {
                            result.data.map((item: any) => {
                                if (item.Attributes) {
                                    //Add NFT Name 
                                    if (tableType === 'nfts') {
                                        // in the nfts page
                                        if (item.Collection) {
                                            item.Attributes.Name = item.Collection + ' #' + item.Index
                                        }
                                        if (item.Attributes?.Description[0] === '{') {
                                            let url = JSON.parse(item.Attributes?.Description)
                                            if (url.url) {
                                                item.Attributes.Name = url.properties?.name
                                            }
                                        }
                                    } else {
                                        // in the collection page
                                        item.Attributes.Name = ' #' + item.Index
                                    }
                                }
                                if (item.slotId || item.slotId === 0) {
                                    item.key = item.slotId + Math.random()
                                } else if (item.Id) {
                                    item.key = item.Id + Math.random()
                                } else if (item.TokenId) {
                                    item.key = item.TokenId + Math.random()
                                } else {
                                    item.key = item.BlockId + Math.random()
                                }
                            })
                        }
                        newTableList.push(...result.data)
                    }
                    setTableList(newTableList)
                    setDataAmount(result.total)
                    setIsLoading(false)
                }
            }
        } catch {
            setIsRefresh(false)
            setIsLoading(false)
        }
    }

    const loaddoubleTableList = async (loadType: string) => {
        try {
            if (loadType === 'refreshone') {
                if (!isRefresh) {
                    let newLoadData = JSON.parse(JSON.stringify(postData))
                    setIsRefresh(true)
                    newLoadData.page = 1
                    if (newLoadData.seqId == 0 || newLoadData.seqId) {
                        newLoadData.seqId = 0
                    }
                    if (tableType === 'doubletransactionsTable') {
                        setLoadData(newLoadData)
                        let result = (await loadTableListFun(props.addressID, newLoadData)).data.data
                        result.data.map((item: any) => {
                            item.key = item.Id + Math.random()
                        })
                        setTableList(result.data)
                        setDataAmount(result.total)
                    }
                    else if (tableType === 'doubletokenTable') {
                        setLoadData(newLoadData)
                        let result = (await loadTableListFun(newLoadData)).data.data
                        result.data.map((item: any) => {
                            item.key = item.TokenTransaction?.Id + Math.random()
                        })
                        setTableList(result.data)
                        setDataAmount(result.total)
                    }
                    setIsRefresh(false)
                }
            }

            else if (loadType === 'refreshtwo') {
                if (!isRefresh) {
                    let newLoadData1 = JSON.parse(JSON.stringify(doubleloadData))
                    setIsRefresh(true)
                    newLoadData1.page = 1
                    setdoubleLoadData(newLoadData1)
                    let result1 = (await doubleloadTableListFun(newLoadData1)).data.data
                    result1.data.map((item: any) => {
                        item.key = item.TokenTransaction?.Id + Math.random()
                    })
                    setdoubleTableList(result1.data)
                    setdoubleDataAmount(result1.total)
                    setIsRefresh(false)
                }
            }

            else {
                if (!isLoading) {
                    setIsLoading(true)
                    if (loadType === 'loadone') {
                        let newTableList = JSON.parse(JSON.stringify(tableList))
                        let newLoadData = JSON.parse(JSON.stringify(loadData))
                        if (newLoadData.seqId == 0 || newLoadData.seqId) {
                            newLoadData.seqId = newTableList[newTableList.length - 1].SeqId
                        }
                        newLoadData.page++
                        setLoadData(newLoadData)
                        if (tableType === 'doubletransactionsTable') {
                            let result = (await loadTableListFun(props.addressID, newLoadData)).data.data
                            result.data.map((item: any) => {
                                item.key = item.Id + Math.random()
                            })
                            newTableList.push(...result.data)
                            setDataAmount(result.total)
                        }
                        else {
                            let result = (await loadTableListFun(newLoadData)).data.data
                            result.data.map((item: any) => {
                                item.key = item.TokenTransaction?.Id + Math.random()
                            })
                            newTableList.push(...result.data)
                            setDataAmount(result.total)
                        }
                        setIsLoading(false)
                        setTableList(newTableList)
                    } else if (loadType === 'loadtwo') {
                        let newTableList1 = JSON.parse(JSON.stringify(doubletableList))
                        let newLoadData1 = JSON.parse(JSON.stringify(doubleloadData))
                        newLoadData1.page++
                        setdoubleLoadData(newLoadData1)
                        let result1 = (await doubleloadTableListFun(newLoadData1)).data.data
                        if (result1) {
                            result1.data.map((item: any) => {
                                item.key = item.TokenTransaction?.Id + Math.random()
                            })
                            newTableList1.push(...result1.data)
                            setdoubleDataAmount(result1.total)
                        }
                        setdoubleTableList(newTableList1)
                        setIsLoading(false)
                    }
                }
            }
        } catch {
            setIsRefresh(false)
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.info_table}>
            <div className={styles.table}>
                <div className={styles.table_container} style={{ display: tableType === 'doubletransactionsTable' || tableType === 'doubletokenTable' ? 'none' : 'block' }}>
                    <div className={styles.table_title}>
                        <h2>{tableTitle}</h2>
                        {
                            tableType === 'TokenList' ?
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSer2SHC0qLi5l_4q-8zXcQG_nAraUBkMB9LPDI0MLuSB_03vg/viewform">
                                    <Button className={styles.btn} >
                                        <TokenIcon />Token Autentification
                                    </Button>
                                </a>
                                :
                                <Button className={styles.btn} onClick={() => loadTableList('refresh')} >
                                    <RefreshIcon />Refresh
                                </Button>
                        }
                    </div>
                    <div style={{ display: isRefresh ? 'none' : 'block' }}>
                        <Table columns={columnsData} dataSource={tableList} pagination={false} className={styles.antd_table} />
                        <span className={styles.page_sgin}>{tableList ? tableList.length : 0}/{dataAmount}</span>
                        {
                            tableType === 'briefTable' ?
                                <Button className={styles.view_more_btn} onClick={() => router.push(viewPath || '')} >View More <span className={styles.arrow}>{'>'}</span></Button>
                                : tableType === 'DetailInfo' ? '' : <Button className={styles.more_btn} loading={isLoading} onClick={() => loadTableList('load')}
                                    style={{ display: dataAmount <= tableList.length ? 'none' : 'block' }} >Load More</Button>
                        }
                    </div>
                </div>
                <div className={styles.table_container} style={{ display: tableType === 'doubletransactionsTable' || tableType === 'doubletokenTable' ? 'block' : 'none' }}>
                    <div className={styles.table_title}>
                        <div className={styles.double_title}>
                            <h2 onClick={() => Switch(false)} className={!swit ? styles.h2_active : ''} >{props.tableTitle}</h2>
                            <h2 onClick={() => Switch(true)} className={swit ? styles.h2_active : ''}>{props.doubletableTitle}</h2>
                            <div className={styles.h2_swit}>
                                <span>{swit ? props.doubletableTitle : props.tableTitle}</span>
                                <Button className={styles.swit_btn} onClick={() => setcord(true)} >
                                    <DropIcon />
                                </Button>
                                <div className={styles.switchdiv} style={{ display: cord ? 'block' : 'none' }}>
                                    <p onClick={() => Switch(false)} className={!swit ? styles.p_active : ''}>{props.tableTitle}</p>
                                    <p onClick={() => Switch(true)} className={swit ? styles.p_active : ''}>{props.doubletableTitle}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ position: 'relative', display: tableType === 'doubletransactionsTable' ? "flex" : 'none' }}>
                                <Button className={(swit) ? styles.token_btn : styles.token_btn_none} onClick={() => { settokenListcord(!tokenListcord) }}>
                                    <DropIcon /> {selectToken}
                                </Button>
                                <div className={(tokenListcord && swit) ? styles.token_list : styles.token_list_none}>
                                    {
                                        props.addressTokenlist?.map((item: any, index: number) => {
                                            return (
                                                <p key={index}
                                                    onClick={() => { refreshTokenlist(index, item.Token?.Symbol) }}
                                                    className={(item.Token?.Symbol == selectToken) ? styles.token_active : ''}
                                                >{item.Token?.Symbol}</p>
                                            )
                                        })
                                    }
                                    <p onClick={() => { setsearchcord(true), settokenListcord(false) }}>others</p>
                                </div>
                                <div className={styles.search_token} style={{ display: (searchcord && swit) ? 'block' : 'none' }}>
                                    <div className={styles.search_content}>
                                        <button className={styles.search_cancel} onClick={() => { setsearchcord(false) }}>X</button>
                                        <div className={styles.search}>
                                            <Input
                                                placeholder="You can search uncertified token for token ID"
                                                onChange={() => updataKey(event as MouseEvent & { target: HTMLInputElement })}
                                                value={key}
                                                bordered={false}
                                                onPressEnter={submit}
                                            />
                                            <Button type="primary"
                                                onClick={submit}
                                            >
                                                <Image
                                                    className={styles.search_icon}
                                                    preview={false}
                                                    src='/Search_Magnifying_Glass.svg'
                                                    alt="search"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button className={styles.btn} onClick={() => { swit ? loaddoubleTableList('refreshtwo') : loaddoubleTableList('refreshone') }} >
                                <RefreshIcon />Refresh
                            </Button>
                        </div>
                    </div>
                    <div style={{ display: isRefresh ? 'none' : 'block' }}>
                        <p style={{ display: (swit && tableType === 'doubletransactionsTable' ? 'block' : 'none') }}>Token Balance: {balance}   Token ID: {tokenID}</p>
                        <Table
                            columns={swit ? props.doublecolumnsData : props.columnsData}
                            dataSource={swit ? doubletableList : tableList}
                            pagination={false}
                            className={styles.antd_table}
                        />
                        <span className={styles.page_sgin}>
                            {swit ? doubletableList ? doubletableList.length : 0 : tableList ? tableList.length : 0}
                            /{tableType === 'DetailInfo' ? 1 : swit ? doubledataAmount : dataAmount}
                        </span>
                        {
                            <Button className={styles.more_btn}
                                style={{ display: swit ? doubledataAmount <= doubletableList.length ? 'none' : 'block' : dataAmount <= tableList.length ? 'none' : 'block' }}
                                loading={isLoading} onClick={() => swit ? loaddoubleTableList('loadtwo') : loaddoubleTableList('loadone')} >
                                Load More
                            </Button>
                        }
                    </div>
                </div>
                <div className={styles.spinning} style={{ display: isRefresh ? 'flex' : 'none' }}>
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

export default CommonDataTable