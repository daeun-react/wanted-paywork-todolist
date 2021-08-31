import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from 'reducer/todos/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return <div>test</div>;
};

export default App;
