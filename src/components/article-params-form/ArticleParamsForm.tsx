import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
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
	defaultArticleState, // Импортируем defaultArticleState
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
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Создаем состояние isOpen, которое будет хранить булево значение (true/false). По умолчанию оно инициализируется как false. setIsOpen — функция для обновления этого состояния

	const rootRef = useRef<HTMLDivElement>(null); //Создаем реф rootRef, который будет ссылаться на HTML элемент типа div. Изначально он равен null

	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState); //Создаем состояние selectArticleState, которое будет хранить текущее состояние статьи. Оно инициализируется значением currentArticleState. setSelectArticleState — функция для обновления этого состояния

	const initialArticleState = useRef<ArticleStateType>(currentArticleState); //Создаем реф initialArticleState, который будет хранить начальное состояние статьи. Изначально он равен currentArticleState

	useEffect(() => {
		initialArticleState.current = currentArticleState;
		setSelectArticleState(currentArticleState);
	}, [currentArticleState]); //Используем хук useEffect, который выполняется при изменении currentArticleState. Он обновляет реф initialArticleState текущим состоянием статьи и устанавливает новое значение для selectArticleState.

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		const newState = { ...selectArticleState, [key]: value };
		setSelectArticleState(newState); //Функция handleChange принимает ключ (свойство) из состояния статьи и новое значение. Она создает новый объект состояния, копируя текущее состояние и обновляя указанное свойство, после чего обновляет состояние с помощью setSelectArticleState.
	};

	const handleApplyChanges = () => {
		setCurrentArticleState(selectArticleState);
		setIsMenuOpen(false); //Функция handleApplyChanges применяется для сохранения изменений: она обновляет общее состояние статьи (setCurrentArticleState) и закрывает модальное окно (или другой компонент), устанавливая isOpen в false.
	};

	const handleArrowButtonClick = () => {
		setIsMenuOpen((prevState) => !prevState); //Функция handleArrowButtonClick переключает состояние isOpen: если оно было открыто, станет закрытым, и наоборот.
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // предотвращаем стандартное поведение формы
		handleApplyChanges(); // применяем изменения
	}; // Функция handleSubmit обрабатывает событие отправки формы. Она предотвращает стандартное поведение браузера (перезагрузку страницы) и вызывает функцию для применения изменений.

	const handleReset = () => {
		setSelectArticleState(defaultArticleState); // Сброс к defaultArticleState
		setCurrentArticleState(defaultArticleState); // Сразу обновляем состояние
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
		event: 'mousedown',
	});

	return (
		<>
			<ArrowButton onClick={handleArrowButtonClick} isOpen={isMenuOpen} />

			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={rootRef}>
				<div className={clsx(styles.customContainer)}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					{' '}
					{/* Обработчик сабмита */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectArticleState.fontFamilyOption}
						placeholder='Выберите шрифт'
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectArticleState.fontColor}
						placeholder='Выберите цвет'
						onChange={(option) => handleChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectArticleState.backgroundColor}
						placeholder='Выберите цвет'
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectArticleState.contentWidth}
						placeholder='Выберите ширину'
						onChange={(option) => handleChange('contentWidth', option)} // Обработчик изменения
					/>
					<div className={styles.bottomContainer}>
						{' '}
						{/* Контейнер для кнопок */}
						<Button
							title='Сбросить'
							type='button' // Тип button для сброса
							onClick={handleReset} // Сбрасываем к начальному состоянию
						/>
						<Button
							title='Применить'
							type='submit' // Тип submit для применения изменений
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
