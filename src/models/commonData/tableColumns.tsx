import moment from 'moment'
import Link from 'next/link'
import type { ColumnsType } from 'antd/es/table';
import { Image } from 'antd'
import BigNumber from "bignumber.js";

import { commonTableListType } from '../interface/common'
import { VSYS_PRECISION, VSYS_TIME } from '../../utils/constant'
import { byteArrayToString, cutString, toThousands } from '../../utils/tools';

export const txColumns: ColumnsType<commonTableListType> = [
  {
    title: 'ID',
    dataIndex: 'Id',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/transactions/' + val}>{val}</Link>
    }
  },
  {
    title: 'Type',
    dataIndex: 'TypeName',
    width: '12%',
    ellipsis: true,
  },
  {
    title: 'Fee',
    dataIndex: 'Fee',
    width: '8%',
    ellipsis: true,
    render: (val: any) => {
      return BigNumber(val).dividedBy(VSYS_PRECISION)+'VSYS'
    }
  },
  {
    title: 'Sender',
    dataIndex: 'SenderAddress',
    width: '8%',
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 6)}</Link>
      }
    }
  },
  {
    title: 'Recipient',
    dataIndex: 'Recipient',
    width: '15%',
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val  }} >{cutString(val, 12)}</Link>
      }
    }
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    width: '8%',
    ellipsis: true,
    sorter: {
      compare: (a: any, b: any) => {
        return a.Amount - b.Amount
      },
      multiple: 1,
    },
    render: (val: any) => {
      return BigNumber(val).dividedBy(VSYS_PRECISION)+'VSYS'
    }
  },
  {
    title: 'Time Stamp',
    dataIndex: 'TimeStamp',
    ellipsis: true,
    render: (val: any) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a: any, b: any) => a.TimeStamp - b.TimeStamp,
      multiple: 2,
    },
  },
];

export const blockTransactionsColumns: ColumnsType<commonTableListType> = [
  {
    title: 'ID',
    dataIndex: 'Id',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/transactions/' + val}>{val}</Link>
    }
  },
  {
    title: 'Type',
    dataIndex: 'TypeName',
    width: '8%',
    ellipsis: true,
  },
  {
    title: 'Fee',
    dataIndex: 'Fee',
    width: '10%',
    ellipsis: true,
    render: (val: any) => {
      return BigNumber(val).dividedBy(VSYS_PRECISION)+'VSYS'
    }
  },
  {
    title: 'Sender',
    dataIndex: 'SenderAddress',
    width: '8%',
    ellipsis: true,
  },
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 12)}</Link>
      }
    }
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: '10%',
    ellipsis: true,
    sorter: {
      compare: (a: any, b: any) => {
        return a.amount - b.amount
      },
      multiple: 1,
    },
    render: (val: any) => {
      return BigNumber(val).dividedBy(VSYS_PRECISION)+'VSYS'
    }
  },
  {
    title: 'Time Stamp',
    dataIndex: 'timestamp',
    ellipsis: true,
    render: (val: any) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a: any, b: any) => a.timestamp - b.timestamp,
      multiple: 2,
    },
  },
];

export const BlocksColumns: ColumnsType<commonTableListType> = [
  {
    title: 'Height',
    dataIndex: 'Height',
    ellipsis: true,
    width: '10%',
    sorter: {
      compare: (a: any, b: any) => a.Height - b.Height,
      multiple: 3,
    },
  },
  {
    title: 'Block Id',
    dataIndex: 'BlockId',
    width: '30%',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/blocks/' + val}>{val}</Link>
    }
  },
  {
    title: 'Minnter Time',
    dataIndex: 'MintTime',
    ellipsis: true,
    showSorterTooltip: false,
    render: (val: any) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a: any, b: any) => a.MintTime - b.MintTime,
      multiple: 2,
    },
  },
  {
    title: 'Block Size',
    dataIndex: 'BlockSize',
    width: '10%',
    ellipsis: true,
    render: (val) => {
      return val + 'B'
    }
  },
  {
    title: 'Txs',
    dataIndex: 'Txs',
    width: '10%',
    ellipsis: true,
  },
  {
    title: 'Time Stamp',
    dataIndex: 'Timestamp',
    ellipsis: true,
    showSorterTooltip: false,
    render: (val: any) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a: any, b: any) => a.Timestamp - b.Timestamp,
      multiple: 1,
    }
  }
];

