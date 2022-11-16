import { BackTop } from 'antd';
import styles from './back.module.scss'

type Props = {};

const back = (props: Props) => {
    return (
        <div className={styles.back}>
            <BackTop className={styles.back_top}/>
        </div>
    )
}

export default back