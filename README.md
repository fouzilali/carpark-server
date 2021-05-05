# Backend Server for FYP Smart Car Park

## Install Dependencies

```sh
npm install
cd 'Dash/Source Files/'
npm install --legacy-peer-deps
```

## Run the whole system

Whole system can be run by:
```sh
sudo apt-get install tmux # make sure tmux is installed 
./tmux_start.bash
```
This starts a tmux session running all servers required (backend, dashboard and LPR)

Configure the Pi with the correct address of the server to connect

You can use environment variables to change some of the behaviour

| Variable             | Meaning                      | Default                                        |
| -------------------- | ---------------------------- | ---------------------------------------------- |
| `SESSION`            | Name of the tmux session     | `carpark-servers`                              |
| `CARPARK_SERVER_DIR` | Where is the backend server  | `.`                                            |
| `DASH_SERVER_DIR`    | Where is the frontend server | `$CARPARK_SERVER_DIR/Dash/Source\ Files/`      |
| `LPR_SERVER_DIR`     | Where is the LPR server      | `$CARPARK_SERVER_DIR/../fyp-lpr-gcp-functions` |

To view the console log use `tmux a -t SESSION`

Beware by using tmux the servers will continue running if you close the terminal or the SSH connectino. This is by design for deploying.

## Run the backend

The backend can be run by doing
```
cd 'Dash/Source Files/' && npm run build
node app.js
# OR
nodemon app.js # For restarting the server on file change
```

## Run the frontend Dashboard

The Dashboard runs on its own server from a subfolder, do:
```
cd 'Dash/Source Files/'
npm run start
```
This start a live development server for the frontend 

## API

https://docs.google.com/document/d/1pIdR6F_JqRwzT5WQwP6-qQdHoFrq54f41aaOVLchKHk/edit

## Yolo LPR

The associated yolo based LPR model to run on a RasPi is found at 

https://github.com/IndianBoy42/yolov5

If you use this repository please checkout the `hklpr` branch

To run the Yolo model as a server, checkout this repo:

https://github.com/IndianBoy42/fyp-lpr-gcp-functions

