# Jobby

[![Build Status](https://drone.quving.com/api/badges/Quving/jobby/status.svg)](https://drone.quving.com/Quving/jobby)

## What is Jobby?
Some people probably know the problem: You are a developer or a server administrator and you have several servers or applications that you have to maintain. Now one and the other application or server has jobs that are regularly executed autonomously. For example a backup script, or a task that cleans up the database of an application. Usually these jobs run silently in the background and the Developer/Admin is not informed whether the job was executed successfully or failed.

Jobby is a self-host platform that can be considered as a report centre. The idea is that when a cronjob has finished, it forwards its status to Jobby. The user then gets an overview of all his distributed jobs in the jobby dashboard.
