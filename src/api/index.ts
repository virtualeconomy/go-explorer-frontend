import http from '../utils/net'

//Index
const postindex = (data: object) => http.post('/api/v1/index', data)

//HomePage
const getSupply = () => http.get('/api/v1/supply')
const getGeneralInfo = () => http.get('/api/v1/generalInfo')


//Black
const getBlock = (data: object) => http.get('/api/v1/blocks/latest', { params: data })
const getBlockDetailByID = (Id: string) => http.get('/api/v1/blocks/height/' + Id)
const getBlockDetailByHight = (height: number) => http.get('/api/v1/blocks/at/' + height)


//Serch
const getSearch = (key?: string) => http.get('/api/v1/search/' + key)


//Transaction
const postTransaction = (data?: object) => http.get('/api/v1/transactions/latest', { params: data })
const postTransactionDetail = (id: string) => http.get('/api/v1/transactions/info/' + id)


//Address
const getAddressDetail = (address: string) => http.get('/api/v1/address/detail/' + address)
const getContractDetail = (address: string) => http.get('/api/v1/contract/info/' + address)
const postAddressTrans = (address: string, data?: object) => http.get('/api/v1/address/transactions/' + address, { params: data })
const getAddressToken = (data: object) => http.get('/api/v1/address/tokens/list', { params: data })


//Token
const postgetTokenTransaction = (data: object) => http.post('/api/v1/tokens/transactions', data)
const postTokenList = (data: object) => http.get('/api/v1/tokens/list', { params: data })
const postTokenDetail = (id: string) => http.get('/api/v1/tokens/detail/' + id)


//SuperNode
const postSupernode = (data: object) => http.get('/api/v1/superNodes/all', { params: data })
const postSupernodeDetail = (data: object) => http.post('/api/v1/superNodes/detail', data)


//Nft
//NftHome
const getNftGeneralInfo = () => http.get('/api/v1/nft/all/generalInfo')
const getNftCollections = (data?: object) => http.get('/api/v1/nft/all/collections', { params: data })
const getMostUsedNft = (data?: object) => http.get('/api/v1/nft/all/popular/lastMonth', { params: data })
const getMostChangedNft = (data?: object) => http.get('/api/v1/nft/all/changedOwners', { params: data })
const getNftAllTransaction = (data: object) => http.get('/api/v1/nft/all/transactions', { params: data })
const getLeastNft = (data: object) => http.get('/api/v1/nft/all/latestNft', { params: data })

//NftCollection
const getCollectionNft = (id: string) => http.get('/api/v1/nft/collection/' + id)
const getCollectionGeneral = (id: string) => http.get('/api/v1/nft/collection/generalInfo', { params: { contractId: id } })
const getCollectionTransactions = (data: object) => http.get('/api/v1/nft/collection/transactions', { params: data })
const getCollectionLeastNft = (id: string, data: object) => http.get('/api/v1/nft/collection/latestNft/' + id, { params: data })
const getCollectionRegister = (data: object) => http.get('/api/v1/nft/collection/register', { params: data })

//NftDetail
const getNftDetail = (id: string) => http.get('/api/v1/nft/detail/' + id)
const getNftTransactions = (data: object) => http.get('/api/v1/nft/detail/transactions', { params: data })
const getNftRegister = (id: string) => http.get('/api/v1/nft/detail/register/' + id)

//getNftimg
const getNftimg = (url: string) => http.get(url)

export {
    postindex,
    getSupply,
    getGeneralInfo,
    getBlock,
    getBlockDetailByID,
    getBlockDetailByHight,
    postTransaction,
    getSearch,
    postTransactionDetail,
    getAddressDetail,
    getContractDetail,
    postAddressTrans,
    getAddressToken,
    postTokenList,
    postTokenDetail,
    postgetTokenTransaction,
    postSupernode,
    postSupernodeDetail,
    getNftGeneralInfo,
    getNftCollections,
    getMostUsedNft,
    getMostChangedNft,
    getNftAllTransaction,
    getLeastNft,
    getCollectionNft,
    getCollectionGeneral,
    getCollectionTransactions,
    getCollectionLeastNft,
    getCollectionRegister,
    getNftDetail,
    getNftTransactions,
    getNftRegister,
    getNftimg,
} 
