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
	const [form, setForm] = useState(false);
	const [state, setState] = useState(defaultArticle);
	const ref = useRef<HTMLFormElement | null>(null);

	useClose({
		form,
		onClose: () => setForm(false),
		rootRef: ref,
	});

	function submitSidebar(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(state);
	}

	function resetSidebar() {
		setState(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	function changeToggleForm() {
		setForm((form) => !form);
	}

	function changeFontFamily(value: OptionType) {
		setState({ ...state, fontFamilyOption: value });
	}

	function changeFontSize(value: OptionType) {
		setState({ ...state, fontSizeOption: value });
	}

	function changeFontColor(value: OptionType) {
		setState({ ...state, fontColor: value });
	}

	function changeBackgroundColor(value: OptionType) {
		setState({ ...state, backgroundColor: value });
	}

	function changeContentWidth(value: OptionType) {
		setState({ ...state, contentWidth: value });
	}

	return (
		<>
			<ArrowButton isOpen={form} onClick={changeToggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: form })}>
				<form
					className={styles.form}
					onSubmit={submitSidebar}
					onReset={resetSidebar}
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
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={changeFontFamily}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={changeFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={changeFontColor}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={changeBackgroundColor}
					/>
					<Select
						selected={state.contentWidth}
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
