#!/usr/bin/env python
import subprocess as s
import shlex
import sys

# Set user variables for Docker Registry
u = "legalaidfinder"
username = "--username " + u
password = "--password-stdin"
docker_login = "docker login " + username + " " + password
tag = "legalaidfinder/laf:" + str(sys.argv[1])

# Build and tag image
s.call(["docker-compose", "build"])
s.call(["docker", "tag", "legalaidfinder/laf:latest", tag])

# Docker login to allow push to registry
p1 = s.Popen(shlex.split("cat docker.txt"), stdout=s.PIPE)
p2 = s.Popen(shlex.split(docker_login), stdin=p1.stdout, stdout=s.PIPE, stderr=s.PIPE)
p1.stdout.close()
output = p2.communicate()[0]
print output

# Push image to Docker hub registry
s.call(["docker", "push", tag])
print "\nImage " + tag + " pushed to legalaidfinder/laf @ https://hub.docker.com/r/legalaidfinder/laf \n"