FROM ubuntu:18.04

RUN apt-get -yqq update
RUN apt-get install -yqq build-essential python3 python3-venv python3-pip python3-dev curl nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -yqq nodejs

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN python -m pip install --upgrade pip

ADD fyp-lpr-gcp-functions /opt/lpr/fyp-lpr-gcp-functions
WORKDIR /opt/lpr
RUN pip install -r ./fyp-lpr-gcp-functions/requirements-docker.txt

ADD carpark-server /opt/lpr/carpark-server

RUN cd carpark-server && npm install
RUN cd carpark-server/Dash/Source\ Files/ && npm install --legacy-peer-deps

EXPOSE 3000
EXPOSE 12000
EXPOSE 8000

RUN apt-get install -yq tmux

WORKDIR /opt/lpr/carpark-server
CMD ["./tmux_start.bash"]