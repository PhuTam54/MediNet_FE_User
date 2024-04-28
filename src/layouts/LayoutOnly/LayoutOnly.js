import classNames from 'classnames/bind';
import styles from './LayoutOnly.module.scss';
import bg from '~/assets/images/backgroundlogin.jpg'; // Thay thế 'path-to-your-background-image' bằng đường dẫn thực sự tới hình nền của bạn




const cx = classNames.bind(styles);

function LayoutOnly({ children }) {
    return (
        <div className={cx('wrapper')} >
        <div className={cx('container')} style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className={cx('content')}>{children}</div>
        </div>
    </div>
    );
}



export default LayoutOnly;
