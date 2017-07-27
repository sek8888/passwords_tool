FROM python:3.5-alpine

WORKDIR /opt/app

RUN apk update && \
    apk add --virtual build-deps gcc python3-dev musl-dev && \
    apk add postgresql-dev

ADD ./requirements.txt /opt/requirements.txt
RUN pip3.5 install -r /opt/requirements.txt
RUN pip3.5 freeze