export const BlocksGeneralColumns: ColumnsType<commonTableListType> = [
  {
    title: 'Height',
    dataIndex: 'Height',
    ellipsis: true,
    width: '10%',
    sorter: {
      compare: (a: any, b: any) => a.Height - b.Height,
      multiple: 3,
    },
  },
  {
    title: 'Block Id',
    dataIndex: 'BlockId',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/blocks/' + val}>{val}</Link>
    }
  },
  {
    title: 'Generator',
    dataIndex: 'Generator',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/nodeInfo/' + val}>{cutString(val, 12)}</Link>
    }
  },
  {
    title: 'Minnter Time',
    dataIndex: 'MintTime',
    ellipsis: true,
    showSorterTooltip: false,
    render: (val: any) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a: any, b: any) => a.MintTime - b.MintTime,
      multiple: 1,
    },
  },
  {
    title: 'Block Size',
    dataIndex: 'BlockSize',
    width: '10%',
    ellipsis: true,
    render: (val) => {
      return <span>{val}B</span>
    }
  },
  {
    title: 'Txs',
    dataIndex: 'Txs',
    width: '10%',
    ellipsis: true,
  },
  {
    title: 'Time Stamp',
    dataIndex: 'Timestamp',
    ellipsis: true,
    showSorterTooltip: false,
    render: (val: any) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a: any, b: any) => a.Timestamp - b.Timestamp,
      multiple: 2,
    }
  }
];

export const TokenInfoColumns: ColumnsType<commonTableListType> = [
  {
    title: 'Token',
    dataIndex: 'IconUrl',
    align: 'left',
    ellipsis: true,
    colSpan: 2,
    width: '48px',
    render: (val) => {
      return <Image src={val} width={48} preview={false} alt={val} fallback='/Group.svg' />
    }
  },
  {
    dataIndex: 'Symbol',
    ellipsis: true,
    colSpan: 0,
    width: '68px'
  },
  {
    title: 'Link',
    dataIndex: 'TokenId',
    width: '30%',
    ellipsis: true,
    render: (val) => {
      return <Link href={{ pathname: '/token/' + val }} >{val}</Link>
    }
  },
  {
    title: 'Amount',
    dataIndex: 'TotalSupply',
    ellipsis: true,
    render: (val, record) => {
      return BigNumber(val).dividedBy(record.Unity)+''
    }
  },
  {
    title: 'Register Time',
    dataIndex: 'RegisterTime',
    ellipsis: true,
    sorter: {
      compare: (a, b) => {
        return a.RegisterTime - b.RegisterTime
      },
      multiple: 1,
    },
    render: (val) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
  },
];

export const TokenRecordscolumns: ColumnsType<commonTableListType> = [
  {
    title: 'ID',
    dataIndex: ['TokenTransaction', 'Id'],
    ellipsis: true,
    render: (val) => {
      return <Link href={'/transactions/' + val}>{val}</Link>
    }
  },
  {
    title: 'Type',
    dataIndex: ['TokenTransaction', 'FuncName'],
    width: '10%',
    ellipsis: true,
  },
  {
    title: 'Amount',
    dataIndex: 'TokenTransaction',
    width: '15%',
    ellipsis: true,
    sorter: {
      compare: (a, b) => {
        return a.TokenTransaction.FuncData?.Amount - b.TokenTransaction.FuncData?.Amount
      },
      multiple: 1,
    },
    render: (val, record) => {
      return BigNumber(val.FuncData.Amount).dividedBy(record.Unity)+''
    }
  },
  {
    title: 'Fee',
    dataIndex: ['TokenTransaction', 'Fee'],
    width: '10%',
    ellipsis: true,
    render: (val) => {
      return BigNumber(val).dividedBy(VSYS_PRECISION)+''
    }
  },
  {
    title: 'Recipient',
    dataIndex: ['TokenTransaction', 'FuncData'],
    ellipsis: true,
    render: (val: any) => {
      if (val.ActionAddress) {
        return <Link href={{ pathname: '/address/'+ val.ActionAddress}} >{cutString(val.ActionAddress, 12)}</Link>
      } else if (val.Recipient) {
        return <Link href={{ pathname: '/address/' + val.Recipient }} >{cutString(val.Recipient, 12)}</Link>
      } else {
        return '-'
      }
    }
  },
  {
    title: 'Time Stamp',
    dataIndex: 'TokenTransaction',
    ellipsis: true,
    width: '20%',
    render: (val) => {
      return val.Timestamp / VSYS_TIME ? moment(val.Timestamp / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a, b) => a.TokenTransaction.Timestamp - b.TokenTransaction.Timestamp,
      multiple: 2,
    },
  },
];

