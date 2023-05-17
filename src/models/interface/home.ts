export interface supplyInfoType {
  TotalSupply: number,
  CirculatingSupply: number
}

export interface generalInfoType {
  Version: string,
  AvgBlockDelay: string,
  CurrentHeight: number
}

export type HomeProps = {
  supplyData: supplyInfoType,
  generalData: generalInfoType,
  show: boolean
}

// block table type
export interface BlocksDataType {
  BlockId: string,
  Height: number,
  Signature: string,
  MintTime: number,
  BlockSize: string,
  Txs: string,
  Generator: string,
  Timestamp: number
}

