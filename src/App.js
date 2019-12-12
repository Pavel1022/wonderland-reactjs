import React from 'react';
import Title from './components/Main\ components/Headline.jsx';
import Header from './components/Main\ components/Header.jsx';
import Page from './components/Main\ components/Page.jsx';
import './css/bootstrap/bootstrap-grid.css';
import './css/bootstrap/bootstrap-reboot.css';
import './css/css/mixins/_text-hide.css';
import './css/css/bootstrap-reboot.css';
import './css/ajax-loader.gif';
import './css/animate.css';
import './css/aos.css';
import './css/bootstrap-datepicker.css';
import './css/bootstrap.min.css';
import './css/jquery.timepicker.css';
import './css/magnific-popup.css';
import './css/open-iconic-bootstrap.min.css';
import './css/owl.theme.default.min.css';
import './css/style.css';

function App() {
  console.warn = console.error = () => {};
  return (
    <div className="App">
      <Title />
      <Header />
      <Page />
    </div>
  );
}

export default App;