export const tokenInfocolumns: ColumnsType<commonTableListType> = [
  {
    title: 'ID',
    dataIndex: ['TokenTransaction', 'Id'],
    width: '25%',
    ellipsis: true,
    render: (val) => {
      return <Link href={'/transactions/' + val}>{val}</Link>
    }
  },
  {
    title: 'Type',
    dataIndex: ['TokenTransaction', 'FuncName'],
    width: '10%',
    ellipsis: true,
  },
  {
    title: 'Attachment',
    dataIndex: ['TokenTransaction', 'Attachment'],
    ellipsis: true,
    render: (val: any) => {
      if (!val) {
        return '-'
      } else {
        return byteArrayToString(val)
      }
    }
  },
  {
    title: 'Sender',
    dataIndex: ['TokenTransaction', 'FuncSender'],
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 12)}</Link>
      }
    }
  },
  {
    title: 'Recipient',
    dataIndex: ['TokenTransaction', 'FuncData'],
    ellipsis: true,
    render: (val: any) => {
      if (val.ActionAddress) {
        return <Link href={{ pathname: '/address/' + val.ActionAddress }} >{cutString(val.ActionAddress, 12)}</Link>
      } else if (val.Recipient) {
        return <Link href={{ pathname: '/address/' + val.Recipient}} >{cutString(val.Recipient, 12)}</Link>
      } else {
        return '-'
      }
    }
  },
  {
    title: 'Amount',
    dataIndex: 'TokenTransaction',
    width: '8%',
    ellipsis: true,
    sorter: {
      compare: (a, b) => {
        return a.TokenTransaction?.FuncData?.Amount - b.TokenTransaction?.FuncData?.Amount
      },
      multiple: 1,
    },
    render: (val, record) => {
      return BigNumber(val.FuncData.Amount).dividedBy(record.Unity)+''
    }
  },
  {
    title: 'Time Stamp',
    dataIndex: 'TokenTransaction',
    ellipsis: true,
    width: '20%',
    render: (val) => {
      return val.Timestamp / VSYS_TIME ? moment(val.Timestamp / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a, b) => {
        return a.TokenTransaction?.Timestamp - b.TokenTransaction?.Timestamp
      },
      multiple: 2,
    },
  },
];

export const supernodescolumns: ColumnsType<commonTableListType> = [
  {
    title: 'Slot ID',
    dataIndex: 'slotId',
    width: '15%',
    sorter: {
      compare: (a, b) => {
        return a.slotId - b.slotId
      },
      multiple: 1,
    },
    ellipsis: true
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    width: '20%',
    ellipsis: true,
    render: (val) => {
      return <Link href={'/nodeInfo/' + val}>{val}</Link>
    }
  },
  {
    title: 'Effective Balance',
    dataIndex: 'EffectiveStr',
    ellipsis: true,
    render: (val) => {
      return toThousands(Math.round(BigNumber(val).dividedBy(VSYS_PRECISION) as unknown as number)) + 'VSYS'
    }
  },
  {
    title: 'Minting Average Balance',
    dataIndex: 'MintingAverageStr',
    ellipsis: true,
    render: (val) => {
      return toThousands(Math.round(BigNumber(val).dividedBy(VSYS_PRECISION) as unknown as number)) + 'VSYS'
    }
  },
  {
    title: 'Latest Block',
    dataIndex: 'LatestBlockId',
    ellipsis: true,
    width: '20%',
    render: (val: any) => {
      return <Link href={'/blocks/' + val}>{val}</Link>
    }
  }
];

