#!/bin/bash
set -e

base_url=$JOBBY_API_BASE_URL

# User
username=$JOBBY_ADMIN_USERNAME
password=$JOBBY_ADMIN_PASSWORD

curl -X POST $base_url'/auth/token/' \
    -H "Content-type: application/json" \
    -H "accept: application/json" \
    -d "{\"username\": \"$username\", \"password\": \"$password\"}"
