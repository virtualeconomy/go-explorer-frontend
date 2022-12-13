# VSYS Explorer Frontend (base on Next.js)

## Getting Started

### Run the project after installing all dependencies (local)

You can read scripts that the package.json file in order to know more about it!

```js
npm run dev  // run for dev
```

### Deploy on server (Linux)
> Note: Node and nginx system environment are required on the server !

#### 1. Clone the code from github on server

`git clone https://github.com/virtualeconomy/go-explorer-frontend.git`

#### 2. Enter the directory and install all dependencies

```bash
cd go-explorer-frontend

npm install
```

#### 3. Build a file pack(name as dist) for deploying

```js
npm run build-test // build for testnet

npm run build // build for miannet
```
#### 4. Install pm2 for managing process and running project

```js
npm install pm2 -g // install for global

pm2 start npm --watch --name Explorer -- run start 3000 // run by pm2 (default port is 3000)

pm2 list // check out the process info 
```

##### 5. Nginx

1) Create a nginx file
```js
sudo nano /etc/nginx/sites-available/Explorer
```

2) Copy and paste these configuration 

```js
server {
    listen 80;
    server_name  devexplorer.v.systems;
    root /home/go-explorer-v2.0/Frontend/vsys-explorer;
   
    location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
       proxy_pass http://127.0.0.1:9080;
    }
}
```

3) Link to the `sites-available` dicrectory

```js
sudo ln -s /etc/nginx/sites-available/Explorer /etc/nginx/sites-enabled
```
4) Test 

```js
sudo nginx -t
```

5) Restart Nginx

```js 
sudo systemctl restart nginx
```

#### 6. Deploy the lastest code on server after first deployment. 

```js
git pull  // pull the lastest code from Github

npm run build 
```

### build from docker
```bash
# Write env in ~/.bashrc or /etc/profile
export VEFRONTEND_DEPLOYMODE="build" #or "build-test"

# url example: "x.x.x.x:xx"
export VEFRONTEND_MAINBACKEND="<your main-backend-url>"
export VEFRONTEND_TESTBACKEND="<your test-backend-url>"

# docker build
docker build \
--platform=linux/amd64 \
-t <your username>/vsys-explorer:frontend \
--build-arg deploy_mode=$DEPLOY_MODE \
-f Dockerfile .

# docker run
docker run -d -p 3000:3000 --name vsys-explorer-frontend <your username>/vsys-explorer:frontend
```

### Website Url

[Test Site](http://devexplorer.v.systems)
