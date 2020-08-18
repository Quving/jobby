FROM python:3.6

LABEL maintainer="vinh-ngu@hotmail.com"

RUN apt update && \
	apt install -y curl nginx gettext

WORKDIR /app
ADD . .
RUN pip install -r requirements.txt
RUN chmod +x entrypoint.sh

# Forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["./entrypoint.sh"]
