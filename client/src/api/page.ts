import { AxiosRequestConfig } from 'axios';
import HttpClient from './http';
import CreatePageBody from '../types/createPageBody';
import CreatePageLinkBody from '../types/createPageLinkBody';
import { getEnv } from '../core/env';

class PageAPI extends HttpClient {
	public constructor() {
		super(getEnv('API_URL'));
		this._initializeRequestInterceptor();
	}

	private _initializeRequestInterceptor = () => {
		this.instance.interceptors.request.use(
			this._handleRequest,
			this._handleError
		);
	};

	private _handleRequest = (config: AxiosRequestConfig) => {
		config.headers['Authorization'] = 'Bearer ...';
		return config;
	};

	public createPage = (body: CreatePageBody) =>
		this.instance.post('/page', body);

	public createPageLink = (body: CreatePageLinkBody) =>
		this.instance.post('/page-link', body);

	public getPagesFromMe = () => this.instance.get('/pages/');
}

export default new PageAPI();
