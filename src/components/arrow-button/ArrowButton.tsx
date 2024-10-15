import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

//Определяется тип ArrowButtonProps, который описывает свойства (props) компонента ArrowButton.
type ArrowButtonProps = {
	onClick: (data: boolean) => void; // Обработчик клика
	isOpen: boolean; // Состояние кнопки (открыто/закрыто)
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0} //делает элемент доступным для навигации с помощью клавиатуры
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={() => onClick(!isOpen)}
			//Устанавливается обработчик клика. При клике вызывается функция onClick, передавая ей противоположное значение текущего состояния isOpen.
			onKeyPress={(e) => {
				if (e.key === 'Enter') onClick(!isOpen); // Передаем аргумент
			}}>
			<img
				src={arrow} //путь к изображению стрелки, импортируется
				alt='иконка стрелочки'
				className={styles.arrow}
				style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} //инлайновый стиль, который поворачивает изображение на 180 градусов, если isOpen истинно
			/>
		</div>
	);
};
