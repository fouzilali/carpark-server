#!/usr/bin/env bash
session="servers"

CARPARK_SERVER_DIR=${CARPARK_SERVER_DIR:-"."}
DASH_SERVER_DIR=${DASH_SERVER_DIR:-"$CARPARK_SERVER_DIR/Dash/Source\ Files/"}
LPR_SERVER_DIR=${LPR_SERVER_DIR:-"../fyp-lpr-gcp-functions"}
HOSTNAME=$(curl https://checkip.amazonaws.com/)

tmux new-session -d -s $session

tmux rename-window -t $session:0 "lpr"
tmux new-window -t $session:1 -n 'back'
tmux new-window -t $session:2 -n 'dash'
tmux new-window -t $session:3 -n 'htop'

tmux send-keys -t "lpr" 'bash' C-m 'clear' C-m 
tmux send-keys -t "lpr" "cd ${LPR_SERVER_DIR}" C-m 
tmux send-keys -t "lpr" 'source ./.venv/bin/activate' C-m
tmux send-keys -t "lpr" 'python server.py' C-m

tmux send-keys -t "back" 'bash' C-m 'clear' C-m 
tmux send-keys -t "back" "cd ${CARPARK_SERVER_DIR}" C-m 
tmux send-keys -t "back" "HOSTNAME=${HOSTNAME} npm run server" C-m 

tmux send-keys -t "dash" 'bash' C-m 'clear' C-m 
tmux send-keys -t "dash" "cd ${DASH_SERVER_DIR}" C-m 
tmux send-keys -t "dash" 'npm run start' C-m 

tmux send-keys -t "htop" 'bash' C-m 'clear' C-m 
tmux send-keys -t "htop" "htop" C-m 
