FROM elistreit/node:7.9.0-alpine-onbuild

LABEL name "webhook-ml"
LABEL description "Webhook gateway to MailerLite API (v2)"
LABEL version "1.0.0"
LABEL maintainer "cloudever"

ARG PORT=3000
ENV PORT $PORT

ARG PORTEXT=3000
ENV PORTEXT $PORTEXT

ARG WORKDIR=/usr/src/app
ENV WORKDIR $WORKDIR

ARG MAILERLITE_APIKEY
ENV MAILERLITE_APIKEY $MAILERLITE_APIKEY

ARG ECHO="printf \n\n\033[1;30m[Dockerfile]\t\033[1;32m%s\033[0m\n\n\n"

EXPOSE $PORTEXT:$PORT

RUN \
  $ECHO "Install PM2 package global" \
  ; yarn global add pm2

WORKDIR $WORKDIR
CMD ["pm2-docker", "start", "pm2.json"]
