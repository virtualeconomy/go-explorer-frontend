import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Input, Button, Image, message } from 'antd';
import styles from './search.module.scss'
import { getSearch } from '../../../api/index'

type Props = {};

const Search = (props: Props) => {
    const [key, setKey] = useState('')
    const router = useRouter()
    function updataKey(e: Event & { target: HTMLInputElement }) {
        setKey(e.target?.value)
    }

    function submit(val?: any) {
        let serachVal = key
        if (typeof (val) === 'string') {
            serachVal = val
        }
        if (serachVal != '') {
            getSearch(serachVal).then(res => {
                setKey('')
                if (res.data.error) {
                    message.error(res.data.error)
                    return
                }
                let url = ''
                switch (res.data.type) {
                    case 'transaction': url = '/transactions/transactionDetail/' + serachVal; break;
                    case 'address': url = '/transactions/addressDetail?address=' + serachVal; break;
                    case 'token': url = '/token/tokenInfo?Id=' + serachVal; break;
                    case "block": url = '/blocks/detail/' + serachVal; break;
                    case "nft": url = '/nft/nftInfo?id=' + serachVal; break;
                    case "nft_contract": url = '/nft/collection?id=' + serachVal; break;
                    case "contract": url = '/transactions/addressDetail?address=' + serachVal; break;
                    default: false;
                }
                router.push(url)
            }).catch(err => {
                message.error(err.message)
                setKey('')
            })
        }
    }

    useEffect(() => {
        if (router.query.searchKey) {
            submit(router.query.searchKey)
        }
    }, [router.query.searchKey])

    return (
        <div className={styles.searchall}>
            <div className={styles.search}>
                <Input
                    placeholder="Search block height, block ID, address, transaction ID, token ID..."
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
    )
}

export default Search