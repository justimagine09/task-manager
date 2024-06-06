import { afterEach, expect, it } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Home from '@src/app/page'
import { TASK_STATE_KEY } from '@src/app/State/TaskState';
import { EStatus } from '@src/app/enum/EStatus';

afterEach(() => {
  cleanup();
  localStorage.removeItem(TASK_STATE_KEY);
});


it('Add Task', () => {
  const { getByTestId, getByText } = render(<Home />);
  fireEvent.click(getByTestId('add-tasks'));
  
  fireEvent.change(getByTestId('add-task-dialog-title'), { target: { value: 'title unique 101' } });
  fireEvent.change(getByTestId('add-task-dialog-description'), { target: { value: 'description unique 101' } });
  fireEvent.click(getByTestId('add-task-dialog-save'));

  expect(getByText('title unique 101')).toBeTruthy();
  expect(getByText('description unique 101')).toBeTruthy();
});

it('Should edit task and update the list item and localstorage', () => {
  localStorage.setItem(TASK_STATE_KEY, JSON.stringify([
    {
      id: 1,
      title: 'title',
      description: 'description'
    }
  ]));
  const { getByTestId, getByText, getAllByTestId } = render(<Home />);
  // Check initial data
  expect(getByText('title')).toBeTruthy();
  expect(getByText('description')).toBeTruthy();

  // Trigger task item edit page
  fireEvent.click(getAllByTestId('task-item-menu')[0]);
  fireEvent.click(getAllByTestId('task-item-edit')[0]);

  // Update from add task dialog
  fireEvent.change(getByTestId('add-task-dialog-title'), { target: { value: 'title unique 102' } });
  fireEvent.change(getByTestId('add-task-dialog-description'), { target: { value: 'description unique 102' } });
  fireEvent.click(getByTestId('add-task-dialog-save'));

  const data = JSON.parse(localStorage.getItem(TASK_STATE_KEY) ?? '')[0];

  expect(getByText('title unique 102')).toBeTruthy();
  expect(getByText('description unique 102')).toBeTruthy();
  expect(data.title).toBe('title unique 102');
  expect(data.description).toBe('description unique 102');
});

it('Should set status correctly', () => {
  localStorage.setItem(TASK_STATE_KEY, JSON.stringify([
    {
      id: 1,
      title: 'title',
      description: 'description',
      status: EStatus.ACTIVE
    }
  ]));
  const { container, getByText, getAllByTestId } = render(<Home />);
  // Check initial data
  expect(getByText('title')).toBeTruthy();
  expect(getByText('description')).toBeTruthy();

  // Trigger edit and toggle status to complete
  fireEvent.click(getAllByTestId('task-item-menu')[0]);
  fireEvent.click(getAllByTestId('task-item-complete')[0]);

  let data = JSON.parse(localStorage.getItem(TASK_STATE_KEY) ?? '')[0];

  expect(container.querySelector('.MuiAvatar-root')?.ariaLabel, 'Completed');
  expect(data.status).toBe(EStatus.COMPLETED);

  // Trigger edit and toggle status to complete
  fireEvent.click(getAllByTestId('task-item-menu')[0]);
  fireEvent.click(getAllByTestId('task-item-complete')[0]);

  data = JSON.parse(localStorage.getItem(TASK_STATE_KEY) ?? '')[0];

  expect(container.querySelector('.MuiAvatar-root')?.ariaLabel, 'Active');
  expect(data.status).toBe(EStatus.ACTIVE);
});

it('Should remove task from the list and localstorage', () => {
  localStorage.setItem(TASK_STATE_KEY, JSON.stringify([
    {
      id: 1,
      title: 'title',
      description: 'description'
    }
  ]));

  const { getByText, getAllByTestId } = render(<Home />);
  // Check initial data
  expect(getByText('title')).toBeTruthy();
  expect(getByText('description')).toBeTruthy();

  fireEvent.click(getAllByTestId('task-item-menu')[0]);
  fireEvent.click(getAllByTestId('task-item-delete')[0]);

  expect(localStorage.getItem(TASK_STATE_KEY)).toBe('[]');
  expect(() => getByText('title')).toThrow();
  expect(() => getByText('description')).toThrow();
});

it('Should filter correctly', () => {
  localStorage.setItem(TASK_STATE_KEY, JSON.stringify([
    {
      id: 1,
      title: 'title',
      description: 'description',
      status: EStatus.ACTIVE
    },
    {
      id: 2,
      title: 'title 2',
      description: 'description 2',
      status: EStatus.ACTIVE
    },
    {
      id: 3,
      title: 'title 3',
      description: 'description 3',
      status: EStatus.COMPLETED
    }
  ]));

  const { getByText, getAllByRole, getByRole } = render(<Home />);

  // Check initial data
  expect(getByText('title')).toBeTruthy();
  expect(getByText('title 2')).toBeTruthy();
  expect(getByText('title 3')).toBeTruthy();

  // Filter active
  fireEvent.mouseDown(getByRole('combobox'));
  let options = getAllByRole('option')
  fireEvent.click(options[1]);

  expect(getByText('title')).toBeTruthy();
  expect(getByText('title 2')).toBeTruthy();
  expect(() => getByText('title 3')).toThrow();

  // Filter completed
  fireEvent.mouseDown(getByRole('combobox'));
  options = getAllByRole('option')
  fireEvent.click(options[2]);

  expect(() => getByText('title')).toThrow();
  expect(() =>getByText('title 2')).toThrow();
  expect(getByText('title 3')).toBeTruthy();
});