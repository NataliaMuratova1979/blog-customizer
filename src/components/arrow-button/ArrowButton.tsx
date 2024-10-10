import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: (data: boolean) => void; // Обработчик клика
	isOpen: boolean; // Состояние кнопки (открыто/закрыто)
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={() => onClick(!isOpen)} // Добавляем обработчик клика
			onKeyPress={(e) => {
				if (e.key === 'Enter') onClick(!isOpen); // Передаем аргумент
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow}
				style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
			/>
		</div>
	);
};
