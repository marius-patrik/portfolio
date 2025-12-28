import { IconList, IconPlus, IconTrash } from '@tabler/icons-react';
import { Button, Checkbox, Flex, Input, Stack, Text } from 'liqid-components';
import { Window } from 'liqid-ui';
import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useState,
} from 'react';

interface ToDoListProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const ToDoList = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: ToDoListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('liqid-todos');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('liqid-todos', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <Window
      title={
        <Flex align="center" gap="sm" component="span">
          <IconList size={18} /> To Do List
        </Flex>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <Stack
        gap="md"
        p="md"
        style={{ height: '100%', width: '100%', overflow: 'hidden' }}
      >
        {/* Add Task Input */}
        <Flex gap="sm" align="center">
          <Input
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            style={{ flex: 1 }}
          />
          <Button onClick={addTask} variant="glass">
            <IconPlus size={18} />
          </Button>
        </Flex>

        {/* Tasks List */}
        <Stack
          gap="sm"
          style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}
        >
          {tasks.length === 0 ? (
            <Text align="center" dimmed p="xl" style={{ marginTop: '2rem' }}>
              No tasks yet. Add one above!
            </Text>
          ) : (
            tasks.map((task) => (
              <Flex
                key={task.id}
                align="center"
                gap="sm"
                p="sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '1rem',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <Text
                  style={{
                    flex: 1,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    opacity: task.completed ? 0.6 : 1,
                  }}
                  component="span"
                  fw={task.completed ? 400 : 500}
                >
                  {task.text}
                </Text>
                <Button
                  variant="icon"
                  onClick={() => deleteTask(task.id)}
                  style={{ color: 'var(--color-error, #ef4444)' }}
                >
                  <IconTrash size={18} />
                </Button>
              </Flex>
            ))
          )}
        </Stack>
      </Stack>
    </Window>
  );
};
