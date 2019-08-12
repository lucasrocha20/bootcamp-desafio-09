import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';

import { signInSuccess, signFailed } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Não foi possível fazer login, verifique seus dados!');
    yield put(signFailed());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    console.tron.log(response);

    // history.push('/');
  } catch (err) {
    toast.error('Impossível cadastrar, verifique seus dados!');
    console.tron.log(err);

    yield put(signFailed());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
