import Axios from "axios";
import {setupCache} from 'axios-cache-interceptor';

export const backendUri = process.env.REACT_APP_API_URL;

export const doAuth = process.env.DO_AUTH;

export const sshKey = process.env.SSH_KEY;

export const axios = setupCache(Axios);