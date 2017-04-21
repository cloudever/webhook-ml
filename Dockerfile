FROM elistreit/node:onbuild

LABEL name "webhook-ml"
LABEL description "Webhook gateway to MailerLite API (v2)"
LABEL version "1.0.0"
LABEL maintainer "cloudever"

ARG PORT=3000
ENV PORT $PORT

ARG PORTEXT=80
ENV PORTEXT $PORTEXT

ARG ECHO="printf \n\n\033[1;30m[Dockerfile]\t\033[1;32m%s\033[0m\n\n\n"

EXPOSE $PORTEXT:$PORT

RUN \
  $ECHO "Install PM2 package global" \
  ; yarn global add pm2

ENTRYPOINT ["pm2-docker", "start", "pm2.json"]
