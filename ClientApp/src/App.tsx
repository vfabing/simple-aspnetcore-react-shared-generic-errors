import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Status from './components/Status';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AxiosProvider } from './custom-hooks/useAxios';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
      <AxiosProvider>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
          <Route path='/status' component={Status} />
          <Route path='/fetch-data' component={FetchData} />
          <ToastContainer position="bottom-right" />
        </AxiosProvider>
      </Layout>
    );
  }
}
