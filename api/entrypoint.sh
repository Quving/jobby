#!/bin/bash
set -e

appname='jobby'

echo "Migrate files..."
python manage.py migrate

# Create static files.
python manage.py collectstatic --clear --noinput

if [ "$TYPE" = 'worker' ]; then
    echo "Detect worker configuration"
    echo "Run gunicorn..."
    gunicorn --bind 0.0.0.0:8800 $appname.wsgi:application --access-logfile -
elif [ "$TYPE" = 'master' ]; then
    echo "Detect master configuration"
    echo "Render nginx.conf..."
    envsubst '\$JOBBY_API_WORKER_URL' < nginx.conf.template > nginx.conf

    echo "Run nginx..."
    cp -r static/ /usr/share/nginx/html
    cp -r nginx.conf /etc/nginx/conf.d/default.conf
    nginx -g 'daemon off;'
else
    echo "Set env TYPE to master/worker."
    exit 1
fi
