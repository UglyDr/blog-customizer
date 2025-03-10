import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { useState, FormEvent, useRef } from 'react';
import { useClose } from 'src/components/hooks/useClose';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	defaultArticle: ArticleStateType;
	setDefaultArticle: (date: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultArticle,
	setDefaultArticle,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [ArticleState, setArticleState] = useState(defaultArticle);
	const ref = useRef<HTMLFormElement | null>(null);

	useClose({
		isFormOpen,
		onClose: () => setIsFormOpen(false),
		rootRef: ref,
	});

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(ArticleState);
	}

	function handleReset() {
		setArticleState(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	function changeToggleForm() {
		setIsFormOpen((isFormOpen) => !isFormOpen);
	}

	function changeFontFamily(value: OptionType) {
		setArticleState({ ...ArticleState, fontFamilyOption: value });
	}

	function changeFontSize(value: OptionType) {
		setArticleState({ ...ArticleState, fontSizeOption: value });
	}

	function changeFontColor(value: OptionType) {
		setArticleState({ ...ArticleState, fontColor: value });
	}

	function changeBackgroundColor(value: OptionType) {
		setArticleState({ ...ArticleState, backgroundColor: value });
	}

	function changeContentWidth(value: OptionType) {
		setArticleState({ ...ArticleState, contentWidth: value });
	}

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={changeToggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					ref={ref}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={ArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={changeFontFamily}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={ArticleState.fontSizeOption}
						onChange={changeFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={ArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={changeFontColor}
					/>
					<Separator />
					<Select
						selected={ArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={changeBackgroundColor}
					/>
					<Select
						selected={ArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={changeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