export const NftsColumns: ColumnsType<commonTableListType> = [
  {
    title: 'NFT Name',
    dataIndex: ['Attributes', 'Name'],
    ellipsis: true,
    render: (val: any) => {
      if (!val) {
        return '-'
      } else {
        return val
      }
    }
  },
  {
    title: 'Collection',
    dataIndex: 'ContractId',
    ellipsis: true
  },
  {
    title: 'Address',
    dataIndex: 'CurrentOwner',
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 12)}</Link>
      }
    }
  },
  {
    title: 'Nft token ID',
    dataIndex: 'NftTokenId',
    ellipsis: true,
    render: (val) => {
      return <Link href={{ pathname: '/nft/nftInfo', query: { id: val } }} >{val}</Link>
    }
  },
  {
    title: 'Creating block',
    dataIndex: 'CreatingHeight',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/blocks/' + val}>{val}</Link>
    }
  },
  {
    title: 'Creation transaction',
    dataIndex: 'Id',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/transactions/' + val}>{val}</Link>
    }
  },
  {
    title: 'Time Stamp',
    dataIndex: 'RegisterTime',
    width: '20%',
    ellipsis: true,
    render: (val) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a, b) => a.RegisterTime - b.RegisterTime
    }
  }
]

export const NftTransactionColumns: ColumnsType<commonTableListType> = [
  {
    title: 'Transaction hash',
    dataIndex: 'Id',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/transactions/' + val}>{val}</Link>
    }
  },
  // {
  //   title: 'NFT Name',
  //   dataIndex: ['Attributes', 'Name'],
  //   ellipsis: true,
  //   render: (val: any) => {
  //     if (!val) {
  //       return '-'
  //     } else {
  //       return val
  //     }
  //   }
  // },
  {
    title: 'Nft token ID',
    dataIndex: 'NftTokenId',
    ellipsis: true,
    render: (val: any) => {
      if (!val) {
        return '-'
      } else {
        return <Link href={{ pathname: '/nft/nftInfo', query: { id: val } }} >{val}</Link>
      }
    }
  },
  {
    title: 'Sender',
    dataIndex: 'FuncSender',
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 12)}</Link>
      }
    }
  },
  {
    title: 'Recipient',
    dataIndex: 'FuncRecipient',
    ellipsis: true,
    render: (val: any, record: any) => {
      if (val) {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 12)}</Link>
      } else if (record.FuncData?.Issuer) {
        return <Link href={{ pathname: '/address/' + record.FuncData?.Issuer}} >{cutString(record.FuncData?.Issuer, 12)}</Link>
      } else {
        return '-'
      }
    }
  },
  {
    title: 'Time Stamp',
    dataIndex: 'Timestamp',
    ellipsis: true,
    render: (val) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a, b) => a.Timestamp - b.Timestamp
    }
  }
]

export const NftregistryColumns: ColumnsType<commonTableListType> = [
  {
    title: 'Transaction',
    dataIndex: 'Id',
    ellipsis: true,
    render: (val: any) => {
      return <Link href={'/transactions/' + val}>{val}</Link>
    }
  },
  {
    title: 'Recipient Address',
    dataIndex: 'recipientAddress',
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 12)}</Link>
      }
    }
  },
  {
    title: 'Sender Address',
    dataIndex: 'senderAddress',
    ellipsis: true,
    render: (val: any) => {
      if (!val || val == '-') {
        return '-'
      } else {
        return <Link href={{ pathname: '/address/' + val }} >{cutString(val, 12)}</Link>
      }
    }
  },
  {
    title: 'Last time transfered',
    dataIndex: 'LastTransferTime',
    ellipsis: true,
    render: (val) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a, b) => a.LastTransferTime - b.LastTransferTime,
      multiple: 1,
    }
  },
  {
    title: 'First time transfered',
    dataIndex: 'RegisterTime',
    ellipsis: true,
    render: (val) => {
      return val / VSYS_TIME ? moment(val / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    sorter: {
      compare: (a, b) => a.RegisterTime - b.RegisterTime,
      multiple: 2,
    },
  }
]