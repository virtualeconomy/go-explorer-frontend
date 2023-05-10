import styles from './error.module.scss'

type Props = {};

const Error = (props: Props) => {

    return (
        <div className={styles.error}>
            OPPS! We can not find this page~
        </div>
    )
}

export default Error