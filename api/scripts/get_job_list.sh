#!/bin/bash
set -e

base_url=$JOBBY_API_BASE_URL

# Use script 'obtain_jwt_token.sh' to obtain your jwt-token.
jwt_token='<-your-jwt-token>'

curl -X GET $base_url'/resources/job/' \
    -H "Content-type: application/json" \
    -H "accept: application/json" \
    -H "Authorization: Bearer $jwt_token"
