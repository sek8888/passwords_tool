#!/bin/bash

#RedHat

sudo yum update
sudo yum install yum-utils 
sudo yum-builddep python

echo 'Installing Python3.5'
curl -O https://www.python.org/ftp/python/3.5.0/Python-3.5.0.tgz 
tar xf Python-3.5.0.tgz
cd Python-3.5.0
./configure
make
sudo make install 
python3 --version 
cd ..
rm -f -r Python-3.5.0
rm -f Python-3.5.0.tgz

curl https://bootstrap.pypa.io/get-pip.py | python3
pip3 install flask==0.12
sudo yum install postgresql-libs 
pip3 install psycopg2
echo 'Installation complete'

echo 'Running web server'
./run_python_server.sh



