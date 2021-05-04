#!/usr/bin/env bash
SESSION=${SESSION:-"carpark-servers"}

CARPARK_SERVER_DIR=${CARPARK_SERVER_DIR:-"."}
LPR_SERVER_DIR=${LPR_SERVER_DIR:-"../fyp-lpr-gcp-functions"}
# SERVER_IP=${SERVER_IP:-$(curl https://checkip.amazonaws.com/)}

tmux new-session -d -s $SESSION

tmux rename-window -t $SESSION:0 "lpr"
tmux new-window -t $SESSION:1 -n 'back'

tmux send-keys -t "lpr" 'bash' C-m 'clear' C-m 
tmux send-keys -t "lpr" "cd ${LPR_SERVER_DIR}" C-m 
tmux send-keys -t "lpr" 'source ./.venv/bin/activate' C-m
tmux send-keys -t "lpr" 'python server.py' C-m

tmux send-keys -t "back" 'bash' C-m 'clear' C-m 
# tmux send-keys -t "back" "export SERVER_IP=${SERVER_IP}" C-m 
tmux send-keys -t "back" "cd ${CARPARK_SERVER_DIR}" C-m 
tmux send-keys -t "back" "bash -c \"cd Dash/Source\ Files/ && npm run build \"" C-m 
tmux send-keys -t "back" "node app.js" C-m 

# tmux send-keys -t "dash" 'bash' C-m 'clear' C-m 
# tmux send-keys -t "dash" "cd ${DASH_SERVER_DIR}" C-m 
# tmux send-keys -t "dash" 'npm run start' C-m 

# tmux send-keys -t "htop" 'bash' C-m 'clear' C-m 
# tmux send-keys -t "htop" "htop" C-m 
