// import logo from './logo.svg';
import MyHeader from './Components/MyHeader';
import Title from './Components/Title';
import './sass/main.css';
import './App.css';
import AppContent from './Components/AppContent';

function App() {
  return (
    <>
      <div className='container'>
        <Title>TODO List</Title>

        <div className='app__wrapper'>
          <MyHeader />
          <AppContent />

        </div>
      </div>
    </>
  );
}

export default App;
