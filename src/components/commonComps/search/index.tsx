import { useRouter } from 'next/router'
import { useState } from 'react'
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
    function submit() {
        if (key != '') {
            getSearch(key).then(res => {
                let url = ''
                switch (res.data.type) {
                    case 'transaction': url = '/transactions/transactionDetail/' + key; break;
                    case 'address': url = '/transactions/addressDetail?address=' + key; break;
                    case 'token': url = '/token/tokenInfo?Id=' + key; break;
                    case "block": url = '/blocks/detail/' + key; break;
                    case "nft": url = '/nft/nftInfo?id=' + key; break;
                    case "nft_contract": url = '/nft/collection?id=' + key; break;
                    case "contract": url = '/transactions/addressDetail?address=' + key; break;
                    default: false;
                }
                router.push(url)
            }).catch(err => {
                message.error(err.message)
                setKey('')
            })
        }
    }
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