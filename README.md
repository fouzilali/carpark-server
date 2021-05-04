# Backend Server for FYP Smart Car Park

# Run the whole system

Whole system can be deployed by:
```sh
./tmux_start.bash
```
This starts a tmux session running both servers required (backend and LPR)

You can use environment variables to change some of the behaviour

| Variable             | Meaning                     | Default                    |
| -------------------- | --------------------------- | -------------------------- |
| `SESSION`            | Name of the tmux session    | `carpark-servers`          |
| `CARPARK_SERVER_DIR` | Where is the backend server | `.`                        |
| `LPR_SERVER_DIR`     | Where is the LPR server     | `../fyp-lpr-gcp-functions` |

```
tmux a -t SESSION
```
To view the console log

Beware by using tmux the servers will continue running if you close the terminal or the SSH connectino. This is by design for deploying.

# Run the backend:

The backend can be run by just doing
```
cd Dash/Source\ Files/ && npm run build
node app.js
# OR
nodemon app.js # For restarting the server on file change
```

Make sure to build the frontend or else the changes wont be seen when served from the Backend server

The Dashboard can be developed on its own by doing:
```
cd Dash/Source\ Files/
npm run start
```
This start a live development server for the frontend 

## API

https://docs.google.com/document/d/1pIdR6F_JqRwzT5WQwP6-qQdHoFrq54f41aaOVLchKHk/edit

## Yolo LPR

The associated yolo based LPR model to run on a RasPi is found at 

https://github.com/IndianBoy42/yolov5

To run the Yolo model as a server, checkout this repo:

https://github.com/IndianBoy42/fyp-lpr-gcp-functions

