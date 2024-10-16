import type { Meta, StoryObj } from '@storybook/react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		const handleClick = () => {
			console.log('Arrow button clicked!'); // Сообщение в консоли
		};

		// Пример значения для isOpen
		const isOpen = false; // или true, в зависимости от вашего сценария

		return (
			<>
				<ArrowButton
					isOpen={isOpen} // Передаем isOpen
					onClick={handleClick}
				/>
			</>
		);
	},
};
