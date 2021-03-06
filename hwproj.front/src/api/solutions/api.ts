/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Solutions API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


import * as url from "url";
import * as portableFetch from "portable-fetch";
import { Configuration } from "./configuration";
import AuthService from '../../services/AuthService'

const BASE_PATH = "http://40.114.209.102:8085".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *  
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 * 
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration!: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = portableFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 * 
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name!: "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface Solution
 */
export interface Solution {
    /**
     * 
     * @type {number}
     * @memberof Solution
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Solution
     */
    githubUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof Solution
     */
    comment?: string;
    /**
     * 
     * @type {number}
     * @memberof Solution
     */
    state?: StateEnum;
    /**
     * 
     * @type {string}
     * @memberof Solution
     */
    studentId?: string;
    /**
     * 
     * @type {number}
     * @memberof Solution
     */
    taskId?: number;
}


export enum StateEnum {
    NUMBER_0 = <any> 0,
    NUMBER_1 = <any> 1,
    NUMBER_2 = <any> 2
}

/**
 * 
 * @export
 * @interface SolutionViewModel
 */
export interface SolutionViewModel {
    /**
     * 
     * @type {string}
     * @memberof SolutionViewModel
     */
    githubUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof SolutionViewModel
     */
    comment?: string;
    /**
     * 
     * @type {string}
     * @memberof SolutionViewModel
     */
    studentId?: string;
}


/**
 * SolutionsApi - fetch parameter creator
 * @export
 */
