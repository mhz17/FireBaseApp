import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ProductService {

    privateKey = '';

    constructor(private http: HttpClient, private router: Router) { }

    // use to check whether route can be activated.
    // private key is populated when user logs in successfully and this is stored for the lifetime of the applicaiton
    isLoggedIn() {
        return this.privateKey.length > 0;
    }

    registerUser(email: string, password: string, redirect: string, pubkey?: string): Promise<any> {
        // BridgeClient.createUser
        return Promise.reject('Not Implemented');
    }

    deactivateUser(email: string, redirect: string): Promise<any> {
        // BridgeClient.destroyUser
        return Promise.reject('Not Implemented');
    }

    // getPublicKeysForBridge(): Promise<Key[]> {
    //     // BridgeClient.getPublicKeys
    //     return Promise.reject('Not Implemented');
    // }

    // passwordReset(email: string, newPassword: string, redirect: string): Promise<any> {
    //     // BridgeClient.resetPassword
    //     return Promise.reject('Not Implemented');
    // }

    // // clear private key and redirect to home page
    // logout() {
    //     this.privateKey = '';
    //     this.router.navigate(['/login']);
    // }

    // // submit email and password to server, if valid credentials return the users key
    // loginRequest(email: string, password: string): Promise<any> {
    //     return this.http.post(this.apiUrl + '/getkey', '',
    //         { headers: new HttpHeaders().set('Content-Type', 'application/json').set('email', email).set('password', password) })
    //         .toPromise()
    //         .then((res) => {
    //             if (res['error']) {
    //                 return this.handleError(res['error']);
    //             } else {
    //                 this.privateKey = res['data'];
    //                 return Promise.resolve();
    //             }
    //         })
    //         .catch(this.handleError);
    // }

    // uploadFiles(bucketId: string, files: FormData, token: Token): Promise<Response> {
    //     return this.http.post(this.apiUrl + '/uploadFiles', files,
    //         {
    //             headers: new HttpHeaders()
    //                 .set('Accept', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('bucketid', bucketId)
    //                 .set('token', JSON.stringify(token))
    //         })
    //         .toPromise()
    //         .then((res: Response) => {
    //             return Promise.resolve(res);
    //         })
    //         .catch(this.handleError);
    // }

    // downloadFile(bucketId: string, fileid: string, token: Token): Promise<StorjFile> {
    //     return this.http.post(this.apiUrl + '/downloadFile', fileid,
    //         {
    //             headers: new HttpHeaders()
    //                 .set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('fileid', fileid)
    //                 .set('bucketid', bucketId)
    //                 .set('token', JSON.stringify(token))
    //         })
    //         .toPromise()
    //         .then((res) => {
    //             if (res['error']) {
    //                 return this.handleError(res['error']);
    //             } else {
    //                 return Promise.resolve(res);
    //             }
    //         })
    //         .catch(this.handleError);
    // }

    // deleteFile(bucketId: string, fileId: string): Promise<any> {
    //     return this.http.post(this.apiUrl + '/deleteFile', '',
    //         {
    //             headers: new HttpHeaders()
    //                 .set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('fileid', fileId)
    //                 .set('bucketid', bucketId)
    //         })
    //         .toPromise()
    //         .then((res) => {
    //             if (res['error']) {
    //                 return this.handleError(res['error']);
    //             } else {
    //                 return Promise.resolve(res);
    //             }
    //         })
    //         .catch(this.handleError);
    // }

    // createBucket(bucket: Bucket): Promise<Bucket> {
    //     // populate with at least 'name'
    //     return this.http.post<Bucket>(this.apiUrl + '/createBucket', '',
    //         {
    //             headers: new HttpHeaders()
    //                 .set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('bucket', JSON.stringify(bucket))
    //         })
    //         .toPromise()
    //         .then((res) => {
    //             if (res['error']) {
    //                 return this.handleError(res['error']);
    //             } else {
    //                 return Promise.resolve(res);
    //             }
    //         })
    //         .catch(this.handleError);
    // }

    // updateBucket(bucket: Bucket): Promise<Bucket> {
    //     // get bucketid and bucket contents for patch
    //     // updateBucketById
    //     return this.http.post(this.apiUrl + '/updateBucket', '',
    //         {
    //             headers: new HttpHeaders().set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('bucket', JSON.stringify(bucket))
    //         })
    //         .toPromise()
    //         .then((res) => {
    //             return Promise.resolve(res);
    //         })
    //         .catch(this.handleError);

    // }

    // deleteBucket(bucketId: string): Promise<any> {
    //     // destroyBucketById
    //     return Promise.reject('Not Implemented');
    // }

    // getAllBuckets(): Promise<Bucket[]> {
    //     return this.http.post<Bucket[]>(this.apiUrl + '/getbuckets', '',
    //         { headers: new HttpHeaders().set('Content-Type', 'application/json').set('privatekey', this.privateKey) })
    //         .toPromise()
    //         .then((res: Bucket[]) => {
    //             return Promise.resolve(res);
    //         })
    //         .catch(this.handleError);
    // }

    // getFilesForBucket(bucketId: string): Promise<StorjFile[]> {
    //     return this.http.post<StorjFile[]>(this.apiUrl + '/getBucketFiles', '',
    //         {
    //             headers: new HttpHeaders().set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('bucketid', bucketId)
    //         })
    //         .toPromise()
    //         .then((res: StorjFile[]) => {
    //             return Promise.resolve(res);
    //         })
    //         .catch(this.handleError);
    // }

    // createBucketTokenForUpload(bucketid: string): Promise<Token> {
    //     // createToken (PUSH)
    //     return this.http.post<Token>(this.apiUrl + '/createUploadToken', '',
    //         {
    //             headers: new HttpHeaders().set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('bucketid', bucketid)
    //         })
    //         .toPromise()
    //         .then((res: Token) => {
    //             return Promise.resolve(res);
    //         })
    //         .catch(this.handleError);
    // }

    // createBucketTokenForDownload(bucketid: string): Promise<Token> {
    //     // createToken (PUSH)
    //     return this.http.post<Token>(this.apiUrl + '/createDownloadToken', '',
    //         {
    //             headers: new HttpHeaders().set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('bucketid', bucketid)
    //         })
    //         .toPromise()
    //         .then((res: Token) => {
    //             return Promise.resolve(res);
    //         })
    //         .catch(this.handleError);
    // }

    // getFileInfo(bucketId: string, fileId: string): Promise<StorjFile> {
    //     return Promise.reject('Not Implemented');
    // }


    // getSingleBucketDetails(bucketid: string): Promise<Bucket> {
    //     return this.http.post<Bucket>(this.apiUrl + '/getSingleBucket', '',
    //         {
    //             headers: new HttpHeaders().set('Content-Type', 'application/json')
    //                 .set('privatekey', this.privateKey)
    //                 .set('bucketid', bucketid)
    //         })
    //         .toPromise()
    //         .then((res: Bucket) => {
    //             return Promise.resolve(res);
    //         })
    //         .catch(this.handleError);
    // }
    // getBridgeInfo() {

    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}


