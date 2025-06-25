IP address 162.0.234.7
Port 22
Username root
Password Y2oy61uHO0jl1bqsguE3



make changes live 

https://chatgpt.com/c/68500e4d-9ec0-800a-ac14-5fef7e553eab0


for frontennd  




sudo cp -r ~/crown-network/frontend/dist/* /var/www/frontend/


sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx



 mysql -h 162.0.234.7 -u crownnetwork -p crown_db