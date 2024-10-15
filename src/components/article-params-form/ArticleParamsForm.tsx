import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Button } from 'components/button';
import { Spacing } from 'components/spacing';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import {
	ArticleStateType,
	fontSizeOptions,
	OptionType,
	fontColors,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false); // Управляет открытием и закрытием формы.
	const rootRef = useRef<HTMLDivElement>(null);

	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState); // Хранит текущее состояние параметров статьи

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [initialState, setInitialState] =
		useState<ArticleStateType>(currentArticleState); //Хранит начальное состояние, чтобы можно было сбросить изменения

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [initialStateOnOpen, setInitialStateOnOpen] =
		useState(currentArticleState); //Хранит начальное состояние при открытии формы

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		const newState = { ...selectArticleState, [key]: value };
		setSelectArticleState(newState);
		setCurrentArticleState(newState); // обновляет состояние параметров статьи и сразу применяет изменения
	};

	const handleArrowButtonClick = () => {
		setIsOpen((prevState) => {
			if (!prevState) {
				setInitialState(selectArticleState); //переключает состояние открытия формы и сохраняет текущее состояние при открытии
			}
			return !prevState;
		});
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	}); //Используется хук useOutsideClickClose, чтобы закрыть форму, если кликнули вне её области

	return (
		<>
			<ArrowButton onClick={handleArrowButtonClick} isOpen={isOpen} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<div className={clsx(styles.customContainer)}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
				</div>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault(); // Убираем стандартное поведение формы
					}}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectArticleState.fontFamilyOption}
						placeholder='Выберите цвет'
						onChange={(option) => handleChange('fontFamilyOption', option)} // Обработчик изменения
					/>

					<Spacing />

					<RadioGroup
						name='fontSize' // Уникальное имя для группы радиокнопок
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>

					<Spacing />

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectArticleState.fontColor}
						placeholder='Выберите цвет'
						onChange={(option) => handleChange('fontColor', option)} // Обработчик изменения
					/>

					<Spacing />

					<Separator />

					<Spacing />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectArticleState.backgroundColor}
						placeholder='Выберите цвет'
						onChange={(option) => handleChange('backgroundColor', option)} // Обработчик изменения
					/>

					<Spacing />

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectArticleState.contentWidth}
						placeholder='Выберите цвет'
						onChange={(option) => handleChange('contentWidth', option)} // Обработчик изменения
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='button'
							onClick={() => {
								setSelectArticleState(initialStateOnOpen); // Сброс к начальному состоянию
								setCurrentArticleState(initialStateOnOpen); // Применение изменений к текущему состоянию статьи
							}}
						/>{' '}
						<Button
							title='Применить'
							type='button'
							onClick={() => {
								setCurrentArticleState(selectArticleState); // Применение изменений
								setIsOpen(false); // Закрытие формы
							}}
						/>{' '}
						{/* Применение изменений и закрытие формы */}
					</div>
				</form>
			</aside>
		</>
	);
};
