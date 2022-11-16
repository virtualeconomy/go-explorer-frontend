import { useRouter } from 'next/router'
import { useState, useMemo } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Image, Menu, Button, Drawer, message } from 'antd';
import type { MenuProps, DrawerProps } from 'antd';

import styles from './navBar.module.scss'
import Search from '../search/index'


type Props = {};

const menuItems: MenuProps['items'] = [
    {
        label: 'Blocks',
        key: 'blocks',
    },
    {
        label: 'Transactions',
        key: 'transactions',
    },
    {
        label: 'Token',
        key: 'token',
    },
    {
        label: 'Supernodes',
        key: 'supernodes',
    },
    {
        label: 'NFT',
        key: 'nft',
    }
];
const isTest = process.env.DEPLOY_MODE !== 'prod'
const selectOptions = { color: '#FF8232', border: '1px solid #FF8232', width: '100%', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 400, cursor: 'pointer', marginTop: '16px' }

const NavBar = (props: Props) => {
    const router = useRouter()
    const routePath = menuItems.find((item: any) => router.route.indexOf(item.key) != -1)
    const [currentMenu, setCurrentMenu] = useState<any>(routePath ? routePath.key : null);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isPc, setIsPc] = useState<Boolean>(true)

    const jumpPage = (path?: string) => { setIsOpen(false); router.push(path ? `/${path}` : '/') }

    const selectMenu: MenuProps['onClick'] = (e: any) => {
        setCurrentMenu(e.key);
        jumpPage(e.key)
    };

    useMemo(() => {
        setCurrentMenu(routePath ? routePath.key : null);
    }, [routePath])

    const optDarwer = (status: boolean, type: string) => {
        setIsOpen(status)
        setIsPc(type === 'pc')
    }

    const styleOpt = (type: string) => {
        let style = JSON.parse(JSON.stringify(selectOptions))
        if (type === 'mainnet') {
            style.color = isTest ? '#EEEEEE' : '#FF8232'
            style.border = isTest ? '1px solid #EEEEEE' : '1px solid #FF8232'
        } else {
            style.color = isTest ? '#FF8232' : '#EEEEEE'
            style.border = isTest ? '1px solid #FF8232' : '1px solid #EEEEEE'
        }
        return style
    }

    const switchNetwork = (type: string) => {
        //We can remove this code if deploy the production site in the future.
        // if (type === 'mainnet') {
        //     message.info({
        //         content: 'Sorry! Currently we just support DEV site.'
        //     })
        //     return
        // }
        if (process.env.NODE_ENV === 'development' && type === 'testnet') {
            jumpPage()
        } else {
            const url: any = type === 'mainnet' ? process.env.BASE_MAIN_SITE_URL : process.env.BASE_TEST_SITE_URL
            window.location.replace(url)
        }
    }

    return (
        <div className={styles.navBar}>
            <div className={styles.container}>
                <div className={styles.logo_content} onClick={() => jumpPage('')}>
                    <Image
                        width={195}
                        height={48}
                        preview={false}
                        alt="VSYS LOGO"
                        src="/v_systems_logo.svg"
                        className={styles.logo}
                    />
                </div>
                <div className={styles.menu_content}>
                    <Menu className={styles.menu} overflowedIndicator={false} onClick={selectMenu} selectedKeys={[currentMenu]} mode="horizontal" items={menuItems} />
                    <Button className={styles.btn} onClick={() => optDarwer(true, 'pc')} >{isTest ? 'Testnet' : 'Mainnet'}</Button>
                </div>
                <div className={styles.mobile_content}>
                    <Image
                        width={28}
                        height={28}
                        preview={false}
                        alt="menu"
                        src="/menu_mobile.svg"
                        className={styles.menu_mobile}
                        onClick={() => optDarwer(true, 'mobile')}
                    />
                </div>
            </div>
            <Drawer open={isOpen} closeIcon={<CloseOutlined style={{ color: '#EEEEEE', fontSize: '17px' }} />} width={isPc ? '' : '100%'} onClose={() => optDarwer(false, isPc ? 'pc' : '')} headerStyle={{ border: 'none' }} bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} drawerStyle={{ background: '#2D323C', color: '#EEEEEE', fontSize: '18px', fontFamily: 'Lato' }}>
                {
                    !isPc && (
                        <div style={{ borderBottom: '1px solid #FF8232', width: '102%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px' }}>
                            {
                                menuItems.map((item: any) => {
                                    return (<div onClick={() => selectMenu(item)} key={item.key} style={{ borderBottom: item.key === currentMenu ? '1px solid #FF8232' : '', color: item.key === currentMenu ? '#FF8232' : '', height: '44px', width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '23px' }}>{item.label}</div>)
                                })
                            }
                        </div>

                    )
                }
                <div style={!isPc ? { width: '102%', background: '#222831', height: '100%', display: 'flex', justifyContent: 'center' } : {}}>
                    <div style={{ width: '302px', marginTop: isPc ? '' : '60px' }}>
                        <div style={{ width: '100%', textAlign: 'center', fontWeight: 700, }}>Select a Network</div>
                        <div style={styleOpt('mainnet')} onClick={() => switchNetwork('mainnet')}>MainNet</div>
                        <div style={styleOpt('testnet')} onClick={() => switchNetwork('testnet')}>TestNet</div>
                    </div>
                </div>
            </Drawer>
            <Search />
        </div>
    )
}

export default NavBar