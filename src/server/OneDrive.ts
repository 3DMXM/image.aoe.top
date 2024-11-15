import { ConfidentialClientApplication, LogLevel } from "@azure/msal-node";


export class OneDrive {
    static scopes = ['Files.ReadWrite.All', 'Files.Read.All', 'User.Read', 'offline_access']
    pca = new ConfidentialClientApplication({
        auth: {
            clientId: process.env.CLIENT_ID || '',
            clientSecret: process.env.CLIENT_SECRET,
            authority: process.env.AUTHORITY,
        },
        system: {
            loggerOptions: {
                loggerCallback(loglevel, message, containsPii) {
                    console.log(message);
                },
                piiLoggingEnabled: false,
                logLevel: LogLevel.Error,
            }
        }
    })

    static async getAuthCodeUrl() {
        let response = await new OneDrive().pca.getAuthCodeUrl({
            scopes: OneDrive.scopes,
            redirectUri: process.env.REDIRECT_URI || '',
        })

        return response
    }

    static async getRefreshToken(code: string) {
        let response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID || '',
                scope: OneDrive.scopes.join(' '),
                code: code,
                redirect_uri: process.env.REDIRECT_URI || '',
                grant_type: 'authorization_code',
                client_secret: process.env.CLIENT_SECRET || ''
            })
        })

        const data = await response.json();
        return data
    }

    static async getAccessToken(refresh_token: string) {
        let response = await new OneDrive().pca.acquireTokenByRefreshToken({
            refreshToken: refresh_token,
            scopes: OneDrive.scopes
        })
        return response?.accessToken
    }

    // 上传图片
    static async uploadImage(image: Buffer, access_token: string, path: string, image_name: string) {
        const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${path}/${image_name}:/content`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            body: image
        });

        if (!response.ok) {
            throw new Error(`Error uploading image: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }

    static async getImage(access_token: string, path: string) {
        const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${path}:`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!response.ok) {
            return response.statusText
        }

        const data = await response.json();
        return data;
    }
}