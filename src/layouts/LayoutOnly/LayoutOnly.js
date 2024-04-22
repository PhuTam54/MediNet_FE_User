import classNames from 'classnames/bind';
import styles from './LayoutOnly.module.scss';



const cx = classNames.bind(styles);

function LayoutOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            
        </div>
    );
}



export default LayoutOnly;
