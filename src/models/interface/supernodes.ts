//supernodes Table
export interface supernodes {
    slotId: number;
    Address: string;
    EffectiveStr: string;
    MintingAverageStr: string;
    Height: number;
}

//supernode Detail Request parameter types
export interface postsupernodeDetail {
    address?: string;
    pastTime?: number;
    reqName?: string;
}

//supernode List Request parameter types
export interface postsupernodeDetailList {
    address?: string;
    page?: number;
    size?: number;
    reqName?: string;
    seqId?:number;
}

//supernodeDetail
export interface supernodeDetail {
    AvgBlockSize: number
    AvgBlockSizeStr: string
    AvgTxPerBlock: number
    AvgTxPerBlockStr: string
    GenBlockDelay: number
    GenBlockDelayStr: string
    LatestBlockNumber: number
    MissBlockRate: number
    MissBlockRateStr: string
    NodeAddress: string
}

//SupernodeDetail Component Props
export type SupernodeDetailProps = {
    title: string;
    detailData: supernodeDetail;
    spinshow: boolean;
}