import { useRouter } from 'next/router'
import { Image } from 'antd';

import styles from './footer.module.scss'

type Props = {};

const Footer = (props: Props) => {
    const router = useRouter()

    const linkList = [{
        link: 'https://twitter.com/VSYSCoin',
        target: '_blank',
        imgUrl: '/linkLogo/twitter.svg'
    }, {
        link: 'https://discord.com/invite/cxQdkdEyMU',
        target: '_blank',
        imgUrl: '/linkLogo/discord.svg'
    }, {
        link: 'https://www.linkedin.com/company/v-systems-tech',
        target: '_blank',
        imgUrl: '/linkLogo/linkedin.svg'
    }, {
        link: 'https://www.youtube.com/channel/UC3tnJX2dztNKh2yJxFVSDAw',
        target: '_blank',
        imgUrl: '/linkLogo/youtube.svg'
    }
    ]
    return (
        <div className={styles.footer}>
            <div className={styles.footer_container}>
                <Image
                    width={195}
                    height={48}
                    preview={false}
                    alt="VSYS LOGO"
                    src="/v_systems_logo.svg"
                    className={styles.logo}
                />
                <div className={styles.link_content}>
                    {
                        linkList.map((item, idx) => {
                            return (
                                <div className={styles.link_item} key={idx}>
                                    <a  href={item.link} target={item.target}>
                                        <Image
                                            width={30}
                                            height={30}
                                            preview={false}
                                            src={item.imgUrl}
                                            alt="link"
                                            className={styles.logo}
                                        />
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.copy_right}>
                    <div>© 2022 V Systems All Rights Reserved.</div>
                    <div className={styles.terms}>Terms & Privacy</div>
                </div>
            </div>
        </div>
    )
}

export default Footer