export const SolutionsApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        acceptSolution(solutionId: number, options: any = {}): FetchArgs {
            // verify required parameter 'solutionId' is not null or undefined
            if (solutionId === null || solutionId === undefined) {
                throw new RequiredError('solutionId','Required parameter solutionId was null or undefined when calling acceptSolution.');
            }
            const localVarPath = `/api/Solutions/accept_solution/{solutionId}`
                .replace(`{${"solutionId"}}`, encodeURIComponent(String(solutionId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            let authService = new AuthService();
            if (authService.isLoggedIn()) {
                localVarHeaderParameter['Authorization'] = 'Bearer ' + authService.getToken()
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteSolution(solutionId: number, options: any = {}): FetchArgs {
            // verify required parameter 'solutionId' is not null or undefined
            if (solutionId === null || solutionId === undefined) {
                throw new RequiredError('solutionId','Required parameter solutionId was null or undefined when calling deleteSolution.');
            }
            const localVarPath = `/api/Solutions/{solutionId}`
                .replace(`{${"solutionId"}}`, encodeURIComponent(String(solutionId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            let authService = new AuthService();
            if (authService.isLoggedIn()) {
                localVarHeaderParameter['Authorization'] = 'Bearer ' + authService.getToken()
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllSolutions(options: any = {}): FetchArgs {
            const localVarPath = `/api/Solutions`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            let authService = new AuthService();
            if (authService.isLoggedIn()) {
                localVarHeaderParameter['Authorization'] = 'Bearer ' + authService.getToken()
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSolution(solutionId: number, options: any = {}): FetchArgs {
            // verify required parameter 'solutionId' is not null or undefined
            if (solutionId === null || solutionId === undefined) {
                throw new RequiredError('solutionId','Required parameter solutionId was null or undefined when calling getSolution.');
            }
            const localVarPath = `/api/Solutions/{solutionId}`
                .replace(`{${"solutionId"}}`, encodeURIComponent(String(solutionId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            let authService = new AuthService();
            if (authService.isLoggedIn()) {
                localVarHeaderParameter['Authorization'] = 'Bearer ' + authService.getToken()
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} taskId 
         * @param {string} studentId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTaskSolutionsFromStudent(taskId: number, studentId: string, options: any = {}): FetchArgs {
            // verify required parameter 'taskId' is not null or undefined
            if (taskId === null || taskId === undefined) {
                throw new RequiredError('taskId','Required parameter taskId was null or undefined when calling getTaskSolutionsFromStudent.');
            }
            // verify required parameter 'studentId' is not null or undefined
            if (studentId === null || studentId === undefined) {
                throw new RequiredError('studentId','Required parameter studentId was null or undefined when calling getTaskSolutionsFromStudent.');
            }
            const localVarPath = `/api/Solutions/task_solutions/{taskId}/{studentId}`
                .replace(`{${"taskId"}}`, encodeURIComponent(String(taskId)))
                .replace(`{${"studentId"}}`, encodeURIComponent(String(studentId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            let authService = new AuthService();
            if (authService.isLoggedIn()) {
                localVarHeaderParameter['Authorization'] = 'Bearer ' + authService.getToken()
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} taskId 
         * @param {SolutionViewModel} [solutionViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postSolution(taskId: number, solutionViewModel?: SolutionViewModel, options: any = {}): FetchArgs {
            // verify required parameter 'taskId' is not null or undefined
            if (taskId === null || taskId === undefined) {
                throw new RequiredError('taskId','Required parameter taskId was null or undefined when calling postSolution.');
            }
            const localVarPath = `/api/Solutions/{taskId}`
                .replace(`{${"taskId"}}`, encodeURIComponent(String(taskId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            let authService = new AuthService();
            if (authService.isLoggedIn()) {
                localVarHeaderParameter['Authorization'] = 'Bearer ' + authService.getToken()
            }

            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"SolutionViewModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(solutionViewModel || {}) : (solutionViewModel || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rejectSolution(solutionId: number, options: any = {}): FetchArgs {
            // verify required parameter 'solutionId' is not null or undefined
            if (solutionId === null || solutionId === undefined) {
                throw new RequiredError('solutionId','Required parameter solutionId was null or undefined when calling rejectSolution.');
            }
            const localVarPath = `/api/Solutions/reject_solution/{solutionId}`
                .replace(`{${"solutionId"}}`, encodeURIComponent(String(solutionId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            let authService = new AuthService();
            if (authService.isLoggedIn()) {
                localVarHeaderParameter['Authorization'] = 'Bearer ' + authService.getToken()
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SolutionsApi - functional programming interface
 * @export
 */
export const SolutionsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        acceptSolution(solutionId: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = SolutionsApiFetchParamCreator(configuration).acceptSolution(solutionId, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteSolution(solutionId: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = SolutionsApiFetchParamCreator(configuration).deleteSolution(solutionId, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllSolutions(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<Solution>> {
            const localVarFetchArgs = SolutionsApiFetchParamCreator(configuration).getAllSolutions(options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSolution(solutionId: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = SolutionsApiFetchParamCreator(configuration).getSolution(solutionId, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {number} taskId 
         * @param {string} studentId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTaskSolutionsFromStudent(taskId: number, studentId: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<Solution>> {
            const localVarFetchArgs = SolutionsApiFetchParamCreator(configuration).getTaskSolutionsFromStudent(taskId, studentId, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {number} taskId 
         * @param {SolutionViewModel} [solutionViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postSolution(taskId: number, solutionViewModel?: SolutionViewModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<number> {
            const localVarFetchArgs = SolutionsApiFetchParamCreator(configuration).postSolution(taskId, solutionViewModel, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rejectSolution(solutionId: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = SolutionsApiFetchParamCreator(configuration).rejectSolution(solutionId, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * SolutionsApi - factory interface
 * @export
 */
export const SolutionsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        acceptSolution(solutionId: number, options?: any) {
            return SolutionsApiFp(configuration).acceptSolution(solutionId, options)(fetch, basePath);
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteSolution(solutionId: number, options?: any) {
            return SolutionsApiFp(configuration).deleteSolution(solutionId, options)(fetch, basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllSolutions(options?: any) {
            return SolutionsApiFp(configuration).getAllSolutions(options)(fetch, basePath);
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSolution(solutionId: number, options?: any) {
            return SolutionsApiFp(configuration).getSolution(solutionId, options)(fetch, basePath);
        },
        /**
         * 
         * @param {number} taskId 
         * @param {string} studentId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTaskSolutionsFromStudent(taskId: number, studentId: string, options?: any) {
            return SolutionsApiFp(configuration).getTaskSolutionsFromStudent(taskId, studentId, options)(fetch, basePath);
        },
        /**
         * 
         * @param {number} taskId 
         * @param {SolutionViewModel} [solutionViewModel] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postSolution(taskId: number, solutionViewModel?: SolutionViewModel, options?: any) {
            return SolutionsApiFp(configuration).postSolution(taskId, solutionViewModel, options)(fetch, basePath);
        },
        /**
         * 
         * @param {number} solutionId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rejectSolution(solutionId: number, options?: any) {
            return SolutionsApiFp(configuration).rejectSolution(solutionId, options)(fetch, basePath);
        },
    };
};

/**
 * SolutionsApi - object-oriented interface
 * @export
 * @class SolutionsApi
 * @extends {BaseAPI}
 */
export class SolutionsApi extends BaseAPI {
    /**
     * 
     * @param {number} solutionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SolutionsApi
     */
    public acceptSolution(solutionId: number, options?: any) {
        return SolutionsApiFp(this.configuration).acceptSolution(solutionId, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {number} solutionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SolutionsApi
     */
    public deleteSolution(solutionId: number, options?: any) {
        return SolutionsApiFp(this.configuration).deleteSolution(solutionId, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SolutionsApi
     */
    public getAllSolutions(options?: any) {
        return SolutionsApiFp(this.configuration).getAllSolutions(options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {number} solutionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SolutionsApi
     */
    public getSolution(solutionId: number, options?: any) {
        return SolutionsApiFp(this.configuration).getSolution(solutionId, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {number} taskId 
     * @param {string} studentId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SolutionsApi
     */
    public getTaskSolutionsFromStudent(taskId: number, studentId: string, options?: any) {
        return SolutionsApiFp(this.configuration).getTaskSolutionsFromStudent(taskId, studentId, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {number} taskId 
     * @param {SolutionViewModel} [solutionViewModel] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SolutionsApi
     */
    public postSolution(taskId: number, solutionViewModel?: SolutionViewModel, options?: any) {
        return SolutionsApiFp(this.configuration).postSolution(taskId, solutionViewModel, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {number} solutionId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SolutionsApi
     */
    public rejectSolution(solutionId: number, options?: any) {
        return SolutionsApiFp(this.configuration).rejectSolution(solutionId, options)(this.fetch, this.basePath);
    }

}

