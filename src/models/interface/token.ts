import { ColumnsType } from "antd/es/table"

//tokenlist table 
export interface TokenListType {
    key: React.Key;
    TokenId: string;
    IconUrl: string;
    Name: string;
    TotalSupply: number;
    RegisterTime: number;
    Unity: number
}

//transactions Records datatype
export interface TokenTransactionsRecords {
    Id?: string;
    page?: number;
    size?: number
}

//Issuance & Destruction Recrod datatype
export interface TokenIssuanceRecrod {
    Id?: string;
    page?: number;
    size?: number;
    Type?: any
}

//tokenInfo pager
export interface tokenPager {
    Current: number;
    Size: number;
    Total: number;
}

//tokenInfoDetail table
export interface TokenListDetail {
    Symbol: string;
    TokenId: string;
    IconUrl: string;
    TotalSupply: number;
    CurrentSupply: number;
    RegisterTime: number;
    Issuer: string;
    Maker: string;
    Unity: number;
    Describe: string;
    TokenType: number
}

//tokenInfotable 
export interface tokenInfotable {
    key: React.Key;
    Id: string;
    FuncType: number;
    Attrachment: string;
    FuncSender: string;
    FuncRecipient: string;
    FuncData: any;
    Timestamp: number;
    TokenTransaction: any;
    record: number
}

//TokenInfoDetail Component Props
export type TokenInfoDetailProps = {
    detailData: TokenListDetail;
    spinshow: boolean;
}

//TokenList Component Props
export type TokenListProps = {
    tablelist: Array<TokenListType>;
    columnsdata: ColumnsType<TokenListType>;
    tabletitle: string;
    spinshow: boolean;
}

