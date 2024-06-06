import { expect, test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Home from '../page'
import { TASK_STATE_KEY } from '../State/TaskState';
 
test('Add Task', () => {
  const {getByTestId, getByText} = render(<Home />);
  fireEvent.click(getByTestId('add-tasks'));
  fireEvent.change(getByTestId('add-task-dialog-title'), {target: {value: 'title unique 101'}});
  fireEvent.change(getByTestId('add-task-dialog-description'), {target: {value: 'description unique 101'}});
  fireEvent.click(getByTestId('add-task-dialog-save'));

  expect(getByText('title unique 101')).toBeTruthy();
  expect(getByText('description unique 101')).toBeTruthy();
});

test('Add Edit', () => {
  localStorage.setItem(TASK_STATE_KEY, JSON.stringify([
    {
      id: 1, 
      title: 'title',
      description: 'description'
    }
  ]));
  const {getByTestId, getByText} = render(<Home />);

  expect(getByText('title unique 101')).toBeTruthy();
  expect(getByText('description unique 101')).toBeTruthy();
});