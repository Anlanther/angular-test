import type { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AppComponent> = {
  title: 'AG Grid',
  component: AppComponent,
  tags: ['autodocs'],
  argTypes: {
    stringTheme: {
      options: ['themeAlpine', 'themeBalham', 'themeMaterial', 'themeQuartz'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<AppComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    stringTheme: 'themeQuartz',
  },
};
