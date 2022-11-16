//blockDetail 
export interface blockDetail {
    Generator: string,
    Height: number,
    ParentBlockSig: string,
    Signature: string,
    Size: string,
    TimeStamp: number,
    Txs: number,
    Version: number
}

//blockDetail component Props
export type BlockDetailProps = {
    title: string;
    detailData: blockDetail;
    spinshow: boolean;
}
// //blockDetail Transactions 
// export interface blockDetailTransactions{
//     Id:string,
//     Type:number,
    
// }