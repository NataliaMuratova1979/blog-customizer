import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

//import { RadioGroup } from 'components/radio-group';

import {
	ArticleStateType,
	//fontSizeOptions,
	//OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({}: //currentArticleState,
//setCurrentArticleState,
ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false); // начальное состояние переменной open будет false

	const rootRef = useRef<HTMLDivElement>(null); // создаем реф для контейнера

	//const [selectArticleState, setSelectArticleState] =
	//useState<ArticleStateType>(currentArticleState);

	//const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
	//	setSelectArticleState({ ...selectArticleState, [key]: value });
	//};

	//const handleArrowButtonClick = () => {
	//	setIsOpen((prevState) => !prevState); // переключаем состояние
	//		console.log('Arrow button clicked in ArticleParamsForm!'); // Сообщение в консоли
	//	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	});

	return (
		<>
			<ArrowButton onClick={setIsOpen} isOpen={isOpen} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
