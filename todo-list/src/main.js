import './styles/main.scss';

function App() {
  const initialState = {
    todos: [],
    projects: [],
    filter: 'all', // 'all' | 'active' | 'completed'
    sort: 'A-Z',
  };

  return initialState;
}

App();
