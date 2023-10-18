import { Table, Button, Image } from 'antd'
import styles from './newnfts.module.scss'
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { NftParallelingTableProps, paralleingtableType } from '../../../../models/interface/nft';
import { useEffect, useState } from 'react';

//This is a self-defined icon that will be used in the Chevron Button
const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.2929 16.7071C13.6834 17.0976 14.3166 17.0976 14.7071 16.7071C15.0976 16.3166 15.0976 15.6834 14.7071 15.2929L13.2929 16.7071ZM10 12L9.29289 11.2929C8.90237 11.6834 8.90237 12.3166 9.29289 12.7071L10 12ZM14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L14.7071 8.70711ZM14.7071 15.2929L10.7071 11.2929L9.29289 12.7071L13.2929 16.7071L14.7071 15.2929ZM10.7071 12.7071L14.7071 8.70711L13.2929 7.29289L9.29289 11.2929L10.7071 12.7071Z" fill="white" />
    </svg>
);
const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.7071 7.29289C10.3166 6.90237 9.68342 6.90237 9.29289 7.29289C8.90237 7.68342 8.90237 8.31658 9.29289 8.70711L10.7071 7.29289ZM14 12L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L14 12ZM9.29289 15.2929C8.90237 15.6834 8.90237 16.3166 9.29289 16.7071C9.68342 17.0976 10.3166 17.0976 10.7071 16.7071L9.29289 15.2929ZM9.29289 8.70711L13.2929 12.7071L14.7071 11.2929L10.7071 7.29289L9.29289 8.70711ZM13.2929 11.2929L9.29289 15.2929L10.7071 16.7071L14.7071 12.7071L13.2929 11.2929Z" fill="white" />
    </svg>
);

const ChevronLeftIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon rev={null} component={ChevronLeft} {...props} />
);
const ChevronRightIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon rev={null} component={ChevronRight} {...props} />
);



function full(arr: Array<paralleingtableType>) {
    arr.forEach((item, index) => {
        item.key = item.num + Math.random()
    })
}

const NftparallelingTable = (props: NftParallelingTableProps) => {
    const [nftparallelingdata, setnftparallelingdata] = useState<Array<paralleingtableType>>([])
    const [i, seti] = useState(0)
    function swit(sign: boolean) {
        var newi = i
        if (sign) {
            if (i + 1 < props.tablelist.length / 5) {
                newi = i + 1;
                seti(i + 1)
            } else {
                return
            }
        } else {
            if (i >= 1) {
                newi = i - 1;
                seti(i - 1)
            }
            else {
                return
            }
        }
        setnftparallelingdata(props.tablelist.slice((newi) * 5, (newi + 1) * 5))
    }
    useEffect(() => {
        full(props.tablelist)
        setnftparallelingdata(props.tablelist.slice(0, 5))

    }, [props.tablelist])

    return (
        <div className={styles.info_table}>
            <div className={styles.table}>
                <div className={styles.table_container}>
                    <div className={styles.table_title}>
                        <h2>{props.tabletitle}</h2>
                    </div>
                    <div style={{ display: (props.spinshow) ? 'block' : 'none' }}>
                        <Table columns={props.columnsdata} dataSource={nftparallelingdata} pagination={false} className={styles.antd_table} />
                        <span className={styles.page_sgin}>{i * 5 + nftparallelingdata.length}/{props.tablelist.length}</span>
                        <Button className={i <= 0 ? styles.btn_left : styles.btn_right} onClick={() => { i <= 0 ? '' : swit(false) }}>
                            <ChevronLeftIcon />
                        </Button>
                        <Button className={i + 1 >= props.tablelist.length / 5 ? styles.btn_left : styles.btn_right} onClick={() => { i + 1 >= props.tablelist.length / 5 ? '' : swit(true) }}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
                <div className={styles.spinning} style={{ display: (!props.spinshow) ? 'flex' : 'none' }}>
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

export default NftparallelingTable